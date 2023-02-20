var express = require('express');
var router = express.Router();
var topicController = require("../controller/topic/topicController")
var userController = require("../controller/user/userController")


router.post('/createTopic',userController.secure,topicController.createTopic)
router.get('/listingTopic',userController.secure,topicController.listingTopic)

router.post('/deleteTopic',userController.secure,topicController.deleteTopic)



module.exports = router;
