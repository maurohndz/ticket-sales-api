import { Sequelize } from 'sequelize';

/**
 * Conexión a la base de datos PostgreSQL usando Sequelize.
 * Asegúrate de que las variables de entorno estén correctamente definidas.
 */
const DataBase = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false,
    },
    timezone: '-04:00',
    logging: true
  }
);

export default DataBase;