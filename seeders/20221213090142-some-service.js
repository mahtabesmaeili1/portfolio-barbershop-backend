"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "services",
      [
        {
          name: "Men - Haircut",
          price: 22,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Men - Beard",
          price: 15,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Men Haircut & Beard",
          price: 31,

          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Men Hairwash & Haircut & Styling",
          price: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("services", null, {});
  },
};
