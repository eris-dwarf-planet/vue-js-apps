const express = require('express')

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

app.put('/api/todos', function (req, res) {
  req.session.todos = req.body.todos
  res.json(req.session.todos)
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
