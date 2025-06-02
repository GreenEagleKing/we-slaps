/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAILING_LIST_GOOGLE_FORM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
