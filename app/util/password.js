const bcrypt = require('bcrypt')

exports.hash = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.log(err)
    bcrypt.hash(password, salt, (err, hash) => {
      return callback(err, hash)
    })
  })
}
