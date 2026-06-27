import type { Badge, BadgeType } from '../types/game'
import { STAGES } from '../data/stages'
import type { RewardsText } from '../i18n/translations'

const BADGE_BASES: Record<BadgeType, Pick<Badge, 'id' | 'type' | 'emoji'>> = {
  stageComplete: {
    id: 'stage-complete',
    type: 'stageComplete',
    emoji: '⭐',
  },
  stage1Complete: {
    id: 'stage-1-complete-badge',
    type: 'stage1Complete',
    emoji: '🌱',
  },
  stage2Complete: {
    id: 'stage-2-complete-badge',
    type: 'stage2Complete',
    emoji: '🔟',
  },
  stage3Complete: {
    id: 'stage-3-complete-badge',
    type: 'stage3Complete',
    emoji: '✋',
  },
  stage4Complete: {
    id: 'stage-4-complete-badge',
    type: 'stage4Complete',
    emoji: '🌊',
  },
  stage5Complete: {
    id: 'stage-5-complete-badge',
    type: 'stage5Complete',
    emoji: '🌿',
  },
  stage6Complete: {
    id: 'stage-6-complete-badge',
    type: 'stage6Complete',
    emoji: '🏰',
  },
  stage7Complete: {
    id: 'stage-7-complete-badge',
    type: 'stage7Complete',
    emoji: '🪨',
  },
  stage8Complete: {
    id: 'stage-8-complete-badge',
    type: 'stage8Complete',
    emoji: '⚓',
  },
  stage9Complete: {
    id: 'stage-9-complete-badge',
    type: 'stage9Complete',
    emoji: '🏔️',
  },
  stage10Complete: {
    id: 'stage-10-complete-badge',
    type: 'stage10Complete',
    emoji: '🌅',
  },
  stage11Complete: {
    id: 'stage-11-complete-badge',
    type: 'stage11Complete',
    emoji: '🧩',
  },
  stage12Complete: {
    id: 'stage-12-complete-badge',
    type: 'stage12Complete',
    emoji: '🌈',
  },
  stage13Complete: {
    id: 'stage-13-complete-badge',
    type: 'stage13Complete',
    emoji: '🌉',
  },
  stage14Complete: {
    id: 'stage-14-complete-badge',
    type: 'stage14Complete',
    emoji: '🌋',
  },
  stage15Complete: {
    id: 'stage-15-complete-badge',
    type: 'stage15Complete',
    emoji: '🧊',
  },
  stage16Complete: {
    id: 'stage-16-complete-badge',
    type: 'stage16Complete',
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
  'stage-1': 'stage1Complete',
  'stage-2': 'stage2Complete',
  'stage-3': 'stage3Complete',
  'stage-4': 'stage4Complete',
  'stage-5': 'stage5Complete',
  'stage-6': 'stage6Complete',
  'stage-7': 'stage7Complete',
  'stage-8': 'stage8Complete',
  'stage-9': 'stage9Complete',
  'stage-10': 'stage10Complete',
  'stage-11': 'stage11Complete',
  'stage-12': 'stage12Complete',
  'stage-13': 'stage13Complete',
  'stage-14': 'stage14Complete',
  'stage-15': 'stage15Complete',
  'stage-16': 'stage16Complete',
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
    stage1Complete: {
      ...BADGE_BASES.stage1Complete,
      name: rewardsText.badges.stage1Complete.name,
      description: rewardsText.badges.stage1Complete.description,
    },
    stage2Complete: {
      ...BADGE_BASES.stage2Complete,
      name: rewardsText.badges.stage2Complete.name,
      description: rewardsText.badges.stage2Complete.description,
    },
    stage3Complete: {
      ...BADGE_BASES.stage3Complete,
      name: rewardsText.badges.stage3Complete.name,
      description: rewardsText.badges.stage3Complete.description,
    },
    stage4Complete: {
      ...BADGE_BASES.stage4Complete,
      name: rewardsText.badges.stage4Complete.name,
      description: rewardsText.badges.stage4Complete.description,
    },
    stage5Complete: {
      ...BADGE_BASES.stage5Complete,
      name: rewardsText.badges.stage5Complete.name,
      description: rewardsText.badges.stage5Complete.description,
    },
    stage6Complete: {
      ...BADGE_BASES.stage6Complete,
      name: rewardsText.badges.stage6Complete.name,
      description: rewardsText.badges.stage6Complete.description,
    },
    stage7Complete: {
      ...BADGE_BASES.stage7Complete,
      name: rewardsText.badges.stage7Complete.name,
      description: rewardsText.badges.stage7Complete.description,
    },
    stage8Complete: {
      ...BADGE_BASES.stage8Complete,
      name: rewardsText.badges.stage8Complete.name,
      description: rewardsText.badges.stage8Complete.description,
    },
    stage9Complete: {
      ...BADGE_BASES.stage9Complete,
      name: rewardsText.badges.stage9Complete.name,
      description: rewardsText.badges.stage9Complete.description,
    },
    stage10Complete: {
      ...BADGE_BASES.stage10Complete,
      name: rewardsText.badges.stage10Complete.name,
      description: rewardsText.badges.stage10Complete.description,
    },
    stage11Complete: {
      ...BADGE_BASES.stage11Complete,
      name: rewardsText.badges.stage11Complete.name,
      description: rewardsText.badges.stage11Complete.description,
    },
    stage12Complete: {
      ...BADGE_BASES.stage12Complete,
      name: rewardsText.badges.stage12Complete.name,
      description: rewardsText.badges.stage12Complete.description,
    },
    stage13Complete: {
      ...BADGE_BASES.stage13Complete,
      name: rewardsText.badges.stage13Complete.name,
      description: rewardsText.badges.stage13Complete.description,
    },
    stage14Complete: {
      ...BADGE_BASES.stage14Complete,
      name: rewardsText.badges.stage14Complete.name,
      description: rewardsText.badges.stage14Complete.description,
    },
    stage15Complete: {
      ...BADGE_BASES.stage15Complete,
      name: rewardsText.badges.stage15Complete.name,
      description: rewardsText.badges.stage15Complete.description,
    },
    stage16Complete: {
      ...BADGE_BASES.stage16Complete,
      name: rewardsText.badges.stage16Complete.name,
      description: rewardsText.badges.stage16Complete.description,
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
