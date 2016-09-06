const Joi = require('joi')

exports.registerUser = {
  handler: (req, res) => {
    console.log(req.payload)
    res()
  }
}

exports.useCode = {
  validate: {
    params: {
      code: Joi.string().length(6)
    }
  },
  handler: (req, res) => {
    res(req.params.code)
  }
}
