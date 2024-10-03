import dotenv from 'dotenv';
dotenv.config();

export type Enviroment = {
  NODE_ENV: 'development' | 'production';
  PORT: string;
};

export function getEnv<K extends keyof Enviroment>(key: K, fallback?: Enviroment[K]): Enviroment[K] {
  const value = process.env[key] as Enviroment[K];
  if (!value) {
    if (fallback) {
      return fallback;
    } else {
      throw new Error(`Missing environment variable: ${key}.`);
    }
  }

  return value;
}
