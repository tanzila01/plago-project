const express = require('express')
const route = express.Router()
// const upload = require('../middleware/multer')
const OrdersController = require('../controllers/orders')

// route.post('/', CheckoutController.create)
route.get('/', OrdersController.getAccepted)
route.get('/:id', OrdersController.getDeclined);
// route.put('/:id',CheckoutController.update);
// route.put('/',CheckoutController.updateDecline);

module.exports = route


