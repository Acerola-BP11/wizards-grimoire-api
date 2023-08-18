var express = require('express');
var router = express.Router();

router.post('/new', async (req, res) => {
    console.log(await req.body)
    res.send(await req.body)
})

module.exports = router