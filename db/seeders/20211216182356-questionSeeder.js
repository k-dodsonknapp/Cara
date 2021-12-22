'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Questions', [
      {
        title: "When should I replace my tires?",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 1,
      },
      {
        title: "What Car Should I Buy?",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 2,
      },
      {
        title: "Do I really need to use the more expensive gas?",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 3,
      },
      {
        title: "Why do signal lights sometimes blink faster?",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 4,
      },
      {
        title: "How long can you really go without changing your oil?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 5,
      },
      {
        title: "What's the difference between torque and horsepower?",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 1,
      },
      {
        title: "Is it cheaper to change your own brake pads?",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 2,
      },
      {
        title: "Am I the only that doesn't thrash rental cars?",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 3,
      },
      {
        title: "What removes oxidation from headlights?",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 4,
      },
      {
        title: "2021 Ford Bronco Misses Top Safety Pick Award over Head Restraints, Lights, whats next?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 5,
      },
      {
        title: "Are there any cars you own/have owned that you thought you would hate but actually like?",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 1,
      },
      {
        title: "Which cars were made as three seaters?",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 2,
      },
      {
        title: "Is Matt Farah a dangerous driver?",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 3,
      },
      {
        title: "I always see new, low mileage cars turn up on CarMax. Besides not being able to afford it, why do people turn in new cars to them so often?",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 4,
      },
      {
        title: "What is the most capable STOCK off-road vehicle?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 5,
      },
      {
        title: "I replaced on tire and wheel, now car feels heavier, slugish, what do I do?",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        topicsId: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
