const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeSchema = new Schema({
  code: { type: String, required: true },
  used: { type: Boolean, default: false },
  studentId: { type: String, default: '', required: true },
  email: { type: String, require: true }
})

const CodeModel = mongoose.model('Code', CodeSchema)

CodeSchema.index({ code: 1 }, { unique: true })
CodeSchema.index({ studentId: 1 }, { unique: true, sparse: true })

exports.useCode = (code, studentId, email, callback) => {
  CodeModel.findOne({studentId: studentId}, (err, usedCode) => {
    if (err || usedCode) return callback('StudentId already used.')
    CodeModel.findOne({code: code}, (err, code) => {
      if (err || !code) return callback('Error')
      if (code.used) return callback('Code already used.')
      CodeModel.findOneAndUpdate(
        { _id: code._id },
        {
          $set: {
            studentId: studentId,
            used: true,
            email: email
          }
        },
        { new: true },
        callback
      )
    })
  })
}

exports.getAllCodes = (callback) => {
  CodeModel.find({}, { code: 1, studentId: 1, email: 1 }, callback)
}

exports.CodeModel = CodeModel
