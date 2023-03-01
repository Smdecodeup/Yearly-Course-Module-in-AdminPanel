var express = require('express');
var router = express.Router();
var topicController = require("../controller/topic/topicController")
var userController = require("../controller/user/userController")


router.post('/createTopic',userController.secure,topicController.createTopic)
router.post('/deleteTopic',userController.secure,topicController.deleteTopic)
router.post('/deleteAllTopic',userController.secure,topicController.deleteAllTopic)


router.get('/viewTopic',userController.secure,topicController.viewTopic)
router.get('/listingTopic',userController.secure,topicController.listingTopic)




module.exports = router;
