const fs = require('fs')

const processExec = require('child_process').exec
const exec = command =>
  new Promise((resolve, reject) => processExec(command, (err, content) => (err ? reject(err) : resolve(content))))

exec('rm -rf .build/*')
  .then(() => exec(`cp -R public .build/`))
  .then(() => exec(`cp -R components .build/`))
  .then(() => exec(`cp -R pages .build/`))
  .then(() => exec(`cp -R store .build/`))
  .then(() => exec(`cp -R requests .build/`))
  .then(() => exec(`cp -R models .build/`))
  .then(() => exec(`cp -R helpers .build/`))
  .then(() => exec(`cp -R routes.js .build/`))
  .then(server)
  .then(packJson)

function server(){
  const content = fs.readFileSync('server.js', 'utf8')
  return fs.writeFileSync('.build/server.js', content.replace(`require('dotenv').config()\n`, ''))
}

function packJson(){
  const pack = require('../package.json')
  delete(pack.scripts['build:next'])
  delete(pack.devDependencies)
  delete(pack.dependencies.dotenv)
  delete(pack.dependencies['dotenv-webpack'])
  pack.scripts.build = 'next build'
  pack.scripts.postinstall = 'npm run build'
  fs.writeFileSync('.build/package.json', JSON.stringify(pack))
}
