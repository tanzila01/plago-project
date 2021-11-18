const express = require('express')
const route = express.Router()
// const upload = require('../middleware/multer')
const CartController = require('../controllers/cart')

route.post('/', CartController.create)
route.get('/', CartController.getall)
route.put('/',CartController.update);
// route.put('/:id',CartController.updateDec);
route.put('/:id',CartController.updateDec);
route.delete('/:id',CartController.delete);
route.delete('/',CartController.deleteAll);

module.exports = route


