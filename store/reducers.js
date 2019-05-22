import { combineReducers } from 'redux'
import notification from 'store/NotificationStore'
import app from 'store/AppStore'

export default combineReducers({ notification, app })
