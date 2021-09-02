'use strict';

const { isNull } = require("util");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [{
      eventName: "July 4th Party",
      eventStart: "7/4/2021",
      eventEnd: "7/4/2021",
      eventInfo: "This is a fourth of july 4th party for the ages!!",
      address: "1002 Stew Garage rd",
      address2: null,
      city: "Austin",
      state: "TX",
      zip: "10012-1007",
      numAttendee: 0,
      numOrders: 0,
      food1Name: "Hot Dog",
      food1Count: 0,
      food2Name: "Cheese Burger",
      food2Count: 0,
      food3Name: null,
      food3Count: null,
      hostUserId: 1,
      contactEmail: 'stooge1Event@nasa.gov',
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    eventName: "July 5th Party",
    eventStart: "7/5/2021",
    eventEnd: "7/5/2021",
    eventInfo: "This is a fourth of july 4th after party for the ages!!",
    address: "1002 Brew Garage rd",
    address2: null,
    city: "Austin",
    state: "TX",
    zip: "10012-1007",
    numAttendee: 0,
    numOrders: 0,
    food1Name: "Ice Cream",
    food1Count: 0,
    food2Name: "Fries",
    food2Count: 0,
    food3Name: null,
    food3Count: null,
    hostUserId: 2,
    contactEmail: 'stooge3Event@nasa.gov',
    createdAt: new Date(),
    updatedAt: new Date()
}
], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
