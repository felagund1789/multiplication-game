export type Language = 'en' | 'el'

export interface MenuText {
  eyebrow: string
  title: string
  subtitle: string
  actionsAriaLabel: string
  continueSavedGame: string
  startNewGame: string
  practiceMode: string
}

export interface GameText {
  score: string
  streak: string
  longest: string
  mainMenu: string
  submitAnswer: string
  nextQuestion: string
  trueLabel: string
  falseLabel: string
  correctFeedback: (points: number) => string
  incorrectFeedback: (correctAnswer: string) => string
}

export interface PracticeText {
  eyebrow: string
  title: string
  selectedLabel: string
  mainMenu: string
  applySelection: string
  submitAnswer: string
  nextQuestion: string
  correctFeedback: string
  incorrectFeedback: (correctAnswer: string) => string
  campaignHint: string
}

export interface LanguageText {
  languageLabel: string
  english: string
  greek: string
  menu: MenuText
  game: GameText
  practice: PracticeText
}

export const TRANSLATIONS: Record<Language, LanguageText> = {
  en: {
    languageLabel: 'Language',
    english: 'English',
    greek: 'Greek',
    menu: {
      eyebrow: 'Math Adventure',
      title: 'Multiplication Quest',
      subtitle: 'Build speed, accuracy and confidence with bite-sized challenges.',
      actionsAriaLabel: 'Main menu actions',
      continueSavedGame: 'Continue Saved Game',
      startNewGame: 'Start New Game',
      practiceMode: 'Practice Mode',
    },
    game: {
      score: 'Score',
      streak: 'Streak',
      longest: 'Longest',
      mainMenu: 'Main Menu',
      submitAnswer: 'Submit Answer',
      nextQuestion: 'Next Question',
      trueLabel: 'True',
      falseLabel: 'False',
      correctFeedback: (points: number) => `Great job! +${points} points`,
      incorrectFeedback: (correctAnswer: string) => `Not this time. Correct answer: ${correctAnswer}`,
    },
    practice: {
      eyebrow: 'Practice Mode',
      title: 'Pick Your Tables',
      selectedLabel: 'Selected',
      mainMenu: 'Main Menu',
      applySelection: 'Apply Selection',
      submitAnswer: 'Submit Answer',
      nextQuestion: 'Next Question',
      correctFeedback: 'Nice! You got it right.',
      incorrectFeedback: (correctAnswer: string) =>
        `Keep trying! The correct answer was ${correctAnswer}.`,
      campaignHint: 'Practice does not affect your campaign progress.',
    },
  },
  el: {
    languageLabel: 'Γλώσσα',
    english: 'Αγγλικά',
    greek: 'Ελληνικά',
    menu: {
      eyebrow: 'ΜΙΑ ΜΑΘΗΜΑΤΙΚΗ ΠΕΡΙΠΕΤΕΙΑ',
      title: 'Μάθε την προπαίδεια',
      subtitle: 'Απόκτησε ταχύτητα, ακρίβεια και αυτοπεποίθηση με μικρές προκλήσεις.',
      actionsAriaLabel: 'Ενέργειες κεντρικού μενού',
      continueSavedGame: 'Συνέχεια',
      startNewGame: 'Νέο Παιχνίδι',
      practiceMode: 'Εξάσκηση',
    },
    game: {
      score: 'Σκορ',
      streak: 'Σερι',
      longest: 'Μεγαλυτερο Σερι',
      mainMenu: 'Κεντρικό Μενού',
      submitAnswer: 'Υποβολή Απάντησης',
      nextQuestion: 'Επόμενη Ερώτηση',
      trueLabel: 'Σωστό',
      falseLabel: 'Λάθος',
      correctFeedback: (points: number) => `Μπράβο! +${points} πόντοι`,
      incorrectFeedback: (correctAnswer: string) =>
        `Δυστυχώς απάντησες λάθος. Η σωστή απάντηση ήταν ${correctAnswer}`,
    },
    practice: {
      eyebrow: 'Λειτουργία Εξάσκησης',
      title: 'Διάλεξε Πίνακες',
      selectedLabel: 'Επιλεγμένα',
      mainMenu: 'Κεντρικό Μενού',
      applySelection: 'Εφαρμογή Επιλογής',
      submitAnswer: 'Υποβολή Απάντησης',
      nextQuestion: 'Επόμενη Ερώτηση',
      correctFeedback: 'Μπράβο! Σωστή απάντηση.',
      incorrectFeedback: (correctAnswer: string) =>
        `Συνέχισε την προσπάθεια! Η σωστή απάντηση ήταν ${correctAnswer}.`,
      campaignHint: 'Η εξάσκηση δεν επηρεάζει την πρόοδο του βασικού παιχνιδιού.',
    },
  },
}
