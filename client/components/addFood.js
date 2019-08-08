import React from 'react'
import {Input, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {postFood} from '../store/food'
import axios from 'axios'
import {Button, Header, Image, Modal, Icon, Dropdown} from 'semantic-ui-react'

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

    var quantity = document.getElementById('quantity')
    var amount = quantity.options[quantity.selectedIndex].value

    if (!amount) {
      amount = 0
      this.props.postFood(newFood)
    }

    for (let i = 0; i < amount; i++) {
      this.props.postFood(newFood)
    }
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
    name.forEach((name, index) => {
      if (!name.includes('UPC:') && !name.includes('GTIN:')) {
        newName += name
      }
    })

    newName = newName.split(' ')
    newName = newName.map(word => {
      word = word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })

    newName = newName.join(' ')
    const options = []

    return (
      <div>
        <div className="foodSearchItem" onClick={() => this.getData()}>
          <h3>{newName}</h3>
          <img src="/additem.png" id="addItem" />
        </div>

        {this.state.showData && this.state.foodInfo.nutrients !== undefined ? (
          <div id="foodSearchItem">
            <span id="foodSearchItemInfo">
              Calories: {this.state.foodInfo.nutrients[0].value}
            </span>
            <span id="foodSearchItemInfo">
              Protein: {this.state.foodInfo.nutrients[1].value}
            </span>
            <span id="foodSearchItemInfo">
              Fat: {this.state.foodInfo.nutrients[2].value}
            </span>
            <span id="foodSearchItemInfo">
              Carbs: {this.state.foodInfo.nutrients[3].value}
            </span>
            <span id="foodSearchItemInfo">
              Serving size: {this.state.foodInfo.measure}
            </span>
            <span id="foodSearchItemInfo">
              Grams: {this.state.foodInfo.weight}
            </span>

            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Button id="addFoodButton" onClick={() => this.addFood()}>
                Add
              </Button>

              <select id="quantity" placeholder="Quantity">
                <option value="1"> 1</option>
                <option value="2"> 2</option>
                <option value="3"> 3</option>
                <option value="5"> 5</option>
                <option value="6"> 6</option>
                <option value="7"> 7</option>
                <option value="8"> 8</option>
                <option value="9"> 9</option>
                <option value="10"> 10</option>
              </select>
            </div>
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
