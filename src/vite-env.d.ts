/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_VERSION: string;
  readonly VITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
