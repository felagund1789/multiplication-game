import { useMemo, useState } from 'react'
import { ProgressPath } from './ProgressPath'
import type { AnswerFeedback, Question, StageDefinition, StageProgress } from '../types/game'

interface GameScreenProps {
  stage: StageDefinition
  stages: StageDefinition[]
  currentStageIndex: number
  question: Question
  score: number
  currentStreak: number
  longestStreak: number
  stageProgress: Record<string, StageProgress>
  onAnswer: (answer: number) => AnswerFeedback
  onBackToMenu: () => void
}

export function GameScreen({
  stage,
  stages,
  currentStageIndex,
  question,
  score,
  currentStreak,
  longestStreak,
  stageProgress,
  onAnswer,
  onBackToMenu,
}: GameScreenProps) {
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null)

  const stageStats = useMemo(() => {
    const progress = stageProgress[stage.id]
    const answered = progress?.answered ?? 0
    const correct = progress?.correct ?? 0
    const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100)

    return {
      answered,
      correct,
      accuracy,
    }
  }, [stage.id, stageProgress])

  const handleAnswer = (answer: number) => {
    const result = onAnswer(answer)
    setFeedback(result)
  }

  return (
    <main className="screen game-screen">
      <header className="panel scoreboard">
        <div>
          <p className="metric-label">Score</p>
          <p className="metric-value">{score}</p>
        </div>
        <div>
          <p className="metric-label">Streak</p>
          <p className="metric-value">{currentStreak}</p>
        </div>
        <div>
          <p className="metric-label">Longest</p>
          <p className="metric-value">{longestStreak}</p>
        </div>
        <button type="button" className="small-btn" onClick={onBackToMenu}>
          Main Menu
        </button>
      </header>

      <section className="panel question-panel" aria-live="polite">
        <p className="eyebrow">Current Stage: {stage.title}</p>
        <h2>{question.prompt}</h2>

        <div className="answers-grid">
          {question.options.map((option) => (
            <button key={option} type="button" className="answer-btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>

        <div className="stage-goal">
          <p>
            Stage progress: {stageStats.answered} answered, {stageStats.accuracy}% accuracy
          </p>
          <p>Goal: answer at least {stage.minimumAnswers} with {Math.round(stage.minimumAccuracy * 100)}%+ accuracy.</p>
        </div>

        {feedback && (
          <p className={`feedback ${feedback.isCorrect ? 'ok' : 'bad'}`}>
            {feedback.isCorrect
              ? `Great job! +${feedback.pointsAwarded + feedback.streakBonus} points`
              : `Not this time. Correct answer: ${feedback.correctAnswer}`}
          </p>
        )}
      </section>

      <ProgressPath stages={stages} currentStageIndex={currentStageIndex} stageProgress={stageProgress} />
    </main>
  )
}
