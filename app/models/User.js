const _ = require('lodash')
const mongoose = require('mongoose')
const password = require('../util/password')
const Schema = mongoose.Schema
const Boom = require('boom')

const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

const UserModel = mongoose.model('User', UserSchema)

UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ username: 1 }, { unique: true })

exports.registerUser = (payload, callback) => {
  if (!payload.username) return callback('Error..') // TODO: Detailed error messages
  if (!payload.email) return callback('Error..')
  if (!payload.password) return callback('Error..')

  password.hash(payload.password, (err, hash) => {
    if (err) throw err // TODO: Error handling

    payload.password = hash
    let user = new User(payload, callback)
  })
}

exports.UserModel = UserModel
