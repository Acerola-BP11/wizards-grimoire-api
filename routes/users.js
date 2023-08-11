var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const apicache = require('apicache')

const cache = apicache.middleware("10 minutes")

router.post('/verifyUser', userController.verifyUser);

module.exports = router;
