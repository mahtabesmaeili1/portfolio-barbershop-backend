"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "customers",
      [
        {
          fullName: "Mahtab Esmaeili",
          email: "mahtabesmaeilii13@gmail.com",
          phoneNumber: 648391204,
          password: bcrypt.hashSync("mahtab", 10),

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "parshan Esmaeilzade",
          email: "parshan@gmail.com",
          phoneNumber: 1234567,
          password: bcrypt.hashSync("parshan", 10),

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "bahareh",
          email: "bahareh@gmail.com",
          phoneNumber: 1234567,
          password: bcrypt.hashSync("bahare", 10),

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
