export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DIRECT_URL: string;
      PDF_LAYOUT_URL: string;
      PORT: string;
    }
  }
}
