import type { Language } from '../i18n/translations'

interface LanguageSwitcherProps {
  language: Language
  label: string
  englishLabel: string
  greekLabel: string
  onChange: (lang: Language) => void
}

export function LanguageSwitcher({
  language,
  label,
  englishLabel,
  greekLabel,
  onChange,
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
    </div>
  )
}
