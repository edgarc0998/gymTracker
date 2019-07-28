import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {postFood} from '../store/food'
import {Button, Checkbox, Form, Input} from 'semantic-ui-react'
import {updateGoal} from '../store/userGoals'
import axios from 'axios'
import {Select} from 'semantic-ui-react'

const goalsOptions = [
  {key: 'bm', value: 'Build muscle', text: 'Build muscle'},
  {key: 'bf', value: 'Burn fat', text: 'Burn fat'},
  {key: 'mw', value: 'Maintain weight', text: 'Maintain weight'}
]

const SelectExample = props => (
  <select
    id="goal"
    // options={goalsOptions}
    // value = {props.goal}
    onChange={props.handleChange}
    value={props.goal}
  >
    <option value="Build muscle">Build Muscle</option>
    <option value="Burn fat">Burn fat</option>
    <option value="Maintain weight">Maintain weight</option>
  </select>
)

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      dailyFat: 0,
      dailyCarbs: 0,
      dailyProtein: 0,
      dailyCalories: 0,
      currentWeight: 0,
      startingWeight: 0,
      goalWeight: 0,
      goal: 'Maintain weight'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt, user) {
    evt.preventDefault()

    const goals = this.state
    goals.userId = user.id

    this.props.updateGoal(goals)
  }

  async componentDidMount() {
    this.myRef = React.createRef() // Create a ref object

    try {
      const goals = await axios.get(`/api/goals/${this.props.user.id}`)
      this.setState(goals.data)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    window.scrollTo(0, 0)

    return (
      <div className="profile">
        <h1>My Daily Goals</h1>
        <Form
          onChange={this.handleChange}
          onSubmit={() => this.handleSubmit(event, this.props.user)}
        >
          <label htmlFor="startingWeight">Starting weight</label>
          <Input
            type="text"
            name="startingWeight"
            value={this.state.startingWeight}
          />
          <label htmlFor="currentWeight">Current weight</label>
          <Input
            type="text"
            name="currentWeight"
            value={this.state.currentWeight}
          />
          <label htmlFor="goalWeight">Goal weight</label>
          <Input type="text" name="goalWeight" value={this.state.goalWeight} />
          <label htmlFor="calories">Calories</label>
          <Input
            type="text"
            name="dailyCalories"
            value={this.state.dailyCalories}
          />
          <label htmlFor="fat">Fat</label>
          <Input type="text" name="dailyFat" value={this.state.dailyFat} />
          <label htmlFor="carbs">Carbohydrates</label>
          <Input type="text" name="dailyCarbs" value={this.state.dailyCarbs} />
          <label htmlFor="protein">Protein</label>
          <Input
            type="text"
            name="dailyProtein"
            value={this.state.dailyProtein}
          />
          <label htmlFor="goal">Select your fitness goal</label>
          <select
            name="goal"
            id="goal"
            onChange={this.handleChange}
            value={this.state.goal}
          >
            <option value="Build muscle">Build Muscle</option>
            <option value="Burn fat">Burn fat</option>
            <option value="Maintain weight">Maintain weight</option>
          </select>
          <Button id="addFoodButton" type="submit">
            Save changes
          </Button>
        </Form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateGoal: goals => dispatch(updateGoal(goals))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(Profile)
