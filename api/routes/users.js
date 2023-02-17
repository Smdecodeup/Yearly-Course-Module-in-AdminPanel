var express = require('express');
var router = express.Router();
var userController = require("../controller/user/userController")

/* GET users listing. */
router.post('users/Login', userController.Login)

router.post('/api',userController.api)
module.exports = router;
