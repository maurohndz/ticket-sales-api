import convict from 'convict';

const boxOfficeConfig = convict({
    env: {
        doc: 'The application environment.',
        format: ['development', 'test'],
        default: 'development',
        env: 'ENVIRONMENT'
    },
    mongo: {
        url: {
            doc: 'The Mongo connection URL',
            format: String,
            env: 'MONGO_URL',
            default: 'mongodb://localhost:9002/mooc-backend-dev'
        }
    },
    typeorm: {
        host: {
            doc: 'The database host',
            format: String,
            env: 'TYPEORM_HOST',
            default: 'localhost'
        },
        port: {
            doc: 'The database port',
            format: Number,
            env: 'TYPEORM_PORT',
            default: 9001
        },
        username: {
            doc: 'The database username',
            format: String,
            env: 'TYPEORM_USERNAME',
            default: 'ticket_sales'
        },
        password: {
            doc: 'The database password',
            format: String,
            env: 'TYPEORM_PASSWORD',
            default: 'Abc123456*'
        },
        database: {
            doc: 'The database name',
            format: String,
            env: 'TYPEORM_DATABASE',
            default: 'box-office'
        },
        application: {
            doc: 'The Application name',
            format: String,
            env: 'TYPEORM_APPLICATION',
            default: 'API-SALES*'
        },
    },
});

boxOfficeConfig.loadFile([
    `${__dirname}/default.config.json`,
    `${__dirname}/${boxOfficeConfig.get('env')}.config.json`
]);

export default boxOfficeConfig;
