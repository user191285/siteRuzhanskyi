interface Props {
  currentLang: 'uk' | 'en';
}

export default function LanguageSwitcher({ currentLang }: Props) {
  const handleSwitch = (lang: 'uk' | 'en') => {
    if (lang === currentLang) return;
    window.location.href = lang === 'uk' ? '/' : '/en/';
  };

  const btnStyle = (lang: 'uk' | 'en'): React.CSSProperties => ({
    fontFamily: "'Roboto', sans-serif",
    fontWeight: currentLang === lang ? 700 : 400,
    color: currentLang === lang ? '#242424' : '#787878',
    fontSize: '14px',
    background: 'none',
    border: 'none',
    cursor: currentLang === lang ? 'default' : 'pointer',
    padding: 0,
    transition: 'color 0.2s',
    lineHeight: 1,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button onClick={() => handleSwitch('uk')} style={btnStyle('uk')} aria-label="Українська">
        УКР
      </button>
      <span style={{ color: '#EDEDED', fontSize: '14px', userSelect: 'none', lineHeight: 1 }}>|</span>
      <button onClick={() => handleSwitch('en')} style={btnStyle('en')} aria-label="English">
        EN
      </button>
    </div>
  );
}
