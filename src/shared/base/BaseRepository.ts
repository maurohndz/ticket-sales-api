import CommonError from './BaseError.js';
import { Model, ModelStatic, FindOptions, CreateOptions, UpdateOptions, DestroyOptions, Transaction, WhereOptions, Order, IncludeOptions } from 'sequelize';

// Interfaz para el logger
interface Logger {
    error(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
}

// Interfaz para los parámetros de count
interface CountParams {
    where?: WhereOptions;
    order?: Order;
    include?: IncludeOptions;
    transaction?: Transaction;
}

// Interfaz para los parámetros de index
interface IndexParams {
    where?: WhereOptions;
    order?: Order;
    attributes?: string[];
    include?: IncludeOptions;
    offset?: number;
    limit?: number;
    transaction?: Transaction;
    paranoid?: boolean;
}

// Interfaz para los parámetros de show
interface ShowParams {
    where?: WhereOptions;
    order?: Order;
    attributes?: string[];
    include?: IncludeOptions;
    transaction?: Transaction;
}

// Interfaz para los parámetros de showOrFail
interface ShowOrFailParams extends ShowParams {
    customError?: string;
}

// Interfaz para los parámetros de store
interface StoreParams<T = any> {
    validation?: WhereOptions;
    payload: Partial<T>;
    fields?: string[];
    include?: IncludeOptions;
}

// Interfaz para los parámetros de update
interface UpdateParams<T = any> {
    validation?: WhereOptions;
    where: WhereOptions;
    payload: Partial<T>;
}

// Interfaz para los parámetros de destroy
interface DestroyParams {
    where: WhereOptions;
    force?: boolean;
}

// Interfaz para el constructor
interface BaseRepositoryConstructor<T extends Model = Model> {
    model: ModelStatic<T>;
    logger?: Logger;
}

export class BaseRepository<T extends Model = Model> {
    protected model: ModelStatic<T>;
    protected logger?: Logger;

    constructor({ model, logger }: BaseRepositoryConstructor<T>) {
        this.model = model;
        this.logger = logger;
    }

    /**
     * Count records
     * @param params - Parámetros de búsqueda
     * @returns Promise<number> - Número de registros encontrados
     */
    async count(params: CountParams = {}): Promise<number> {
        const { where, order, include, transaction } = params;
        
        try {
            return await this.model.count({
                ...(where && { where }),
                ...(order && { order }),
                ...(include && { include }),
                ...(transaction && { transaction })
            });
        } catch (error) {
            this.logger?.error(`[DATABASE] Count error: ${error}`);
            throw new CommonError('server');
        }
    }

    /**
     * Get all records (index)
     * @param params - Parámetros de búsqueda
     * @returns Promise<T[]> - Array de registros encontrados
     */
    async index(params: IndexParams = {}): Promise<T[]> {
        const { where, order, attributes, include, offset, limit, transaction, paranoid = true } = params;
        
        try {
            const data = await this.model.findAll({
                ...(where && { where }),
                ...(order && { order }),
                ...(attributes && { attributes }),
                ...(include && { include }),
                ...((limit || offset) && { offset, limit }),
                ...(transaction && { transaction }),
                paranoid
            });

            return data;
        } catch (error) {
            this.logger?.error(`[DATABASE] Index error: ${error}`);
            throw new CommonError('server');
        }
    }

    /**
     * Get one record (show)
     * @param params - Parámetros de búsqueda
     * @returns Promise<T | null> - Registro encontrado o null
     */
    async show(params: ShowParams = {}): Promise<T | null> {
        const { where, order, attributes, include, transaction } = params;
        
        try {
            return await this.model.findOne({
                ...(where && { where }),
                ...(order && { order }),
                ...(attributes && { attributes }),
                ...(include && { include }),
                ...(transaction && { transaction })
            });
        } catch (error) {
            this.logger?.error(`[DATABASE] Show error: ${error}`);
            throw new CommonError('server');
        }
    }

    /**
     * Get one record or throw an error if not found (showOrFail)
     * @param params - Parámetros de búsqueda
     * @returns Promise<T> - Registro encontrado
     * @throws CommonError si no se encuentra el registro
     */
    async showOrFail(params: ShowOrFailParams = {}): Promise<T> {
        const { customError = 'not_found', ...showParams } = params;
        
        try {
            const record = await this.show(showParams);
            
            if (!record) {
                throw new CommonError(customError);
            }

            return record;
        } catch (error) {
            if (error instanceof CommonError) {
                throw error;
            }
            this.logger?.error(`[DATABASE] ShowOrFail error: ${error}`);
            throw new CommonError('server');
        }
    }

    /**
     * Create a record (store)
     * @param params - Parámetros de creación
     * @param transaction - Transacción de Sequelize
     * @returns Promise<T> - Registro creado
     */
    async store(params: StoreParams<T> = {} as StoreParams<T>, transaction?: Transaction): Promise<T> {
        const { validation, payload, fields, include } = params;
        
        try {
            // Validación previa si se especifica
            if (validation) {
                const exist = await this.show({ where: validation, transaction });
                if (exist) {
                    throw new CommonError('exists');
                }
            }

            const record = await this.model.create(payload as any, {
                transaction,
                ...(fields && { fields })
            });

            // Si se especifica include, buscar el registro con las relaciones
            if (include) {
                return await this.show({ 
                    where: { id: record.get('id') as any }, 
                    include, 
                    transaction 
                }) as T;
            }

            return record;
        } catch (error) {
            if (error instanceof CommonError) {
                throw error;
            }
            this.logger?.error(`[DATABASE] Store error: ${error}`);
            throw new CommonError('server');
        }
    }

    /**
     * Update a record
     * @param params - Parámetros de actualización
     * @param transaction - Transacción de Sequelize
     * @returns Promise<T> - Registro actualizado
     */
    async update(params: UpdateParams<T> = {} as UpdateParams<T>, transaction?: Transaction): Promise<T> {
        const { validation, where, payload } = params;
        
        if (!where) {
            throw new CommonError('not_found');
        }

        try {
            // Validación previa si se especifica
            if (validation) {
                const exist = await this.show({ where: validation, transaction });
                if (exist) {
                    throw new CommonError('exists');
                }
            }

            const [affectedCount, affectedRows] = await this.model.update(payload as any, {
                transaction,
                where,
                returning: true
            });

            if (affectedCount === 0) {
                throw new CommonError('not_found');
            }

            return affectedRows[0] as T;
        } catch (error) {
            if (error instanceof CommonError) {
                throw error;
            }
            this.logger?.error(`[DATABASE] Update error: ${error}`);
            throw new CommonError('server');
        }
    }

    /**
     * Delete a record (destroy)
     * @param params - Parámetros de eliminación
     * @param transaction - Transacción de Sequelize
     * @returns Promise<number> - Número de registros eliminados
     */
    async destroy(params: DestroyParams = {} as DestroyParams, transaction?: Transaction): Promise<number> {
        const { where, force = false } = params;
        
        if (!where) {
            throw new CommonError('server');
        }

        try {
            return await this.model.destroy({
                transaction,
                where,
                force
            });
        } catch (error) {
            this.logger?.error(`[DATABASE] Destroy error: ${error}`);
            throw new CommonError('server');
        }
    }
}