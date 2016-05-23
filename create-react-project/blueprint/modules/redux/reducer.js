import { combineReducers } from 'redux'
import counter from '../components/Counter/counter'

// const context = require.context('./reducers', true, /.*\.js/)
// const reducers = context.keys().map(key => context(key).default)

export default combineReducers({ counter })
