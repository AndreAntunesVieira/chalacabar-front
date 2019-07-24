require('isomorphic-unfetch')
require('dotenv').config()
const express = require('express')
const next = require('next')
const cors = require('cors')
const bodyParser = require('body-parser')
const forceSSL = require('express-force-ssl')

const PORT = process.env.PORT || '3002'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(openServer)

function openServer() {
  express()
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(cors())
    .use(forceSSLMiddleware)
    .use('/novo', redirect)
    .use(handler)
    .listen(PORT, () => process.stdout.write(`Server Ready on port:${PORT}\n`))
}

function redirect (req, res) {
  return res.redirect(302, req.url)
}

function forceSSLMiddleware (req, res, next) {
  if (process.env.FORCE_SSL !== 'true') return next()
  return forceSSL(req, res, next)
}
