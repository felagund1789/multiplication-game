import type { StageDefinition, Question, QuestionFormat } from '../types/game'
import { TABLE_STAGE_ORDER } from '../data/stages'

const PRACTICE_MULTIPLIER_MAX = 10

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandom<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)]
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i)
    const temp = copy[i]
    copy[i] = copy[j]
    copy[j] = temp
  }

  return copy
}

function reverseNumber(value: number): number {
  const reversed = Number(value.toString().split('').reverse().join(''))
  return Number.isNaN(reversed) ? value : reversed
}

function createDistractors(left: number, right: number, correctAnswer: number): number[] {
  const pool = new Set<number>()
  const mistakes = [
    left + right,
    (left + 1) * right,
    Math.max(1, left - 1) * right,
    left * (right + 1),
    left * Math.max(1, right - 1),
    correctAnswer + left,
    correctAnswer + right,
    Math.abs(correctAnswer - left),
    Math.abs(correctAnswer - right),
    reverseNumber(correctAnswer),
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer + 3,
    correctAnswer - 3,
    correctAnswer + 5,
    correctAnswer - 5,
    correctAnswer + 10,
    correctAnswer - 10,
  ]

  mistakes.forEach((candidate) => {
    if (candidate > 0 && candidate !== correctAnswer) {
      pool.add(candidate)
    }
  })

  while (pool.size < 6) {
    const offset = randomInt(-12, 12)
    const candidate = correctAnswer + offset

    if (candidate > 0 && candidate !== correctAnswer) {
      pool.add(candidate)
    }
  }

  return shuffle([...pool]).slice(0, 2)
}

function buildPrompt(format: QuestionFormat, left: number, right: number, product: number): string {
  if (format === 'missingLeft') {
    return `? × ${right} = ${product}`
  }

  if (format === 'missingRight') {
    return `${left} × ? = ${product}`
  }

  return `${left} × ${right} = ?`
}

function buildQuestion(format: QuestionFormat, left: number, right: number): Question {
  const product = left * right
  const correctAnswer =
    format === 'missingLeft' ? left : format === 'missingRight' ? right : product

  const distractors = createDistractors(left, right, correctAnswer)
  const options = shuffle([correctAnswer, ...distractors])

  return {
    prompt: buildPrompt(format, left, right, product),
    correctAnswer,
    options,
    format,
    factors: { left, right },
    product,
  }
}

function formatForStage(stage: StageDefinition): QuestionFormat {
  if (stage.kind === 'missingLeft') {
    return 'missingLeft'
  }

  if (stage.kind === 'missingRight') {
    return 'missingRight'
  }

  return 'standard'
}

export function createQuestionForStage(stage: StageDefinition): Question {
  if (stage.kind === 'table' && stage.table) {
    return buildQuestion('standard', stage.table, randomInt(1, PRACTICE_MULTIPLIER_MAX))
  }

  if (stage.kind === 'mixed') {
    const format = pickRandom(['standard', 'missingLeft', 'missingRight'] as const)
    const left = pickRandom(TABLE_STAGE_ORDER)
    const right = randomInt(1, PRACTICE_MULTIPLIER_MAX)
    return buildQuestion(format, left, right)
  }

  const left = pickRandom(TABLE_STAGE_ORDER)
  const right = randomInt(1, PRACTICE_MULTIPLIER_MAX)
  return buildQuestion(formatForStage(stage), left, right)
}

export function createPracticeQuestion(selectedTables: number[]): Question {
  const left = pickRandom(selectedTables)
  const right = randomInt(1, PRACTICE_MULTIPLIER_MAX)
  return buildQuestion('standard', left, right)
}

export function stageCompletionAccuracy(answered: number, correct: number): number {
  if (answered === 0) {
    return 0
  }

  return correct / answered
}

export function stagePoints(stageIndex: number, format: QuestionFormat): number {
  const stageMultiplier = 1 + stageIndex * 0.12
  const formatMultiplier =
    format === 'standard' ? 1 : format === 'missingLeft' || format === 'missingRight' ? 1.35 : 1

  return Math.round(10 * stageMultiplier * formatMultiplier)
}
