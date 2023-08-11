const { auth } = require('../utils/firebase')
const { createUser } = require('../utils/createUser') 

async function verifyUser (req, res) {
    const userToken = req.body.userToken
    const userEmail = req.body.email
    const username = req.body.username
    await auth.verifyIdToken(userToken)
        .then(async (decodedToken) => {
            const uid = decodedToken.uid
            const tokenEmail = decodedToken.email
            const user = await createUser(tokenEmail, userEmail, uid, username)
            res.send(user)
        })
}

module.exports = {
    verifyUser
}