import type { StageDefinition, StageProgress } from '../types/game'
import { stageCompletionAccuracy } from './questionService'

interface StageThresholdResult {
  shouldAdvance: boolean
  shouldReset: boolean
}

export function isStageComplete(stage: StageDefinition, progress?: StageProgress): boolean {
  if (!progress) {
    return false
  }

  if (progress.answered < stage.minimumAnswers) {
    return false
  }

  return stageCompletionAccuracy(progress.answered, progress.correct) >= stage.minimumAccuracy
}

export function stageAccuracyPercent(progress?: StageProgress): number {
  if (!progress || progress.answered === 0) {
    return 0
  }

  return Math.round((progress.correct / progress.answered) * 100)
}

export function evaluateStageThreshold(
  stage: StageDefinition,
  progress: StageProgress,
  canAdvanceToNextStage: boolean,
): StageThresholdResult {
  const hasReachedMinimumAnswers = progress.answered >= stage.minimumAnswers
  const meetsAccuracy =
    stageCompletionAccuracy(progress.answered, progress.correct) >= stage.minimumAccuracy

  if (hasReachedMinimumAnswers && meetsAccuracy && canAdvanceToNextStage) {
    return {
      shouldAdvance: true,
      shouldReset: false,
    }
  }

  if (hasReachedMinimumAnswers && !meetsAccuracy) {
    return {
      shouldAdvance: false,
      shouldReset: true,
    }
  }

  return {
    shouldAdvance: false,
    shouldReset: false,
  }
}
