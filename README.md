# Super Mario Multiplication Game

A React and TypeScript learning game that teaches multiplication through a 16-stage Mario-themed campaign, practice mode, and collectible badges.

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
10. [Disclaimer](#disclaimer)
11. [Contributing](#contributing)
12. [License](#license)
13. [Assumptions and gaps](#assumptions-and-gaps)

## Features and current capabilities

- Main menu, game map/quiz flow, practice mode, and badge collection screen.
- Per-screen background configuration for menu, game, practice, and collection views.
- Campaign mode with 16 stages:
  - Stages 1 to 10 are single-table standard multiplication.
  - Stages 11 to 15 are mixed-format stages over paired tables.
  - Stage 16 is a final mixed challenge over multiple tables.
- Map-based progression with replay support:
  - Current stage can be started or continued.
  - Completed stages can be replayed without affecting campaign progress.
- Stage thresholds and progression rules:
  - Each stage requires at least 10 answers.
  - Minimum accuracy target is 80 percent.
  - If minimum answers are reached without minimum accuracy, that stage run resets.
- Question formats implemented:
  - Standard multiplication
  - Missing left factor
  - Missing right factor
  - Which equation equals the shown product
  - True or False statement validation
- Scoring and streak behavior:
  - Stage index and question format both affect point rewards.
  - Streak bonus is awarded every 3 consecutive correct answers.
- Badge and rewards system:
  - Stage completion badge
  - Stage-specific badges for stages 1 through 16
  - Streak badges at 20, 50, and 100
  - Perfect stage badge
  - All stages complete badge
  - Badge notifications and collection entries use image assets from public/images/badges.
- Bilingual UI (English and Greek) with persisted language preference.
- Campaign progress and collected badges persisted in browser local storage.

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
|- public/
|  |- images/
|  |  |- backgrounds/
|  |  |- badges/
|  |  \- map/
|  \- favicon.svg
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
|  |  |- useMultiplicationGame.ts
|  |  \- useMultiplicationGame.test.ts
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
|  |- App.css
|  |- App.tsx
|  |- index.css
|  \- main.tsx
|- index.html
|- package.json
|- vercel.json
|- vite.config.ts
\- tsconfig*.json
```

## Configuration details

Core behavior is configured directly in source files.

- Stage order, tables, format mix, and thresholds:
  - src/data/stages.ts
- Question generation, distractors, and point multipliers:
  - src/services/questionService.ts
- Stage completion and threshold evaluation:
  - src/services/progressionService.ts
- Badge definitions, image URLs, and award conditions:
  - src/services/rewardsService.ts
- Main screen routing and language persistence:
  - src/App.tsx
- App-level and stage-level background styling:
  - src/App.css
- Localized text for English and Greek:
  - src/i18n/translations.ts

Local storage keys currently used:

- multiplication-game-save-v2 for campaign progress and collected badges.
- multiplication-game-language for UI language preference.

Deployment note:

- vercel.json rewrites all routes to / for single-page app hosting.

## Troubleshooting

- Continue Saved Game is disabled on main menu:
  - No saved campaign was detected yet. Start and answer at least one campaign question first.
- Progress, language, or badges appear stale after development changes:
  - Clear browser local storage keys:
    - multiplication-game-save-v2
    - multiplication-game-language
- Badge images are not visible:
  - Confirm files exist under public/images/badges and that imageUrl values in src/services/rewardsService.ts match file names.
- A screen background is missing:
  - Confirm files exist under public/images/backgrounds for the paths referenced in src/App.css.
- Tests fail unexpectedly in local runs:
  - Use npm scripts to run Vitest with the expected project settings.

## Disclaimer

Super Mario, Mario, Super Mario Bros. 3, and related characters, game elements, names, images, and audio/visual themes are the property of Nintendo. This project is an unofficial fan-made educational game and is not affiliated with, endorsed by, sponsored by, or approved by Nintendo.

All Nintendo trademarks, logos, and copyrighted properties remain the property of their respective owners. If you plan to distribute this project publicly, review the assets and references you include and make sure your usage is appropriate for your intended context.

## Contributing

1. Create a branch for your change.
2. Keep changes scoped to a clear behavior update.
3. Add or update tests for logic/UI changes when relevant.
4. Run checks before opening a pull request:
   - npm run lint
   - npm run test
   - npm run build

## License

This project is licensed under the MIT License.

See [LICENSE](LICENSE) for full text.

## Assumptions and gaps

- package.json does not define an engines field, so no explicit minimum Node.js version is pinned.
- src/App.css references /images/backgrounds/game-background.png and /images/backgrounds/collection-background.png, but those files are not currently present in public/images/backgrounds.
