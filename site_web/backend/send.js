const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: serviceAccount.databaseURL
});

const messaging = admin.messaging();

const notification = {
  data : {
    title: '850',
    body: '2:45',
    notification_type : 'alarm'
  },
  topic: 'Brest'
};


admin.messaging().send(notification)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });