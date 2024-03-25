const axios = require('axios');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notif-65177-default-rtdb.europe-west1.firebasedatabase.app"
});

const firebaseRef = admin.database().ref('utilisateurs');
const djangoAPIUrl = 'http://10.10.64.10:8000/api/sst';

// Récupérer tous les identifiants Firebase existants dans la base Django
axios.get(djangoAPIUrl)
    .then(response => {
        const djangoData = response.data;
        console.log(djangoData);

        // Parcourir les données Firebase et ajouter celles qui n'existent pas déjà dans la base Django
        firebaseRef.once('value')
            .then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    const id_firebase = childSnapshot.key;
                    const firebaseData = childSnapshot.val();
                    const matchingDjangoData = djangoData.find(item => item.id_firebase === id_firebase);
                    if (!matchingDjangoData) {
                        const mappedData = {
                            id_firebase: id_firebase,
                            nom: firebaseData.nom,
                            prenom: firebaseData.prenom,
                            numero_tel: firebaseData.numeroTelephone,
                            site: firebaseData.site,
                        };

                        // Ajouter les données à la base de données Django
                        axios.post(djangoAPIUrl, mappedData)
                            .then(response => {
                                console.log('Données ajoutées avec succès à la base de données Django pour id_firebase:', id_firebase);
                            })
                            .catch(error => {
                                console.error('Erreur lors de l\'ajout des données à la base de données Django pour id_firebase:', id_firebase, error);
                            });
                    } else {
                        console.log('Les données pour id_firebase:', id_firebase, 'existent déjà dans la base Django.');
                    }
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données depuis Firebase:', error);
            });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données depuis la base de données Django:', error);
    });
