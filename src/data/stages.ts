import type { StageDefinition } from '../types/game'

export const TABLE_STAGE_ORDER = [1, 10, 5, 2, 3, 4, 6, 7, 8, 9] as const

const BASE_REQUIREMENTS = {
  minimumAnswers: 10,
  minimumAccuracy: 0.8,
}

export const STAGES: StageDefinition[] = [
  {
    id: 'stage-1-standard',
    title: 'Stage 1',
    description: 'Tables 1, 10 and 5.',
    kind: 'table',
    tables: [1, 10, 5],
    allowedFormats: ['standard', 'missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-2-standard',
    title: 'Stage 2',
    description: 'Tables 2, 4 and 8.',
    kind: 'table',
    tables: [2, 4, 8],
    allowedFormats: ['standard', 'missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-3-standard',
    title: 'Stage 3',
    description: 'Tables 3 and 6.',
    kind: 'table',
    tables: [3, 6],
    allowedFormats: ['standard', 'missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-4-standard',
    title: 'Stage 4',
    description: 'Tables 9 and 7.',
    kind: 'table',
    tables: [9, 7],
    allowedFormats: ['standard', 'missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-5-missing',
    title: 'Stage 5',
    description: 'Stage 1 tables in missing-number format.',
    kind: 'mixed',
    tables: [1, 10, 5],
    allowedFormats: ['missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-6-missing',
    title: 'Stage 6',
    description: 'Stage 2 tables in missing-number format.',
    kind: 'mixed',
    tables: [2, 4, 8],
    allowedFormats: ['missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-7-missing',
    title: 'Stage 7',
    description: 'Stage 3 tables in missing-number format.',
    kind: 'mixed',
    tables: [3, 6],
    allowedFormats: ['missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-8-missing',
    title: 'Stage 8',
    description: 'Stage 4 tables in missing-number format.',
    kind: 'mixed',
    tables: [9, 7],
    allowedFormats: ['missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
  {
    id: 'stage-9-all-mixed',
    title: 'Stage 9',
    description: 'Play with all question formats mixed together.',
    kind: 'mixed',
    tables: [...TABLE_STAGE_ORDER],
    allowedFormats: ['standard', 'missingLeft', 'missingRight', 'whichEquals', 'trueFalse'],
    ...BASE_REQUIREMENTS,
  },
]
