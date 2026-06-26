import type { GameText } from '../i18n/translations'
import type { StageDefinition } from '../types/game'

interface AdventureMapProps {
  stages: StageDefinition[]
  currentStageIndex: number
  onStartCurrentLocation: () => void
  onReplayLocation: (stageIndex: number) => void
  text: Pick<
    GameText,
    | 'adventureMapTitle'
    | 'adventureMapHint'
    | 'adventureMapSelectPrompt'
    | 'completedLocation'
    | 'currentLocation'
    | 'lockedLocation'
    | 'startLocationButton'
    | 'replayLocationButton'
    | 'journeyLocations'
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

export function AdventureMap({ stages, currentStageIndex, onStartCurrentLocation, onReplayLocation, text }: AdventureMapProps) {
  return (
    <section className="panel adventure-map" aria-label={text.adventureMapTitle}>
      <div className="adventure-map-header">
        <h2 className="text-size-lg">{text.adventureMapTitle}</h2>
        <p className="path-meta text-size-base">{text.adventureMapHint}</p>
        <p className="adventure-map-select-prompt text-size-base">{text.adventureMapSelectPrompt}</p>
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
          const canStart = status === 'active'
          const canReplay = status === 'done'
          const icon = LOCATION_ICONS[index] ?? '📍'
          const locationText = text.journeyLocations[stage.id]
          const locationTitle = locationText?.title ?? stage.title
          const locationSubtitle = locationText?.subtitle ?? stage.description

          return (
            <article
              key={stage.id}
              className={`map-node ${status}`}
              style={{ gridColumn: column }}
              aria-label={`${locationTitle} ${status}`}
            >
              <div className="map-node-top">
                <span className="map-node-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="map-node-index">{index + 1}</span>
              </div>
              <p className="map-node-title text-size-md">{locationTitle}</p>
              <p className="map-node-subtitle text-size-base">{locationSubtitle}</p>
              {canStart && (
                <button
                  type="button"
                  className="small-btn map-start-btn"
                  onClick={onStartCurrentLocation}
                >
                  {text.startLocationButton}
                </button>
              )}
              {canReplay && (
                <button
                  type="button"
                  className="small-btn map-replay-btn"
                  onClick={() => onReplayLocation(index)}
                >
                  {text.replayLocationButton}
                </button>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}