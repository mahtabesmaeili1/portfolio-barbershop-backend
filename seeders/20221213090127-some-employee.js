"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "employees",
      [
        {
          fullName: "Parham Esmaeili",
          email: "parhamesmaeili@gmail.com",

          password: bcrypt.hashSync("parham", 10),
          phoneNumber: 12345678,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "asghar esmaeili",
          email: "asghar@gmail.com",

          password: bcrypt.hashSync("asghar", 10),
          phoneNumber: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
