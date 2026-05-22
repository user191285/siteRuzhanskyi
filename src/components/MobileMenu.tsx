import { useState, useEffect } from 'react';

interface Props {
  lang: 'uk' | 'en';
  phone: string;
}

const navLinks = {
  uk: [
    { href: '/#solutions', label: 'Рішення' },
    { href: '/#about', label: 'Про компанію' },
    { href: '/portfolio', label: "Розроблені об'єкти" },
    { href: '/#contact', label: "Зв'язок" },
  ],
  en: [
    { href: '/en/#solutions', label: 'Solutions' },
    { href: '/en/#about', label: 'About' },
    { href: '/en/portfolio', label: 'Projects' },
    { href: '/en/#contact', label: 'Contact' },
  ],
};

export default function MobileMenu({ lang, phone }: Props) {
  const [open, setOpen] = useState(false);
  const links = navLinks[lang];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const lineStyle: React.CSSProperties = {
    display: 'block',
    width: '22px',
    height: '2px',
    backgroundColor: '#242424',
    borderRadius: '1px',
    transition: 'opacity 0.2s, transform 0.2s',
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
        aria-expanded={open}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
          width: '40px',
          height: '40px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          flexShrink: 0,
        }}
      >
        <span style={{ ...lineStyle, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
        <span style={{ ...lineStyle, opacity: open ? 0 : 1 }} />
        <span style={{ ...lineStyle, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.25)',
            zIndex: 98,
          }}
        />
      )}

      {/* Drawer */}
      <nav
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EDEDED',
          zIndex: 99,
          paddingBottom: '20px',
          animation: open ? 'slideDown 0.2s ease forwards' : 'slideUp 0.15s ease forwards',
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              padding: '15px 24px',
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
              fontSize: '16px',
              color: '#242424',
              textDecoration: 'none',
              borderBottom: '1px solid #F7F7F7',
            }}
          >
            {link.label}
          </a>
        ))}

        <a
          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
          onClick={() => setOpen(false)}
          style={{
            display: 'block',
            padding: '15px 24px',
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            color: '#EA5949',
            textDecoration: 'none',
            borderBottom: '1px solid #F7F7F7',
          }}
        >
          {phone}
        </a>

        <div style={{ padding: '12px 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={lang === 'uk' ? '/' : '/'}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: lang === 'uk' ? 700 : 400,
              fontSize: '14px',
              color: lang === 'uk' ? '#242424' : '#787878',
              textDecoration: 'none',
            }}
          >
            УКР
          </a>
          <span style={{ color: '#EDEDED', fontSize: '14px' }}>|</span>
          <a
            href={lang === 'en' ? '/en/' : '/en/'}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: lang === 'en' ? 700 : 400,
              fontSize: '14px',
              color: lang === 'en' ? '#242424' : '#787878',
              textDecoration: 'none',
            }}
          >
            EN
          </a>
        </div>
      </nav>
    </>
  );
}
