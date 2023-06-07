namespace NodeJS {
  import { Secret } from "jsonwebtoken";
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: Secret;
  }
}
