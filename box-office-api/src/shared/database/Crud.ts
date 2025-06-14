import { Model } from 'sequelize';

class Crud {
    model: Model;

    constructor(model: Model) {
        this.model = model;
    }
}

export default Crud;