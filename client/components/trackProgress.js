import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Circle from 'react-circle'

import {Card, Icon, Image, Button} from 'semantic-ui-react'

function getWeeksLeft(goal) {
  var cals
  if (goal.goal === 'Gain 1 lb a week') {
    cals = 500
  } else if (goal.goal === 'Gain 0.5 lbs a week') {
    cals = 250
  } else if (goal.goal === 'Maintain current weight') {
    cals = 0
  } else if (goal.goal === 'Lose 0.5 lbs a week') {
    cals = 250
  } else if (goal.goal === 'Lose 1 lb a week') {
    cals = 500
  } else if (goal.goal === 'Lose 1.5 lbs a week') {
    cals = 750
  } else if (goal.goal === 'Lose 2 lbs a week') {
    cals = 1000
  }

  var lbsPerWeek = cals * 7 / 3500

  var weeksLeft = (goal.goalWeight - goal.currentWeight) / lbsPerWeek

  return Math.abs(weeksLeft)
}

export const TrackProgress = props => {
  var per = Math.floor(
    (props.goal.currentWeight - props.goal.startingWeight) /
      (props.goal.goalWeight - props.goal.startingWeight) *
      100
  )

  return (
    <Card>
      <Image wrapped ui={false} id="progress">
        <Circle
          progress={per}
          className="image"
          animate={true} // Boolean: Animated/Static progress
          animationDuration="2s" // String: Length of animation
          size="135" // String: Defines the size of the circle.
          lineWidth="50" // String: Defines the thickness of the circle's stroke.
          progressColor="crimson" // String: Color of "progress" portion of circle.
          bgColor="grey" // String: Color of "empty" portion of circle.
          textStyle={{
            font: 'bold 4rem Helvetica, Arial, sans-serif',
            color: 'grey'
          }}
          percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
          roundedStroke={true}
        />
      </Image>
      <Card.Content>
        <Card.Header>Your progress</Card.Header>
        <Card.Meta>
          <span className="date">Started 07/01/19</span>
        </Card.Meta>
        <Card.Description>
          <p>Goal: {props.goal.goal}</p>
          <p>Current weight: {props.goal.currentWeight}</p>
          <p>Goal weight: {props.goal.goalWeight}</p>
          <p>{getWeeksLeft(props.goal)} more weeks until goal reached</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to="/home/progress" id="addFoodLink">
          Track progress
        </Link>{' '}
      </Card.Content>
    </Card>
  )
}

const mapState = state => {
  return {
    goal: state.goal
  }
}

export default connect(mapState)(TrackProgress)
