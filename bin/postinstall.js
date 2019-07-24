const spawn = require('child_process').spawn
const fs = require('fs')

console.log('NODE_ENV: (com _)', process.env.NODE_ENV)
console.log('NODEENV (sem _): ', process.env.NODEENV)
console.log('all: ', process.env)
console.log('PRODUCTION: ', process.env['PRODUCTION'])
let env = fs.readFileSync('.env.sample', 'utf8').split('\n')
env = env.filter(row => row).map(row => {
  const [name] = row.split('=')
  return `${name}=${process.env[name]}`
})
if (process.env.NODEENV === 'production') {
  fs.writeFileSync('.env', env.join('\n'))
  console.log('generated file .env:\n\n', env.join('\n'))

  const ls = spawn('npm', ['run', 'build'])
  ls.stdout.on('data', data => {
    process.stdout.write(data.toString('utf8')
      .replace(/(┌ σ|├ σ|├  |└ σ) /g, '')
      .replace(/^Page    /, 'Page')
      .replace(/σ  \(.*\n/, '')
      .replace(/⚡  \(.*\n/, ''))
  })
}
