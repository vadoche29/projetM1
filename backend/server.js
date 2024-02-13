const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: '10.10.64.10',
  user: 'admin',
  password: 'isenprojetm1',
  database: 'geonotification'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    return;
  }
  console.log('Connecté à la base de données MariaDB');
});

// Définition des endpoints
app.get('/api/sst', (req, res) => {
  connection.query('SELECT * FROM SST', (error, results, fields) => {
    if (error) {
      res.status(500).send('Erreur lors de la récupération des données SST');
      throw error;
    }
    res.json(results);
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
