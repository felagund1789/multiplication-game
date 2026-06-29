import type { MenuText } from '../i18n/translations'

interface MainMenuProps {
  canContinue: boolean
  text: MenuText
  onContinue: () => void
  onNewGame: () => void
  onPractice: () => void
  onCollection: () => void
}

export function MainMenu({ canContinue, text, onContinue, onNewGame, onPractice, onCollection }: MainMenuProps) {
  return (
    <main className="screen menu-screen">
      <section className="panel hero-panel nes-container">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p className="subtitle">{text.subtitle}</p>
      </section>

      <section className="panel menu-actions nes-container" aria-label={text.actionsAriaLabel}>
        <button type="button" className="nes-btn is-success" onClick={onContinue} disabled={!canContinue}>
          {text.continueSavedGame}
        </button>
        <button type="button" className="nes-btn is-error" onClick={onNewGame}>
          {text.startNewGame}
        </button>
        <button type="button" className="nes-btn is-primary" onClick={onPractice}>
          {text.practiceMode}
        </button>
        <button type="button" className="nes-btn is-warning" onClick={onCollection}>
          {text.collection}
        </button>
      </section>
    </main>
  )
}
