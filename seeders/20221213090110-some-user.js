"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "Mahtab Esmaeili",
          email: "mahtabesmaeilii13@gmail.com",
          phoneNumber: 648391204,
          isEmployee: false,
          password: bcrypt.hashSync("mahtab", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "parshan Esmaeilzade",
          email: "parshan@gmail.com",
          phoneNumber: 1234567,
          password: bcrypt.hashSync("parshan", 10),
          isEmployee: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "bahareh",
          email: "bahareh@gmail.com",
          phoneNumber: 1234567,
          password: bcrypt.hashSync("bahare", 10),
          isEmployee: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Parham Esmaeili",
          email: "the.mensroom.b11@gmail.com",
          password: bcrypt.hashSync("parham", 10),
          phoneNumber: 12345678,
          isEmployee: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "asghar esmaeili",
          email: "asghar@gmail.com",
          isEmployee: true,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
