const fs = require('fs')

const processExec = require('child_process').exec
const exec = command =>
  new Promise((resolve, reject) => processExec(command, (err, content) => (err ? reject(err) : resolve(content))))

// exec('mv .build/node_modules .build/.node_modules && rm -rf .build/* && mv .build/.node_modules .build/node_modules')
exec('rm -rf .build/*')
  .then(() => exec(`cp -R public .build/`))
  .then(() => exec(`cp -R components .build/`))
  .then(() => exec(`cp -R pages .build/`))
  .then(() => exec(`cp -R store .build/`))
  .then(() => exec(`cp -R requests .build/`))
  .then(() => exec(`cp -R models .build/`))
  .then(() => exec(`cp -R helpers .build/`))
  .then(() => exec(`cp -R server.js .build/`))
  .then(() => exec(`cp -R routes.js .build/`))
  .then(packJson)

function packJson(){
  const pack = require('../package.json')
  delete(pack.scripts['build:next'])
  delete(pack.devDependencies)
  pack.scripts.build = 'next build'
  pack.scripts.postinstall = 'npm run build'
  fs.writeFileSync('.build/package.json', JSON.stringify(pack))
}
