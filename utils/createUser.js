import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "./firebase";

export default async function createUser(tokenEmail, userEmail, UserUid, username){
    if(tokenEmail === userEmail){
        const user = await getDoc(doc(database, '/users', UserUid))
        if(user.exists()){
            return {
                exists: true,
                validated: true
            }
        }else{
            await setDoc(doc(database, "/users", UserUid), {
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