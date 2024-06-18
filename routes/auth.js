

const express = require('express');
const router = express.Router()
const {signupValidator ,signinValidator, validatorResult} = require('../middleware/validator')
const {signupController , signinController, adminSigninController} = require("../controllers/auth")

router.post('/signup', signupValidator , 
validatorResult , signupController);

router.post('/signin', signinValidator , 
validatorResult , signinController);

router.post('/adminsignin', signinValidator , 
validatorResult , adminSigninController);

module.exports = router