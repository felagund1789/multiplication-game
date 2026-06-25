import type { StageDefinition } from '../types/game'

export const TABLE_STAGE_ORDER = [1, 10, 5, 2, 3, 4, 6, 7, 8, 9] as const

const BASE_REQUIREMENTS = {
  minimumAnswers: 10,
  minimumAccuracy: 0.8,
}

const tableStages: StageDefinition[] = TABLE_STAGE_ORDER.map((table) => ({
  id: `table-${table}`,
  title: `Table of ${table}`,
  description: `Master multiplication facts for ${table}.`,
  kind: 'table',
  table,
  ...BASE_REQUIREMENTS,
}))

export const STAGES: StageDefinition[] = [
  ...tableStages,
  {
    id: 'missing-left',
    title: 'Missing Number Left',
    description: 'Solve questions like ? × 3 = 24.',
    kind: 'missingLeft',
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'missing-right',
    title: 'Missing Number Right',
    description: 'Solve questions like 7 × ? = 56.',
    kind: 'missingRight',
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'mixed-mastery',
    title: 'Mixed Mastery',
    description: 'Play with all question formats mixed together.',
    kind: 'mixed',
    ...BASE_REQUIREMENTS,
  },
]
