import { resolve } from 'path';
import { config } from 'dotenv';

config({
    path: resolve(`./environment/.env.${process.env.ENVIRONMENT}`).trim(),
});
