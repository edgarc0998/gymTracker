const Sequelize = require('sequelize')
const db = require('../db')

const UserGoals = db.define('userGoals', {
  startingWeight: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  currentWeight: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  goalWeight: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  dailyFat: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  dailyCarbs: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  dailyProtein: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  dailyCalories: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  goal: {
    type: Sequelize.STRING
  },
  activityLevel: {
    type: Sequelize.FLOAT
  },
  height: {
    type: Sequelize.INTEGER
  },
  age: {
    type: Sequelize.INTEGER
  },
  startDate: {
    type: Sequelize.STRING
  }
})

UserGoals.addHook('beforeValidate', (user, options) => {
  if (user.startingWeight === null) {
    user.startingWeight = 0
  }
  if (user.currentWeight === null) {
    user.currentWeight = 0
  }
  if (user.goalWeight === null) {
    user.goalWeight = 0
  }
  if (user.dailyCalories === null) {
    user.dailyCalories = 0
  }
  if (user.dailyFat === null) {
    user.dailyFat = 0
  }
  if (user.dailyProtein === null) {
    user.dailyProtein = 0
  }
  if (user.dailyCarbs === null) {
    user.dailyCarbs = 0
  }
  if (user.goal === null) {
    user.goal = 'Maintain weight'
  }
})

module.exports = UserGoals
