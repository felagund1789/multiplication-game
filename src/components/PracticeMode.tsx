import { useMemo, useState } from 'react'
import { TABLE_STAGE_ORDER } from '../data/stages'
import type { PracticeText } from '../i18n/translations'
import { createPracticeQuestion } from '../services/questionService'
import type { Question } from '../types/game'

interface PracticeModeProps {
  text: PracticeText
  onBackToMenu: () => void
}

export function PracticeMode({ text, onBackToMenu }: PracticeModeProps) {
  const [selectedTables, setSelectedTables] = useState<number[]>([10])
  const [question, setQuestion] = useState<Question>(() => createPracticeQuestion([10]))
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
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
        ? text.correctFeedback
        : text.incorrectFeedback(question.correctAnswerLabel),
    )
    setIsSubmitted(true)
  }

  const handleNextQuestion = () => {
    refreshQuestion(selectedTables)
  }

  const answerButtonClassName = (optionValue: string) => {
    let className = 'nes-btn is-primary answer-btn'

    if (!isSubmitted && selectedAnswer === optionValue) {
      className += ' selected-pending'
    }

    if (isSubmitted && selectedAnswer === optionValue) {
      className += ' selected-final'
    }

    if (isSubmitted && optionValue === question.correctAnswer) {
      className += ' correct'
    }

    if (isSubmitted && selectedAnswer === optionValue && optionValue !== question.correctAnswer) {
      className += ' wrong'
    }

    return className
  }

  const handleSelectionDone = () => {
    refreshQuestion(selectedTables)
    setFeedback(text.campaignHint)
  }

  return (
    <main className="screen practice-screen">
      <header className="panel practice-header nes-container">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p className="subtitle">{text.selectedLabel}: {sortedSelected.join(', ')}</p>
        </div>
        <button type="button" className="nes-btn is-warning" onClick={onBackToMenu}>
          {text.mainMenu}
        </button>
      </header>

      <section className="panel table-selector nes-container">
        {TABLE_STAGE_ORDER.map((table) => (
          <button
            key={table}
            type="button"
            className={`nes-btn chip ${selectedTables.includes(table) ? 'is-success' : ''}`}
            onClick={() => toggleTable(table)}
          >
            {table}
          </button>
        ))}
        <button type="button" className="nes-btn is-primary" onClick={handleSelectionDone}>
          {text.applySelection}
        </button>
      </section>

      <section className="panel question-panel nes-container" aria-live="polite">
        <h2>{question.prompt}</h2>
        <div className="answers-grid">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={answerButtonClassName(option.value)}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={isSubmitted}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="question-actions">
          {!isSubmitted ? (
            <button type="button" className="nes-btn is-primary action-btn" disabled={selectedAnswer === null} onClick={handleSubmit}>
              {text.submitAnswer}
            </button>
          ) : (
            <button type="button" className="nes-btn is-success action-btn" onClick={handleNextQuestion}>
              {text.nextQuestion}
            </button>
          )}
        </div>

        {feedback && <p className="feedback ok">{feedback}</p>}
      </section>
    </main>
  )
}
