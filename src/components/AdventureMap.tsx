import type { GameText } from '../i18n/translations'
import type { StageDefinition } from '../types/game'

interface AdventureMapProps {
  stages: StageDefinition[]
  currentStageIndex: number
  text: Pick<
    GameText,
    'adventureMapTitle' | 'adventureMapHint' | 'completedLocation' | 'currentLocation' | 'lockedLocation'
  >
}

const LOCATION_ICONS = ['🌲', '🏕️', '🏞️', '🏜️', '🧩', '🗿', '🌋', '🏔️', '👑'] as const

function stageStatus(index: number, currentStageIndex: number) {
  if (index < currentStageIndex) {
    return 'done'
  }

  if (index === currentStageIndex) {
    return 'active'
  }

  return 'locked'
}

export function AdventureMap({ stages, currentStageIndex, text }: AdventureMapProps) {
  return (
    <section className="panel adventure-map" aria-label={text.adventureMapTitle}>
      <div className="adventure-map-header">
        <h2>{text.adventureMapTitle}</h2>
        <p className="path-meta">{text.adventureMapHint}</p>
      </div>

      <div className="adventure-map-legend" aria-hidden="true">
        <span className="legend-chip done">{text.completedLocation}</span>
        <span className="legend-chip active">{text.currentLocation}</span>
        <span className="legend-chip locked">{text.lockedLocation}</span>
      </div>

      <div className="adventure-map-grid">
        {stages.map((stage, index) => {
          const row = Math.floor(index / 3)
          const inRow = index % 3
          const column = row % 2 === 0 ? inRow + 1 : 3 - inRow
          const status = stageStatus(index, currentStageIndex)
          const icon = LOCATION_ICONS[index] ?? '📍'

          return (
            <article
              key={stage.id}
              className={`map-node ${status}`}
              style={{ gridColumn: column }}
              aria-label={`${stage.title} ${status}`}
            >
              <div className="map-node-top">
                <span className="map-node-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="map-node-index">{index + 1}</span>
              </div>
              <p className="map-node-title">{stage.title}</p>
              <p className="map-node-subtitle">{stage.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}