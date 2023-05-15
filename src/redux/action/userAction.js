import { message } from 'antd'
import axios from 'axios'

export const fetchAllAppointment = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:8080/appointment')
    dispatch({
      type: 'appointmentDetails',
      payload: res.data,
    })
  } catch (error) {
    message.error(error)
  }
}
export const fetchUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/appointment/${id}`)
    dispatch({
      type: 'selectedAppointment',
      payload: res.data,
    })
  } catch (error) {
    message.error(error)
  }
}
