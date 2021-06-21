'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      eventStart: {
        type: Sequelize.DATE
      },
      eventEnd: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      address2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      numAttendee: {
        type: Sequelize.INTEGER
      },
      numOrders: {
        type: Sequelize.INTEGER
      },
      food1Name: {
        type: Sequelize.STRING
      },
      food1Count: {
        type: Sequelize.INTEGER
      },
      food2Name: {
        type: Sequelize.STRING
      },
      food2Count: {
        type: Sequelize.INTEGER
      },
      food3Name: {
        type: Sequelize.STRING
      },
      food3Count: {
        type: Sequelize.INTEGER
      },
      hostUserId: {
        type: Sequelize.INTEGER
      },
      contactEmail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};