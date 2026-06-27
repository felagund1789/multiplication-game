export type QuestionFormat =
  | 'standard'
  | 'missingLeft'
  | 'missingRight'
  | 'whichEquals'
  | 'trueFalse'

export type StageKind = 'table' | 'missingLeft' | 'missingRight' | 'mixed'

export interface StageDefinition {
  id: string
  title: string
  description: string
  kind: StageKind
  tables: number[]
  allowedFormats: QuestionFormat[]
  minimumAnswers: number
  minimumAccuracy: number
}

export interface Question {
  prompt: string
  correctAnswer: string
  correctAnswerLabel: string
  options: QuestionOption[]
  format: QuestionFormat
  factors: {
    left: number
    right: number
  }
  product: number
}

export interface QuestionOption {
  value: string
  label: string
}

export interface StageProgress {
  answered: number
  correct: number
}

export interface GameProgress {
  currentStageIndex: number
  score: number
  currentStreak: number
  longestStreak: number
  stageProgress: Record<string, StageProgress>
  collectedBadges: string[]
}

export type BadgeType = 
  | 'streak5'
  | 'streak15'
  | 'streak25'
  | 'stageComplete'
  | 'perfectStage'
  | 'stage1Complete'
  | 'stage2Complete'
  | 'stage3Complete'
  | 'stage4Complete'
  | 'stage5Complete'
  | 'stage6Complete'
  | 'stage7Complete'
  | 'stage8Complete'
  | 'stage9Complete'
  | 'stage10Complete'
  | 'stage11Complete'
  | 'stage12Complete'
  | 'stage13Complete'
  | 'stage14Complete'
  | 'stage15Complete'
  | 'allStagesComplete'

export interface Badge {
  id: string
  type: BadgeType
  emoji: string
  name: string
  description: string
  unlockedAt?: number
}

export interface AnswerFeedback {
  isCorrect: boolean
  selectedAnswer: string
  correctAnswer: string
  correctAnswerLabel: string
  pointsAwarded: number
  streakBonus: number
  stageAdvanced: boolean
  newBadgeIds: string[]
}
