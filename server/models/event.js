'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User,{
        foreignKey: 'hostUserId',
        onDelete: 'CASCADE'
      })
      Event.hasMany(models.Order,{
        foreignKey: "eventId"
      })
    }
  };
  Event.init({
    eventName: DataTypes.STRING,
    eventStart: DataTypes.DATE,
    eventEnd: DataTypes.DATE,
    eventInfo: DataTypes.STRING(280),
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    numAttendee: DataTypes.INTEGER,
    numOrders: DataTypes.INTEGER,
    food1Name: DataTypes.STRING,
    food1Count: DataTypes.INTEGER,
    food2Name: DataTypes.STRING,
    food2Count: DataTypes.INTEGER,
    food3Name: DataTypes.STRING,
    food3Count: DataTypes.INTEGER,
    hostUserId: DataTypes.INTEGER,
    contactEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};