'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [
      {
        username: "car_guy1982",
        email: "ilovecars@car.com",
        hashedPassword: bcrypt.hashSync("P@ssword", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "i-have-a-truck98",
        email: "ilovetrucks@truck.com",
        hashedPassword: bcrypt.hashSync("P@ssword", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        username: "beater_truck76",
        email: "beaternum1@truck.com",
        hashedPassword: bcrypt.hashSync("P@ssword", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        username: "subaruChick90",
        email: "ilovesubarus@car.com",
        hashedPassword: bcrypt.hashSync("P@ssword", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        username: "goingtogettowed",
        email: "towedcar@car.com",
        hashedPassword: bcrypt.hashSync("P@ssword", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
