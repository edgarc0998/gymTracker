import React from 'react'
import {connect} from 'react-redux'
import * as V from 'victory'
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel
} from 'victory'
import {Progress} from 'semantic-ui-react'
import {getGoal} from '../store/userGoals'
import {getFood} from '../store/food'

class MainProgress extends React.Component {
  constructor() {
    super()

    this.state = {
      calsMonth: [],
      weightMonth: [],
      burnedMonth: []
    }

    this.getWeeksLeft = this.getWeeksLeft.bind(this)
    this.getCaloriesMonth = this.getCaloriesMonth.bind(this)
  }

  async componentDidMount() {
    await this.props.getFood()
    this.getCaloriesMonth()
  }

  getCaloriesMonth() {
    var arr = []

    var day = 1
    var sum = 0

    for (let k = 0; k < this.props.food.length; k++) {
      var currDay = this.props.food[k].createdAt
      currDay = new Date(currDay)
      currDay = currDay.getDate()
      if (currDay === day) {
        sum += this.props.food[k].calories
      } else {
        arr.push(sum)
        sum = this.props.food[k].calories
        day++
      }
    }

    arr.push(sum)

    var newArr = []

    for (let i = 1; i < 31; i++) {
      newArr.push({x: i, y: arr[i - 1]})
    }

    var weight = []
    var burned = []

    if (this.props.checkIns.checkIns) {
      for (let i = 1; i < 31; i++) {
        weight.push({x: i, y: this.props.checkIns.checkIns[i - 1].weight})
        burned.push({
          x: i,
          y: this.props.checkIns.checkIns[i - 1].caloriesBurned
        })
      }
    }

    this.setState({
      calsMonth: newArr,
      weightMonth: weight,
      burnedMonth: burned
    })
  }

  getWeeksLeft() {
    var cals
    if (this.props.goal.goal === 'Gain 1 lb a week') {
      cals = 500
    } else if (this.props.goal.goal === 'Gain 0.5 lbs a week') {
      cals = 250
    } else if (this.props.goal.goal === 'Maintain current weight') {
      cals = 0
    } else if (this.props.goal.goal === 'Lose 0.5 lbs a week') {
      cals = 250
    } else if (this.props.goal.goal === 'Lose 1 lb a week') {
      cals = 500
    } else if (this.props.goal.goal === 'Lose 1.5 lbs a week') {
      cals = 750
    } else if (this.props.goal.goal === 'Lose 2 lbs a week') {
      cals = 1000
    }

    var lbsPerWeek = cals * 7 / 3500

    var weeksLeft =
      (this.props.goal.goalWeight - this.props.goal.currentWeight) / lbsPerWeek

    return Math.abs(weeksLeft)
  }

  render() {
    const tickValues = []
    for (let i = 1; i <= 30; i++) {
      tickValues.push(i)
    }

    const tickFormat = []
    for (let i = 1; i <= 30; i++) {
      tickFormat.push(`${i}`)
    }

    var per = Math.floor(
      (this.props.goal.currentWeight - this.props.goal.startingWeight) /
        (this.props.goal.goalWeight - this.props.goal.startingWeight) *
        100
    )

    var weeksLeft = this.getWeeksLeft()

    var date = this.props.goal.updatedAt
    var newDate = new Date(date)
    newDate.setDate(newDate.getDate() + weeksLeft * 7)

    var endDate

    var year = newDate.getFullYear().toString()
    var month = (newDate.getMonth() + 1).toString()
    var day = newDate.getDate().toString()

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }

    endDate = month + '-' + day + '-' + year

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
      <div id="progressDiv">
        <div id="charts">
          <div id="weightVsDay">
            <h3>Weight vs day (Month) </h3>
            <VictoryChart
              style={{parent: {maxWidth: '100%', maxHeight: '100%'}}}
            >
              <VictoryAxis
                tickValues={tickValues}
                tickFormat={tickFormat}
                style={{
                  tickLabels: {
                    fontSize: '10px',
                    fontFamily: 'gothicApple',
                    fillOpacity: 1,
                    marginTop: '4px',
                    padding: 3,
                    angle: 90
                  },
                  axisLabel: {
                    fontsize: 13
                  }
                }}
              />
              <VictoryAxis
                dependentAxis
                domain={[180, 184]}
                style={{
                  tickLabels: {
                    fontSize: '15px',
                    fontFamily: 'gothicApple',
                    fillOpacity: 1,
                    margin: 1,
                    padding: 2,
                    angle: 0
                  },
                  axisLabel: {
                    fontsize: 13
                  }
                }}
              />

              <VictoryLine
                style={{
                  // data: {stroke: '#c43a31'},
                  data: {stroke: 'limegreen'},

                  parent: {border: '0.5px solid #ccc'}
                }}
                data={this.state.weightMonth}
              />
            </VictoryChart>
          </div>

          <div id="weightVsDay">
            <h3>Calories consumed vs day (Month)</h3>
            <VictoryChart
              style={{parent: {maxWidth: '100%', maxHeight: '100%'}}}
            >
              <VictoryAxis
                tickValues={tickValues}
                tickFormat={tickFormat}
                style={{
                  tickLabels: {
                    fontSize: '10px',
                    fontFamily: 'gothicApple',
                    fillOpacity: 1,
                    marginTop: '4px',
                    padding: 3,
                    angle: 90
                  },
                  axisLabel: {
                    fontsize: 13
                  }
                }}
              />
              <VictoryAxis
                dependentAxis
                domain={[1500, 3000]}
                style={{
                  tickLabels: {
                    fontSize: '15px',
                    fontFamily: 'gothicApple',
                    fillOpacity: 1,
                    margin: 1,
                    padding: 2,
                    angle: 0
                  },
                  axisLabel: {
                    fontsize: 13
                  }
                }}
              />
              <VictoryLine
                style={{
                  data: {stroke: 'limegreen'},
                  parent: {border: '0.5px solid #ccc'}
                }}
                data={this.state.calsMonth}
              />
            </VictoryChart>
          </div>

          <div id="weightVsDay">
            <h3>Calories burned vs day (Month)</h3>
            <VictoryChart
              style={{parent: {maxWidth: '100%', maxHeight: '100%'}}}
            >
              <VictoryAxis
                tickValues={tickValues}
                tickFormat={tickFormat}
                style={{
                  tickLabels: {
                    fontSize: '10px',
                    fontFamily: 'gothicApple',
                    fillOpacity: 1,
                    marginTop: '4px',
                    padding: 3,
                    angle: 90
                  },
                  axisLabel: {
                    fontsize: 13
                  }
                }}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, 1000]}
                style={{
                  tickLabels: {
                    fontSize: '15px',
                    fontFamily: 'gothicApple',
                    fillOpacity: 1,
                    margin: 1,
                    padding: 2,
                    angle: 0
                  },
                  axisLabel: {
                    fontsize: 13
                  }
                }}
              />
              <VictoryLine
                style={{
                  data: {stroke: 'crimson'},
                  parent: {border: '0.5px solid #ccc'}
                }}
                data={this.state.burnedMonth}
              />
            </VictoryChart>
          </div>
        </div>

        <div id="otherStats">
          <div id="weightProgressBar">
            <h6>Starting weight: {this.props.goal.startingWeight}</h6>
            <Progress
              percent={per}
              indicating
              progress
              color="green"
              label={`${this.props.goal.currentWeight} lbs`}
              style={{minWidth: '75%', maxHeight: '24.5px'}}
            />
            <h6>Goal weight: {this.props.goal.goalWeight}</h6>
          </div>

          <div>
            <h4>
              Daily calories needed to reach weeky goal:{' '}
              {this.props.goal.dailyCalories}
            </h4>
            <h4>Start Date: {startDate}</h4>
            <h4>Weeks left: {weeksLeft}</h4>
            <h4>End Date: {endDate}</h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    food: state.food,
    user: state.user,
    checkIns: state.checkIns,
    goal: state.goal
  }
}

const mapDispatch = dispatch => {
  return {
    getGoal: () => dispatch(getGoal()),
    getFood: () => dispatch(getFood())
  }
}

export default connect(mapStateToProps, mapDispatch)(MainProgress)
