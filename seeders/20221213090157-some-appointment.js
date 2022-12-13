"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "appointments",
      [
        {
          date: "2017-09-01 14:00",
          done: true,
          paid: true,
          customerId: 1,
          serviceId: 3,
          employeeId: 1,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01 1:30",
          customerId: 2,
          done: false,
          paid: true,
          serviceId: 1,
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01 12:30",
          customerId: 3,
          done: true,
          paid: false,
          serviceId: 2,
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01 7:30",
          customerId: 2,
          done: true,
          paid: true,
          serviceId: 2,
          employeeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2017-09-01 4:30",
          customerId: 1,
          done: false,
          paid: false,
          serviceId: 1,
          employeeId: 1,
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
