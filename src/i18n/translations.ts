import type { BadgeType } from '../types/game'

export type Language = 'en' | 'el'

export interface MenuText {
  eyebrow: string
  title: string
  subtitle: string
  actionsAriaLabel: string
  continueSavedGame: string
  startNewGame: string
  practiceMode: string
  collection: string
}

export interface GameText {
  score: string
  streak: string
  longest: string
  mainMenu: string
  adventureMapTitle: string
  adventureMapHint: string
  adventureMapSelectPrompt: string
  completedLocation: string
  currentLocation: string
  lockedLocation: string
  startLocationButton: string
  replayLocationButton: string
  replayModeLabel: string
  returningToMap: string
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
      practiceMode: 'Practice Mode',
      collection: 'My Badges',
    },
    game: {
      score: 'Score',
      streak: 'Streak',
      longest: 'Longest',
      mainMenu: 'Main Menu',
      adventureMapTitle: 'Adventure Map',
      adventureMapHint: 'Travel the route and unlock new multiplication lands.',
      adventureMapSelectPrompt: 'Select your current location to begin the quiz.',
      completedLocation: 'Cleared',
      currentLocation: 'Current',
      lockedLocation: 'Locked',
      startLocationButton: 'Start Challenge',
      replayLocationButton: 'Replay',
      replayModeLabel: 'Replay mode — this won\'t affect your progress.',
      returningToMap: 'Location completed. Returning to the map...',
      journeyLocations: {
        'stage-1-standard': {
          title: 'Whispering Forest',
          subtitle: 'Warm up with tables 1, 10 and 5.',
        },
        'stage-2-standard': {
          title: 'Twin Peaks Camp',
          subtitle: 'Climb through tables 2, 4 and 8.',
        },
        'stage-3-standard': {
          title: 'River of Sparks',
          subtitle: 'Navigate the 3 and 6 table currents.',
        },
        'stage-4-standard': {
          title: 'Sunset Dunes',
          subtitle: 'Master the 9 and 7 table sands.',
        },
        'stage-5-missing': {
          title: 'Puzzle Gate',
          subtitle: 'Missing-number riddles for 1, 10 and 5.',
        },
        'stage-6-missing': {
          title: 'Crystal Bridge',
          subtitle: 'Missing-number trials for 2, 4 and 8.',
        },
        'stage-7-missing': {
          title: 'Volcano Trials',
          subtitle: 'Missing-number heat for 3 and 6.',
        },
        'stage-8-missing': {
          title: 'Frozen Ridge',
          subtitle: 'Missing-number winds for 9 and 7.',
        },
        'stage-9-all-mixed': {
          title: 'Crown Citadel',
          subtitle: 'All tables, all formats, final journey.',
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
        streak3: {
          name: 'Hot Streak',
          description: 'Reach a 3-question streak.',
        },
        streak5: {
          name: 'Burning Hot',
          description: 'Reach a 5-question streak.',
        },
        streak10: {
          name: 'Unstoppable',
          description: 'Reach a 10-question streak.',
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
      practiceMode: 'Εξάσκηση',
      collection: 'Τα Αυτοκόλλητά Μου',
    },
    game: {
      score: 'Σκορ',
      streak: 'Σερι',
      longest: 'Μεγαλυτερο Σερι',
      mainMenu: 'Κεντρικό Μενού',
      adventureMapTitle: 'Χάρτης Περιπέτειας',
      adventureMapHint: 'Προχώρα στη διαδρομή και ξεκλείδωσε νέες περιοχές πολλαπλασιασμού.',
      adventureMapSelectPrompt: 'Επίλεξε την τρέχουσα τοποθεσία για να ξεκινήσεις το κουίζ.',
      completedLocation: 'Ολοκληρώθηκε',
      currentLocation: 'Τρέχον',
      lockedLocation: 'Κλειδωμένο',
      startLocationButton: 'Έναρξη Πρόκλησης',
      replayLocationButton: 'Επανάληψη',
      replayModeLabel: 'Λειτουργία επανάληψης — δεν επηρεάζει την πρόοδό σου.',
      returningToMap: 'Η τοποθεσία ολοκληρώθηκε. Επιστροφή στον χάρτη...',
      journeyLocations: {
        'stage-1-standard': {
          title: 'Ψιθυριστό Δάσος',
          subtitle: 'Ξεκίνα με τις προπαίδειες 1, 10 και 5.',
        },
        'stage-2-standard': {
          title: 'Κατασκήνωση Δίδυμων Κορυφών',
          subtitle: 'Ανέβα με τις προπαίδειες 2, 4 και 8.',
        },
        'stage-3-standard': {
          title: 'Ποτάμι Σπίθας',
          subtitle: 'Διέσχισε τα ρεύματα των 3 και 6.',
        },
        'stage-4-standard': {
          title: 'Αμμόλοφοι Ηλιοβασιλέματος',
          subtitle: 'Κατάκτησε τις προπαίδειες 9 και 7.',
        },
        'stage-5-missing': {
          title: 'Πύλη Γρίφων',
          subtitle: 'Γρίφοι με κενά για 1, 10 και 5.',
        },
        'stage-6-missing': {
          title: 'Κρυστάλλινη Γέφυρα',
          subtitle: 'Δοκιμασίες με κενά για 2, 4 και 8.',
        },
        'stage-7-missing': {
          title: 'Δοκιμασίες Ηφαιστείου',
          subtitle: 'Καυτές ερωτήσεις με κενά για 3 και 6.',
        },
        'stage-8-missing': {
          title: 'Παγωμένη Ράχη',
          subtitle: 'Παγωμένοι γρίφοι με κενά για 9 και 7.',
        },
        'stage-9-all-mixed': {
          title: 'Ακρόπολη του Στέμματος',
          subtitle: 'Όλες οι προπαίδειες και μορφές, η τελική διαδρομή.',
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
      title: 'Συλλογή Αυτοκόλλητων',
      earned: 'Στη συλλογή σου',
      locked: 'Κλειδωμένο',
      backToMenu: 'Κεντρικό Μενού',
    },
    rewards: {
      toastTitle: 'Νέα Αυτοκόλλητα!',
      toastClose: 'Κλείσιμο',
      badges: {
        stageComplete: {
          name: 'Δάσκαλος Σταδίου',
          description: 'Ολοκλήρωσε οποιοδήποτε στάδιο.',
        },
        streak3: {
          name: 'Καυτό Σερί',
          description: 'Φτάσε σε σερί 3 σωστών απαντήσεων.',
        },
        streak5: {
          name: 'Πολύ Καυτό',
          description: 'Φτάσε σε σερί 5 σωστών απαντήσεων.',
        },
        streak10: {
          name: 'Ασταμάτητος',
          description: 'Φτάσε σε σερί 10 σωστών απαντήσεων.',
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
