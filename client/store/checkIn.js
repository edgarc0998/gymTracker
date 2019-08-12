import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CHECKINS = 'GET_CHECKINS'
const GET_TODAYSCHECKIN = 'GET_TODAYSCHECKIN'
const UPDATE_CHECKIN = 'UPDATE_CHECKIN'

/**
 * INITIAL STATE
 */
const checkIns = {
  checkIns: [],
  todaysCheckIn: {}
}

/**
 * ACTION CREATORS
 */
const getCheckIns = checkIns => ({type: GET_CHECKINS, checkIns})
const getTodaysCheckIn = checkIn => ({type: GET_TODAYSCHECKIN, checkIn})
const updateCheckIn = checkIn => ({type: UPDATE_CHECKIN, checkIn})

/**
 * THUNK CREATORS
 */

export const updateCheckInThunk = body => async dispatch => {
  try {
    const checkIn = await axios.put('/api/checkIns', body)
    console.log('here')
    dispatch(updateCheckIn(checkIn.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllCheckIns = () => async dispatch => {
  try {
    const res = await axios.get('/api/checkIns')
    dispatch(getCheckIns(res.data.checkIns))
    dispatch(getTodaysCheckIn(res.data.todaysCheckIn))
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
      return {...state, checkIns: action.checkIns}
    case GET_TODAYSCHECKIN:
      return {...state, todaysCheckIn: action.checkIn}
    case UPDATE_CHECKIN:
      return {...state, todaysCheckIn: action.checkIn}

    default:
      return state
  }
}
