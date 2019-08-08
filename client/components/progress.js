import React from 'react'
import {connect} from 'react-redux'
import * as V from 'victory'
import {VictoryLine, VictoryChart, VictoryAxis, VictoryTheme} from 'victory'

class MainProgress extends React.Component {
  constructor() {
    super()
  }

  render() {
    const data = [
      {x: 1, y: 180},
      {x: 2, y: 180.5},
      {x: 3, y: 181},
      {x: 4, y: 179},
      {x: 5, y: 180},
      {x: 6, y: 180.5},
      {x: 7, y: 181},
      {x: 8, y: 182},
      {x: 9, y: 180},
      {x: 10, y: 180.5},
      {x: 11, y: 181},
      {x: 12, y: 180},
      {x: 13, y: 181},
      {x: 14, y: 182},
      {x: 15, y: 183},
      {x: 16, y: 183},
      {x: 17, y: 182},
      {x: 18, y: 181.7},
      {x: 19, y: 181.9},
      {x: 20, y: 182},
      {x: 21, y: 182},
      {x: 22, y: 182.5},
      {x: 23, y: 182.5},
      {x: 24, y: 182.8},
      {x: 25, y: 182.9},
      {x: 26, y: 183},
      {x: 27, y: 183.4},
      {x: 28, y: 183.6},
      {x: 29, y: 183.7},
      {x: 30, y: 184}
    ]

    const tickValues = []
    for (let i = 1; i <= 30; i++) {
      tickValues.push(i)
    }

    const tickFormat = []
    for (let i = 1; i <= 30; i++) {
      tickFormat.push(`${i}`)
    }

    return (
      <div>
        <VictoryChart responsive={false} height={150} width={200}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={tickValues}
            tickFormat={tickFormat}
            style={tickStyle}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            domain={[180, 188]}
            style={tickStyle}
          />
          <VictoryLine
            style={{
              data: {stroke: '#c43a31'},
              parent: {border: '1px solid #ccc'}
            }}
            data={data}
          />
        </VictoryChart>
      </div>
    )
  }
}

const tickStyle = {
  // axis: {
  //   stroke: 'black',
  //   strokeOpacity: 0
  // },
  // ticks: {
  //   size: 2,
  //   stroke: 'black',
  //   strokeOpacity: 0.1
  // },
  // grid: {
  //   stroke: 'rgba(0, 0, 0, 0.1)',
  //   strokeWidth: 1,
  //   strokeDasharray: '6, 6',
  // },
  tickLabels: {
    fontSize: '3px',
    fontFamily: 'inherit',
    fillOpacity: 1,
    margin: 0,
    padding: 0
  },
  axisLabel: {
    fontsize: 13
  }
}

const mapStateToProps = state => {
  return {
    foods: state.food,
    user: state.user,
    checkIns: state.checkIns
  }
}

const mapDispatch = dispatch => {
  return {
    // getFood: () => dispatch(getFood())
  }
}

export default connect(mapStateToProps, mapDispatch)(MainProgress)
