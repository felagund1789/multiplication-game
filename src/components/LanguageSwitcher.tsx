import type { Language } from '../i18n/translations'

interface LanguageSwitcherProps {
  language: Language
  label: string
  englishLabel: string
  greekLabel: string
  soundsEnabled: boolean
  soundToggleLabel: string
  soundOnLabel: string
  soundOffLabel: string
  onChange: (lang: Language) => void
  onToggleSounds: () => void
}

export function LanguageSwitcher({
  language,
  label,
  englishLabel,
  greekLabel,
  soundsEnabled,
  soundToggleLabel,
  soundOnLabel,
  soundOffLabel,
  onChange,
  onToggleSounds,
}: LanguageSwitcherProps) {
  return (
    <div className="language-switcher" aria-label={label}>
      <button
        type="button"
        className={`nes-btn language-btn ${language === 'en' ? 'is-primary' : ''}`}
        onClick={() => onChange('en')}
      >
        {englishLabel}
      </button>
      <button
        type="button"
        className={`nes-btn language-btn ${language === 'el' ? 'is-primary' : ''}`}
        onClick={() => onChange('el')}
      >
        {greekLabel}
      </button>
      <button
        type="button"
        className={`nes-btn language-btn ${soundsEnabled ? 'is-success' : 'is-error'}`}
        aria-label={soundToggleLabel}
        onClick={onToggleSounds}
      >
        {soundsEnabled ? soundOnLabel : soundOffLabel}
      </button>
    </div>
  )
}
