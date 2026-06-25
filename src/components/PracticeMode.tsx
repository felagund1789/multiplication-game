import { useMemo, useState } from 'react'
import { TABLE_STAGE_ORDER } from '../data/stages'
import { createPracticeQuestion } from '../services/questionService'
import type { Question } from '../types/game'

interface PracticeModeProps {
  onBackToMenu: () => void
}

export function PracticeMode({ onBackToMenu }: PracticeModeProps) {
  const [selectedTables, setSelectedTables] = useState<number[]>([2, 3, 4])
  const [question, setQuestion] = useState<Question>(() => createPracticeQuestion([2, 3, 4]))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<string>('')

  const sortedSelected = useMemo(() => [...selectedTables].sort((a, b) => a - b), [selectedTables])

  const toggleTable = (table: number) => {
    setSelectedTables((previous) => {
      if (previous.includes(table)) {
        const next = previous.filter((item) => item !== table)
        return next.length === 0 ? previous : next
      }

      return [...previous, table]
    })
  }

  const refreshQuestion = (tables: number[]) => {
    setQuestion(createPracticeQuestion(tables))
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setFeedback('')
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) {
      return
    }

    const isCorrect = selectedAnswer === question.correctAnswer

    setFeedback(
      isCorrect
        ? 'Nice! You got it right.'
        : `Keep trying! The correct answer was ${question.correctAnswer}.`,
    )
    setIsSubmitted(true)
  }

  const handleNextQuestion = () => {
    refreshQuestion(selectedTables)
  }

  const answerButtonClassName = (option: number) => {
    let className = 'answer-btn'

    if (!isSubmitted && selectedAnswer === option) {
      className += ' selected-pending'
    }

    if (isSubmitted && selectedAnswer === option) {
      className += ' selected-final'
    }

    if (isSubmitted && option === question.correctAnswer) {
      className += ' correct'
    }

    if (isSubmitted && selectedAnswer === option && option !== question.correctAnswer) {
      className += ' wrong'
    }

    return className
  }

  const handleSelectionDone = () => {
    refreshQuestion(selectedTables)
    setFeedback('Practice does not affect your campaign progress.')
  }

  return (
    <main className="screen practice-screen">
      <header className="panel practice-header">
        <div>
          <p className="eyebrow">Practice Mode</p>
          <h1>Pick Your Tables</h1>
          <p className="subtitle">Selected: {sortedSelected.join(', ')}</p>
        </div>
        <button type="button" className="small-btn" onClick={onBackToMenu}>
          Main Menu
        </button>
      </header>

      <section className="panel table-selector">
        {TABLE_STAGE_ORDER.map((table) => (
          <button
            key={table}
            type="button"
            className={`chip ${selectedTables.includes(table) ? 'on' : ''}`}
            onClick={() => toggleTable(table)}
          >
            {table}
          </button>
        ))}
        <button type="button" className="small-btn" onClick={handleSelectionDone}>
          Apply Selection
        </button>
      </section>

      <section className="panel question-panel" aria-live="polite">
        <h2>{question.prompt}</h2>
        <div className="answers-grid">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              className={answerButtonClassName(option)}
              onClick={() => setSelectedAnswer(option)}
              disabled={isSubmitted}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="question-actions">
          {!isSubmitted ? (
            <button type="button" className="small-btn action-btn" disabled={selectedAnswer === null} onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <button type="button" className="small-btn action-btn" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>

        {feedback && <p className="feedback ok">{feedback}</p>}
      </section>
    </main>
  )
}
