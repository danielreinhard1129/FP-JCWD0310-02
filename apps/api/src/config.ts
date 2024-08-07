import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file
export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const BASE_WEB = process.env.NEXT_PUBLIC_BASE_WEB;
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'secret';
