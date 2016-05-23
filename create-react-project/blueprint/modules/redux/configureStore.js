import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'
import clientMiddleware from './clientMiddleware'

export default function configureStore(client, initialState) {

  const middleware = clientMiddleware(client)

  let enhancer

  if (__DEV__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools')
    const DevTools = require('./DevTools').default

    enhancer = compose(
      applyMiddleware(middleware),
      DevTools.instrument(),
      persistState(getDebugSessionKey())
    )
  } else {
    enhancer = compose(applyMiddleware(middleware))
  }

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer').default)
    )
  }

  return store
}

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
  return (matches && matches.length > 0)? matches[1] : null
}
