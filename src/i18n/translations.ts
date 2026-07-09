import type { BadgeType } from '../types/game'

export type Language = 'en' | 'el'

export interface MenuText {
  eyebrow: string
  title: string
  subtitle: string
  actionsAriaLabel: string
  continueSavedGame: string
  startNewGame: string
  newGameConfirmTitle: string
  newGameConfirmMessage: string
  newGameConfirmAction: string
  newGameCancelAction: string
  practiceMode: string
  collection: string
}

export interface GameText {
  score: string
  streak: string
  longest: string
  mainMenu: string
  stageCompleteTitle: string
  stageCompleteMessage: string
  notificationClose: string
  adventureMapTitle: string
  adventureMapHint: string
  adventureMapSelectPrompt: string
  completedLocation: string
  currentLocation: string
  lockedLocation: string
  startLocationButton: string
  continueLocationButton: string
  replayLocationButton: string
  replayModeLabel: string
  returningToMap: string
  stageLabel: string
  answeredLabel: string
  correctLabel: string
  journeyLocations: Record<
    string,
    {
      title: string
      subtitle: string
    }
  >
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

export interface CollectionText {
  title: string
  earned: string
  locked: string
  backToMenu: string
}

export interface RewardBadgeText {
  name: string
  description: string
}

export interface RewardsText {
  toastTitle: string
  toastClose: string
  badges: Record<BadgeType, RewardBadgeText>
}

export interface LanguageText {
  languageLabel: string
  english: string
  greek: string
  menu: MenuText
  game: GameText
  practice: PracticeText
  collection: CollectionText
  rewards: RewardsText
}

export const TRANSLATIONS: Record<Language, LanguageText> = {
  en: {
    languageLabel: 'Language',
    english: 'English',
    greek: 'Greek',
    menu: {
      eyebrow: 'Math Adventure',
      title: 'Super Mario Multiplication Game',
      subtitle: 'Build speed, accuracy and confidence with bite-sized challenges.',
      actionsAriaLabel: 'Main menu actions',
      continueSavedGame: 'Continue Saved Game',
      startNewGame: 'Start New Game',
      newGameConfirmTitle: 'Start a new game?',
      newGameConfirmMessage: 'All saved progress and earned badges will be lost.',
      newGameConfirmAction: 'Start New Game',
      newGameCancelAction: 'Keep Progress',
      practiceMode: 'Practice Mode',
      collection: 'My Badges',
    },
    game: {
      score: 'Score',
      streak: 'Streak',
      longest: 'Longest',
      mainMenu: 'Main Menu',
      stageCompleteTitle: 'Stage Complete!',
      stageCompleteMessage: 'The next location has been unlocked.',
      notificationClose: 'Close',
      adventureMapTitle: 'Super Mario Land',
      adventureMapHint: 'Travel the route and unlock new multiplication lands.',
      adventureMapSelectPrompt: 'Select your current location to begin the quiz.',
      completedLocation: 'Cleared',
      currentLocation: 'Current',
      lockedLocation: 'Locked',
      startLocationButton: 'Start Challenge',
      continueLocationButton: 'Continue',
      replayLocationButton: 'Replay',
      replayModeLabel: 'Replay mode — this won\'t affect your progress.',
      returningToMap: 'Location completed. Returning to the map...',
      stageLabel: 'Stage',
      answeredLabel: 'Answered',
      correctLabel: 'Correct',
      journeyLocations: {
        'stage-1': {
          title: 'World 1 - Level 1',
          subtitle: 'Single-table sprint with table 1.',
        },
        'stage-2': {
          title: 'World 1 - Level 2',
          subtitle: 'Single-table sprint with table 10.',
        },
        'stage-3': {
          title: 'World 1 - Level 3',
          subtitle: 'Single-table sprint with table 5.',
        },
        'stage-4': {
          title: 'World 1 - Level 4',
          subtitle: 'Single-table sprint with table 2.',
        },
        'stage-5': {
          title: 'World 1 - Level 5',
          subtitle: 'Single-table sprint with table 4.',
        },
        'stage-6': {
          title: 'World 2 - Level 1',
          subtitle: 'Single-table sprint with table 8.',
        },
        'stage-7': {
          title: 'World 2 - Level 2',
          subtitle: 'Single-table sprint with table 3.',
        },
        'stage-8': {
          title: 'World 2 - Level 3',
          subtitle: 'Single-table sprint with table 6.',
        },
        'stage-9': {
          title: 'World 2 - Level 4',
          subtitle: 'Single-table sprint with table 7.',
        },
        'stage-10': {
          title: 'World 2 - Level 5',
          subtitle: 'Single-table sprint with table 9.',
        },
        'stage-11': {
          title: 'World 3 - Level 1',
          subtitle: 'Mixed puzzle formats for 1 and 10.',
        },
        'stage-12': {
          title: 'World 3 - Level 2',
          subtitle: 'Mixed puzzle formats for 5 and 2.',
        },
        'stage-13': {
          title: 'World 3 - Level 3',
          subtitle: 'Mixed puzzle formats for 4 and 8.',
        },
        'stage-14': {
          title: 'World 3 - Level 4',
          subtitle: 'Mixed puzzle formats for 3 and 6.',
        },
        'stage-15': {
          title: 'World 3 - Level 5',
          subtitle: 'Mixed puzzle formats for 9 and 7.',
        },
        'stage-16': {
          title: 'Final Challenge',
          subtitle: 'Final mixed challenge for 2, 3, 4, 6, 7, 8 and 9.',
        },
      },
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
    collection: {
      title: 'Badge Collection',
      earned: 'Earned',
      locked: 'Locked',
      backToMenu: 'Main Menu',
    },
    rewards: {
      toastTitle: 'New Badges!',
      toastClose: 'Close',
      badges: {
        stageComplete: {
          name: 'Stage Master',
          description: 'Complete any stage.',
        },
        stage1Complete: {
          name: 'Anchor',
          description: 'Complete World 1 - Level 1.',
        },
        stage2Complete: {
          name: 'Blue Coin',
          description: 'Complete World 1 - Level 2.',
        },
        stage3Complete: {
          name: 'Brick',
          description: 'Complete World 1 - Level 3.',
        },
        stage4Complete: {
          name: 'Fire Flower',
          description: 'Complete World 1 - Level 4.',
        },
        stage5Complete: {
          name: 'Frog',
          description: 'Complete World 1 - Level 5.',
        },
        stage6Complete: {
          name: 'Empty Box',
          description: 'Complete World 2 - Level 1.',
        },
        stage7Complete: {
          name: 'Hammer',
          description: 'Complete World 2 - Level 2.',
        },
        stage8Complete: {
          name: 'Magic Flute',
          description: 'Complete World 2 - Level 3.',
        },
        stage9Complete: {
          name: 'Music Box',
          description: 'Complete World 2 - Level 4.',
        },
        stage10Complete: {
          name: 'P Wing',
          description: 'Complete World 2 - Level 5.',
        },
        stage11Complete: {
          name: 'Cloud',
          description: 'Complete World 3 - Level 1.',
        },
        stage12Complete: {
          name: 'Coin',
          description: 'Complete World 3 - Level 2.',
        },
        stage13Complete: {
          name: 'Full Box',
          description: 'Complete World 3 - Level 3.',
        },
        stage14Complete: {
          name: 'Green Super Leaf',
          description: 'Complete World 3 - Level 4.',
        },
        stage15Complete: {
          name: 'Red Super Leaf',
          description: 'Complete World 3 - Level 5.',
        },
        stage16Complete: {
          name: 'Tanooki',
          description: 'Complete Final Challenge.',
        },
        streak20: {
          name: 'Hot Streak',
          description: 'Reach a 20-question streak.',
        },
        streak50: {
          name: 'Burning Hot',
          description: 'Reach a 50-question streak.',
        },
        streak100: {
          name: 'Unstoppable',
          description: 'Reach a 100-question streak.',
        },
        perfectStage: {
          name: 'Flawless',
          description: 'Complete a stage with 100% accuracy.',
        },
        allStagesComplete: {
          name: 'Champion',
          description: 'Complete all stages.',
        },
      },
    },
  },
  el: {
    languageLabel: 'Γλώσσα',
    english: 'Αγγλικά',
    greek: 'Ελληνικά',
    menu: {
      eyebrow: 'ΜΙΑ ΜΑΘΗΜΑΤΙΚΗ ΠΕΡΙΠΕΤΕΙΑ',
      title: 'Προπαίδεια με τον Super Mario',
      subtitle: 'Απόκτησε ταχύτητα, ακρίβεια και αυτοπεποίθηση με μικρές προκλήσεις.',
      actionsAriaLabel: 'Ενέργειες κεντρικού μενού',
      continueSavedGame: 'Συνέχεια',
      startNewGame: 'Νέο Παιχνίδι',
      newGameConfirmTitle: 'Να ξεκινήσει νέο παιχνίδι;',
      newGameConfirmMessage: 'Όλη η αποθηκευμένη πρόοδος και τα μετάλλια θα χαθούν.',
      newGameConfirmAction: 'Νέο Παιχνίδι',
      newGameCancelAction: 'Διατήρηση Προόδου',
      practiceMode: 'Εξάσκηση',
      collection: 'Τα Μετάλλιά Μου',
    },
    game: {
      score: 'Σκορ',
      streak: 'Στη σειρά',
      longest: 'Πιο πολλά στη σειρά',
      mainMenu: 'Μενού',
      stageCompleteTitle: 'Το στάδιο ολοκληρώθηκε!',
      stageCompleteMessage: 'Η επόμενη τοποθεσία ξεκλειδώθηκε.',
      notificationClose: 'Κλείσιμο',
      adventureMapTitle: 'Super Mario Land',
      adventureMapHint: 'Προχώρα στη διαδρομή και ξεκλείδωσε νέες περιοχές πολλαπλασιασμού.',
      adventureMapSelectPrompt: 'Επίλεξε την τρέχουσα τοποθεσία για να ξεκινήσεις το κουίζ.',
      completedLocation: 'Ολοκληρώθηκε',
      currentLocation: 'Τρέχον',
      lockedLocation: 'Κλειδωμένο',
      startLocationButton: 'Έναρξη Πρόκλησης',
      continueLocationButton: 'Συνέχεια',
      replayLocationButton: 'Επανάληψη',
      replayModeLabel: 'Λειτουργία επανάληψης — δεν επηρεάζει την πρόοδό σου.',
      returningToMap: 'Η τοποθεσία ολοκληρώθηκε. Επιστροφή στον χάρτη...',
      stageLabel: 'Στάδιο',
      answeredLabel: 'Απαντημένες',
      correctLabel: 'Σωστές',
      journeyLocations: {
        'stage-1': {
          title: 'Κόσμος 1 - Επίπεδο 1',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 1.',
        },
        'stage-2': {
          title: 'Κόσμος 1 - Επίπεδο 2',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 10.',
        },
        'stage-3': {
          title: 'Κόσμος 1 - Επίπεδο 3',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 5.',
        },
        'stage-4': {
          title: 'Κόσμος 1 - Επίπεδο 4',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 2.',
        },
        'stage-5': {
          title: 'Κόσμος 1 - Επίπεδο 5',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 4.',
        },
        'stage-6': {
          title: 'Κόσμος 1 - Επίπεδο 6',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 8.',
        },
        'stage-7': {
          title: 'Κόσμος 1 - Επίπεδο 7',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 3.',
        },
        'stage-8': {
          title: 'Κόσμος 1 - Επίπεδο 8',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 6.',
        },
        'stage-9': {
          title: 'Κόσμος 2 - Επίπεδο 1',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 7.',
        },
        'stage-10': {
          title: 'Κόσμος 2 - Επίπεδο 2',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 9.',
        },
        'stage-11': {
          title: 'Κόσμος 2 - Επίπεδο 3',
          subtitle: 'Μικτές μορφές ερωτήσεων για 1 και 10.',
        },
        'stage-12': {
          title: 'Κόσμος 2 - Επίπεδο 4',
          subtitle: 'Μικτές μορφές ερωτήσεων για 5 και 2.',
        },
        'stage-13': {
          title: 'Κόσμος 2 - Επίπεδο 5',
          subtitle: 'Μικτές μορφές ερωτήσεων για 4 και 8.',
        },
        'stage-14': {
          title: 'Κόσμος 2 - Επίπεδο 6',
          subtitle: 'Μικτές μορφές ερωτήσεων για 3 και 6.',
        },
        'stage-15': {
          title: 'Κόσμος 2 - Επίπεδο 7',
          subtitle: 'Μικτές μορφές ερωτήσεων για 9 και 7.',
        },
        'stage-16': {
          title: 'Κόσμος 2 - Επίπεδο 8',
          subtitle: 'Τελική μικτή πρόκληση για 2, 3, 4, 6, 7, 8 και 9.',
        },
      },
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
      mainMenu: 'Μενού',
      applySelection: 'Εφαρμογή Επιλογής',
      submitAnswer: 'Υποβολή Απάντησης',
      nextQuestion: 'Επόμενη Ερώτηση',
      correctFeedback: 'Μπράβο! Σωστή απάντηση.',
      incorrectFeedback: (correctAnswer: string) =>
        `Συνέχισε την προσπάθεια! Η σωστή απάντηση ήταν ${correctAnswer}.`,
      campaignHint: 'Η εξάσκηση δεν επηρεάζει την πρόοδο του βασικού παιχνιδιού.',
    },
    collection: {
      title: 'Συλλογή Μεταλλίων',
      earned: 'Στη συλλογή',
      locked: 'Κλειδωμένο',
      backToMenu: 'Μενού',
    },
    rewards: {
      toastTitle: 'Νέα Μετάλλια!',
      toastClose: 'Κλείσιμο',
      badges: {
        stageComplete: {
          name: 'Τοπ Κατακτητής',
          description: 'Ολοκλήρωσε οποιοδήποτε στάδιο.',
        },
        stage1Complete: {
          name: 'Άγκυρα',
          description: 'Ολοκλήρωσε το Επίπεδο 1 του Κόσμου 1.',
        },
        stage2Complete: {
          name: 'Μπλε Νόμισμα',
          description: 'Ολοκλήρωσε το Επίπεδο 2 του Κόσμου 1.',
        },
        stage3Complete: {
          name: 'Τούβλο',
          description: 'Ολοκλήρωσε το Επίπεδο 3 του Κόσμου 1.',
        },
        stage4Complete: {
          name: 'Λουλούδι της Φωτιάς',
          description: 'Ολοκλήρωσε το Επίπεδο 4 του Κόσμου 1.',
        },
        stage5Complete: {
          name: 'Βάτραχος',
          description: 'Ολοκλήρωσε το Επίπεδο 5 του Κόσμου 1.',
        },
        stage6Complete: {
          name: 'Άδειο Κουτί',
          description: 'Ολοκλήρωσε το Επίπεδο 1 του Κόσμου 2.',
        },
        stage7Complete: {
          name: 'Σφυρί',
          description: 'Ολοκλήρωσε το Επίπεδο 2 του Κόσμου 2.',
        },
        stage8Complete: {
          name: 'Μαγική Φλογέρα',
          description: 'Ολοκλήρωσε το Επίπεδο 3 του Κόσμου 2.',
        },
        stage9Complete: {
          name: 'Μουσικό Κουτί',
          description: 'Ολοκλήρωσε το Επίπεδο 4 του Κόσμου 2.',
        },
        stage10Complete: {
          name: 'P Wing',
          description: 'Ολοκλήρωσε το Επίπεδο 5 του Κόσμου 2.',
        },
        stage11Complete: {
          name: 'Σύννεφο',
          description: 'Ολοκλήρωσε το Επίπεδο 1 του Κόσμου 3.',
        },
        stage12Complete: {
          name: 'Νόμισμα',
          description: 'Ολοκλήρωσε το Επίπεδο 2 του Κόσμου 3.',
        },
        stage13Complete: {
          name: 'Γεμάτο Κουτί',
          description: 'Ολοκλήρωσε το Επίπεδο 3 του Κόσμου 3.',
        },
        stage14Complete: {
          name: 'Πράσινο Σούπερ Φύλλο',
          description: 'Ολοκλήρωσε το Επίπεδο 4 του Κόσμου 3.',
        },
        stage15Complete: {
          name: 'Κόκκινο Σούπερ Φύλλο',
          description: 'Ολοκλήρωσε το Επίπεδο 5 του Κόσμου 3.',
        },
        stage16Complete: {
          name: 'Τανούκι',
          description: 'Ολοκλήρωσε την τελική δοκιμασία.',
        },
        streak20: {
          name: '20 στη σειρά',
          description: 'Απάντησε σωστά 20 φορές στη σειρά.',
        },
        streak50: {
          name: '50 στη σειρά',
          description: 'Απάντησε σωστά 50 φορές στη σειρά.',
        },
        streak100: {
          name: 'Ασταμάτητος',
          description: 'Τερμάτισε απαντώντας σωστά 100 φορές στη σειρά.',
        },
        perfectStage: {
          name: 'Αψεγάδιαστος',
          description: 'Ολοκλήρωσε ένα στάδιο με 100% ακρίβεια.',
        },
        allStagesComplete: {
          name: 'Πρωταθλητής',
          description: 'Ολοκλήρωσε όλα τα στάδια.',
        },
      },
    },
  },
}
