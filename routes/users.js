var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.post('/verifyUser', userController.verifyUser);

module.exports = router;
