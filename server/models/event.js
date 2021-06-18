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
    }
  };
  Event.init({
    eventName: DataTypes.STRING,
    eventStart: DataTypes.DATE,
    eventEnd: DataTypes.DATE,
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    numAttendee: DataTypes.INTEGER,
    numOrders: DataTypes.INTEGER,
    food1: DataTypes.INTEGER,
    food2: DataTypes.INTEGER,
    food3: DataTypes.INTEGER,
    hostUserId: DataTypes.INTEGER,
    contactEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};