import { useEffect, useState } from 'react'
import type { GameText, RewardsText } from '../i18n/translations'
import type { AnswerFeedback, Badge, BadgeType, Question, StageDefinition, StageProgress } from '../types/game'
import { createQuestionForStage } from '../services/questionService'
import { AdventureMap } from './AdventureMap'
import { NotificationPopup } from './NotificationPopup'

interface GameScreenProps {
  question: Question
  score: number
  currentStreak: number
  longestStreak: number
  stages: StageDefinition[]
  currentStageIndex: number
  stageProgress: Record<string, StageProgress>
  text: GameText
  rewardsText: RewardsText
  badgeDefinitions: Record<BadgeType, Badge>
  onAnswer: (answer: string) => AnswerFeedback
  onNextQuestion: () => void
  onBackToMenu: () => void
}

export function GameScreen({
  question,
  score,
  currentStreak,
  longestStreak,
  stages,
  currentStageIndex,
  stageProgress,
  text,
  rewardsText,
  badgeDefinitions,
  onAnswer,
  onNextQuestion,
  onBackToMenu,
}: GameScreenProps) {
  const [viewMode, setViewMode] = useState<'map' | 'quiz'>('map')
  const [replayStageIndex, setReplayStageIndex] = useState<number | null>(null)
  const [replayQuestion, setReplayQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null)
  const [activeNotification, setActiveNotification] = useState<{
    title: string
    message?: string
    badgeIds: string[]
    shouldReturnToMap: boolean
  } | null>(null)
  const hasSubmitted = feedback !== null
  const isReplayMode = replayStageIndex !== null
  const activeQuestion = (isReplayMode && replayQuestion) ? replayQuestion : question

  useEffect(() => {
    setSelectedAnswer(null)
    setFeedback(null)
    setActiveNotification(null)
  }, [question])

  const handleStartFromMap = () => {
    setReplayStageIndex(null)
    setReplayQuestion(null)
    setViewMode('quiz')
  }

  const handleReplayLocation = (stageIndex: number) => {
    const stage = stages[stageIndex]
    setReplayStageIndex(stageIndex)
    setReplayQuestion(createQuestionForStage(stage))
    setSelectedAnswer(null)
    setFeedback(null)
    setViewMode('quiz')
  }

  const handleExitReplay = () => {
    setReplayStageIndex(null)
    setReplayQuestion(null)
    setSelectedAnswer(null)
    setFeedback(null)
    setViewMode('map')
  }

  const handleDismissNotification = () => {
    const shouldReturnToMap = activeNotification?.shouldReturnToMap ?? false

    setActiveNotification(null)

    if (shouldReturnToMap) {
      onNextQuestion()
      setViewMode('map')
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || hasSubmitted) {
      return
    }

    if (isReplayMode && replayQuestion) {
      const isCorrect = selectedAnswer === replayQuestion.correctAnswer
      setFeedback({
        isCorrect,
        selectedAnswer,
        correctAnswer: replayQuestion.correctAnswer,
        correctAnswerLabel: replayQuestion.correctAnswerLabel,
        pointsAwarded: 0,
        streakBonus: 0,
        stageAdvanced: false,
        newBadgeIds: [],
      })
      return
    }

    const result = onAnswer(selectedAnswer)
    setFeedback(result)
    if (result.stageAdvanced || result.newBadgeIds.length > 0) {
      setActiveNotification({
        title: result.stageAdvanced ? text.stageCompleteTitle : rewardsText.toastTitle,
        message: result.stageAdvanced ? text.stageCompleteMessage : undefined,
        badgeIds: result.newBadgeIds,
        shouldReturnToMap: result.stageAdvanced,
      })
    }
  }

  const answerButtonClassName = (optionValue: string) => {
    let className = 'answer-btn'

    if (!hasSubmitted && selectedAnswer === optionValue) {
      className += ' selected-pending'
    }

    if (hasSubmitted && feedback && feedback.selectedAnswer === optionValue) {
      className += ' selected-final'
    }

    if (hasSubmitted && optionValue === activeQuestion.correctAnswer) {
      className += ' correct'
    }

    if (hasSubmitted && feedback && !feedback.isCorrect && optionValue === feedback.selectedAnswer) {
      className += ' wrong'
    }

    return className
  }

  return (
    <main className="screen game-screen">
      <header className="panel scoreboard">
        <div>
          <p className="metric-label">{text.score}</p>
          <p className="metric-value">{score}</p>
        </div>
        <div>
          <p className="metric-label">{text.streak}</p>
          <p className="metric-value">{currentStreak}</p>
        </div>
        <div>
          <p className="metric-label">{text.longest}</p>
          <p className="metric-value">{longestStreak}</p>
        </div>
        <button type="button" className="small-btn" onClick={onBackToMenu}>
          {text.mainMenu}
        </button>
      </header>

      {viewMode === 'map' ? (
        <AdventureMap
          stages={stages}
          currentStageIndex={currentStageIndex}
          stageProgress={stageProgress}
          onStartCurrentLocation={handleStartFromMap}
          onReplayLocation={handleReplayLocation}
          text={text}
        />
      ) : (
        <section className="panel question-panel" aria-live="polite">
          {isReplayMode && (
            <div className="replay-mode-banner">
              <span>{text.replayModeLabel}</span>
              <button type="button" className="replay-exit-btn" onClick={handleExitReplay}>
                {text.adventureMapTitle} &rarr;
              </button>
            </div>
          )}
          <h2>{activeQuestion.prompt}</h2>

          <div className="answers-grid">
            {activeQuestion.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={answerButtonClassName(option.value)}
                onClick={() => setSelectedAnswer(option.value)}
                disabled={hasSubmitted}
              >
                {option.label === 'TRUE'
                  ? text.trueLabel
                  : option.label === 'FALSE'
                    ? text.falseLabel
                    : option.label}
              </button>
            ))}
          </div>

          <div className="question-actions">
            {!hasSubmitted ? (
              <button
                type="button"
                className="small-btn action-btn"
                disabled={selectedAnswer === null}
                onClick={handleSubmit}
              >
                {text.submitAnswer}
              </button>
            ) : feedback?.stageAdvanced ? (
              <button type="button" className="small-btn action-btn" disabled>
                {text.returningToMap}
              </button>
            ) : isReplayMode ? (
              <button
                type="button"
                className="small-btn action-btn"
                onClick={() => {
                  const stage = stages[replayStageIndex!]
                  setReplayQuestion(createQuestionForStage(stage))
                  setSelectedAnswer(null)
                  setFeedback(null)
                }}
              >
                {text.nextQuestion}
              </button>
            ) : (
              <button type="button" className="small-btn action-btn" onClick={onNextQuestion}>
                {text.nextQuestion}
              </button>
            )}
          </div>

          {feedback && (
            <p className={`feedback ${feedback.isCorrect ? 'ok' : 'bad'}`}>
              {feedback.isCorrect
                ? text.correctFeedback(feedback.pointsAwarded + feedback.streakBonus)
                : text.incorrectFeedback(
                    activeQuestion.correctAnswerLabel === 'TRUE'
                      ? text.trueLabel
                      : activeQuestion.correctAnswerLabel === 'FALSE'
                        ? text.falseLabel
                        : activeQuestion.correctAnswerLabel,
                  )}
            </p>
          )}
        </section>
      )}

      {activeNotification && (
        <NotificationPopup
          isOpen
          title={activeNotification.title}
          message={activeNotification.message}
          dismissLabel={activeNotification.shouldReturnToMap ? text.notificationClose : rewardsText.toastClose}
          onDismiss={handleDismissNotification}
        >
          {activeNotification.badgeIds.length > 0 && (
            <div className="notification-badge-list">
              {activeNotification.badgeIds.map((badgeId) => {
                const badge = Object.values(badgeDefinitions).find((b) => b.id === badgeId)
                if (!badge) return null

                return (
                  <div key={badgeId} className="badge-toast-item">
                    <span className="badge-toast-emoji">{badge.emoji}</span>
                    <span className="badge-toast-name">{badge.name}</span>
                    <span className="badge-toast-description">{badge.description}</span>
                  </div>
                )
              })}
            </div>
          )}
        </NotificationPopup>
      )}
    </main>
  )
}
