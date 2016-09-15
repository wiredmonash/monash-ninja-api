const Hapi = require('hapi')
const mongoose = require('mongoose')
const env = require('./env')
const validate = require('./app/util/validate')

const routes = require('./app/routes')

const app = new Hapi.Server()

app.connection({ host: '0.0.0.0', port: 3000, routes: { cors: { origin: ['*'] } } })

const db = env.MONGODB_URI

app.register(require('hapi-auth-basic'), (err) => {
  if (err) throw err

  app.auth.strategy('simple', 'basic', { validateFunc: validate })
  app.route(routes)
})

if (!env.TESTING) {
  app.on('response', (request) => {
    console.log('Payload: ' + JSON.stringify(request.payload))
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode)
  })
}

app.start((err) => {
  if (err) throw err

  mongoose.connect(db, {}, (err) => {
    if (err) throw err
  })
})

module.exports = app
