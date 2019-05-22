import 'isomorphic-unfetch'
require('dotenv').config()
const express = require('express')
const next = require('next')
const routes = require('./_routes')
const { listenMessage } = require('./helpers/server/ServerHelpers')

const port = parseInt(process.env.PORT_SITE_SERVER, 10) || 3002
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(openServer)

async function openServer() {
  express()
    .use(express.static('public'))
    .get(/\/\/.*/, (req, res, next) => next())
    .get('*', (req, res) => {
      if (req.headers && typeof req.headers.host === 'string' && req.headers.host.match(/www.*/)) {
        const url = req.url.match(/novo/) ? req.url : '/novo' + req.url
        return res.redirect('https://chalacabar.com.br' + url)
      }
      if (req.url.match(/^\/\//)) {
        req.url = req.url.replace(/^\/\//, '/')
      }
      return handler(req, res)
    })
    .listen(port, listenMessage(port))
}
