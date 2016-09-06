const Joi = require('joi')
const CodeModel = require('../models/Code')

exports.useCode = {
  validate: {
    payload: {
      code: Joi.string().length(5),
      studentId: Joi.string().length(8)
    }
  },
  handler: (req, res) => {
    CodeModel.useCode(req.payload.code, req.payload.studentId, (err, code) => {
      if (err || !code) return res({status: 'error'})
      return res({status: 'sucess'})
    })
  }
}
