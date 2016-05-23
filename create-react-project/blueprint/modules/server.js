import React from 'react'
import { createServer } from 'react-project/server'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import Document from '../modules/components/Document'
import routes from '../modules/routes'
import configureStore from './redux/configureStore'
import ApiClient from './ApiClient'

function getApp(req, res, requestCallback) {
  // here is your chance to do things like get an auth token and generate
  // your route config w/ request aware `onEnter` hooks, etc.
  requestCallback(null, {
    routes: routes,
    render(routerProps, renderCallback) {
      // here is your chance to load up data before rendering and pass it to
      // your top-level components
      const client = new ApiClient()
      const store = configureStore(client, {})

      renderCallback(null, {
        renderDocument: (props) => {
          const initialState = store.getState()
          return (
            <Document {...props} initialState={initialState}/>
          )
        },
        renderApp: (props) => (
          <Provider store={store} key="provider">
            <RouterContext {...props}/>
          </Provider>
        )
      })
    }
  })
}

createServer(getApp).start()
