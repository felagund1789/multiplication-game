import { describe, it, expect } from 'vitest'
import { determineBadgesToAward } from './rewardsService'

describe('determineBadgesToAward', () => {
  it('should award stageComplete badge when stage is just completed', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      true, // stageJustCompleted
      false,
      0,
    )
    expect(badges).toContain('stageComplete')
  })

  it('should award streak badges for reaching streak milestones', () => {
    const badges3 = determineBadgesToAward([], 3, false, false, 0)
    expect(badges3).toContain('streak3')

    const badges5 = determineBadgesToAward([], 5, false, false, 0)
    expect(badges5).toContain('streak5')

    const badges10 = determineBadgesToAward([], 10, false, false, 0)
    expect(badges10).toContain('streak10')
  })

  it('should award perfectStage badge for 100% accuracy stage completion', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      true, // stageJustCompleted
      true, // stageWasPerfect
      1,
    )
    expect(badges).toContain('perfectStage')
  })

  it('should award allStagesComplete badge when all 9 stages are completed', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      false,
      false,
      9, // totalStagesCompleted = STAGES.length
    )
    expect(badges).toContain('allStagesComplete')
  })

  it('should not re-award badges that are already collected', () => {
    const badges = determineBadgesToAward(
      ['stage-complete'],
      0,
      true,
      false,
      1,
    )
    expect(badges).not.toContain('stageComplete')
  })

  it('should award multiple badges in a single answer', () => {
    const badges = determineBadgesToAward(
      [],
      5, // reaches streak5
      true, // stageJustCompleted
      true, // stageWasPerfect
      1,
    )
    expect(badges).toContain('stageComplete')
    expect(badges).toContain('streak5')
    expect(badges).toContain('perfectStage')
  })
})
