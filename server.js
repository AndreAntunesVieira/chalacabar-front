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
    .use(handler)
    .listen(PORT, () => process.stdout.write(`Server Ready on port:${PORT}\n`))
}
