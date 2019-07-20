import delay from 'timeout-as-promise'

const types = {
  NOTIFICATION_SHOW: 'NOTIFICATION/SHOW',
  NOTIFICATION_CLOSE: 'NOTIFICATION/CLOSE',
}

export const showNotification = ({ duration = 5000, ...options }) => dispatch => {
  const id = Math.random()
  dispatch({ type: types.NOTIFICATION_SHOW, id, ...options })
  return delay(duration).then(() => dispatch({ type: types.NOTIFICATION_CLOSE, id }))
}

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case types.NOTIFICATION_SHOW: {
      const messages = state.messages ? [...state.messages, action] : [action]
      return { ...state, messages }
    }
    case types.NOTIFICATION_CLOSE: {
      const messages = state.messages.filter(message => message.id !== action.id)
      return { ...state, messages }
    }
    default: {
      return state
    }
  }
}
