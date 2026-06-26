import type { Question, QuestionFormat, StageDefinition } from '../types/game'
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
  const options = shuffle([correctAnswer, ...distractors]).map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }))

  return {
    prompt: buildPrompt(format, left, right, product),
    correctAnswer: correctAnswer.toString(),
    correctAnswerLabel: correctAnswer.toString(),
    options,
    format,
    factors: { left, right },
    product,
  }
}

function buildWhichEqualsQuestion(stageTables: number[]): Question {
  const left = pickRandom(stageTables)
  const right = randomInt(1, PRACTICE_MULTIPLIER_MAX)
  const product = left * right

  const variants = new Set<string>()
  variants.add(`${left}x${right}`)
  variants.add(`${left}x${Math.max(1, right - 1)}`)
  variants.add(`${left}x${Math.min(PRACTICE_MULTIPLIER_MAX, right + 1)}`)

  while (variants.size < 3) {
    const candidateLeft = pickRandom(stageTables)
    const candidateRight = randomInt(1, PRACTICE_MULTIPLIER_MAX)
    variants.add(`${candidateLeft}x${candidateRight}`)
  }

  const options = shuffle([...variants]).slice(0, 3).map((value) => {
    const [l, r] = value.split('x').map(Number)
    return {
      value,
      label: `${l} × ${r}`,
    }
  })

  const correctAnswer = `${left}x${right}`

  return {
    prompt: `? = ${product}`,
    correctAnswer,
    correctAnswerLabel: `${left} × ${right}`,
    options,
    format: 'whichEquals',
    factors: { left, right },
    product,
  }
}

function buildTrueFalseQuestion(stageTables: number[]): Question {
  const left = pickRandom(stageTables)
  const right = randomInt(1, PRACTICE_MULTIPLIER_MAX)
  const actualProduct = left * right
  const isTrueStatement = randomInt(0, 1) === 1
  const fakeProduct = pickRandom(createDistractors(left, right, actualProduct))
  const shownProduct = isTrueStatement ? actualProduct : fakeProduct
  const correctAnswer = isTrueStatement ? 'true' : 'false'

  return {
    prompt: `${left} × ${right} = ${shownProduct}`,
    correctAnswer,
    correctAnswerLabel: isTrueStatement ? 'TRUE' : 'FALSE',
    options: [
      { value: 'true', label: 'TRUE' },
      { value: 'false', label: 'FALSE' },
    ],
    format: 'trueFalse',
    factors: { left, right },
    product: actualProduct,
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
  const stageTables = stage.tables.length > 0 ? stage.tables : [...TABLE_STAGE_ORDER]
  const stageFormats: QuestionFormat[] =
    stage.allowedFormats.length > 0
      ? stage.allowedFormats
      : stage.kind === 'mixed'
        ? ['standard', 'missingLeft', 'missingRight']
        : [formatForStage(stage)]

  const left = pickRandom(stageTables)
  const right = randomInt(1, PRACTICE_MULTIPLIER_MAX)
  const format = pickRandom(stageFormats)

  if (format === 'whichEquals') {
    return buildWhichEqualsQuestion(stageTables)
  }

  if (format === 'trueFalse') {
    return buildTrueFalseQuestion(stageTables)
  }

  return buildQuestion(format, left, right)
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
    format === 'standard'
      ? 1
      : format === 'missingLeft' || format === 'missingRight'
        ? 1.35
        : format === 'whichEquals'
          ? 1.28
          : 1.2

  return Math.round(10 * stageMultiplier * formatMultiplier)
}
