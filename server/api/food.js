const router = require('express').Router()
const {Food} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const foods = await Food.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(foods)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const food = await Food.create(req.body)
    res.json(food)
  } catch (err) {
    next(err)
  }
})
