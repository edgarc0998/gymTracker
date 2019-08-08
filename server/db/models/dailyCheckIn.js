const Sequelize = require('sequelize')
const db = require('../db')

const DailyCheckIn = db.define('checkIn', {
  weight: {
    type: Sequelize.INTEGER
  },
  caloriesBurned: {
    type: Sequelize.INTEGER
  }
})

module.exports = DailyCheckIn
