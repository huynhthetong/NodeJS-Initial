const api = require('express').Router()

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

api.use('/users', require('./user/userRoutes'))
api.use('/categories', require('./category/categoryRoutes'))
api.use('/posts', require('./post/postRoutes'))

module.exports = api
