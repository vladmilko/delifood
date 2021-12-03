'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Cuisine, { through: models.Stores_Cuisine, foreignKey: 'store_id', otherKey: 'cuisine_id' });
      this.hasMany(models.Box, {foreignKey: 'store_id'});
    }
  };
  Store.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    store_img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};