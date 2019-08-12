const router = require('express').Router()
const {DailyCheckIn, UserGoals} = require('../db/models')
var Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const checkIns = await DailyCheckIn.findAll({
      where: {
        userId: req.user.id
      }
    })

    const dateNow = new Date()
    var todaysDate

    var year = dateNow.getFullYear().toString()
    var month = (dateNow.getMonth() + 1).toString()
    var day = dateNow.getDate().toString()

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }

    todaysDate = year + '-' + month + '-' + day
    var todaysCheckIn = {}

    for (let i = 0; i < checkIns.length; i++) {
      var time = checkIns[i].dataValues.createdAt
      var newyear = time.getFullYear().toString()
      var newmonth = (time.getMonth() + 1).toString()
      var newday = time.getDate().toString()

      if (newmonth < 10) {
        newmonth = '0' + newmonth
      }
      if (newday < 10) {
        newday = '0' + newday
      }

      var newDate = newyear + '-' + newmonth + '-' + newday
      if (newDate === todaysDate) {
        todaysCheckIn = checkIns[i]
      }
    }

    if (!todaysCheckIn.createdAt) {
      todaysCheckIn = await DailyCheckIn.create({
        userId: req.user.id
      })
    }

    res.json({checkIns, todaysCheckIn})
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    var checkIn = await DailyCheckIn.findOne({
      where: {
        createdAt: req.body.createdAt
      }
    })

    var userGoal = await UserGoals.findOne({
      where: {
        userId: req.user.id
      }
    })

    await userGoal.update({
      currentWeight: req.body.weight
    })

    await checkIn.update(req.body)
  } catch (err) {
    next(err)
  }
})
