'use strict'

const db = require('../server/db')
const {User, Food, DailyCheckIn, UserGoals} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  for (let i = 1; i < 31; i++) {
    var day = i
    if (i < 10) {
      day = '0' + i
    }
    var yesterday = `06-${day}-2019`
    var ranDay = new Date(yesterday)

    await DailyCheckIn.create({
      weight: 200 - i / 4,
      caloriesBurned: 500,
      createdAt: ranDay,
      userId: 1
    })
  }
  var yesterday = `06-01-2019`
  var ranDay = new Date(yesterday)

  await UserGoals.create({
    startingWeight: 200,
    currentWeight: 192.5,
    goalWeight: 180,
    dailyCalories: 2480,
    activityLevel: 1.2,
    goal: 'Lose 2 lbs a week',
    height: 68,
    age: 20,
    updatedAt: ranDay,
    createdAt: ranDay,
    dailyFat: 82,
    dailyCarbs: 279,
    dailyProtein: 186,
    userId: 1
  })

  for (var i = 1; i < 31; i++) {
    var day = i
    if (i < 10) {
      day = '0' + i
    }
    var yesterday = `06-${day}-2019`
    var ranDay = new Date(yesterday)

    var food1 = {
      name: 'chicken',
      calories: 500,
      fat: 5,
      carbs: 0,
      protein: 35,
      time: 'breakfast',
      createdAt: ranDay,
      userId: 1
    }
    var food2 = {
      name: 'rice',
      calories: 500,
      fat: 5,
      carbs: 50,
      protein: 5,
      time: 'lunch',
      createdAt: ranDay,
      userId: 1
    }
    var food3 = {
      name: 'broccoli',
      calories: 300,
      fat: 1,
      carbs: 10,
      protein: 1,
      time: 'dinner',
      createdAt: ranDay,
      userId: 1
    }
    var food4 = {
      name: 'Protein Shake',
      calories: 700,
      fat: 5,
      carbs: 10,
      protein: 70,
      time: 'snacks',
      createdAt: ranDay,
      userId: 1
    }

    await Food.create(food1)
    await Food.create(food2)
    await Food.create(food3)
    await Food.create(food4)
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
