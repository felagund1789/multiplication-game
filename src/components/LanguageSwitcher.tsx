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
        className={`language-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => onChange('en')}
      >
        {englishLabel}
      </button>
      <button
        type="button"
        className={`language-btn ${language === 'el' ? 'active' : ''}`}
        onClick={() => onChange('el')}
      >
        {greekLabel}
      </button>
    </div>
  )
}
