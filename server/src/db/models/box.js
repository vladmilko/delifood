'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Stores, {foreignKey: 'store_id'});
    }
  };
  Box.init({
    name: DataTypes.STRING,
    descr: DataTypes.TEXT,
    count: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    store_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Box',
  });
  return Box;
};