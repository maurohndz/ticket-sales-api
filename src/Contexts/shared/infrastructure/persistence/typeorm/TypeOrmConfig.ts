export interface TypeOrmConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    type: 'postgres';
    synchronize: boolean;
    applicationName?: string;
}
