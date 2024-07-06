import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file
// export const BASE_WEB = process.env.NEXT_PUBLIC_BASE_WEB;
export const BASE_WEB = 'http://localhost:3000';
// export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const BASE_API_URL = ' http://localhost:8000/api';
export const MIDTRANS_SERVER_KEY =
  process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-4cYcw3BK6x1WaAaTZMHEOniw';
export const NEXT_PUBLIC_MIDTRANS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ||
  'SB-Mid-client-2wjC3JcJ_d0CDake';
export const GOOGLE_OAUTH_CLIENT_ID =
  process.env.GOOGLE_OAUTH_CLIENT_ID ||
  '1011550293386-qsguse89qv5jkntlvvpojpes18a53ma6.apps.googleusercontent.com';
export const GOOGLE_OAUTH_CLIENT_SECRET =
  process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
  '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';
