require('isomorphic-unfetch')
require('dotenv').config()
const express = require('express')
const next = require('next')
const cors = require('cors')
const bodyParser = require('body-parser')

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
    .use(enforceSSL)
    .use(compress)
    .use('/novo', redirect)
    .get('/.ack', ack)
    .use(handler)
    .listen(PORT, () => process.stdout.write(`Server Ready on port:${PORT}\n`))
}

function redirect (req, res) {
  return res.redirect(302, req.url)
}

function enforceSSL(req, res, next){
  if (process.env.ENFORCE_SSL !== 'true' || req.headers['x-forwarded-proto'] === 'https') return next()
  return res.redirect("https://" + req.headers.host + req.url)
}

function ack(req, res){
  return res.json({ok: true})
}

function compress(req, res, next) {
  if (dev) return next()
  const compression = require('compression')
  return compression()(req, res, next)
}
