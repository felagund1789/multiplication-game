import type { ReactNode } from 'react'

interface NotificationPopupProps {
  isOpen: boolean
  title: string
  message?: string
  dismissLabel: string
  onDismiss: () => void
  children?: ReactNode
}

export function NotificationPopup({
  isOpen,
  title,
  message,
  dismissLabel,
  onDismiss,
  children,
}: NotificationPopupProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="notification-backdrop" role="presentation">
      <section className="panel notification-popup nes-container" role="dialog" aria-modal="true" aria-label={title}>
        <div className="notification-header">
          <h3 className="text-size-md">{title}</h3>
          <button type="button" className="nes-btn is-error notification-close" aria-label={dismissLabel} onClick={onDismiss}>
            X
          </button>
        </div>

        {message && <p className="notification-message text-size-base">{message}</p>}

        {children}

        <button type="button" className="nes-btn is-primary notification-dismiss" onClick={onDismiss}>
          {dismissLabel}
        </button>
      </section>
    </div>
  )
}