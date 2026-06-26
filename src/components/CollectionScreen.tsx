import type { CollectionText } from '../i18n/translations'
import { BADGE_DEFINITIONS } from '../services/rewardsService'

interface CollectionScreenProps {
  text: CollectionText
  collectedBadgeIds: string[]
  onBackToMenu: () => void
}

export function CollectionScreen({ text, collectedBadgeIds, onBackToMenu }: CollectionScreenProps) {
  const allBadges = Object.values(BADGE_DEFINITIONS)
  const totalBadges = allBadges.length
  const earnedCount = collectedBadgeIds.length

  return (
    <main className="screen collection-screen">
      <header className="panel collection-header">
        <div>
          <h1>{text.title}</h1>
          <p className="subtitle">
            {text.earned}: {earnedCount} / {totalBadges}
          </p>
        </div>
        <button type="button" className="small-btn" onClick={onBackToMenu}>
          {text.backToMenu}
        </button>
      </header>

      <section className="panel badges-grid-section">
        <div className="badges-grid">
          {allBadges.map((badge) => {
            const isEarned = collectedBadgeIds.includes(badge.id)

            return (
              <article key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                <div className="badge-emoji">{badge.emoji}</div>
                <p className="badge-name">{badge.name}</p>
                <p className="badge-description">{badge.description}</p>
                {!isEarned && <p className="badge-locked-label">{text.locked}</p>}
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
