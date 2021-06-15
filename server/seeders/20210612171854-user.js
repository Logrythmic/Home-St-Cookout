'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Larry',
      lastName: 'Stooge',
      email: 'stooge1@nasa.gov',
      phoneNumber: '555-444-5454',
      isVendor: false,
      address: '123 some rd',
      address2: 'apt# 202',
      city: 'Austin',
      state: 'TX',
      zip: '10012-1007',
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    firstName: 'Curly',
    lastName: 'Stooge',
    email: 'stooge2@nasa.gov',
    phoneNumber: '555-444-5478',
    isVendor: false,
    address: '123 some rd',
    address2: 'apt# 203',
    city: 'Austin',
    state: 'TX',
    zip: '10012-1007',
    createdAt: new Date(),
    updatedAt: new Date()
},
{
  firstName: 'Moe',
  lastName: 'Stooge',
  email: 'stooge3@nasa.gov',
  phoneNumber: '555-444-5465',
  isVendor: false,
  address: '123 some rd',
  address2: 'apt# 204',
  city: 'Austin',
  state: 'TX',
  zip: '10012-1007',
  createdAt: new Date(),
  updatedAt: new Date()
}], {});
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
