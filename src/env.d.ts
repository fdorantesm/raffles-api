declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // ENVIRONMENT
      NODE_ENV: STRING;

      // SERVER
      HOST: string;
      PORT: string;
      ENV?: 'development' | 'production';
      RATE_MAX_REQUEST?: string;
      RATE_INTERVAL?: string;

      // JWT
      JWT_SECRET: string;
      JWT_EXPIRES: string;

      // Database
      DB_HOST: string;
      DB_PORT?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_DATABASE: string;

      // Storage
      STORAGE_ENDPOINT?: string;
      STORAGE_REPOSITORY?: string;
      STORAGE_PUBLIC_KEY?: string;
      STORAGE_PRIVATE_KEY?: string;

      EMAIL_FROM: string;
      EMAIL_REGION: string;
      EMAIL_PUBLIC_KEY?: string;
      EMAIL_SECRET_KEY?: string;
      EMAIL_BCC?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
