import React from 'react'
import { isClient, isServer } from 'helpers/Envirmonment'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from 'store/reducers'
import { setDeviceInfos } from 'store/AppStore'

export const initializeStore = initialState => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

function getOrCreateStore(initialState) {
  if (isServer) return initializeStore(initialState)
  if (!window.__NEXT_REDUX_STORE__) window.__NEXT_REDUX_STORE__ = initializeStore(initialState)
  return window.__NEXT_REDUX_STORE__
}

export function appConnect(App) {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const store = getOrCreateStore()

      appContext.ctx.store = store

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      if (appContext.ctx.req) store.dispatch(setDeviceInfos(appContext.ctx.req))
      if(isClient) ga('send', 'pageview', appContext.ctx.asPath)

      return {
        ...appProps,
        initialReduxState: store.getState(),
      }
    }

    constructor(props) {
      super(props)
      this.store = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return <App {...this.props} store={this.store} />
    }
  }
}
