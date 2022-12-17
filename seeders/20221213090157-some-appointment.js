"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "appointments",
      [
        {
          date: "2017-09-01 ",
          time: "14:00",
          done: true,
          paid: true,
          userId: 1,
          serviceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01 ",
          time: "13:30",
          userId: 2,
          done: false,
          paid: true,
          serviceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01",
          time: "11:00",
          userId: 3,
          done: true,
          paid: false,
          serviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01",
          time: "08:00",
          userId: 2,
          done: true,
          paid: true,
          serviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01",
          time: "16:30",
          userId: 1,
          done: false,
          paid: false,
          serviceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
