import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {Card, Icon, Image} from 'semantic-ui-react'

export const TrackWorkoutCard = props => {
  return (
    <Card>
      <Image src="/workout.jpg" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Today's workout</Card.Header>
        <Card.Meta>
          <span className="date">Push day</span>
        </Card.Meta>
        <Card.Description>Chest, shoulders, triceps</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to="/home/workout" id="addFoodLink">
          See workouts
        </Link>
      </Card.Content>
    </Card>
  )
}
