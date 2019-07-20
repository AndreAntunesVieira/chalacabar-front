const fs = require('fs-extra')

const processExec = require('child_process').exec
const exec = command =>
  new Promise((resolve, reject) => processExec(command, (err, content) => (err ? reject(err) : resolve(content))))

exec('mv .build/node_modules .build/.node_modules && rm -rf .build/* && mv .build/.node_modules .build/node_modules')
// exec('rm -rf .build/*')
  .then(() => exec(`cp -R public .build/`))
  .then(() => exec(`cp -R components .build/`))
  .then(() => exec(`cp -R pages .build/`))
  .then(() => exec(`cp -R store .build/`))
  .then(() => exec(`cp -R models .build/`))
  .then(() => exec(`cp -R api .build/`))
  .then(() => exec(`cp -R helpers .build/`))
  // .then(() => exec(`npx babel components --out-dir .build/components`))
  // .then(() => exec(`npx babel pages --out-dir .build/pages`))
  // .then(() => exec(`npx babel store --out-dir .build/store`))
  // .then(() => exec(`npx babel models --out-dir .build/models`))
  // .then(() => exec(`npx babel api --out-dir .build/api`))
  // .then(() => exec(`npx babel helpers --out-dir .build/helpers`))
  .then(() => exec(`npx babel server.js --out-file .build/server.js`))
  .then(() => exec(`npx babel routes.js --out-file .build/routes.js`))
  .then(packJson)
  .then(() => exec('cp .env .build/.env'))
  .then(replaceModelBase)
  .then(() => fs.readFile('.env.sample', 'utf8'))

function replaceModelBase(){
  return fs.readFile('.build/models/_BaseModel.js', 'utf8')
    .then(content => content.replace('http://local.chalacabar.com.br:3001', 'https://chalacabar.com.br/api'))
    .then(content => fs.writeFile('.build/models/_BaseModel.js', content))
}

function packJson(){
  const pack = require('../package.json')
  delete(pack.scripts['build:next'])
  delete(pack.devDependencies)
  pack.scripts.build = 'next build'
  pack.scripts.postinstall = 'npm run build'
  fs.writeFileSync('.build/package.json', JSON.stringify(pack))
}
