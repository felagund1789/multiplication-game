import { describe, expect, it } from 'vitest'
import { STAGES } from '../data/stages'
import { createPracticeQuestion, createQuestionForStage, stagePoints } from './questionService'
import type { QuestionFormat } from '../types/game'

function isUnique(values: string[]): boolean {
  return new Set(values).size === values.length
}

describe('questionService', () => {
  it('creates valid options with one correct answer for mixed stage formats', () => {
    const stage = STAGES[0]

    for (let i = 0; i < 20; i += 1) {
      const question = createQuestionForStage(stage)

      expect(stage.allowedFormats).toContain(question.format)
      expect(stage.tables).toContain(question.factors.left)
      expect(question.factors.right).toBeGreaterThanOrEqual(1)
      expect(question.factors.right).toBeLessThanOrEqual(10)
      expect(question.options).toHaveLength(question.format === 'trueFalse' ? 2 : 3)

      const optionValues = question.options.map((option) => option.value)
      expect(isUnique(optionValues)).toBe(true)
      expect(optionValues).toContain(question.correctAnswer)
    }
  })

  it('creates which-equals questions with multiplication-expression options', () => {
    const stage = {
      ...STAGES[0],
      allowedFormats: ['whichEquals'] as QuestionFormat[],
    }

    for (let i = 0; i < 20; i += 1) {
      const question = createQuestionForStage(stage)

      expect(question.format).toBe('whichEquals')
      expect(question.prompt).toContain('=')
      expect(question.options).toHaveLength(3)
      expect(question.options.every((option) => option.label.includes('×'))).toBe(true)
      expect(question.options.map((option) => option.value)).toContain(question.correctAnswer)
    }
  })

  it('creates true-false questions with boolean options', () => {
    const stage = {
      ...STAGES[0],
      allowedFormats: ['trueFalse'] as QuestionFormat[],
    }

    for (let i = 0; i < 20; i += 1) {
      const question = createQuestionForStage(stage)

      expect(question.format).toBe('trueFalse')
      expect(question.options).toHaveLength(2)
      expect(question.options.map((option) => option.value)).toEqual(['true', 'false'])
      expect(['true', 'false']).toContain(question.correctAnswer)
    }
  })

  it('creates practice questions from selected tables only', () => {
    const selectedTables = [3, 9]

    for (let i = 0; i < 20; i += 1) {
      const question = createPracticeQuestion(selectedTables)

      expect(question.format).toBe('standard')
      expect(selectedTables).toContain(question.factors.left)
      expect(question.factors.right).toBeGreaterThanOrEqual(1)
      expect(question.factors.right).toBeLessThanOrEqual(10)
      expect(question.options).toHaveLength(3)
    }
  })

  it('awards more points for harder stages and formats', () => {
    const earlyStandard = stagePoints(0, 'standard')
    const lateStandard = stagePoints(8, 'standard')
    const missingFormat = stagePoints(4, 'missingLeft')
    const whichEqualsFormat = stagePoints(4, 'whichEquals')

    expect(lateStandard).toBeGreaterThan(earlyStandard)
    expect(missingFormat).toBeGreaterThan(stagePoints(4, 'standard'))
    expect(whichEqualsFormat).toBeGreaterThan(stagePoints(4, 'standard'))
  })
})
