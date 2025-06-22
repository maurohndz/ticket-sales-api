import fs from 'fs';
import SequelizeAuto from 'sequelize-auto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import '../../../../../../../shared/utils/loadEnv.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = resolve(__dirname, './../models');

const options = {
    lang: 'ts',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    directory: outputDir,
    port: Number(process.env.DB_PORT),
    caseModel: 'c',
    caseFile: 'c',
    tables: ['customers', 'credentials'],
    views: true,
    additional: {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
    singularize: true,
    useDefine: true,
};

console.log('Configuración de conexión:');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('Database:', process.env.DB_NAME);
console.log('User:', process.env.DB_USER);
console.log('Password:', process.env.DB_PASSWORD ? '***' : 'NO CONFIGURADA');
console.log('Directorio de salida:', outputDir);

const auto = new SequelizeAuto(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    options
);

auto.run().then(() => {
    console.log('Proceso completado exitosamente');
}).catch((error) => {
    console.error('Error durante la generación de modelos:', error.message);
    process.exit(1);
});
