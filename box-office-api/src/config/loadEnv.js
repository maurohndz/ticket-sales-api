import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: resolve(`./environment/.env.${process.env.ENVIRONMENT}`).trim()
});
