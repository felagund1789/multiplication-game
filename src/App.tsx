import { useEffect, useState } from 'react'
import { GameScreen } from './components/GameScreen'
import { LanguageSwitcher } from './components/LanguageSwitcher'
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
  const { stages, progress, question, answerQuestion, goToNextQuestion, startNewGame, hasSavedGame } =
    useMultiplicationGame()
  const text = TRANSLATIONS[language]
  const badgeDefinitions = buildBadgeDefinitions(text.rewards)

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const handleStartNewGame = () => {
    const shouldStartNewGame = window.confirm(
      `${text.menu.newGameConfirmTitle}\n\n${text.menu.newGameConfirmMessage}`,
    )

    if (!shouldStartNewGame) {
      return
    }

    startNewGame()
    setScreen('game')
  }

  return (
    <div className="app-root">
      <LanguageSwitcher
        language={language}
        label={text.languageLabel}
        englishLabel={text.english}
        greekLabel={text.greek}
        onChange={setLanguage}
      />

      {screen === 'menu' && (
        <MainMenu
          canContinue={hasSavedGame}
          text={text.menu}
          onContinue={() => setScreen('game')}
          onNewGame={handleStartNewGame}
          onPractice={() => setScreen('practice')}
          onCollection={() => setScreen('collection')}
        />
      )}

      {screen === 'practice' && (
        <PracticeMode text={text.practice} onBackToMenu={() => setScreen('menu')} />
      )}

      {screen === 'collection' && (
        <CollectionScreen
          text={text.collection}
          badgeDefinitions={badgeDefinitions}
          collectedBadgeIds={progress.collectedBadges}
          onBackToMenu={() => setScreen('menu')}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          question={question}
          score={progress.score}
          currentStreak={progress.currentStreak}
          longestStreak={progress.longestStreak}
          stages={stages}
          currentStageIndex={progress.currentStageIndex}
          stageProgress={progress.stageProgress}
          text={text.game}
          rewardsText={text.rewards}
          badgeDefinitions={badgeDefinitions}
          onAnswer={answerQuestion}
          onNextQuestion={goToNextQuestion}
          onBackToMenu={() => setScreen('menu')}
        />
      )}
    </div>
  )
}

export default App
