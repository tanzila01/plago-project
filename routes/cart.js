const express = require('express')
const route = express.Router()
// const upload = require('../middleware/multer')
const CartController = require('../controllers/cart')

route.post('/', CartController.create)
route.get('/', CartController.getall)
// route.put('/:productId', )
// route.delete('/:productId', )

module.exports = route


