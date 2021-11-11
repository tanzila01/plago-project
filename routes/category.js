
const express = require('express')
const route = express.Router()
const categoryController = require('../controllers/category')
const {authenticateJWT} = require('../middleware/authenticator')

route.post('/' , authenticateJWT , categoryController.create)
route.get('/' , categoryController.readAll)
route.delete('/:categoryId' , authenticateJWT , categoryController.delete)
route.get('/:categoryId', categoryController.read);
route.put('/',authenticateJWT,categoryController.update);

module.exports = route