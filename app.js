const Hapi = require('hapi')
const mongoose = require('mongoose')
const secret = require('./config')
const env = require('./env')
const validate = require('./app/util/validate')

const routes = reqiure('./app/routes')

const app = new Hapi.Server()

app.connection({ port: 3000 })

const db = env.MONGODB_URI

app.register(require('hapi-auth-jwt2'), (err) => {
  if (err) console.log(err)

  app.auth.strategy('jwt', 'jwt', {
    key: secret,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  })

  app.auth.default('jwt')
  app.route(routes)
})

app.start((err) => {
  if (err) throw err

  mongoose.connect(db, {}, (err) => {
    if (err) throw err
  })
})

module.exports = app
