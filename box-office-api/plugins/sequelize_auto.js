// External
import SequelizeAuto from "sequelize-auto";
import '../src/config/loadEnv.js';

const options = {
    lang: 'ts',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    directory: './src/shared/database/models',
    port: Number(process.env.DB_PORT),
    caseModel: 'c',
    caseFile: 'c',
    tables: [
        'customers',
        'credentials',
    ],
    views: true,
    additional: {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    },
    singularize: true,
    useDefine: true,
};

const auto = new SequelizeAuto(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    options
);

auto.run().then(() => {
    console.log('Process Completed');
});