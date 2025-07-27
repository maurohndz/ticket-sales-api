import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';
import { CustomerEntity } from '../../../../BoxOffice/Customer/infrastructure/persistence/typeorm/CustomerEntity';

export class TypeOrmClientFactory {
  private static dataSources: { [key: string]: DataSource } = {};

  static async createDataSource(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    console.log(config)
    let dataSource = TypeOrmClientFactory.getDataSource(contextName);

    if (!dataSource) {
      dataSource = await TypeOrmClientFactory.createAndConnectDataSource(config);
      TypeOrmClientFactory.registerDataSource(dataSource, contextName);
    }

    return dataSource;
  }

  private static getDataSource(contextName: string): DataSource | undefined {
    return TypeOrmClientFactory.dataSources[contextName];
  }

  private static async createAndConnectDataSource(config: TypeOrmConfig): Promise<DataSource> {
    console.log(__dirname + '/../');
    const dataSource = new DataSource({
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [ CustomerEntity ],
      synchronize: config.synchronize,
      // ...otros parámetros según tu config
    });

    await dataSource.initialize();
    return dataSource;
  }

  private static registerDataSource(dataSource: DataSource, contextName: string): void {
    TypeOrmClientFactory.dataSources[contextName] = dataSource;
  }
}
