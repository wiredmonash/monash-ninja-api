const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeSchema = new Schema({
  code: { type: String, required: true },
  used: { type: Boolean, default: false }
})

const CodeModel = mongoose.model('Code', CodeSchema)

CodeSchema.index({ email: 1 }, { unique: true })
CodeSchema.index({ username: 1 }, { unique: true })

exports.CodeModel = CodeModel
