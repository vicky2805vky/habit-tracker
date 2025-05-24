import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseURL: string | undefined;
  jwtSecretKey: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseURL: process.env.DATABASE_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY!,
};

export default config;
