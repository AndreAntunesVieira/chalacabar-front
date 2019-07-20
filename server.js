require('isomorphic-unfetch')
require('dotenv').config()
const express = require('express')
const next = require('next')
const routes = require('./routes')
// const api = require('./api').default
const bodyParser = require('body-parser')

const port = parseInt(process.env.PORT, 10) || 3002
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(openServer)

function openServer() {
  express()
    .use(express.static('public'))
    // .use('/api', api)
    .get(/\/\/.*/, (req, res, next) => next())
    .use(bodyParser.json())
    .use((req, res) => {
      if (req.headers && typeof req.headers.host === 'string' && req.headers.host.match(/www.*/)) {
        const url = req.url.match(/novo/) ? req.url : '/novo' + req.url
        return res.redirect('https://chalacabar.com.br' + url)
      }
      if (req.url.match(/^\/\//)) req.url = req.url.replace(/^\/\//, '/')
      return handler(req, res)
    })
    
    .listen(port, err => {
      if (err) throw err
      process.stdout.write(`> Ready on https://localhost:${port}` + '\n')
    })
}
