interface MainMenuProps {
  canContinue: boolean
  onContinue: () => void
  onNewGame: () => void
  onPractice: () => void
}

export function MainMenu({ canContinue, onContinue, onNewGame, onPractice }: MainMenuProps) {
  return (
    <main className="screen menu-screen">
      <section className="panel hero-panel">
        <p className="eyebrow">Math Adventure</p>
        <h1>Multiplication Quest</h1>
        <p className="subtitle">Build speed, accuracy and confidence with bite-sized challenges.</p>
      </section>

      <section className="panel menu-actions" aria-label="Main menu actions">
        <button type="button" className="big-btn" onClick={onContinue} disabled={!canContinue}>
          Continue Saved Game
        </button>
        <button type="button" className="big-btn primary" onClick={onNewGame}>
          Start New Game
        </button>
        <button type="button" className="big-btn" onClick={onPractice}>
          Practice Mode
        </button>
      </section>
    </main>
  )
}
