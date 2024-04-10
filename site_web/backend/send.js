const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: serviceAccount.databaseURL
});

const messaging = admin.messaging();
const app = express();

const host = '10.10.64.10';
const port = 3000;

// Autoriser les requêtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Analyser les requêtes JSON
app.use(bodyParser.json());

// Envoyer une notification
app.post('/envoyer-notification', (req, res) => {
  const topic = req.body.topic;
  const infoSupplementaires = req.body.infoSupplementaires;


  const data = {
    message: {
      topic: topic,
      data: infoSupplementaires,
    },
  };

  console.log(data.message.data);
  messaging.send(data.message)
    .then(function(response) {
      console.log('Successfully sent message:', response);
      if (response.errors && response.errors.length > 0) {
        const subscriptionError = response.errors[0];
        console.log("Error details:", subscriptionError.error);
      }
      res.status(200).json({ success: true, message: 'Notification envoyée avec succès' });
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
});

// Démarrer le serveur
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});