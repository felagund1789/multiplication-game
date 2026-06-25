import type { StageDefinition, StageProgress } from '../types/game'
import { stageCompletionAccuracy } from './questionService'

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
