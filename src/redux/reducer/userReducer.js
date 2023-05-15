const initialState = { appointmentDetails: [], selectedAppointment: {} }

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'appointmentDetails':
      return {
        ...state,
        appointmentDetails: payload,
      }

    case 'selectedAppointment':
      return {
        ...state,
        selectedAppointment: payload,
      }
    case 'RemoveselectedAppointment':
      return {
        ...state,
        selectedAppointment: {},
      }
    default:
      return state
  }
}
