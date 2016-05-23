import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from '../modules/routes'
import configureStore from './redux/configureStore'
import ApiClient from './ApiClient'
import DevTools from './redux/DevTools'

const client = new ApiClient()
const store = configureStore(client, window.__data)
const tools = __DEV__ ? <DevTools/> : null

const component = (
  <Provider store={store} key="provider">
    <div>
      <Router history={browserHistory} routes={routes}/>
      {tools}
    </div>
  </Provider>
)

render(
  component,
  document.getElementById('app')
)
