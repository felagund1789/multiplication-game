import { useEffect, useState } from 'react'
import { GameScreen } from './components/GameScreen'
import { MainMenu } from './components/MainMenu'
import { PracticeMode } from './components/PracticeMode'
import { CollectionScreen } from './components/CollectionScreen'
import { TRANSLATIONS, type Language } from './i18n/translations'
import { useMultiplicationGame } from './hooks/useMultiplicationGame'
import { buildBadgeDefinitions } from './services/rewardsService'
import './App.css'

type Screen = 'menu' | 'game' | 'practice' | 'collection'
const LANGUAGE_STORAGE_KEY = 'multiplication-game-language'

function loadStoredLanguage(): Language {
  const rawValue = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (rawValue === 'en' || rawValue === 'el') {
    return rawValue
  }

  return 'en'
}

function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [language, setLanguage] = useState<Language>(() => loadStoredLanguage())
  const { progress, question, answerQuestion, goToNextQuestion, startNewGame, hasSavedGame } =
    useMultiplicationGame()
  const text = TRANSLATIONS[language]
  const badgeDefinitions = buildBadgeDefinitions(text.rewards)

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const handleStartNewGame = () => {
    startNewGame()
    setScreen('game')
  }

  if (screen === 'menu') {
    return (
      <>
        <div className="language-switcher" aria-label={text.languageLabel}>
          <button
            type="button"
            className={`language-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            {text.english}
          </button>
          <button
            type="button"
            className={`language-btn ${language === 'el' ? 'active' : ''}`}
            onClick={() => setLanguage('el')}
          >
            {text.greek}
          </button>
        </div>
        <MainMenu
          canContinue={hasSavedGame}
          text={text.menu}
          onContinue={() => setScreen('game')}
          onNewGame={handleStartNewGame}
          onPractice={() => setScreen('practice')}
          onCollection={() => setScreen('collection')}
        />
      </>
    )
  }

  if (screen === 'collection') {
    return (
      <>
        <div className="language-switcher" aria-label={text.languageLabel}>
          <button
            type="button"
            className={`language-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            {text.english}
          </button>
          <button
            type="button"
            className={`language-btn ${language === 'el' ? 'active' : ''}`}
            onClick={() => setLanguage('el')}
          >
            {text.greek}
          </button>
        </div>
        <CollectionScreen
          text={text.collection}
          badgeDefinitions={badgeDefinitions}
          collectedBadgeIds={progress.collectedBadges}
          onBackToMenu={() => setScreen('menu')}
        />
      </>
    )
  }

  

  return (
    <>
      <div className="language-switcher" aria-label={text.languageLabel}>
        <button
          type="button"
          className={`language-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          {text.english}
        </button>
        <button
          type="button"
          className={`language-btn ${language === 'el' ? 'active' : ''}`}
          onClick={() => setLanguage('el')}
        >
          {text.greek}
        </button>
      </div>
      <GameScreen
        question={question}
        score={progress.score}
        currentStreak={progress.currentStreak}
        longestStreak={progress.longestStreak}
        text={text.game}
        rewardsText={text.rewards}
        badgeDefinitions={badgeDefinitions}
        onAnswer={answerQuestion}
        onNextQuestion={goToNextQuestion}
        onBackToMenu={() => setScreen('menu')}
      />
    </>
  )
}

export default App
