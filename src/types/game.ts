export type QuestionFormat = 'standard' | 'missingLeft' | 'missingRight'

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
  correctAnswer: number
  options: number[]
  format: QuestionFormat
  factors: {
    left: number
    right: number
  }
  product: number
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
}

export interface AnswerFeedback {
  isCorrect: boolean
  selectedAnswer: number
  correctAnswer: number
  pointsAwarded: number
  streakBonus: number
  stageAdvanced: boolean
}
