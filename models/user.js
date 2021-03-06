'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Event,{
        foreignKey: 'hostUserId'
      })
      User.hasMany(models.Order,{
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    loginStrategy: DataTypes.STRING,
    loginStrategyId: DataTypes.STRING,
    username: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isVendor: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};