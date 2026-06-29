import type { CollectionText } from '../i18n/translations'
import type { Badge, BadgeType } from '../types/game'

interface CollectionScreenProps {
  text: CollectionText
  badgeDefinitions: Record<BadgeType, Badge>
  collectedBadgeIds: string[]
  onBackToMenu: () => void
}

export function CollectionScreen({ text, badgeDefinitions, collectedBadgeIds, onBackToMenu }: CollectionScreenProps) {
  const allBadges = Object.values(badgeDefinitions)
  const totalBadges = allBadges.length
  const earnedCount = collectedBadgeIds.length

  return (
    <main className="screen collection-screen">
      <header className="panel collection-header nes-container">
        <div>
          <h1 className="text-size-lg">{text.title}</h1>
          <p className="subtitle text-size-base">
            {text.earned}: {earnedCount} / {totalBadges}
          </p>
        </div>
        <button type="button" className="nes-btn is-warning" onClick={onBackToMenu}>
          {text.backToMenu}
        </button>
      </header>

      <section className="panel badges-grid-section nes-container">
        <div className="badges-grid">
          {allBadges.map((badge) => {
            const isEarned = collectedBadgeIds.includes(badge.id)

            return (
              <article key={badge.id} className={`badge-card nes-container ${isEarned ? 'earned' : 'locked'}`}>
                <div className="badge-emoji">{badge.emoji}</div>
                <p className="badge-name text-size-md">{badge.name}</p>
                <p className="badge-description text-size-base">{badge.description}</p>
                {!isEarned && <p className="badge-locked-label text-size-base">{text.locked}</p>}
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
