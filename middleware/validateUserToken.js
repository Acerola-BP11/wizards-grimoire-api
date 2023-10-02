const { auth } = require("../utils/firebase")

function validateUserToken(req, res, next){
    const token = req.get("Authorization")
    auth.verifyIdToken(token)
        .then((decodedToken) => {
            req.uid =  decodedToken.uid
            req.username = decodedToken.name
            next()
        })
        .catch((err) => {
            res.sendStatus(403).end()
        })
}

module.exports = validateUserToken