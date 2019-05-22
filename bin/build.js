const fs = require('fs-extra')
// const uglifyJS = require('uglify-js-es6')

const processExec = require('child_process').exec
const exec = command =>
  new Promise((resolve, reject) => processExec(command, (err, content) => (err ? reject(err) : resolve(content))))

exec('rm -rf .build')
  .then(() => exec('mkdir .build'))
  .then(() => exec(`cp -R components .build/`))
  // .then(() => exec(`cp -R models .build/`))
  .then(() => exec(`cp -R store .build/`))
  .then(() => exec(`cp -R pages .build/`))
  .then(() => exec(`cp -R public .build/`))
  .then(() => exec(`npx babel models --out-dir .build/models`))
  .then(() => exec(`npx babel helpers --out-dir .build/helpers`))
  .then(() => exec(`npx babel server.js --out-file .build/server.js`))
  .then(() => exec(`npx babel _routes.js --out-file .build/_routes.js`))
  .then(() => exec('cp package.json .build/'))
  .then(() => exec('cp .env.sample .build/.env'))
  .then(() => exec('cp .babelrc .build/'))
  .then(() => exec('cp next.config.prod.js .build/next.config.js'))
  .then(() => fixFolderSufix('pages'))
  .then(() => fixFolderSufix('components/common'))
  .then(() => fixFolderSufix('components/forms'))
  .then(() => fixFolderSufix('components/home-sections/parties'))
  .then(() => fixFolderSufix('components/views'))
  .then(() => fixManifest())
  .then(replaceModelBase)
  .then(() => fs.readFile('.env.sample', 'utf8'))
  .then(createDotEnvGenerator)

function replaceModelBase(){
  return fs.readFile('.build/models/_BaseModel.js', 'utf8')
    .then(content => content.replace('http://local.chalacabar.com.br:3001', 'https://chalacabar.com.br/api'))
    .then(content => fs.writeFile('.build/models/_BaseModel.js', content))
}

function createDotEnvGenerator(content){
  const fields = content.split('\n').map(name => name.replace(/=.*/, '').trim()).filter(name => !!name)
  const newContent = fields.map(name => `${name}=$${name}`).join('\\n')
  return fs.writeFile('.build/.env-generator.sh', `echo "${newContent}" > .env`)
}

function fixFolderSufix(folder) {
  return fs.readdir(`.build/${folder}`).then(files => {
    return Promise.all(
      files.map(f =>
        fs
          .readFile(`.build/${folder}/${f}`, 'utf8')
          .then(content =>
            content
              .replace(/(href|content|src)="\//g, '$1="/novo/')
              .replace(/(href|src)={`\//g, '$1={`/novo/')
              .replace(/`\/(fotos)\//g, '`/novo/$1/') //experimental, tvz isso quebre outros lugares
          )
          .then(content => fs.writeFile(`.build/${folder}/${f}`, content))
      )
    )
  })
}

function fixManifest() {
  return fs
    .readFile(`.build/public/manifest.json`, 'utf8')
    .then(content =>
      content.replace(/"src": "\//g, '"src": "/novo/').replace('"start_url": "/",', '"start_url": "/novo/",')
    )
    .then(content => fs.writeFile(`.build/public/manifest.json`, content))
    .then(() => fs.readFile(`.build/pages/_document.js`, 'utf8'))
    .then(content => content.replace('/novo/manifest.json', '/manifest.json'))
    .then(content => fs.writeFile(`.build/pages/_document.js`, content))
    .then(() => fs.readFile(`.build/public/css/style.css`, 'utf8'))
    .then(content => content.replace(/url\(\/img/, 'url(/novo/img'))
    .then(content => fs.writeFile(`.build/public/css/style.css`, content))
}
