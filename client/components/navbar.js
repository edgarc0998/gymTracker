import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {Button, Header, Image, Modal, Input} from 'semantic-ui-react'
import {updateCheckInThunk} from '../store/checkIn'

const ModalModalExample = props => {
  return (
    <Modal
      trigger={
        <Button style={{background: 'crimson', color: 'white'}}>
          Daily check in
        </Button>
      }
    >
      <Modal.Header>Check in</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {!props.todaysCheckIn.weight ||
          !props.todaysCheckIn.caloriesBurned ? (
            <React.Fragment>
              <p>You have not checked in today!</p>

              <p>Enter your weight and calories burned for today</p>
              <label>Weight</label>
              <Input id="weightInput" />
              <label>Calories burned</label>
              <Input id="caloriesInput" />
              <Button onClick={() => props.updateCheckIn(props.todaysCheckIn)}>
                Update
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>
                You already checked in today, but you can still make changes!
              </p>

              <p>Enter your weight and calories burned for today</p>
              <label>Weight</label>
              <Input id="weightInput" />
              <label>Calories burned</label>
              <Input id="caloriesInput" />
              <Button onClick={() => props.updateCheckIn(props.todaysCheckIn)}>
                Update
              </Button>
            </React.Fragment>
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
const Navbar = ({handleClick, isLoggedIn, checkIns, updateCheckIn}) => {
  return (
    <React.Fragment>
      <div className="navHeader">
        <div id="appName">
          <img src="/logo.jpeg" id="logo" />
          <h1>Gym Tracker</h1>
        </div>

        {isLoggedIn ? (
          <div className="headerLinks">
            {/* The navbar will show these links after you log in */}
            <ModalModalExample
              todaysCheckIn={checkIns.todaysCheckIn}
              updateCheckIn={updateCheckIn}
            />
            <Link to="/home">Home</Link>
            <Link to="/home/profile">Profile</Link>

            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="headerLinks">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    checkIns: state.checkIns
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    updateCheckIn(checkIn) {
      var weight = document.getElementById('weightInput').value
      var calories = document.getElementById('caloriesInput').value

      var newCheckIn = checkIn
      newCheckIn.weight = weight
      newCheckIn.caloriesBurned = calories

      console.log('new check in', newCheckIn)

      dispatch(updateCheckInThunk(newCheckIn))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  checkIns: PropTypes.object.isRequired,
  updateCheckIn: PropTypes.func.isRequired
}
