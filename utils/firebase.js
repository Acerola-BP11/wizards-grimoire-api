var admin = require("firebase-admin");

var serviceAccount = require("./admin_credentials.json");
const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://o-grimorio-do-mago-default-rtdb.firebaseio.com"
});

const auth = admin.auth()
const firestore = getFirestore()

module.exports = {
  auth, firestore
}