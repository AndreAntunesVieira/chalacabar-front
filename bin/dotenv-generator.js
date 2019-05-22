const fs = require('fs')

const content = fs.readFileSync('.env', 'utf8')
const rows = content.split('\n')
const variables = rows.map(row => row && row.replace(/=.*/, '')).filter(content => content)
const newContent = variables.map(name => `${name}=${process.env[variables]}`)
fs.writeFileSync('.env', newContent)
