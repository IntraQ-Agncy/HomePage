/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_BREVO_API_KEY: string
  readonly VITE_BREVO_SENDER_EMAIL: string
  readonly VITE_RESEND_API_KEY: string
  readonly VITE_RESEND_SENDER_EMAIL: string
  readonly VITE_SMTP_HOST: string
  readonly VITE_SMTP_PORT: string
  readonly VITE_SMTP_USER: string
  readonly VITE_SMTP_PASS: string
  readonly PAYMENT_LINKS_ResumeAdvisor: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
