import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TrackFood from './trackFood'
import {TrackProgress} from './trackProgress.js'
import {TrackWorkoutCard} from './CurrentWorkout'
import Food from './food'
import {withRouter, Route, Switch} from 'react-router-dom'
import Profile from './profile'
import {getGoal} from '../store/userGoals'
import {Button, Card, Image} from 'semantic-ui-react'
import Circle from 'react-circle'
import {FoodSearch} from './foodSearch'
import Progress from './progress'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    window.scrollTo(0, 0)

    const {email} = this.props

    return (
      <div className="userHome">
        <div className="userComponents">
          <Card.Group>
            <Route exact path="/home" component={TrackFood} />
            <Route exact path="/home" component={TrackWorkoutCard} />
            <Route exact path="/home" component={TrackProgress} />
          </Card.Group>
        </div>

        <Route exact path="/home/food" component={Food} />
        <Route path="/home/food/add" component={FoodSearch} />
        <Route exact path="/home/profile" component={Profile} />
        <Route exact path="/home/progress" component={Progress} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
