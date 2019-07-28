const Sequelize = require('sequelize')
const db = require('../db')

const Food = db.define('food', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  calories: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fat: {
    type: Sequelize.INTEGER
  },
  carbs: {
    type: Sequelize.INTEGER
  },
  protein: {
    type: Sequelize.INTEGER
  },
  time: {
    type: Sequelize.STRING
  }
})

module.exports = Food
