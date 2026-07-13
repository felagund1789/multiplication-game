import { useEffect, useState } from 'react'
import { GameScreen } from './components/GameScreen'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { MainMenu } from './components/MainMenu'
import { PracticeMode } from './components/PracticeMode'
import { CollectionScreen } from './components/CollectionScreen'
import { TRANSLATIONS, type Language } from './i18n/translations'
import { useMultiplicationGame } from './hooks/useMultiplicationGame'
import { useAudioManager } from './hooks/useAudioManager'
import { buildBadgeDefinitions } from './services/rewardsService'
import './App.css'

type Screen = 'menu' | 'game' | 'practice' | 'collection'
const LANGUAGE_STORAGE_KEY = 'multiplication-game-language'
const SOUND_STORAGE_KEY = 'multiplication-game-sounds-enabled'

const DEFAULT_MUSIC_BY_SCREEN: Record<Screen, string> = {
  menu: '/audio/music/game-map-theme.mp3',
  game: '/audio/music/game-map-theme.mp3',
  practice: '/audio/music/coin-heaven-theme.mp3',
  collection: '/audio/music/game-map-theme.mp3',
}

const SOUND_EFFECT_TRACKS = {
  answerSelect: '/audio/sfx/answer-select.mp3',
  answerCorrect: '/audio/sfx/answer-correct.mp3',
  answerWrong: '/audio/sfx/answer-wrong.mp3',
  badgeEarned: '/audio/sfx/badge-earned.mp3',
} as const

function loadStoredLanguage(): Language {
  const rawValue = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (rawValue === 'en' || rawValue === 'el') {
    return rawValue
  }

  return 'en'
}

function loadStoredSoundsEnabled(): boolean {
  const rawValue = localStorage.getItem(SOUND_STORAGE_KEY)

  if (rawValue === null) {
    return true
  }

  return rawValue === 'true'
}

function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [language, setLanguage] = useState<Language>(() => loadStoredLanguage())
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(() => loadStoredSoundsEnabled())
  const [levelMusicTrack, setLevelMusicTrack] = useState<string | null>(null)
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(false)
  const { stages, progress, question, answerQuestion, goToNextQuestion, startNewGame, hasSavedGame } =
    useMultiplicationGame()
  const text = TRANSLATIONS[language]
  const badgeDefinitions = buildBadgeDefinitions(text.rewards)
  const { playSoundEffect } = useAudioManager({
    enabled: soundsEnabled,
    defaultMusicTrack: DEFAULT_MUSIC_BY_SCREEN[screen],
    levelMusicTrack,
  })

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    localStorage.setItem(SOUND_STORAGE_KEY, soundsEnabled ? 'true' : 'false')
  }, [soundsEnabled])

  useEffect(() => {
    if (screen !== 'game') {
      setLevelMusicTrack(null)
    }
  }, [screen])

  const handleStartNewGame = () => {
    setIsNewGameDialogOpen(true)
  }

  const handleConfirmNewGame = () => {
    setIsNewGameDialogOpen(false)
    startNewGame()
    setScreen('game')
  }

  const handleCancelNewGame = () => {
    setIsNewGameDialogOpen(false)
  }

  return (
    <div className={`app-root app-root--${screen}`}>
      <LanguageSwitcher
        language={language}
        label={text.languageLabel}
        englishLabel={text.english}
        greekLabel={text.greek}
        soundsEnabled={soundsEnabled}
        soundToggleLabel={text.soundToggleLabel}
        soundOnLabel={text.soundOnLabel}
        soundOffLabel={text.soundOffLabel}
        onChange={setLanguage}
        onToggleSounds={() => setSoundsEnabled((previous) => !previous)}
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

      {screen === 'menu' && isNewGameDialogOpen && (
        <div
          className="confirmation-backdrop"
          role="presentation"
          onClick={handleCancelNewGame}
        >
          <section
            className="panel confirmation-modal nes-container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-game-dialog-title"
            aria-describedby="new-game-dialog-message"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="new-game-dialog-title">{text.menu.newGameConfirmTitle}</h2>
            <p id="new-game-dialog-message" className="confirmation-message">
              {text.menu.newGameConfirmMessage}
            </p>
            <div className="confirmation-actions">
              <button type="button" className="nes-btn is-error" onClick={handleConfirmNewGame}>
                {text.menu.newGameConfirmAction}
              </button>
              <button type="button" className="nes-btn is-success" onClick={handleCancelNewGame}>
                {text.menu.newGameCancelAction}
              </button>
            </div>
          </section>
        </div>
      )}

      {screen === 'practice' && (
        <PracticeMode
          text={text.practice}
          onBackToMenu={() => setScreen('menu')}
          onAnswerSelected={() => playSoundEffect(SOUND_EFFECT_TRACKS.answerSelect)}
          onAnswerCorrect={() => playSoundEffect(SOUND_EFFECT_TRACKS.answerCorrect)}
          onAnswerWrong={() => playSoundEffect(SOUND_EFFECT_TRACKS.answerWrong)}
        />
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
          onAnswerSelected={() => playSoundEffect(SOUND_EFFECT_TRACKS.answerSelect)}
          onAnswerCorrect={() => playSoundEffect(SOUND_EFFECT_TRACKS.answerCorrect)}
          onAnswerWrong={() => playSoundEffect(SOUND_EFFECT_TRACKS.answerWrong)}
          onBadgeEarned={() => playSoundEffect(SOUND_EFFECT_TRACKS.badgeEarned)}
          onLevelMusicTrackChange={setLevelMusicTrack}
        />
      )}
    </div>
  )
}

export default App
