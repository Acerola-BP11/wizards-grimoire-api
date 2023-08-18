const { auth } = require("../utils/firebase")

function validateUserToken(req, res, next){
    const token = req.get("Authorization")
    auth.verifyIdToken(token)
        .then((decodedToken) => {
            req.uid =  decodedToken.uid
            next()
        })
        .catch(() => {
            res.sendStatus(403).end()
        })
}

module.exports = validateUserToken