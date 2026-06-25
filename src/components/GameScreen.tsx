import { useEffect, useState } from 'react'
import type { AnswerFeedback, Question } from '../types/game'

interface GameScreenProps {
  question: Question
  score: number
  currentStreak: number
  longestStreak: number
  onAnswer: (answer: number) => AnswerFeedback
  onNextQuestion: () => void
  onBackToMenu: () => void
}

export function GameScreen({
  question,
  score,
  currentStreak,
  longestStreak,
  onAnswer,
  onNextQuestion,
  onBackToMenu,
}: GameScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
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

  const answerButtonClassName = (option: number) => {
    let className = 'answer-btn'

    if (!hasSubmitted && selectedAnswer === option) {
      className += ' selected-pending'
    }

    if (hasSubmitted && feedback && feedback.selectedAnswer === option) {
      className += ' selected-final'
    }

    if (hasSubmitted && option === question.correctAnswer) {
      className += ' correct'
    }

    if (hasSubmitted && feedback && !feedback.isCorrect && option === feedback.selectedAnswer) {
      className += ' wrong'
    }

    return className
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
        <h2>{question.prompt}</h2>

        <div className="answers-grid">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              className={answerButtonClassName(option)}
              onClick={() => setSelectedAnswer(option)}
              disabled={hasSubmitted}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="question-actions">
          {!hasSubmitted ? (
            <button type="button" className="small-btn action-btn" disabled={selectedAnswer === null} onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <button type="button" className="small-btn action-btn" onClick={onNextQuestion}>
              Next Question
            </button>
          )}
        </div>

        {feedback && (
          <p className={`feedback ${feedback.isCorrect ? 'ok' : 'bad'}`}>
            {feedback.isCorrect
              ? `Great job! +${feedback.pointsAwarded + feedback.streakBonus} points`
              : `Not this time. Correct answer: ${feedback.correctAnswer}`}
          </p>
        )}
      </section>

    </main>
  )
}
