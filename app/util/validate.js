const Bcrypt = require('bcrypt')

// TODO: Put this in Mongo
const users = {
  admin: {
    username: 'admin',
    password: '$2a$08$cGtwADl2Yxq2EgNe/r.x2OXQR5mgKcXSL7E/md.Oujf18HWeqbkhm',
    name: 'Admin',
    id: 0
  }
}

const validate = (request, username, password, callback) => {
  const user = users[username]
  if (!user) {
    return callback(null, false)
  }

  Bcrypt.compare(password, user.password, (err, isValid) => {
    callback(err, isValid, { id: user.id, name: user.name })
  })
}

module.exports = validate
