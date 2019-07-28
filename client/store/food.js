import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_FOODS = 'GET_FOODS'
const REMOVE_FOOD = 'REMOVE_FOOD'
const ADD_FOOD = 'ADD_FOOD'
/**
 * INITIAL STATE
 */
const foods = []

/**
 * ACTION CREATORS
 */
const getFoods = foods => ({type: GET_FOODS, foods})
const removeFood = food => ({type: REMOVE_USER, food})
const addFood = food => {
  return {
    type: ADD_FOOD,
    food
  }
}

/**
 * THUNK CREATORS
 */
export const postFood = food => async dispatch => {
  try {
    const res = await axios.post('/api/food', food)
    dispatch(addFood(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getFood = () => async dispatch => {
  try {
    const res = await axios.get('/api/food')
    dispatch(getFoods(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = foods, action) {
  switch (action.type) {
    case GET_FOODS:
      return action.foods
    case ADD_FOOD:
      return [...state, action.food]

    default:
      return state
  }
}
