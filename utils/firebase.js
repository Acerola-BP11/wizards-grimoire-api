var admin = require("firebase-admin");

var serviceAccount = require("./admin_credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://o-grimorio-do-mago-default-rtdb.firebaseio.com"
});

export const auth = admin.auth()