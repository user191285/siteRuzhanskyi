import { useState } from 'react';

interface Props {
  lang?: 'uk' | 'en';
  whatsappNumber?: string;
}

const t = {
  uk: {
    heading: 'Почати роботу над проектом',
    namePlaceholder: "Ваше ім'я",
    phonePlaceholder: 'Номер телефону',
    submitBtn: 'НАДІСЛАТИ ЗАПИТ',
    privacyNote: 'Дані конфіденційні та захищені',
    whatsappBtn: 'Написати в WhatsApp',
    whatsappMsg: "Доброго дня! Мене цікавить первинний пожежний аудит для мого об'єкту.",
    whatsappDesc: "Для оперативного зв'язку та консультацій — напишіть нам у WhatsApp. Відповімо протягом кількох хвилин.",
    successMsg: 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.',
    errorMsg: 'Виникла помилка. Будь ласка, спробуйте ще раз або зателефонуйте нам.',
    sending: 'Надсилається...',
  },
  en: {
    heading: 'Start a Project',
    namePlaceholder: 'Your Name',
    phonePlaceholder: 'Phone Number',
    submitBtn: 'SEND REQUEST',
    privacyNote: 'Your data is confidential and protected',
    whatsappBtn: 'Message on WhatsApp',
    whatsappMsg: 'Hello! I am interested in a fire safety audit for my facility.',
    whatsappDesc: 'For quick contact and consultations — message us on WhatsApp. We reply within minutes.',
    successMsg: 'Thank you! We will contact you shortly.',
    errorMsg: 'An error occurred. Please try again or call us directly.',
    sending: 'Sending...',
  },
};

export default function ContactForm({ lang = 'uk', whatsappNumber = '380XXXXXXXXX' }: Props) {
  const c = t[lang] ?? t.uk;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || status === 'loading' || status === 'success') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), lang }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setName('');
      setPhone('');
    } catch {
      setStatus('error');
    }
  };

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(c.whatsappMsg)}`;

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    color: '#242424',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${focused ? '#EA5949' : '#EDEDED'}`,
    borderRadius: '2px',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  const submitBg = status === 'loading' || status === 'success'
    ? '#D0D0D0'
    : submitHovered
    ? '#3B3B3B'
    : '#EA5949';

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-heading">
          {c.heading}
        </h2>

        <div className="contact-grid">
          {/* Form column */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              placeholder={c.namePlaceholder}
              required
              style={inputStyle(nameFocused)}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              placeholder={c.phonePlaceholder}
              required
              style={inputStyle(phoneFocused)}
            />

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              style={{
                padding: '15px 32px',
                backgroundColor: submitBg,
                color: '#FFFFFF',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '1px',
                border: 'none',
                borderRadius: '2px',
                cursor: status === 'loading' || status === 'success' ? 'default' : 'pointer',
                transition: 'background-color 0.2s',
                alignSelf: 'flex-start',
              }}
            >
              {status === 'loading' ? c.sending : c.submitBtn}
            </button>

            {status === 'success' && (
              <p style={{ color: '#1DCF8E', fontSize: '14px', fontFamily: "'Roboto', sans-serif" }}>
                {c.successMsg}
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#EA5949', fontSize: '14px', fontFamily: "'Roboto', sans-serif" }}>
                {c.errorMsg}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#1DCF8E',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: '12px',
                color: '#787878',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
              }}>
                {c.privacyNote}
              </span>
            </div>
          </form>

          {/* WhatsApp column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '4px' }}>
            <p style={{
              fontSize: '15px',
              color: '#5E5E5E',
              fontFamily: "'Roboto', sans-serif",
              lineHeight: '1.7',
              fontWeight: 400,
            }}>
              {c.whatsappDesc}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                fontSize: '15px',
                borderRadius: '2px',
                alignSelf: 'flex-start',
                transition: 'background-color 0.2s',
                textDecoration: 'none',
              }}
            >
              {c.whatsappBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
