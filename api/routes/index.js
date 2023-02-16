var express = require('express');
var router = express.Router();
var moduleController = require("../controller/module/moduleController")
var userController = require('../controller/user/userController')


/* GET home page. */
router.post('/createModule',userController.secure,moduleController.createModule)
router.get('/listingModule',userController.secure,moduleController.listingModule)
router.get('/viewModule',userController.secure,moduleController.viewModule)
router.post('/editModule',userController.secure,moduleController.editModule)
router.delete('/deleteModule',userController.secure,moduleController.deleteModule)



router


module.exports = router;
