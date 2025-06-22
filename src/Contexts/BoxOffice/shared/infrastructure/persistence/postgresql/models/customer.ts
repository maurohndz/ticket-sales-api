import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface customerAttributes {
  id: string;
  names: string;
  last_name: string;
  email: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export type customerPk = "id";
export type customerId = customer[customerPk];
export type customerOptionalAttributes = "id" | "status" | "created_at" | "updated_at" | "deleted_at";
export type customerCreationAttributes = Optional<customerAttributes, customerOptionalAttributes>;

export class customer extends Model<customerAttributes, customerCreationAttributes> implements customerAttributes {
  id!: string;
  names!: string;
  last_name!: string;
  email!: string;
  status!: boolean;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof customer {
    return sequelize.define('customer', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "customers_email_key"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'customers',
    schema: 'main',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "customers_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "customers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof customer;
  }
}
