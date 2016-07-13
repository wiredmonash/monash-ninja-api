const User = require('./controllers/User.js')

module.exports = [

  { method: 'POST', path: '/api/v1/auth', config: User.registerUser }
]
