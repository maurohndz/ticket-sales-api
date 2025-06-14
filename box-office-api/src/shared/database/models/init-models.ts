import type { Sequelize } from "sequelize";
import { credential as _credential } from "./credential";
import type { credentialAttributes, credentialCreationAttributes } from "./credential";
import { customer as _customer } from "./customer";
import type { customerAttributes, customerCreationAttributes } from "./customer";

export {
  _credential as credential,
  _customer as customer,
};

export type {
  credentialAttributes,
  credentialCreationAttributes,
  customerAttributes,
  customerCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const credential = _credential.initModel(sequelize);
  const customer = _customer.initModel(sequelize);

  credential.belongsTo(customer, { as: "id_customer", foreignKey: "id"});
  customer.hasOne(credential, { as: "credential", foreignKey: "id"});

  return {
    credential: credential,
    customer: customer,
  };
}
