/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TELEGRAM_BOT_TOKEN: string;
  readonly TELEGRAM_CHAT_ID: string;
  readonly WHATSAPP_NUMBER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
