const User = require('./controllers/User.js')
const Admin = require('./controllers/Admin.js')

module.exports = [

  { method: 'POST', path: '/get', config: User.useCode },
  { method: 'GET', path: '/export', config: Admin.exportAsCSV }

]
