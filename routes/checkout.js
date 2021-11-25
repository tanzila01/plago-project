const express = require('express')
const route = express.Router()
// const upload = require('../middleware/multer')
const CheckoutController = require('../controllers/checkout')

route.post('/', CheckoutController.create)
route.get('/', CheckoutController.getall)
route.get('/:id', CheckoutController.getId);
route.put('/:id',CheckoutController.update);
route.put('/',CheckoutController.updateDecline);

module.exports = route


