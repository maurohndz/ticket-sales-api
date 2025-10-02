import { TypeOrmConfig } from "../../../../../shared/infrastructure/persistence/typeorm/TypeOrmConfig";

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
        database: 'ticket_sales',
        host: 'localhost',
        password: 'Abc123456*',
        port: 9001,
        username: 'ticket_sales',
        synchronize: false,
        type: 'postgres'
    };
  }
}