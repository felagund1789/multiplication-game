import type { Badge, BadgeType } from '../types/game'
import { STAGES } from '../data/stages'
import type { RewardsText } from '../i18n/translations'

const BADGE_BASES: Record<BadgeType, Pick<Badge, 'id' | 'type' | 'emoji'>> = {
  stageComplete: {
    id: 'stage-complete',
    type: 'stageComplete',
    emoji: '⭐',
  },
  streak3: {
    id: 'streak-3',
    type: 'streak3',
    emoji: '🔥',
  },
  streak5: {
    id: 'streak-5',
    type: 'streak5',
    emoji: '🌟',
  },
  streak10: {
    id: 'streak-10',
    type: 'streak10',
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

export function buildBadgeDefinitions(rewardsText: RewardsText): Record<BadgeType, Badge> {
  return {
    stageComplete: {
      ...BADGE_BASES.stageComplete,
      name: rewardsText.badges.stageComplete.name,
      description: rewardsText.badges.stageComplete.description,
    },
    streak3: {
      ...BADGE_BASES.streak3,
      name: rewardsText.badges.streak3.name,
      description: rewardsText.badges.streak3.description,
    },
    streak5: {
      ...BADGE_BASES.streak5,
      name: rewardsText.badges.streak5.name,
      description: rewardsText.badges.streak5.description,
    },
    streak10: {
      ...BADGE_BASES.streak10,
      name: rewardsText.badges.streak10.name,
      description: rewardsText.badges.streak10.description,
    },
    perfectStage: {
      ...BADGE_BASES.perfectStage,
      name: rewardsText.badges.perfectStage.name,
      description: rewardsText.badges.perfectStage.description,
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
  stageWasPerfect: boolean,
  totalStagesCompleted: number,
): BadgeType[] {
  const newBadges: BadgeType[] = []

  if (stageJustCompleted && !collectedBadges.includes('stage-complete')) {
    newBadges.push('stageComplete')
  }

  if (currentStreak >= 3 && !collectedBadges.includes('streak-3')) {
    newBadges.push('streak3')
  }

  if (currentStreak >= 5 && !collectedBadges.includes('streak-5')) {
    newBadges.push('streak5')
  }

  if (currentStreak >= 10 && !collectedBadges.includes('streak-10')) {
    newBadges.push('streak10')
  }

  if (stageJustCompleted && stageWasPerfect && !collectedBadges.includes('perfect-stage')) {
    newBadges.push('perfectStage')
  }

  if (totalStagesCompleted === STAGES.length && !collectedBadges.includes('all-stages')) {
    newBadges.push('allStagesComplete')
  }

  return newBadges
}
