var express = require('express');
const { getCharacter, createCharacter } = require('../controllers/characterController');
var router = express.Router();

router.get('/:ID', getCharacter)
router.post('/new', createCharacter)

module.exports = router