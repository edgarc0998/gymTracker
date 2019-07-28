const router = require('express').Router()
const UserGoals = require('../db/models/userGoals')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const goals = await UserGoals.findOne({
      where: {
        userId: req.params.id
      }
    })
    res.json(goals)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const goal = await UserGoals.findOne({
      where: {
        userId: req.body.userId
      }
    })

    await goal.update(req.body)

    res.json(goal)
  } catch (err) {
    next(err)
  }
})
