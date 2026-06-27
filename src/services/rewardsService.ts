import type { Badge, BadgeType } from '../types/game'
import { STAGES } from '../data/stages'
import type { RewardsText } from '../i18n/translations'

const BADGE_BASES: Record<BadgeType, Pick<Badge, 'id' | 'type' | 'emoji'>> = {
  stageComplete: {
    id: 'stage-complete',
    type: 'stageComplete',
    emoji: '⭐',
  },
  stage1WhisperingForest: {
    id: 'stage-1-forest-badge',
    type: 'stage1WhisperingForest',
    emoji: '🌱',
  },
  stage2TwinPeaksCamp: {
    id: 'stage-2-peaks-badge',
    type: 'stage2TwinPeaksCamp',
    emoji: '🔟',
  },
  stage3RiverOfSparks: {
    id: 'stage-3-river-badge',
    type: 'stage3RiverOfSparks',
    emoji: '✋',
  },
  stage4SunsetDunes: {
    id: 'stage-4-dunes-badge',
    type: 'stage4SunsetDunes',
    emoji: '🌊',
  },
  stage5PuzzleGate: {
    id: 'stage-5-puzzle-badge',
    type: 'stage5PuzzleGate',
    emoji: '🪨',
  },
  stage6CrystalBridge: {
    id: 'stage-6-crystal-badge',
    type: 'stage6CrystalBridge',
    emoji: '🌿',
  },
  stage7VolcanoTrials: {
    id: 'stage-7-volcano-badge',
    type: 'stage7VolcanoTrials',
    emoji: '⚓',
  },
  stage8FrozenRidge: {
    id: 'stage-8-frozen-badge',
    type: 'stage8FrozenRidge',
    emoji: '🏔️',
  },
  stage9CrownCitadel: {
    id: 'stage-9-crown-badge',
    type: 'stage9CrownCitadel',
    emoji: '🏰',
  },
  stage10NinthHorizon: {
    id: 'stage-10-horizon-badge',
    type: 'stage10NinthHorizon',
    emoji: '🌅',
  },
  stage11PuzzleGate: {
    id: 'stage-11-puzzle-badge',
    type: 'stage11PuzzleGate',
    emoji: '🧩',
  },
  stage12CrystalBridge: {
    id: 'stage-12-crystal-badge',
    type: 'stage12CrystalBridge',
    emoji: '🌉',
  },
  stage13VolcanoTrials: {
    id: 'stage-13-volcano-badge',
    type: 'stage13VolcanoTrials',
    emoji: '🌋',
  },
  stage14FrozenRidge: {
    id: 'stage-14-frozen-badge',
    type: 'stage14FrozenRidge',
    emoji: '🧊',
  },
  stage15CrownCitadel: {
    id: 'stage-15-crown-badge',
    type: 'stage15CrownCitadel',
    emoji: '👑',
  },
  streak5: {
    id: 'streak-5',
    type: 'streak5',
    emoji: '🔥',
  },
  streak15: {
    id: 'streak-15',
    type: 'streak15',
    emoji: '🌟',
  },
  streak25: {
    id: 'streak-25',
    type: 'streak25',
    emoji: '💥',
  },
  perfectStage: {
    id: 'perfect-stage',
    type: 'perfectStage',
    emoji: '💯',
  },
  allStagesComplete: {
    id: 'all-stages',
    type: 'allStagesComplete',
    emoji: '👑',
  },
}

const STAGE_COMPLETION_BADGE_BY_STAGE_ID: Record<string, BadgeType> = {
  'stage-1-table': 'stage1WhisperingForest',
  'stage-2-table': 'stage2TwinPeaksCamp',
  'stage-3-table': 'stage3RiverOfSparks',
  'stage-4-table': 'stage4SunsetDunes',
  'stage-5-table': 'stage5PuzzleGate',
  'stage-6-table': 'stage6CrystalBridge',
  'stage-7-table': 'stage7VolcanoTrials',
  'stage-8-table': 'stage8FrozenRidge',
  'stage-9-table': 'stage9CrownCitadel',
  'stage-10-table': 'stage10NinthHorizon',
  'stage-11-mixed-foundations': 'stage11PuzzleGate',
  'stage-12-mixed-builders': 'stage12CrystalBridge',
  'stage-13-mixed-duos': 'stage13VolcanoTrials',
  'stage-14-mixed-masters': 'stage14FrozenRidge',
  'stage-15-grand-final': 'stage15CrownCitadel',
}

export function badgeTypeToId(type: BadgeType): string {
  return BADGE_BASES[type].id
}

export function buildBadgeDefinitions(rewardsText: RewardsText): Record<BadgeType, Badge> {
  return {
    streak5: {
      ...BADGE_BASES.streak5,
      name: rewardsText.badges.streak5.name,
      description: rewardsText.badges.streak5.description,
    },
    streak15: {
      ...BADGE_BASES.streak15,
      name: rewardsText.badges.streak15.name,
      description: rewardsText.badges.streak15.description,
    },
    streak25: {
      ...BADGE_BASES.streak25,
      name: rewardsText.badges.streak25.name,
      description: rewardsText.badges.streak25.description,
    },
    stageComplete: {
      ...BADGE_BASES.stageComplete,
      name: rewardsText.badges.stageComplete.name,
      description: rewardsText.badges.stageComplete.description,
    },
    perfectStage: {
      ...BADGE_BASES.perfectStage,
      name: rewardsText.badges.perfectStage.name,
      description: rewardsText.badges.perfectStage.description,
    },
    stage1WhisperingForest: {
      ...BADGE_BASES.stage1WhisperingForest,
      name: rewardsText.badges.stage1WhisperingForest.name,
      description: rewardsText.badges.stage1WhisperingForest.description,
    },
    stage2TwinPeaksCamp: {
      ...BADGE_BASES.stage2TwinPeaksCamp,
      name: rewardsText.badges.stage2TwinPeaksCamp.name,
      description: rewardsText.badges.stage2TwinPeaksCamp.description,
    },
    stage3RiverOfSparks: {
      ...BADGE_BASES.stage3RiverOfSparks,
      name: rewardsText.badges.stage3RiverOfSparks.name,
      description: rewardsText.badges.stage3RiverOfSparks.description,
    },
    stage4SunsetDunes: {
      ...BADGE_BASES.stage4SunsetDunes,
      name: rewardsText.badges.stage4SunsetDunes.name,
      description: rewardsText.badges.stage4SunsetDunes.description,
    },
    stage5PuzzleGate: {
      ...BADGE_BASES.stage5PuzzleGate,
      name: rewardsText.badges.stage5PuzzleGate.name,
      description: rewardsText.badges.stage5PuzzleGate.description,
    },
    stage6CrystalBridge: {
      ...BADGE_BASES.stage6CrystalBridge,
      name: rewardsText.badges.stage6CrystalBridge.name,
      description: rewardsText.badges.stage6CrystalBridge.description,
    },
    stage7VolcanoTrials: {
      ...BADGE_BASES.stage7VolcanoTrials,
      name: rewardsText.badges.stage7VolcanoTrials.name,
      description: rewardsText.badges.stage7VolcanoTrials.description,
    },
    stage8FrozenRidge: {
      ...BADGE_BASES.stage8FrozenRidge,
      name: rewardsText.badges.stage8FrozenRidge.name,
      description: rewardsText.badges.stage8FrozenRidge.description,
    },
    stage9CrownCitadel: {
      ...BADGE_BASES.stage9CrownCitadel,
      name: rewardsText.badges.stage9CrownCitadel.name,
      description: rewardsText.badges.stage9CrownCitadel.description,
    },
    stage10NinthHorizon: {
      ...BADGE_BASES.stage10NinthHorizon,
      name: rewardsText.badges.stage10NinthHorizon.name,
      description: rewardsText.badges.stage10NinthHorizon.description,
    },
    stage11PuzzleGate: {
      ...BADGE_BASES.stage11PuzzleGate,
      name: rewardsText.badges.stage11PuzzleGate.name,
      description: rewardsText.badges.stage11PuzzleGate.description,
    },
    stage12CrystalBridge: {
      ...BADGE_BASES.stage12CrystalBridge,
      name: rewardsText.badges.stage12CrystalBridge.name,
      description: rewardsText.badges.stage12CrystalBridge.description,
    },
    stage13VolcanoTrials: {
      ...BADGE_BASES.stage13VolcanoTrials,
      name: rewardsText.badges.stage13VolcanoTrials.name,
      description: rewardsText.badges.stage13VolcanoTrials.description,
    },
    stage14FrozenRidge: {
      ...BADGE_BASES.stage14FrozenRidge,
      name: rewardsText.badges.stage14FrozenRidge.name,
      description: rewardsText.badges.stage14FrozenRidge.description,
    },
    stage15CrownCitadel: {
      ...BADGE_BASES.stage15CrownCitadel,
      name: rewardsText.badges.stage15CrownCitadel.name,
      description: rewardsText.badges.stage15CrownCitadel.description,
    },
    allStagesComplete: {
      ...BADGE_BASES.allStagesComplete,
      name: rewardsText.badges.allStagesComplete.name,
      description: rewardsText.badges.allStagesComplete.description,
    },
  }
}

export function determineBadgesToAward(
  collectedBadges: string[],
  currentStreak: number,
  stageJustCompleted: boolean,
  completedStageId: string | null,
  stageWasPerfect: boolean,
  totalStagesCompleted: number,
): BadgeType[] {
  const newBadges: BadgeType[] = []

  if (stageJustCompleted && !collectedBadges.includes(badgeTypeToId('stageComplete'))) {
    newBadges.push('stageComplete')
  }

  if (stageJustCompleted && completedStageId) {
    const stageBadgeType = STAGE_COMPLETION_BADGE_BY_STAGE_ID[completedStageId]

    if (stageBadgeType && !collectedBadges.includes(badgeTypeToId(stageBadgeType))) {
      newBadges.push(stageBadgeType)
    }
  }

  if (currentStreak >= 5 && !collectedBadges.includes(badgeTypeToId('streak5'))) {
    newBadges.push('streak5')
  }

  if (currentStreak >= 15 && !collectedBadges.includes(badgeTypeToId('streak15'))) {
    newBadges.push('streak15')
  }

  if (currentStreak >= 25 && !collectedBadges.includes(badgeTypeToId('streak25'))) {
    newBadges.push('streak25')
  }

  if (stageJustCompleted && stageWasPerfect && !collectedBadges.includes(badgeTypeToId('perfectStage'))) {
    newBadges.push('perfectStage')
  }

  if (totalStagesCompleted === STAGES.length && !collectedBadges.includes(badgeTypeToId('allStagesComplete'))) {
    newBadges.push('allStagesComplete')
  }

  return newBadges
}
