const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount.databaseURL
});

const messaging = admin.messaging();

// Écoute des messages sur le topic "alarm"
messaging.subscribeToTopic('alarm')
    .then(() => {
        console.log('Successfully subscribed to topic "alarm"');
    })
    .catch((error) => {
        console.error('Error subscribing to topic:', error);
    });

// Gérer les messages reçus
messaging.onMessage((message) => {
    console.log('Received message:', message);
});
