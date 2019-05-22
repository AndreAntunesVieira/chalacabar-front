import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps = async ctx => {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [...initialProps.styles, ...sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  toggleSidebar = () => {}

  render = () => (
    <html lang="pt-br">
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
      <div>

        <Main />
        <NextScript />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" async defer />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Allerta+Stencil|Montserrat:300,400,500,600,700,800,900"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </div>

    </html>
  )
}
