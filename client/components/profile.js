import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {postFood} from '../store/food'
import {Button, Modal, Form, Input, Header} from 'semantic-ui-react'
import {updateGoal, getGoal} from '../store/userGoals'
import axios from 'axios'
import {Select} from 'semantic-ui-react'
import {VictoryPie} from 'victory'

var options = [
  <option value="5">5</option>,
  <option value="10">10</option>,
  <option value="15">15</option>,
  <option value="20">20</option>,
  <option value="25">25</option>,
  <option value="30">30</option>,
  <option value="35">35</option>,
  <option value="40">40</option>,
  <option value="45">45</option>,
  <option value="50">50</option>,
  <option value="55">55</option>,
  <option value="60">60</option>,
  <option value="65">65</option>,
  <option value="70">70</option>,
  <option value="75">75</option>,
  <option value="80">80</option>,
  <option value="85">85</option>,
  <option value="90">90</option>,
  <option value="95">95</option>,
  <option value="100">100</option>
]

class ModalModalExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  open = () => this.setState({open: true})
  close = () => this.setState({open: false})

  render() {
    return (
      <Modal
        open={this.state.open}
        trigger={<Button onClick={() => this.open()}>Modify Goals</Button>}
      >
        <Modal.Header>Modify Goals</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Do you want to change your goals</Header>
            <p>This will set your start date to today.</p>
            <Button
              onClick={() => {
                this.close()
                this.props.modifyGoals()
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                this.close()
              }}
            >
              No
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      goal: {
        dailyFat: 0,
        dailyCarbs: 0,
        dailyProtein: 0,
        dailyCalories: 0,
        currentWeight: 0,
        startingWeight: 0,
        goalWeight: 0,
        activityLevel: '1.2',
        age: '0',
        height: '0',
        goal: 'maintain'
      },
      changeGoal: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.modifyGoals = this.modifyGoals.bind(this)
    this.getMacros = this.getMacros.bind(this)
    this.modifyMacros = this.modifyMacros.bind(this)
  }

  getMacros() {
    var cals = this.props.goal.dailyCalories

    var fat = document.getElementById('fat')
    fat = fat.options[fat.selectedIndex].value

    var carbs = document.getElementById('carbs')
    carbs = carbs.options[carbs.selectedIndex].value

    var protein = document.getElementById('protein')
    protein = protein.options[protein.selectedIndex].value

    var fatCals = Math.floor(cals * (fat / 100) / 9)
    var carbCals = Math.floor(cals * (carbs / 100) / 4)
    var proteinCals = Math.floor(cals * (protein / 100) / 4)

    this.setState({
      goal: {
        dailyCarbs: carbCals,
        dailyFat: fatCals,
        dailyProtein: proteinCals
      }
    })
  }

  modifyMacros() {
    var fat = document.getElementById('fat')
    fat.disabled = !fat.disabled
    var carbs = document.getElementById('carbs')
    carbs.disabled = !carbs.disabled
    var protein = document.getElementById('protein')
    protein.disabled = !protein.disabled
    var saveChangesMacros = document.getElementById('save-changesMacros')
    saveChangesMacros.disabled = !saveChangesMacros.disabled
  }

  modifyGoals() {
    var startingWeight = document.getElementById('startingWeight')
    startingWeight.disabled = !startingWeight.disabled
    var goalWeight = document.getElementById('goalWeight')
    goalWeight.disabled = !goalWeight.disabled
    var age = document.getElementById('age')
    age.disabled = !age.disabled
    var height = document.getElementById('height')
    height.disabled = !height.disabled
    var goal = document.getElementById('goal')
    goal.disabled = !goal.disabled
    var activityLevel = document.getElementById('activityLevel')
    activityLevel.disabled = !activityLevel.disabled
    var saveChanges = document.getElementById('save-changes')
    saveChanges.disabled = !saveChanges.disabled
  }

  handleChange(evt) {
    this.getMacros()
    this.setState({
      goal: {
        [evt.target.name]: evt.target.value
      }
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const goals = this.state.goal

    var bmr = Math.floor(
      10 * this.props.goal.startingWeight +
        6.25 * this.props.goal.height * 0.39370079 -
        5 * this.props.goal.age +
        5
    )

    if (this.props.goal.goal === 'Gain 1 lb a week') {
      goals.dailyCalories = Math.floor(
        bmr * this.props.goal.activityLevel + 500
      )
    } else if (this.props.goal.goal === 'Gain 0.5 lbs a week') {
      goals.dailyCalories = Math.floor(
        bmr * this.props.goal.activityLevel + 250
      )
    } else if (this.props.goal.goal === 'Maintain current weight') {
      goals.dailyCalories = Math.floor(bmr * this.props.goal.activityLevel)
    } else if (this.props.goal.goal === 'Lose 0.5 lbs a week') {
      goals.dailyCalories = Math.floor(
        bmr * this.props.goal.activityLevel - 250
      )
    } else if (this.props.goal.goal === 'Lose 1 lb a week') {
      goals.dailyCalories = Math.floor(
        bmr * this.props.goal.activityLevel - 500
      )
    } else if (this.props.goal.goal === 'Lose 1.5 lbs a week') {
      goals.dailyCalories = Math.floor(
        bmr * this.props.goal.activityLevel - 750
      )
    } else if (this.props.goal.goal === 'Lose 2 lbs a week') {
      goals.dailyCalories = Math.floor(
        bmr * this.props.goal.activityLevel - 1000
      )
    }

    this.modifyGoals()

    this.props.updateGoal(goals)
  }

  async componentDidMount() {
    this.myRef = React.createRef() // Create a ref object
    await this.props.getGoal()
    this.setState({
      goal: this.props.goal
    })

    this.modifyGoals()
    this.modifyMacros()
  }

  render() {
    window.scrollTo(0, 0)
    var bmr = Math.floor(
      10 * this.props.goal.startingWeight +
        6.25 * this.props.goal.height * 0.39370079 -
        5 * this.props.goal.age +
        5
    )

    var neededCals = Math.floor(bmr * this.props.goal.activityLevel)

    var startDate = new Date(this.props.goal.updatedAt)

    var year = startDate.getFullYear().toString()
    var month = (startDate.getMonth() + 1).toString()
    var day = startDate.getDate().toString()

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }

    startDate = month + '-' + day + '-' + year

    return (
      <div className="profile">
        <div id="profileGoals">
          <h1>My Daily Goals</h1>

          <ModalModalExample modifyGoals={this.modifyGoals} />

          <Form
            onChange={this.handleChange}
            onSubmit={evt => this.handleSubmit(evt)}
          >
            {/* <label htmlFor="currentWeight">Current weight</label>
            <Input
              type="text"
              name="currentWeight"
              value={this.state.goal.currentWeight}
              id="currentWeight"
            /> */}
            <label htmlFor="startingWeight">Starting weight</label>
            <Input
              id="startingWeight"
              type="text"
              name="startingWeight"
              value={this.state.goal.startingWeight}
            />
            <label htmlFor="goalWeight">Goal weight</label>
            <Input
              type="text"
              name="goalWeight"
              value={this.state.goal.goalWeight}
              id="goalWeight"
            />
            <label htmlFor="age">Age</label>
            <Input
              type="text"
              name="age"
              value={this.state.goal.age}
              id="age"
            />
            <label htmlFor="height">Height(inches)</label>
            <Input
              type="text"
              name="height"
              value={this.state.goal.height}
              id="height"
            />

            <label htmlFor="goal">Select your weekly goal</label>
            <select
              name="goal"
              id="goal"
              onChange={this.handleChange}
              value={this.state.goal.goal}
              style={{maxWidth: '250px'}}
            >
              <option value="Lose 2 lbs a week">Lose 2 pounds per week</option>
              <option value="Lose 1.5 lbs a week">
                Lose 1.5 pounds per week
              </option>
              <option value="Lose 1 lb a week">Lose 1 pound per week</option>
              <option value="Lose 0.5 lbs a week">
                Lose 0.5 pounds per week
              </option>
              <option value="Maintain current weight">
                Maintain your current weight
              </option>
              <option value="Gain 0.5 lbs a week">
                Gain 0.5 pounds per week
              </option>
              <option value="Gain 1 lb a week">Gain 1 pound per week</option>
            </select>

            <div>
              Enter your activity level:
              <select
                name="activityLevel"
                id="activityLevel"
                onChange={this.handleChange}
                value={this.state.goal.activityLevel}
                style={{maxWidth: '250px'}}
              >
                <option value="1.2">Sedentary (little or no exercise) </option>
                <option value="1.375">
                  Lightly active (light exercise/sports 1-3 days/week)
                </option>
                <option value="1.55">
                  Active(moderate exercise/sports 3-5 days/week){' '}
                </option>
                <option value="1.725">
                  Very active (hard exercise/sports 6-7 days a week)
                </option>
                <option value="1.9">
                  Extremely active (very hard exercise/sports and a physical
                  job){' '}
                </option>
              </select>
            </div>

            <Button id="save-changes" type="submit">
              Save changes
            </Button>
          </Form>
        </div>

        <div id="calorieNeeds">
          <div
            id="macroPicker"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <Button onClick={() => this.modifyMacros()}>Modify Macros</Button>

            <div id="percentSelectors">
              <label htmlFor="fat">Fat: </label>
              <select id="fat" type="text" name="fat" onChange={this.getMacros}>
                {options.map(option => {
                  return option
                })}
              </select>
              <label htmlFor="carbs">Carbs: </label>
              <select
                id="carbs"
                type="text"
                name="carbs"
                onChange={this.getMacros}
              >
                {options.map(option => {
                  return option
                })}
              </select>
              <label htmlFor="protein">Protein: </label>
              <select
                id="protein"
                type="text"
                name="protein"
                onChange={this.getMacros}
              >
                {options.map(option => {
                  return option
                })}
              </select>
            </div>

            <Button
              id="save-changesMacros"
              onClick={evt => this.handleSubmit(evt)}
            >
              Save changes
            </Button>
          </div>

          <div>
            <VictoryPie
              colorScale={['crimson', 'limegreen', 'navy']}
              data={[
                {
                  x: `Fat: ${this.props.goal.dailyFat}g`,
                  y: this.props.goal.dailyFat
                },
                {
                  x: `Carbs: ${this.props.goal.dailyCarbs}g`,
                  y: this.props.goal.dailyCarbs
                },
                {
                  x: `Protein: ${this.props.goal.dailyProtein}g`,
                  y: this.props.goal.dailyProtein
                }
              ]}
              labelRadius={87}
              style={{
                labels: {
                  fill: 'white',
                  fontSize: 14,
                  padding: '5px',
                  margin: '5px'
                }
              }}
            />
          </div>

          <div>
            <h4>Start Date: {startDate}</h4>

            <h4>BMR: {bmr}</h4>
            <h4>Daily calorie needs to maintain weight: {neededCals}</h4>
            <h4>
              Daily calories needed to reach weekly goal:{' '}
              {this.props.goal.dailyCalories}
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateGoal: goals => dispatch(updateGoal(goals)),
    getGoal: () => dispatch(getGoal())
  }
}

const mapState = state => {
  return {
    user: state.user,
    goal: state.goal
  }
}

export default connect(mapState, mapDispatch)(Profile)
