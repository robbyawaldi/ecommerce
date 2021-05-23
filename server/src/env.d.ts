declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    DOMAIN: string;
    APP_URL:string;
  }
}
