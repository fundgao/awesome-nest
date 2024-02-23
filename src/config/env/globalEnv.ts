import * as envDev from './env.dev';
import * as envLocal from './env.local';
import * as envProd from './env.prod';

const { NODE_ENV } = process.env;

const ENV_MAP = {
  local: envLocal,
  development: envDev,
  production: envProd,
};

const env = ENV_MAP[NODE_ENV];

export default env;
