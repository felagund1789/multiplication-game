import { useState } from 'react'
import { GameScreen } from './components/GameScreen'
import { MainMenu } from './components/MainMenu'
import { PracticeMode } from './components/PracticeMode'
import { useMultiplicationGame } from './hooks/useMultiplicationGame'
import './App.css'

type Screen = 'menu' | 'game' | 'practice'

function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const { progress, question, answerQuestion, startNewGame, hasSavedGame } = useMultiplicationGame()

  const handleStartNewGame = () => {
    startNewGame()
    setScreen('game')
  }

  if (screen === 'menu') {
    return (
      <MainMenu
        canContinue={hasSavedGame}
        onContinue={() => setScreen('game')}
        onNewGame={handleStartNewGame}
        onPractice={() => setScreen('practice')}
      />
    )
  }

  if (screen === 'practice') {
    return <PracticeMode onBackToMenu={() => setScreen('menu')} />
  }

  return (
    <GameScreen
      question={question}
      score={progress.score}
      currentStreak={progress.currentStreak}
      longestStreak={progress.longestStreak}
      onAnswer={answerQuestion}
      onBackToMenu={() => setScreen('menu')}
    />
  )
}

export default App
