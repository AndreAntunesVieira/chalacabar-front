require('isomorphic-unfetch')
require('dotenv').config()
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || '3002'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(openServer)

function openServer() {
  express()
    .use(express.static('public'))
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
    .listen(PORT, () => process.stdout.write(`Server Ready on port:${PORT}\n`))
}
