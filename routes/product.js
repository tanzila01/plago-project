const express = require('express')
const route = express.Router()
const productController = require('../controllers/product')
const {authenticateJWT} = require('../middleware/authenticator')
const upload = require('../middleware/multer')

// route.post('/' , authenticateJWT , upload.single('productImage') ,
route.post('/' , authenticateJWT , upload.any('productImage') ,
    productController.create
  )
route.get('/' , productController.readAll
  )
route.delete('/:productId' , authenticateJWT , productController.delete)

// route.get('/:productId', productController.read);

route.get('/:catid', productController.readCAt);

route.put(
	'/:productId',
	authenticateJWT,
	upload.single('productImage'),
	productController.update
);

module.exports = route

