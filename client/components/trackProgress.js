import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Circle from 'react-circle'

import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {generateKeyPair} from 'crypto'

export const TrackProgress = props => {
  return (
    <Card>
      <Image wrapped ui={false} id="progress">
        <Circle
          progress={60}
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
          <p>Goal: gain muscle</p>
          <p>Current weight: 190</p>
          <p>Goal weight: 200</p>
          <p>10 more weeks until goal reached</p>
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
