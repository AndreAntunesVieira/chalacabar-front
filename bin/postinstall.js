const spawn = require('child_process').spawn
const fs = require('fs')

console.log('all: ', process.env)
if (process.env.HOME === '/root') {
  fs.unlinkSync('.env')

  const ls = spawn('npm', ['run', 'build'])
  ls.stdout.on('data', data => {
    process.stdout.write(data.toString('utf8')
      .replace(/(┌ σ|├ σ|├  |└ σ) /g, '')
      .replace(/^Page    /, 'Page')
      .replace(/σ  \(.*\n/, '')
      .replace(/⚡  \(.*\n/, ''))
  })
}
