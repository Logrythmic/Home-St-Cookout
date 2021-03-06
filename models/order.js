'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Event,{
        foreignKey: 'eventId',
        onDelete: 'CASCADE'
      })
      Order.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  };
  Order.init({
    foodQty1: DataTypes.INTEGER,
    foodQty2: DataTypes.INTEGER,
    foodQty3: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    eventDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};