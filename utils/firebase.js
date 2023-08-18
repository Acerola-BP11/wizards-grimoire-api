const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require("./admin_credentials.json");
const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://o-grimorio-do-mago-default-rtdb.firebaseio.com"
});

const auth = admin.auth()
const firestore = getFirestore()
const bucket = getStorage().bucket('o-grimorio-do-mago.appspot.com')

module.exports = {
  auth, firestore, bucket
}