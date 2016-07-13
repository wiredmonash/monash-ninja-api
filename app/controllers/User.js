const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.registerUser = {
  handler: (req, res) => {
    console.log(req.payload)
    res()
  }
}
