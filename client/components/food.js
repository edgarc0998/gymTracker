import React from 'react'
import {getFood} from '../store/food'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import Emoji from 'a11y-react-emoji'

const Totals = props => {
  return (
    <div className="dayTotals">
      <div className="caloriesBurned">
        <h3>Calories Burned: </h3>
        <input
          name="caloriesBurned"
          onChange={props.handleCHange}
          value={props.value}
        />
      </div>

      <div className="total-burned">
        <h3>
          {props.totals.totalCalories} calories from food - {props.value}{' '}
          calories burned = {props.totals.totalCalories - props.value} total
          calories
        </h3>
      </div>

      <div className="macros">
        <h3>macros</h3>
        fat: {props.totals.totalFat}
        carbs: {props.totals.totalCarbs}
        protein: {props.totals.totalProtein}
      </div>
    </div>
  )
}

const FoodItem = props => {
  return (
    <Table.Row className="foodItem">
      <Table.Cell className="foodItemName">{props.food.name}</Table.Cell>
      <Table.Cell className="foodItemCell">{props.food.carbs}</Table.Cell>
      <Table.Cell className="foodItemCell">{props.food.fat}</Table.Cell>
      <Table.Cell className="foodItemCell">{props.food.protein}</Table.Cell>
      <Table.Cell className="foodItemCell">{props.food.calories}</Table.Cell>
    </Table.Row>
  )
}

const FoodTime = props => {
  const foods = props.foods
  const time = props.time.charAt(0).toUpperCase() + props.time.slice(1)
  var totalCarbs = 0
  var totalCalories = 0
  var totalFat = 0
  var totalProtein = 0

  foods.map(food => {
    if (food.time === props.time) {
      totalCarbs += food.carbs
      totalFat += food.fat
      totalProtein += food.protein
      totalCalories += food.calories
    }
  })

  return (
    <div className="foodType">
      <Table very basic id="borderLess">
        <Table.Header id="foodTypeHeader">
          <Table.Row className="foodItem">
            <Table.HeaderCell className="foodItemName">{time}</Table.HeaderCell>
            <Table.HeaderCell className="foodItemCell">
              <Emoji symbol="🍞" label="bread" />Carbs
            </Table.HeaderCell>
            <Table.HeaderCell className="foodItemCell">
              <Emoji symbol="🥓" label="bacon" />Fat
            </Table.HeaderCell>
            <Table.HeaderCell className="foodItemCell">
              <Emoji symbol="🥩" label="steak" />Protein
            </Table.HeaderCell>
            <Table.HeaderCell className="foodItemCell">
              Calories
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!foods
            ? null
            : foods.map(food => {
                if (food.time === props.time) {
                  return <FoodItem food={food} />
                }
              })}

          <Table.Row className="foodItem">
            <Table.Cell className="foodItemName">
              <h3>Totals</h3>
            </Table.Cell>
            <Table.Cell className="foodItemCell">{totalCarbs}</Table.Cell>
            <Table.Cell className="foodItemCell">{totalFat}</Table.Cell>
            <Table.Cell className="foodItemCell">{totalProtein}</Table.Cell>
            <Table.Cell className="foodItemCell">{totalCalories}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell className="foodItemName">
              <Link
                className="addFoodButton"
                to={`/home/food/add/${props.time}`}
              >
                {' '}
                <h3>Add food + </h3>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

class Food extends React.Component {
  constructor() {
    super()
    this.state = {
      todaysFood: [],
      calsBurned: 0,
      startDate: new Date(),
      showCal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
  }

  dateChange(date) {
    this.setState({
      startDate: date
    })
  }
  handleChange(evt) {
    this.setState({
      calsBurned: evt.target.value
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    window.scrollTo(0, 0)

    //get foods of the current date
    const allFoods = this.props.foods
    var foods = allFoods

    if (this.props.foods[0] !== undefined) {
      foods = foods.filter(food => {
        if (
          food.userId === this.props.user.id &&
          food.createdAt.slice(8, 10) ===
            this.state.startDate.getDate().toString()
        ) {
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

    var totals = {
      totalCalories,
      totalFat,
      totalProtein,
      totalCarbs
    }

    return (
      <React.Fragment>
        <div className="food" id="calendar">
          {this.state.showCal ? (
            <div>
              <h3>Click to change date</h3>
              <img id="calendar" src="/calendar.png" />
            </div>
          ) : (
            <div>
              <h3>Show from</h3>
              <DatePicker
                inline
                selected={this.state.startDate}
                onChange={this.dateChange}
                dateFormat="MM/dd/yyyy"
              />
            </div>
          )}

          <FoodTime time="breakfast" foods={foods} />
          <FoodTime time="lunch" foods={foods} />
          <FoodTime time="dinner" foods={foods} />
          <FoodTime time="snacks" foods={foods} />

          {/* <Totals
            totals={totals}
            handleCHange={this.handleChange}
            value={this.state.calsBurned}
          /> */}
        </div>
      </React.Fragment>
    )
  }
}

const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'
document.head.appendChild(styleLink)

const mapStateToProps = state => {
  return {
    foods: state.food,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getFood: () => dispatch(getFood())
  }
}

export default connect(mapStateToProps, mapDispatch)(Food)
