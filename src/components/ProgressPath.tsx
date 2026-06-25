import type { StageDefinition, StageProgress } from '../types/game'
import { stageAccuracyPercent } from '../services/progressionService'

interface ProgressPathProps {
  stages: StageDefinition[]
  currentStageIndex: number
  stageProgress: Record<string, StageProgress>
}

export function ProgressPath({ stages, currentStageIndex, stageProgress }: ProgressPathProps) {
  return (
    <section className="panel progress-path" aria-label="Progression path">
      <h2>Learning Path</h2>
      <div className="path-grid">
        {stages.map((stage, index) => {
          const progress = stageProgress[stage.id]
          const answered = progress?.answered ?? 0
          const accuracy = stageAccuracyPercent(progress)
          const status =
            index < currentStageIndex ? 'done' : index === currentStageIndex ? 'active' : 'locked'

          return (
            <article key={stage.id} className={`path-node ${status}`}>
              <p className="path-title">{stage.title}</p>
              <p className="path-subtitle">{stage.description}</p>
              <p className="path-meta">
                {answered} answered • {accuracy}% accuracy
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
