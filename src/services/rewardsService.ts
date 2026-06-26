import type { Badge, BadgeType } from '../types/game'
import { STAGES } from '../data/stages'

// Badge definitions with emojis and descriptions
export const BADGE_DEFINITIONS: Record<BadgeType, Badge> = {
  stageComplete: {
    id: 'stage-complete',
    type: 'stageComplete',
    emoji: '⭐',
    name: 'Stage Master',
    description: 'Complete any stage.',
  },
  streak3: {
    id: 'streak-3',
    type: 'streak3',
    emoji: '🔥',
    name: 'Hot Streak',
    description: 'Reach a 3-question streak.',
  },
  streak5: {
    id: 'streak-5',
    type: 'streak5',
    emoji: '🌟',
    name: 'Burning Hot',
    description: 'Reach a 5-question streak.',
  },
  streak10: {
    id: 'streak-10',
    type: 'streak10',
    emoji: '💥',
    name: 'Unstoppable',
    description: 'Reach a 10-question streak.',
  },
  perfectStage: {
    id: 'perfect-stage',
    type: 'perfectStage',
    emoji: '💯',
    name: 'Flawless',
    description: 'Complete a stage with 100% accuracy.',
  },
  allStagesComplete: {
    id: 'all-stages',
    type: 'allStagesComplete',
    emoji: '👑',
    name: 'Champion',
    description: 'Complete all stages.',
  },
}

export function determineBadgesToAward(
  collectedBadges: string[],
  currentStreak: number,
  longestStreak: number,
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
