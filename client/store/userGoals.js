import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GOAL = 'GET_GOAL'
const UPDATE_GOAL = 'UPDATE_GOAL'

/**
 * INITIAL STATE
 */
const goal = {}

/**
 * ACTION CREATORS
 */
const updateGoalAction = goal => ({type: UPDATE_GOAL, goal})
const getGoalAction = goal => ({type: GET_GOAL, goal})

/**
 * THUNK CREATORS
 */
export const updateGoal = goal => {
  return async dispatch => {
    try {
      const goals = await axios.put(`/api/goals`, goal)
      dispatch(updateGoalAction(goals.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getGoal = user => {
  return async dispatch => {
    try {
      const goal = await axios.get(`/api/goals/${user}`)
      dispatch(getGoalAction(goal.data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = goal, action) {
  switch (action.type) {
    case UPDATE_GOAL:
      return action.goal
    case GET_GOAL:
      return action.goal
    default:
      return state
  }
}
