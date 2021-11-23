const express = require('express')
const route = express.Router()
// const upload = require('../middleware/multer')
const CheckoutController = require('../controllers/checkout')

route.post('/', CheckoutController.create)
route.get('/', CheckoutController.getall)
route.get('/:id', CheckoutController.getId);
// route.put('/',CartController.update);
// route.put('/:id',CartController.updateDec);
// route.delete('/:id',CartController.delete);
// route.delete('/',CartController.deleteAll);

module.exports = route


