import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import { setDocumentBodyWebFontsReady } from 'helpers/AsyncWebFonts.js'
import { initializeGA } from 'helpers/GoogleAnalytics'
import { initializeServiceWorker } from 'helpers/ServiceWorkerCaller'
import { isClient, isServer } from 'helpers/Envirmonment'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from 'store/reducers'
import { setDeviceInfos } from 'store/AppStore'
import Head from 'next/head'

const initializeStore = initialState =>
  createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))

function getOrCreateStore(initialState) {
  if (isServer) return initializeStore(initialState)
  if (!window.__NEXT_REDUX_STORE__) window.__NEXT_REDUX_STORE__ = initializeStore(initialState)
  return window.__NEXT_REDUX_STORE__
}

const startProps = appContext => (appProps = {}) => {
  const store = getOrCreateStore()
  appContext.ctx.store = store
  if (appContext.ctx.req) store.dispatch(setDeviceInfos(appContext.ctx.req))
  if (isClient) ga('send', 'pageview', appContext.ctx.asPath)
  return { ...appProps, initialReduxState: store.getState() }
}

const appConnect = App =>
  class AppWithRedux extends React.Component {
    static getInitialProps(appContext) {
      const starter = startProps(appContext)
      if (typeof App.getInitialProps !== 'function') return starter()
      return App.getInitialProps(appContext).then(starter)
    }

    constructor(props) {
      super(props)
      this.store = getOrCreateStore(props.initialReduxState)
    }

    render = () => <App {...this.props} store={this.store} />
  }

class MyApp extends App {
  componentWillMount = () => {
    if (isClient) {
      initializeGA()
      initializeServiceWorker()
    }
  }
  componentDidMount = () => setDocumentBodyWebFontsReady(100)

  render = () => {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <link href="/manifest.json" rel="manifest" />
          <meta name="theme-color" content="#F6F5F5" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#444444" />
          <meta name="viewport" content="width=device-width,minimum-scale=1" />
          <link rel="icon" type="image/vnd.microsoft.icon" href="/img/icons/favicon.ico" />
          <link rel="shortcut icon" type="image/x-icon" href="/img/icons/favicon.ico" />
          <link rel="apple-touch-icon" href="/img/icons/favicon-apple.png" />
          <meta content="/img/layout/favicon-ms.png" name="msapplication-TileImage" />

          <link href="/css/style.css" rel="stylesheet" type="text/css" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-60724303-7" />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" async defer />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Container>
    )
  }
}

export default appConnect(MyApp)
