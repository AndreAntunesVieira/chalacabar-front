const fs = require('fs')

if(process.env.BUILD_TYPE === 'clear'){
  fs.unlinkSync('../next.config.js')
}
