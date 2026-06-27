// @vitest-environment jsdom

import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useMultiplicationGame } from './useMultiplicationGame'

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true

interface HookHarnessProps {
  onReady: (api: ReturnType<typeof useMultiplicationGame>) => void
}

function HookHarness({ onReady }: HookHarnessProps) {
  const api = useMultiplicationGame()
  onReady(api)
  return null
}

describe('useMultiplicationGame final-stage completion', () => {
  let container: HTMLDivElement
  let root: Root
  let apiRef: ReturnType<typeof useMultiplicationGame> | null = null

  beforeEach(() => {
    localStorage.clear()
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    container.remove()
    apiRef = null
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('marks final stage as complete once threshold is met', () => {
    const finalStagePreCompleteState = {
      currentStageIndex: 8,
      score: 0,
      currentStreak: 0,
      longestStreak: 0,
      stageProgress: {
        'stage-9-all-mixed': { answered: 9, correct: 7 },
      },
      collectedBadges: [],
    }

    localStorage.setItem('multiplication-game-save-v2', JSON.stringify(finalStagePreCompleteState))

    act(() => {
      root.render(
        createElement(HookHarness, {
          onReady: (api: ReturnType<typeof useMultiplicationGame>) => {
            apiRef = api
          },
        }),
      )
    })

    const current = apiRef!
    const answer = current.question.correctAnswer

    let feedback: ReturnType<typeof current.answerQuestion> | null = null
    act(() => {
      feedback = current.answerQuestion(answer)
    })

    expect(feedback).not.toBeNull()
    expect(feedback!.stageAdvanced).toBe(true)

    const updated = apiRef!
    expect(updated.progress.currentStageIndex).toBe(8)
    expect(updated.progress.stageProgress['stage-9-all-mixed']).toEqual({ answered: 10, correct: 8 })
  })
})
