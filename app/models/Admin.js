const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

const AdminModel = mongoose.model('Admins', AdminSchema)

AdminSchema.index({ username: 1}, { unique: true })

exports.findAdminByUsername = (username, callback) => {
  AdminModel.findOne({ username: username }, callback)
}
