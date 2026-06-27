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
      title: 'Multiplication Quest',
      subtitle: 'Build speed, accuracy and confidence with bite-sized challenges.',
      actionsAriaLabel: 'Main menu actions',
      continueSavedGame: 'Continue Saved Game',
      startNewGame: 'Start New Game',
      newGameConfirmTitle: 'Start a new game?',
      newGameConfirmMessage: 'All saved progress and earned badges will be lost.',
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
      adventureMapTitle: 'Adventure Map',
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
          title: 'Sprout Field',
          subtitle: 'Single-table sprint with table 1.',
        },
        'stage-2': {
          title: 'Tenfold Terrace',
          subtitle: 'Single-table sprint with table 10.',
        },
        'stage-3': {
          title: 'Fiveforge Trail',
          subtitle: 'Single-table sprint with table 5.',
        },
        'stage-4': {
          title: 'Twin Current',
          subtitle: 'Single-table sprint with table 2.',
        },
        'stage-5': {
          title: 'Quadrant Grove',
          subtitle: 'Single-table sprint with table 4.',
        },
        'stage-6': {
          title: 'Octa Outpost',
          subtitle: 'Single-table sprint with table 8.',
        },
        'stage-7': {
          title: 'Triad Cliffs',
          subtitle: 'Single-table sprint with table 3.',
        },
        'stage-8': {
          title: 'Hexa Harbor',
          subtitle: 'Single-table sprint with table 6.',
        },
        'stage-9': {
          title: 'Seventh Summit',
          subtitle: 'Single-table sprint with table 7.',
        },
        'stage-10': {
          title: 'Ninth Horizon',
          subtitle: 'Single-table sprint with table 9.',
        },
        'stage-11': {
          title: 'Puzzle Gate',
          subtitle: 'Mixed puzzle formats for 1 and 10.',
        },
        'stage-12': {
          title: 'Sapphire Waterfalls',
          subtitle: 'Mixed puzzle formats for 5 and 2.',
        },
        'stage-13': {
          title: 'Crystal Bridge',
          subtitle: 'Mixed puzzle formats for 4 and 8.',
        },
        'stage-14': {
          title: 'Volcano Trials',
          subtitle: 'Mixed puzzle formats for 3 and 6.',
        },
        'stage-15': {
          title: 'Frozen Ridge',
          subtitle: 'Mixed puzzle formats for 9 and 7.',
        },
        'stage-16': {
          title: 'Crown Citadel',
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
          name: 'Sprout Field Emblem',
          description: 'Complete Sprout Field (Stage 1).',
        },
        stage2Complete: {
          name: 'Tenfold Terrace Emblem',
          description: 'Complete Tenfold Terrace (Stage 2).',
        },
        stage3Complete: {
          name: 'Fiveforge Trail Emblem',
          description: 'Complete Fiveforge Trail (Stage 3).',
        },
        stage4Complete: {
          name: 'Twin Current Emblem',
          description: 'Complete Twin Current (Stage 4).',
        },
        stage5Complete: {
          name: 'Quadrant Grove Emblem',
          description: 'Complete Quadrant Grove (Stage 5).',
        },
        stage6Complete: {
          name: 'Octa Outpost Emblem',
          description: 'Complete Octa Outpost (Stage 6).',
        },
        stage7Complete: {
          name: 'Triad Cliffs Emblem',
          description: 'Complete Triad Cliffs (Stage 7).',
        },
        stage8Complete: {
          name: 'Hexa Harbor Emblem',
          description: 'Complete Hexa Harbor (Stage 8).',
        },
        stage9Complete: {
          name: 'Seventh Summit Emblem',
          description: 'Complete Seventh Summit (Stage 9).',
        },
        stage10Complete: {
          name: 'Ninth Horizon Emblem',
          description: 'Complete Ninth Horizon (Stage 10).',
        },
        stage11Complete: {
          name: 'Puzzle Gate Emblem',
          description: 'Complete Puzzle Gate (Stage 11).',
        },
        stage12Complete: {
          name: 'Sapphire Waterfalls Emblem',
          description: 'Complete Sapphire Waterfalls (Stage 12).',
        },
        stage13Complete: {
          name: 'Crystal Bridge Emblem',
          description: 'Complete Crystal Bridge (Stage 13).',
        },
        stage14Complete: {
          name: 'Volcano Trials Emblem',
          description: 'Complete Volcano Trials (Stage 14).',
        },
        stage15Complete: {
          name: 'Frozen Ridge Emblem',
          description: 'Complete Frozen Ridge (Stage 15).',
        },
        stage16Complete: {
          name: 'Crown Citadel Emblem',
          description: 'Complete Crown Citadel (Stage 16).',
        },
        streak5: {
          name: 'Hot Streak',
          description: 'Reach a 5-question streak.',
        },
        streak15: {
          name: 'Burning Hot',
          description: 'Reach a 15-question streak.',
        },
        streak25: {
          name: 'Unstoppable',
          description: 'Reach a 25-question streak.',
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
      title: 'Μάθε την προπαίδεια',
      subtitle: 'Απόκτησε ταχύτητα, ακρίβεια και αυτοπεποίθηση με μικρές προκλήσεις.',
      actionsAriaLabel: 'Ενέργειες κεντρικού μενού',
      continueSavedGame: 'Συνέχεια',
      startNewGame: 'Νέο Παιχνίδι',
      newGameConfirmTitle: 'Να ξεκινήσει νέο παιχνίδι;',
      newGameConfirmMessage: 'Όλη η αποθηκευμένη πρόοδος και τα μετάλλια θα χαθούν.',
      practiceMode: 'Εξάσκηση',
      collection: 'Τα Μετάλλιά Μου',
    },
    game: {
      score: 'Σκορ',
      streak: 'Σερι',
      longest: 'Μεγαλυτερο Σερι',
      mainMenu: 'Κεντρικό Μενού',
      stageCompleteTitle: 'Το στάδιο ολοκληρώθηκε!',
      stageCompleteMessage: 'Η επόμενη τοποθεσία ξεκλειδώθηκε.',
      notificationClose: 'Κλείσιμο',
      adventureMapTitle: 'Χάρτης Περιπέτειας',
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
          title: 'Πεδίο Βλαστών',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 1.',
        },
        'stage-2': {
          title: 'Δέκα Αναβαθμίδες',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 10.',
        },
        'stage-3': {
          title: 'Πέντε Μονοπάτια',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 5.',
        },
        'stage-4': {
          title: 'Δίδυμα Ρεύματα',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 2.',
        },
        'stage-5': {
          title: 'Τέταρτο Άλσος',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 4.',
        },
        'stage-6': {
          title: 'Οκτάγωνο Φρούριο',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 8.',
        },
        'stage-7': {
          title: 'Τριπλά Βράχια',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 3.',
        },
        'stage-8': {
          title: 'Έξαπλό Λιμάνι',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 6.',
        },
        'stage-9': {
          title: 'Επτά Κορυφές',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 7.',
        },
        'stage-10': {
          title: 'Ένατος Ορίζοντας',
          subtitle: 'Πρόκληση μίας προπαίδειας με το 9.',
        },
        'stage-11': {
          title: 'Πύλη Γρίφων',
          subtitle: 'Μικτές μορφές ερωτήσεων για 1 και 10.',
        },
        'stage-12': {
          title: 'Ζαφειρένιοι Καταρράκτες',
          subtitle: 'Μικτές μορφές ερωτήσεων για 5 και 2.',
        },
        'stage-13': {
          title: 'Κρυστάλλινη Γέφυρα',
          subtitle: 'Μικτές μορφές ερωτήσεων για 4 και 8.',
        },
        'stage-14': {
          title: 'Δοκιμασίες Ηφαιστείου',
          subtitle: 'Μικτές μορφές ερωτήσεων για 3 και 6.',
        },
        'stage-15': {
          title: 'Παγωμένη Ράχη',
          subtitle: 'Μικτές μορφές ερωτήσεων για 9 και 7.',
        },
        'stage-16': {
          title: 'Ακρόπολη του Στέμματος',
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
      mainMenu: 'Κεντρικό Μενού',
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
      earned: 'Στη συλλογή σου',
      locked: 'Κλειδωμένο',
      backToMenu: 'Κεντρικό Μενού',
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
          name: 'Έμβλημα Πεδίου Βλαστών',
          description: 'Ολοκλήρωσε το Πεδίο Βλαστών (Στάδιο 1).',
        },
        stage2Complete: {
          name: 'Έμβλημα Δέκα Αναβαθμίδων',
          description: 'Ολοκλήρωσε τις Δέκα Αναβαθμίδες (Στάδιο 2).',
        },
        stage3Complete: {
          name: 'Έμβλημα Πέντε Μονοπατιών',
          description: 'Ολοκλήρωσε τα Πέντε Μονοπάτια (Στάδιο 3).',
        },
        stage4Complete: {
          name: 'Έμβλημα Δίδυμων Ρευμάτων',
          description: 'Ολοκλήρωσε τα Δίδυμα Ρεύματα (Στάδιο 4).',
        },
        stage5Complete: {
          name: 'Έμβλημα Τέταρτου Άλσους',
          description: 'Ολοκλήρωσε το Τέταρτο Άλσος (Στάδιο 5).',
        },
        stage6Complete: {
          name: 'Έμβλημα Οκτάγωνου Φρουρίου',
          description: 'Ολοκλήρωσε το Οκτάγωνο Φρούριο (Στάδιο 6).',
        },
        stage7Complete: {
          name: 'Έμβλημα Τριπλών Βράχων',
          description: 'Ολοκλήρωσε τα Τριπλά Βράχια (Στάδιο 7).',
        },
        stage8Complete: {
          name: 'Έμβλημα Εξαπλού Λιμανιού',
          description: 'Ολοκλήρωσε το Εξαπλό Λιμάνι (Στάδιο 8).',
        },
        stage9Complete: {
          name: 'Έμβλημα Επτά Κορυφών',
          description: 'Ολοκλήρωσε τις Επτά Κορυφές (Στάδιο 9).',
        },
        stage10Complete: {
          name: 'Έμβλημα Ένατου Ορίζοντα',
          description: 'Ολοκλήρωσε τον Ένατο Ορίζοντα (Στάδιο 10).',
        },
        stage11Complete: {
          name: 'Έμβλημα Πύλης Γρίφων',
          description: 'Ολοκλήρωσε την Πύλη Γρίφων (Στάδιο 11).',
        },
        stage12Complete: {
          name: 'Έμβλημα Ζαφειρένιων Καταρρακτών',
          description: 'Ολοκλήρωσε τους Ζαφειρένιους Καταρράκτες (Στάδιο 12).',
        },
        stage13Complete: {
          name: 'Έμβλημα Κρυστάλλινης Γέφυρας',
          description: 'Ολοκλήρωσε την Κρυστάλλινη Γέφυρα (Στάδιο 13).',
        },
        stage14Complete: {
          name: 'Έμβλημα Δοκιμασιών Ηφαιστείου',
          description: 'Ολοκλήρωσε τις Δοκιμασίες Ηφαιστείου (Στάδιο 14).',
        },
        stage15Complete: {
          name: 'Έμβλημα Παγωμένης Ράχης',
          description: 'Ολοκλήρωσε την Παγωμένη Ράχη (Στάδιο 15).',
        },
        stage16Complete: {
          name: 'Έμβλημα Ακρόπολης του Στέμματος',
          description: 'Ολοκλήρωσε την Ακρόπολη του Στέμματος (Στάδιο 16).',
        },
        streak5: {
          name: '5-Σερί',
          description: 'Φτάσε σε σερί 5 σωστών απαντήσεων.',
        },
        streak15: {
          name: '15-Σερί',
          description: 'Φτάσε σε σερί 15 σωστών απαντήσεων.',
        },
        streak25: {
          name: 'Ασταμάτητος',
          description: 'Φτάσε σε σερί 25 σωστών απαντήσεων.',
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
