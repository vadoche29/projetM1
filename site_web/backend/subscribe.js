const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount.databaseURL
});

var registrationToken = "eYM-1feJRmGBcqTjU_HYsj:APA91bEhIexifetmyi_cg3o_ECtWRuC--LXT491nmq6d-WEo58QLq6ni7JL1Ey5B1MTETGaiDpgS5GLWhFBBR2odzxRYJBbWqKMsZ_zN23NtW-j20tbKCudi8f6oig_U8-AScZZHsMYb";
var topic = "serveur";

admin.messaging().subscribeToTopic(registrationToken, topic)
  .then(function(response) {
    console.log("Successfully subscribed to topic:", response);
	if (response.errors && response.errors.length > 0) {
        const subscriptionError = response.errors[0];
        console.log("Error details:", subscriptionError.error);
    }
  })
  .catch(function(error) {
    console.log("Error subscribing to topic:", error);
  });