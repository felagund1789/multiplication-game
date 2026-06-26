// @vitest-environment jsdom

import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NotificationPopup } from './NotificationPopup'

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true

describe('NotificationPopup', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    container.remove()
  })

  it('does not render when closed', () => {
    act(() => {
      root.render(<NotificationPopup isOpen={false} title="Badge unlocked" dismissLabel="Close" onDismiss={vi.fn()} />)
    })

    expect(container.textContent).toBe('')
  })

  it('renders the modal content and calls onDismiss when closed', () => {
    const onDismiss = vi.fn()

    act(() => {
      root.render(
        <NotificationPopup
          isOpen
          title="Stage complete"
          message="The next location has been unlocked."
          dismissLabel="Close"
          onDismiss={onDismiss}
        >
          <div>Reward content</div>
        </NotificationPopup>,
      )
    })

    expect(container.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe('Stage complete')
    expect(container.textContent).toContain('The next location has been unlocked.')
    expect(container.textContent).toContain('Reward content')

    const closeButton = container.querySelector<HTMLButtonElement>('.notification-close')
    expect(closeButton).not.toBeNull()

    act(() => {
      closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})