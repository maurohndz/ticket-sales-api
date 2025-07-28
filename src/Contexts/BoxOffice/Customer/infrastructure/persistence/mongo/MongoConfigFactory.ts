import MongoConfig from '../../../../../shared/infrastructure/persistence/mongo/MongoConfig'
import config from '../../config'

const mongoConfig = {
    url: config.get('mongo.url'),
}

export class MongoClientFactory {
    static createConfig(): MongoConfig {
        return mongoConfig;
    }
}
