import React from 'react'
import App, { Container } from 'next/app'
import { appConnect } from 'store'
import { Provider } from 'react-redux'
import { setDocumentBodyWebFontsReady } from 'helpers/AsyncWebFonts.js'
import { initializeGA } from 'helpers/GoogleAnalytics'
import { initializeServiceWorker } from 'helpers/ServiceWorkerCaller'
import { isClient } from 'helpers/Envirmonment'

class MyApp extends App {
  componentWillMount = () => {
    if(isClient){
      initializeGA()
      initializeServiceWorker()
    }
  }
  componentDidMount = () => setDocumentBodyWebFontsReady(100)

  render = () => {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default appConnect(MyApp)
