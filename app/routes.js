const User = require('./controllers/User.js')

module.exports = [

  { method: 'POST', path: '/get', config: User.useCode }

]
