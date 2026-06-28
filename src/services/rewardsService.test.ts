import { describe, it, expect } from 'vitest'
import { determineBadgesToAward } from './rewardsService'
import { STAGES } from '../data/stages'

describe('determineBadgesToAward', () => {
  it('should award stageComplete badge when stage is just completed', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      true, // stageJustCompleted
      'stage-1',
      false,
      0,
    )
    expect(badges).toContain('stageComplete')
  })

  it('should award the stage-specific badge for the completed stage', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      true,
      'stage-3',
      false,
      0,
    )

    expect(badges).toContain('stage3Complete')
  })

  it('should award the final-stage specific badge for stage 15 completion', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      true,
      'stage-15',
      false,
      0,
    )

    expect(badges).toContain('stage15Complete')
  })

  it('should award streak badges for reaching streak milestones', () => {
    const badges5 = determineBadgesToAward([], 5, false, null, false, 0)
    expect(badges5).toContain('streak5')

    const badges15 = determineBadgesToAward([], 15, false, null, false, 0)
    expect(badges15).toContain('streak15')

    const badges25 = determineBadgesToAward([], 25, false, null, false, 0)
    expect(badges25).toContain('streak25')
  })

  it('should award perfectStage badge for 100% accuracy stage completion', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      true, // stageJustCompleted
      'stage-2',
      true, // stageWasPerfect
      1,
    )
    expect(badges).toContain('perfectStage')
  })

  it('should award allStagesComplete badge when all stages are completed', () => {
    const badges = determineBadgesToAward(
      [],
      0,
      false,
      null,
      false,
      STAGES.length,
    )
    expect(badges).toContain('allStagesComplete')
  })

  it('should not re-award badges that are already collected', () => {
    const badges = determineBadgesToAward(
      ['stage-complete'],
      0,
      true,
      'stage-1',
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
      'stage-1',
      true, // stageWasPerfect
      1,
    )
    expect(badges).toContain('stageComplete')
    expect(badges).toContain('streak5')
    expect(badges).toContain('perfectStage')
  })
})
