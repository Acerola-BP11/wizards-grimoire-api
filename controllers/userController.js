import createUser from "../utils/createUser"
import { auth } from "../utils/firebase"

export async function verifyUser (req, res) {
    const userToken = req.body.userToken
    const userEmail = req.body.userEmail
    const username = req.body.username
    await auth.verifyIdToken(userToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid
            const tokenEmail = decodedToken.email
            const user = createUser(tokenEmail, userEmail, uid, username)
            if(user.validated === true) {
                return res.send({
                    uid: uid,
                    username: username,
                    email: userEmail
                })
            }else{
                return res.status(403).end()
            }
        })
}