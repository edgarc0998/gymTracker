import React from 'react'
import {Food} from './food'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getGoal} from '../store/userGoals'

import {Card, Icon, Image} from 'semantic-ui-react'

const TrackFoodCard = props => {
  const allFoods = props.foods
  var foods = allFoods

  if (props.foods[0] !== undefined) {
    const dateNow = new Date()
    foods = foods.filter(food => {
      var date = food.createdAt.slice(8, 10)

      if (date < 10) {
        date = food.createdAt.slice(9, 10)
      }

      if (date === dateNow.getDate().toString()) {
        return food
      }
    })
  }

  var totalCalories = 0
  var totalFat = 0
  var totalCarbs = 0
  var totalProtein = 0

  foods.forEach(food => {
    totalCalories += food.calories
    totalFat += food.fat
    totalProtein += food.protein
    totalCarbs += food.carbs
  })

  return (
    <Card>
      <Image src="/acai.jpg" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Nutrition</Card.Header>
        <Card.Meta>
          <span className="date">Today's totals</span>
        </Card.Meta>
        <Card.Description>
          <p>Total fat: {totalFat}</p>
          <p>Total carbohydrates: {totalCarbs}</p>
          <p>Total protein: {totalProtein}</p>
          <p>Consumed Calories: {totalCalories}</p>
          <p>Remaining Calories: {props.goal.dailyCalories - totalCalories}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to="/home/food" id="addFoodLink">
          Add food
        </Link>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    foods: state.food,
    goal: state.goal,
    user: state.user
  }
}

export default connect(mapStateToProps)(TrackFoodCard)
