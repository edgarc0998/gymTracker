import React from 'react'
import {Input, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {postFood} from '../store/food'
import axios from 'axios'
import {Button, Header, Image, Modal, Icon} from 'semantic-ui-react'
import AddFood from './addFood'

export class FoodSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      currentSearch: [],
      showError: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const word = evt.target.search.value

    const res = await axios.get(
      `https://api.nal.usda.gov/ndb/search/?format=json&q=${word}&sort=n&max=50&offset=0&api_key=VfLLSxw4Odcu042mZ1dySCS2hLJULj5zkhtx1lLy`
    )

    if (res.data.list) {
      this.setState({
        currentSearch: res.data.list.item,
        showError: false
      })
    } else {
      this.setState({
        showError: true
      })
    }
  }

  render() {
    var foods = this.state.currentSearch

    return (
      <div className="foodSearch">
        <Link to="/home/food">Go back</Link>

        <Form onSubmit={this.handleSubmit}>
          <Input
            name="search"
            action={{icon: 'search'}}
            placeholder="Search..."
            id="search"
          />
        </Form>

        <div>
          {!this.state.showError ? (
            foods.map(food => {
              return (
                <div key={food.ndbno}>
                  <AddFood food={food} />
                  <hr />
                </div>
              )
            })
          ) : (
            <h1>No foods found with that search</h1>
          )}
        </div>
      </div>
    )
  }
}
