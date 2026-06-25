import type { MenuText } from '../i18n/translations'

interface MainMenuProps {
  canContinue: boolean
  text: MenuText
  onContinue: () => void
  onNewGame: () => void
  onPractice: () => void
}

export function MainMenu({ canContinue, text, onContinue, onNewGame, onPractice }: MainMenuProps) {
  return (
    <main className="screen menu-screen">
      <section className="panel hero-panel">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p className="subtitle">{text.subtitle}</p>
      </section>

      <section className="panel menu-actions" aria-label={text.actionsAriaLabel}>
        <button type="button" className="big-btn" onClick={onContinue} disabled={!canContinue}>
          {text.continueSavedGame}
        </button>
        <button type="button" className="big-btn primary" onClick={onNewGame}>
          {text.startNewGame}
        </button>
        <button type="button" className="big-btn" onClick={onPractice}>
          {text.practiceMode}
        </button>
      </section>
    </main>
  )
}
