const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true },
  authType: { type: String, required: true },
  authId: { type: String, required: true }
})

const UserModel = mongoose.model('User', UserSchema)

UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ authId: 1, authType: 1 }, { unique: true })

exports.UserModel = UserModel
