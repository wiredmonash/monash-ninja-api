const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeSchema = new Schema({
  code: { type: String, required: true },
  used: { type: Boolean, default: false },
  studentId: { type: String, default: '', required: true }
})

const CodeModel = mongoose.model('Code', CodeSchema)

CodeSchema.index({ code: 1 }, { unique: true })
CodeSchema.index({ studentId: 1 }, { unique: true })

exports.useCode = (code, studentId, callback) => {
  CodeModel.findOne({code: code}, (err, code) => {
    if (err) return callback('Error')
    if (code.used) return callback('Code already used.')
    CodeModel.findOneAndUpdate(
      { _id: code._id },
      {
        $set: {
          studentId: studentId,
          used: true
        }
      },
      { new: true },
      callback
    )
  })
}

exports.CodeModel = CodeModel
