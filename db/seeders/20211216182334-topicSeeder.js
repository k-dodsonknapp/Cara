'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Topics', [
      {
        name: "cars",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "trucks",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sedans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "convertibles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "minivans",
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
    return queryInterface.bulkDelete('Topics', null, {});
  }
};
