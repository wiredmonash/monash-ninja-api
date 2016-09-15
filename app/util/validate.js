const AdminModel = require('../models/Admin')
const Bcrypt = require('bcrypt')

const validate = (request, username, password, callback) => {
  AdminModel.findAdminByUsername(username, (err, user) => {
    if (!user || err) return callback(null, false)
    Bcrypt.compare(password, user.password, (err, isValid) => {
      callback(err, isValid, { id: user.id })
    })
  })
}

module.exports = validate
