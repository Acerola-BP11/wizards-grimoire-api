const { firestore } = require('./firebase')

async function createUser(tokenEmail, userEmail, UserUid, username){
    const usersRef = firestore.collection('Users')
    if(tokenEmail === userEmail){
        const user = await usersRef.doc(UserUid).get()
        if(user.exists){
            return {
                exists: true,
                validated: true
            }
        }else{
            await usersRef.doc(UserUid).set({
                uid: UserUid,
                username: username,
                email: userEmail
            })
            return {
                exists: false,
                validated: true
            }
        }
    }else{
        return {
            exists: null,
            validated: false
        }
    }
}

module.exports = {
    createUser
}