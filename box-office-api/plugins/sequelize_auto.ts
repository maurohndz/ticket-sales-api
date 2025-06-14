// External
import SequelizeAuto from "sequelize-auto";
import type { AutoOptions } from "sequelize-auto";
import '../src/config/loadEnv.js';

const options: AutoOptions = {
    host: process.env.DB_HOST as string,
    dialect: 'postgres',
    directory: './src/shared/database/models',
    port: Number(process.env.DB_PORT),
    caseModel: 'c',
    caseFile: 'c',
    lang: 'esm',
    tables: [
        'customers',
        'credentials',
    ],
    views: true,
    additional: {
        timestamps: true,
        underscored: true,
    },
    singularize: true,
    useDefine: false
};

const auto = new (SequelizeAuto as any)(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    options
);

auto.run().then(() => {
    console.log('Process Completed');
});