# Multiplication Game

A React + TypeScript learning game that teaches multiplication through a 9-stage adventure campaign, practice mode, and a badge reward system.

## Table of Contents

1. [Features and current capabilities](#features-and-current-capabilities)
2. [Tech stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Development and run commands](#development-and-run-commands)
6. [Build and test commands](#build-and-test-commands)
7. [Project structure overview](#project-structure-overview)
8. [Configuration details](#configuration-details)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [License](#license)
12. [Assumptions and gaps](#assumptions-and-gaps)

## Features and current capabilities

- Campaign mode with a map-based journey of 9 stages.
- Stage progression based on performance thresholds.
  - Each stage requires at least 10 answers.
  - Minimum accuracy target is 80%.
  - If 10 answers are reached without meeting accuracy, stage progress resets for that stage.
- Stage replay from the adventure map for already completed locations.
- Practice mode with selectable multiplication tables.
  - Default selection starts at tables 2, 3, and 4.
  - Practice does not affect campaign progress.
- Multiple question formats:
  - Standard multiplication
  - Missing left factor
  - Missing right factor
  - Which equation equals a target product
  - True/False multiplication statements
- Scoring and streak system:
  - Base points scale by stage index.
  - Question-format multipliers increase difficulty rewards.
  - Streak bonus is awarded every 3 consecutive correct answers.
- Badge and rewards system:
  - Stage completion badge
  - Stage-specific badges for all 9 adventure locations
  - Streak badges (5, 15, 25)
  - Perfect stage badge
  - All stages complete badge
  - Reward popup shows earned badge icon, name, and description
- Badge collection screen with earned/locked state.
- Bilingual UI (English and Greek) with persisted language preference.
- Local persistence for campaign progress and collected badges.

## Tech stack

- React 19
- TypeScript
- Vite
- Vitest
- Oxlint
- jsdom (used by UI tests)

## Prerequisites

- Node.js (current LTS recommended)
- npm

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Development and run commands

Start the development server:

```bash
npm run dev
```

Preview the production build locally:

```bash
npm run preview
```

## Build and test commands

Build the app:

```bash
npm run build
```

Run all tests once:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run lint checks:

```bash
npm run lint
```

## Project structure overview

```text
.
|- src/
|  |- components/
|  |  |- AdventureMap.tsx
|  |  |- CollectionScreen.tsx
|  |  |- GameScreen.tsx
|  |  |- LanguageSwitcher.tsx
|  |  |- MainMenu.tsx
|  |  |- NotificationPopup.tsx
|  |  |- NotificationPopup.test.tsx
|  |  |- PracticeMode.tsx
|  |  \- ProgressPath.tsx
|  |- data/
|  |  \- stages.ts
|  |- hooks/
|  |  \- useMultiplicationGame.ts
|  |- i18n/
|  |  \- translations.ts
|  |- services/
|  |  |- localStorageService.ts
|  |  |- progressionService.ts
|  |  |- progressionService.test.ts
|  |  |- questionService.ts
|  |  |- questionService.test.ts
|  |  |- rewardsService.ts
|  |  \- rewardsService.test.ts
|  |- types/
|  |  \- game.ts
|  |- App.tsx
|  |- App.css
|  |- index.css
|  \- main.tsx
|- public/
|- index.html
|- package.json
|- vite.config.ts
\- tsconfig*.json
```

## Configuration details

Gameplay and content are code-configured in these areas:

- Stages and requirements:
  - File: src/data/stages.ts
  - Contains stage IDs, table groups, allowed question formats, minimum answers, and minimum accuracy.
- Question generation and scoring:
  - File: src/services/questionService.ts
  - Contains format builders, distractor generation, and stage/format point multipliers.
- Progression logic:
  - File: src/services/progressionService.ts
  - Contains stage completion checks and stage advancement/reset threshold behavior.
- Rewards and badge definitions:
  - File: src/services/rewardsService.ts
  - Contains badge catalog, stage-to-badge mapping, and badge award rules.
- Localization:
  - File: src/i18n/translations.ts
  - Contains full English and Greek UI/reward copy.

Local storage keys currently used:

- multiplication-game-save-v2
  - Saved campaign progress, score, stage progress, and collected badge IDs.
- multiplication-game-language
  - Current UI language (en or el).

## Troubleshooting

- Continue button is disabled on main menu:
  - A saved campaign was not detected yet. Start a new game once to create progress.
- Strange progress or badge state after development changes:
  - Clear browser local storage entries:
    - multiplication-game-save-v2
    - multiplication-game-language
- Tests fail due to environment assumptions:
  - Run tests using npm scripts so Vitest and jsdom settings are applied consistently.
- Build fails on type checks:
  - Run npm install to ensure lockfile-matched dependencies are present.

## Contributing

1. Create a branch for your change.
2. Keep changes scoped and include tests for service logic or UI behavior when relevant.
3. Run:
   - npm run lint
   - npm run test
   - npm run build
4. Open a pull request with a short description of behavior changes.

## License

This project is licensed under the MIT License.

See [LICENSE](LICENSE) for full text.

## Assumptions and gaps

- Node.js minimum version is not explicitly pinned in package.json (no engines field).
- Deployment/runtime environment details are not documented in repository docs.
