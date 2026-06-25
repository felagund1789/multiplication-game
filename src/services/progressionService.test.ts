import { describe, expect, it } from 'vitest'
import { evaluateStageThreshold, isStageComplete, stageAccuracyPercent } from './progressionService'
import type { StageDefinition, StageProgress } from '../types/game'

const stage: StageDefinition = {
  id: 'test-stage',
  title: 'Test Stage',
  description: 'Threshold checks',
  kind: 'table',
  tables: [2, 4, 8],
  allowedFormats: ['standard'],
  minimumAnswers: 10,
  minimumAccuracy: 0.8,
}

describe('progressionService', () => {
  it('marks a stage complete only at required question count and accuracy', () => {
    const notEnoughAnswers: StageProgress = { answered: 9, correct: 9 }
    const belowAccuracy: StageProgress = { answered: 10, correct: 7 }
    const meetsThreshold: StageProgress = { answered: 10, correct: 8 }

    expect(isStageComplete(stage, notEnoughAnswers)).toBe(false)
    expect(isStageComplete(stage, belowAccuracy)).toBe(false)
    expect(isStageComplete(stage, meetsThreshold)).toBe(true)
  })

  it('returns rounded accuracy percentages', () => {
    expect(stageAccuracyPercent()).toBe(0)
    expect(stageAccuracyPercent({ answered: 0, correct: 0 })).toBe(0)
    expect(stageAccuracyPercent({ answered: 10, correct: 8 })).toBe(80)
    expect(stageAccuracyPercent({ answered: 3, correct: 2 })).toBe(67)
  })

  it('advances when threshold is met and next stage exists', () => {
    const result = evaluateStageThreshold(stage, { answered: 10, correct: 8 }, true)

    expect(result).toEqual({ shouldAdvance: true, shouldReset: false })
  })

  it('resets stage when minimum answers reached without required accuracy', () => {
    const result = evaluateStageThreshold(stage, { answered: 10, correct: 7 }, true)

    expect(result).toEqual({ shouldAdvance: false, shouldReset: true })
  })

  it('does not advance on final stage even if threshold is met', () => {
    const result = evaluateStageThreshold(stage, { answered: 10, correct: 9 }, false)

    expect(result).toEqual({ shouldAdvance: false, shouldReset: false })
  })
})
