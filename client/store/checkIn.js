import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CHECKINS = 'GET_CHECKINS'
const GET_TODAYSCHECKIN = 'GET_TODAYSCHECKIN'

/**
 * INITIAL STATE
 */
const checkIns = {}

/**
 * ACTION CREATORS
 */
const getCheckIns = checkIns => ({type: GET_CHECKINS, checkIns})
const getTodaysCheckIn = checkIn => ({type: GET_TODAYSCHECKIN, checkIn})

/**
 * THUNK CREATORS
 */

export const getAllCheckIns = () => async dispatch => {
  try {
    const res = await axios.get('/api/checkIns')
    dispatch(getCheckIns(res.data))

    const res2 = await axios.get('/api/events')
    console.log(res2.data)
    // dispatch(getCheckIns(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = checkIns, action) {
  switch (action.type) {
    case GET_CHECKINS:
      return action.checkIns
    // case GET_CHECKINS:
    //   return {...state, allCheckIns: [...state.allCheckIns, action.checkIns]}
    // case GET_TODAYSCHECKIN:
    //   return {...state, todaysCheckIn: action.checkIn}

    default:
      return state
  }
}
