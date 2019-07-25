const { spawn, exec } = require('child_process')

if (process.env.HOME === '/root') {
  exec('export NODE_ENV=production && npm run build', (e, data) => {
    process.stdout.write(
      data
        .replace(/(┌ σ|├ σ|├  |└ σ) /g, '')
        .replace(/^Page    /, 'Page')
        .replace(/σ  \(.*\n/, '')
        .replace(/⚡  \(.*\n/, ''),
    )
  })
}
