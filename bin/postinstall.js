const spawn = require('child_process').spawn

if (process.env.NODE_ENV === 'production') {
  const ls = spawn('npm', ['run', 'build'])
  ls.stdout.on('data', data => {
    process.stdout.write(data.toString('utf8')
      .replace(/(┌ σ|├ σ|├  |└ σ) /g, '')
      .replace(/^Page    /, 'Page')
      .replace(/σ  \(.*\n/, '')
      .replace(/⚡  \(.*\n/, ''))
  })
}
