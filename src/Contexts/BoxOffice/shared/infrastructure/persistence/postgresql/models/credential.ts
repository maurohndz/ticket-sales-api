import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customer, customerId } from './customer';

export interface credentialAttributes {
  id: string;
  password: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export type credentialPk = "id";
export type credentialId = credential[credentialPk];
export type credentialOptionalAttributes = "status" | "created_at" | "updated_at" | "deleted_at";
export type credentialCreationAttributes = Optional<credentialAttributes, credentialOptionalAttributes>;

export class credential extends Model<credentialAttributes, credentialCreationAttributes> implements credentialAttributes {
  id!: string;
  password!: string;
  status!: boolean;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;

  // credential belongsTo customer via id
  id_customer!: customer;
  getId_customer!: Sequelize.BelongsToGetAssociationMixin<customer>;
  setId_customer!: Sequelize.BelongsToSetAssociationMixin<customer, customerId>;
  createId_customer!: Sequelize.BelongsToCreateAssociationMixin<customer>;

  static initModel(sequelize: Sequelize.Sequelize): typeof credential {
    return sequelize.define('credential', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'credentials',
    schema: 'security',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "credentials_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof credential;
  }
}
