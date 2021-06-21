'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [{
      foodQty1: 3,
      foodQty2: 2,
      foodQty3: null,
      eventId: 1,
      userId: 2,
      eventDate: "7/4/2021",
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    foodQty1: 1,
    foodQty2: 3,
    foodQty3: null,
    eventId: 2,
    userId: 1,
    eventDate: "7/5/2021",
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
