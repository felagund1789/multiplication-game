import { useState } from 'react'
import { ProgressPath } from './ProgressPath'
import type { AnswerFeedback, Question, StageDefinition } from '../types/game'

interface GameScreenProps {
  stages: StageDefinition[]
  currentStageIndex: number
  question: Question
  score: number
  currentStreak: number
  longestStreak: number
  onAnswer: (answer: number) => AnswerFeedback
  onBackToMenu: () => void
}

export function GameScreen({
  stages,
  currentStageIndex,
  question,
  score,
  currentStreak,
  longestStreak,
  onAnswer,
  onBackToMenu,
}: GameScreenProps) {
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null)

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
        <h2>{question.prompt}</h2>

        <div className="answers-grid">
          {question.options.map((option) => (
            <button key={option} type="button" className="answer-btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>

        {feedback && (
          <p className={`feedback ${feedback.isCorrect ? 'ok' : 'bad'}`}>
            {feedback.isCorrect
              ? `Great job! +${feedback.pointsAwarded + feedback.streakBonus} points`
              : `Not this time. Correct answer: ${feedback.correctAnswer}`}
          </p>
        )}
      </section>

      <ProgressPath stages={stages} currentStageIndex={currentStageIndex} />
    </main>
  )
}
