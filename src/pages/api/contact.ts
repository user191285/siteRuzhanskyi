import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  let body: { name?: string; phone?: string; lang?: string };
  try {
    body = await request.json() as { name?: string; phone?: string; lang?: string };
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), { status: 400, headers });
  }

  const { name, phone, lang = 'uk' } = body;

  if (!name?.trim() || !phone?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'Name and phone are required' }), { status: 400, headers });
  }

  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (token && chatId && token !== 'your_bot_token_here') {
    const text = [
      '🔥 НОВИЙ ЗАПИТ НА АУДИТ',
      `👤 Ім'я: ${name.trim()}`,
      `📞 Телефон: ${phone.trim()}`,
      `🌐 Мова інтерфейсу: ${lang}`,
    ].join('\n');

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch {
      /* Telegram failure should not block the user response */
    }
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
