import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
  private static dataSources: { [key: string]: DataSource } = {};

  static async createDataSource(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    let dataSource = TypeOrmClientFactory.getDataSource(contextName);

    if (!dataSource) {
      dataSource = await TypeOrmClientFactory.createAndConnectDataSource(config, contextName);
      TypeOrmClientFactory.registerDataSource(dataSource, contextName);
    }

    return dataSource;
  }

  private static getDataSource(contextName: string): DataSource | undefined {
    return TypeOrmClientFactory.dataSources[contextName];
  }

  private static async createAndConnectDataSource(config: TypeOrmConfig, contextName: string): Promise<DataSource> {
    const dataSource = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [ __dirname + '/../../../../**/*/infrastructure/persistence/typeorm/*{.js,.ts}' ],
      synchronize: false,
      extra: {
        application_name: config?.applicationName ?? contextName,
      }
    });

    await dataSource.initialize();
    return dataSource;
  }

  private static registerDataSource(dataSource: DataSource, contextName: string): void {
    TypeOrmClientFactory.dataSources[contextName] = dataSource;
  }
}
