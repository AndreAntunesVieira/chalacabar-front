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
  .then(() => exec(`cp -R .babelrc .build/`))
  .then(() => exec(`cp -R server.js .build/`))
  .then(() => exec(`cp -R next.config.js .build/`))
  .then(() => exec(`cd .build && git add . && git commit -m 'Deploy'`))
  .then(() => console.log('Rode o comando:\n\ncd .build && git push\n\n'))
  .then(packJson)

function packJson () {
  const pack = require('../package.json')
  delete (pack.devDependencies)
  delete (pack.scripts)
  pack.scripts = { postinstall: 'next build', start: 'node server' }
  fs.writeFileSync('.build/package.json', JSON.stringify(pack))
}
