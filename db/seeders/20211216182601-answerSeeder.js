'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Answers', [
      {
        body: "I’ll start. My first car I ever drove was my dad’s 11 CTS-V automatic. I wasn’t into cars at all at the time, thought it was an old car. Had no idea I was in a fancy corvette with 500 hp to the rear wheels. Now I know what it is and I still can’t believe that’s what he decided to let a 16 year old learn to drive in",
        userId: 3,
        questionId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "It could be a space issue under the car. It might be easier to fit two smaller mufflers than one large muffler.",
        userId: 5,
        questionId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "i think its to make the car quieter? doesn’t the toyota century have something like five mufflers",
        userId: 1,
        questionId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "Plenty of people do it on those roads but that's not a justification. I personally think what he does is slightly worse just because there is a profit incentive in it for him instead of just going out for fun. If he is going to be making money off potentially endangering the public, I do have a very slight problem with that. If he does ever run over a cyclist on a blind corner, it is going to be a nightmare of a defense for his attorneys given the literally weeks of video evidence establishing a pattern. The thing is, he knows his family can afford the best legal defense.",
        userId: 2,
        questionId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "To be fair there is lots of that in the Jeep world. Drive a stock keep and no wave, drive a modified jeep and get wave. That behavior has only increased since the 4 door wranglers hit the market in 07, back in the 2 door days it was more of an enthusiast vehicle than it is now.",
        userId: 5,
        questionId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "This reminds me of the time, a few years ago, after I got my 2014 wrangler unlimited I went up to the San Bernardino mountains with a couple friends in my car to casually try out the 4x4. As I was driving up the trail I saw it widen into a bigger area before a steep incline, and a group of modified XJs were parked there. One guy was desperately trying to drive up the incline but kept sliding back down and everyone else was cheering him on. Looked like a lot of fun. I asked if I could go ahead, and if they could spot me, because that guy sliding down the hill seemed kind of sketch and they said sure. ...And then my new and very unmodified wrangler toodled up the hill like it was a suburban neighborhood street.",
        userId: 5,
        questionId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "The 2.5 doesn’t deserve the hate it gets. It’s not a do-it-all tool, but around town the fuel economy is great (by AMC inline pattern standards), and on the trails it’s plenty torquey to keep up with 4.0s",
        userId: 4,
        questionId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "I drive a wrangler and love to wave at cherokees. They’re dope",
        userId: 5,
        questionId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "Any rental car",
        userId: 1,
        questionId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "Legit watched a guy take his Taurus wagon off jumps while I was crownland camping one year. It didn't have to get trailered out of the site, unlike the Chevy Silverado that was also going off jumps that did",
        userId: 2,
        questionId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "I always wonder about the rental insurance, if you go yolo and get the most expensive coverage does that mean you can borderline total the car and walk away scot free? Lol",
        userId: 1,
        questionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "The looks I got driving a rented Kia Soul at Nellis Dunes🤣🤣. The Jeep and Subaru guys were impressed",
        userId: 3,
        questionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "Took my rental Navigator off road. Goddamn that was some luxurious fun.",
        userId: 4,
        questionId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "The insurance and took one to a demolition derby.",
        userId: 3,
        questionId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "The Audi Q5 is great on a little offroad trail. Has no trouble finding grip in sandy conditions, not sure how I know that though...",
        userId: 2,
        questionId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: "Probably cheating but some logging industry vehicle. Those things go over terrain that I wouldn't even want to walk on.",
        userId: 1,
        questionId: 16,
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
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
