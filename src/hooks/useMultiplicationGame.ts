import { useEffect, useMemo, useState } from 'react'
import { STAGES } from '../data/stages'
import { loadGameProgress, saveGameProgress } from '../services/localStorageService'
import { evaluateStageThreshold } from '../services/progressionService'
import { createQuestionForStage, stagePoints } from '../services/questionService'
import type { AnswerFeedback, GameProgress, Question, StageDefinition, StageProgress } from '../types/game'

const STREAK_BONUS_EVERY = 3

function createInitialProgress(): GameProgress {
  return {
    currentStageIndex: 0,
    score: 0,
    currentStreak: 0,
    longestStreak: 0,
    stageProgress: {},
  }
}

function withDefaultStageProgress(progress?: StageProgress): StageProgress {
  return progress ?? { answered: 0, correct: 0 }
}

export function useMultiplicationGame() {
  const [progress, setProgress] = useState<GameProgress>(() => loadGameProgress() ?? createInitialProgress())

  const currentStage = useMemo<StageDefinition>(() => STAGES[progress.currentStageIndex] ?? STAGES[0], [progress.currentStageIndex])

  const [question, setQuestion] = useState<Question>(() => createQuestionForStage(currentStage))

  useEffect(() => {
    saveGameProgress(progress)
  }, [progress])

  useEffect(() => {
    setQuestion(createQuestionForStage(currentStage))
  }, [currentStage])

  const answerQuestion = (selectedAnswer: number): AnswerFeedback => {
    const isCorrect = selectedAnswer === question.correctAnswer
    const currentStageProgress = withDefaultStageProgress(progress.stageProgress[currentStage.id])

    const updatedStageProgress: StageProgress = {
      answered: currentStageProgress.answered + 1,
      correct: currentStageProgress.correct + (isCorrect ? 1 : 0),
    }

    const nextStreak = isCorrect ? progress.currentStreak + 1 : 0
    const streakBonus =
      isCorrect && nextStreak > 0 && nextStreak % STREAK_BONUS_EVERY === 0
        ? Math.round(nextStreak * 2)
        : 0
    const pointsAwarded = isCorrect ? stagePoints(progress.currentStageIndex, question.format) : 0

    let nextStageIndex = progress.currentStageIndex
    let nextStageProgress = updatedStageProgress
    const thresholdResult = evaluateStageThreshold(
      currentStage,
      updatedStageProgress,
      progress.currentStageIndex < STAGES.length - 1,
    )
    const stageAdvanced = thresholdResult.shouldAdvance

    if (stageAdvanced) {
      nextStageIndex += 1
    } else if (thresholdResult.shouldReset) {
      nextStageProgress = { answered: 0, correct: 0 }
    }

    setProgress((previous) => ({
      ...previous,
      currentStageIndex: nextStageIndex,
      score: previous.score + pointsAwarded + streakBonus,
      currentStreak: nextStreak,
      longestStreak: Math.max(previous.longestStreak, nextStreak),
      stageProgress: {
        ...previous.stageProgress,
        [currentStage.id]: nextStageProgress,
      },
    }))

    const nextStage = STAGES[nextStageIndex] ?? currentStage
    setQuestion(createQuestionForStage(nextStage))

    return {
      isCorrect,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      pointsAwarded,
      streakBonus,
      stageAdvanced,
    }
  }

  const startNewGame = () => {
    setProgress(createInitialProgress())
    setQuestion(createQuestionForStage(STAGES[0]))
  }

  const hasSavedGame = useMemo(() => {
    const hasSessionProgress =
      progress.score > 0 || Object.keys(progress.stageProgress).length > 0 || progress.currentStageIndex > 0

    if (hasSessionProgress) {
      return true
    }

    return Boolean(loadGameProgress())
  }, [progress])

  return {
    stages: STAGES,
    progress,
    currentStage,
    question,
    answerQuestion,
    startNewGame,
    hasSavedGame,
  }
}
