import React from 'react'
import {Input, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {postFood} from '../store/food'
import axios from 'axios'
import {Button, Header, Image, Modal, Icon} from 'semantic-ui-react'

class AddFood extends React.Component {
  constructor() {
    super()

    this.state = {
      foodInfo: {},
      showData: false
    }

    this.getData = this.getData.bind(this)
    this.addFood = this.addFood.bind(this)
  }

  addFood() {
    var name = this.state.foodInfo.name.split(',')

    var newName = ''
    name.forEach((str, index) => {
      if (index !== name.length - 1) {
        newName += str
      }
    })

    newName = newName.split(' ')
    newName = newName.map(word => {
      word = word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })

    newName = newName.join(' ')

    var newFood = {
      name: newName,
      calories: Math.floor(this.state.foodInfo.nutrients[0].value),
      protein: Math.floor(this.state.foodInfo.nutrients[1].value),
      fat: Math.floor(this.state.foodInfo.nutrients[2].value),
      carbs: Math.floor(this.state.foodInfo.nutrients[3].value),
      time: window.location.href.split('/')[6],
      userId: this.props.user.id
    }

    this.props.postFood(newFood)
  }

  async getData() {
    var data = this.state.foodInfo

    if (this.state.foodInfo.nutrients === undefined) {
      const res = await axios.get(
        `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=VfLLSxw4Odcu042mZ1dySCS2hLJULj5zkhtx1lLy&nutrients=205&nutrients=204&nutrients=208&nutrients=203&ndbno=${
          this.props.food.ndbno
        }`
      )

      data = res.data.report.foods[0]
    }

    this.setState({
      foodInfo: data,
      showData: !this.state.showData
    })
  }

  render() {
    var name = this.props.food.name.split(',')

    var newName = ''
    name.forEach((str, index) => {
      if (index !== name.length - 1) {
        newName += str
      }
    })

    newName = newName.split(' ')
    newName = newName.map(word => {
      word = word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })

    newName = newName.join(' ')

    return (
      <div onClick={() => this.getData()}>
        <div className="foodSearchItem">
          <h3>{newName}</h3>
          <img src="/additem.png" id="addItem" />
        </div>

        {this.state.showData && this.state.foodInfo.nutrients !== undefined ? (
          <div>
            <p>
              Calories: {this.state.foodInfo.nutrients[0].value}
              Protein: {this.state.foodInfo.nutrients[1].value}
              Fat: {this.state.foodInfo.nutrients[2].value}
              Carbs: {this.state.foodInfo.nutrients[3].value}
              Serving size: {this.state.foodInfo.measure}
              Grams: {this.state.foodInfo.weight}
            </p>
            <p>Add this food?</p>
            <Button id="addFoodButton" onClick={() => this.addFood()}>
              Add
            </Button>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postFood: food => dispatch(postFood(food))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(AddFood)
