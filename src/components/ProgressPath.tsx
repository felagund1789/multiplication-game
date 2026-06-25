import type { StageDefinition } from '../types/game'

interface ProgressPathProps {
  stages: StageDefinition[]
  currentStageIndex: number
}

export function ProgressPath({ stages, currentStageIndex }: ProgressPathProps) {
  return (
    <section className="panel progress-path" aria-label="Progression path">
      <h2>Learning Path</h2>
      <div className="path-grid">
        {stages.map((stage, index) => {
          const status =
            index < currentStageIndex ? 'done' : index === currentStageIndex ? 'active' : 'locked'

          return (
            <article key={stage.id} className={`path-node ${status}`}>
              <p className="path-title">{stage.title}</p>
              <p className="path-subtitle">{stage.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
