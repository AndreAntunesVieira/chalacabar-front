const spawn = require('child_process').spawn
const fs = require('fs')

if (process.env.NODE_ENV === 'production') {
  let env = fs.readFileSync('.env.sample', 'utf8').split('\n')
  env = env.filter(row => row).map(row => {
    const [name] = row.split('=')
    return `${name}=${process.env[name]}`
  })
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
