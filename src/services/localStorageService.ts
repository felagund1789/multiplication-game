import type { GameProgress } from '../types/game'

const STORAGE_KEY = 'multiplication-game-save-v2'

export function loadGameProgress(): GameProgress | null {
  const rawValue = localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    const parsed = JSON.parse(rawValue) as GameProgress

    if (!parsed || typeof parsed.currentStageIndex !== 'number') {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveGameProgress(progress: GameProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function clearGameProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}
