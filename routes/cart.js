const express = require('express')
const route = express.Router()
// const upload = require('../middleware/multer')
const CartController = require('../controllers/cart')

route.post('/', CartController.create)
// route.post('/', )
// route.put('/:productId', )
// route.delete('/:productId', )

module.exports = route


// const express = require('express')
// const route = express.Router()
// const CartController = require('../controllers/cart')
// // const {authenticateJWT} = require('../middleware/authenticator')
// const upload = require('../middleware/multer')

// route.post('/' , CartController.create
//   )


module.exports = route

