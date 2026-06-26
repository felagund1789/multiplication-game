import { useEffect, useState } from 'react'
import type { GameText } from '../i18n/translations'
import type { AnswerFeedback, Question } from '../types/game'

interface GameScreenProps {
  question: Question
  score: number
  currentStreak: number
  longestStreak: number
  text: GameText
  onAnswer: (answer: string) => AnswerFeedback
  onNextQuestion: () => void
  onBackToMenu: () => void
}

export function GameScreen({
  question,
  score,
  currentStreak,
  longestStreak,
  text,
  onAnswer,
  onNextQuestion,
  onBackToMenu,
}: GameScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null)
  const hasSubmitted = feedback !== null

  useEffect(() => {
    setSelectedAnswer(null)
    setFeedback(null)
  }, [question])

  const handleSubmit = () => {
    if (selectedAnswer === null || hasSubmitted) {
      return
    }

    const result = onAnswer(selectedAnswer)
    setFeedback(result)
  }

  const answerButtonClassName = (optionValue: string) => {
    let className = 'answer-btn'

    if (!hasSubmitted && selectedAnswer === optionValue) {
      className += ' selected-pending'
    }

    if (hasSubmitted && feedback && feedback.selectedAnswer === optionValue) {
      className += ' selected-final'
    }

    if (hasSubmitted && optionValue === question.correctAnswer) {
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

      <section className="panel question-panel" aria-live="polite">
        <h2>{question.prompt}</h2>

        <div className="answers-grid">
          {question.options.map((option) => (
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
            <button type="button" className="small-btn action-btn" disabled={selectedAnswer === null} onClick={handleSubmit}>
              {text.submitAnswer}
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
                  feedback.correctAnswerLabel === 'TRUE'
                    ? text.trueLabel
                    : feedback.correctAnswerLabel === 'FALSE'
                      ? text.falseLabel
                      : feedback.correctAnswerLabel,
                )}
          </p>
        )}
      </section>

    </main>
  )
}
