const User = require('./controllers/User.js')

module.exports = [

  { method: 'POST', path: '/api/v1/auth', config: User.registerUser },

  { method: 'GET', path: '/api/v1/code/{code}', config: User.useCode }

]
