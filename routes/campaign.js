var express = require('express');
var router = express.Router();
const multer = require('multer');
const { createCampaign } = require('../controllers/campaignController')
const validateUserToken = require('../middleware/validateUserToken');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const archiveExtension = file.originalname.split('.')[1]
        req.imageExtension = archiveExtension
        const fileName = require('crypto')
            .randomBytes(64)
            .toString('hex')
        cb(null, `${fileName}.${archiveExtension}`)
    }
})
const upload = multer({storage})

router.post('/new', validateUserToken ,upload.single('campaignPicture'), createCampaign)

module.exports = router