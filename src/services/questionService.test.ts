import { describe, expect, it } from 'vitest'
import { STAGES } from '../data/stages'
import { createPracticeQuestion, createQuestionForStage, stagePoints } from './questionService'

function isUnique(values: number[]): boolean {
  return new Set(values).size === values.length
}

describe('questionService', () => {
  it('creates valid options with one correct answer for standard stages', () => {
    const stage = STAGES[0]

    for (let i = 0; i < 20; i += 1) {
      const question = createQuestionForStage(stage)

      expect(question.format).toBe('standard')
      expect(stage.tables).toContain(question.factors.left)
      expect(question.factors.right).toBeGreaterThanOrEqual(1)
      expect(question.factors.right).toBeLessThanOrEqual(10)
      expect(question.options).toHaveLength(3)
      expect(isUnique(question.options)).toBe(true)
      expect(question.options).toContain(question.correctAnswer)
      expect(question.correctAnswer).toBe(question.factors.left * question.factors.right)
    }
  })

  it('uses missing-number formats for missing-format stages', () => {
    const stage = STAGES[4]

    for (let i = 0; i < 30; i += 1) {
      const question = createQuestionForStage(stage)

      expect(['missingLeft', 'missingRight']).toContain(question.format)
      expect(stage.tables).toContain(question.factors.left)
      expect(question.options).toHaveLength(3)
      expect(isUnique(question.options)).toBe(true)
      expect(question.options).toContain(question.correctAnswer)
      expect(question.correctAnswer).toBeGreaterThan(0)
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
    }
  })

  it('awards more points for harder stages and formats', () => {
    const earlyStandard = stagePoints(0, 'standard')
    const lateStandard = stagePoints(8, 'standard')
    const missingFormat = stagePoints(4, 'missingLeft')

    expect(lateStandard).toBeGreaterThan(earlyStandard)
    expect(missingFormat).toBeGreaterThan(stagePoints(4, 'standard'))
  })
})
