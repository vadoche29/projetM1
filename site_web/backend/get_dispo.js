const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notif-65177-default-rtdb.europe-west1.firebasedatabase.app"
});

const firebaseRef = admin.database().ref('utilisateurs');
const sstAPIUrl = 'http://10.10.64.10:8000/api/sst';
const sstIncidentAPIUrl = 'http://10.10.64.10:8000/api/sst-incident';

async function addToSSTIncident(incidentId, idSst, intervenant1) {
    try {
        // Vérifier si l'identifiant de l'incident existe déjà dans la base de données sst-incident
        const existingIncidentsResponse = await axios.get(`${sstIncidentAPIUrl}?id_incident=${incidentId}`);
        const existingIncidents = existingIncidentsResponse.data;

        if (existingIncidents.length === 0) {
            // L'identifiant de l'incident n'existe pas encore, donc on peut ajouter une nouvelle instance
            const currentDate = new Date().toISOString(); // Récupère la date et l'heure actuelles

            // Données de la nouvelle instance à ajouter à la base de données sst-incident
            const newData = {
                intervenant1: intervenant1,
                heure_etat: currentDate,
                id_sst: idSst,
                id_incident: parseInt(incidentId),
                etat: 5
            };

            // Envoi de la requête POST pour ajouter les nouvelles données à la base de données sst-incident
            const response = await axios.post(sstIncidentAPIUrl, newData);
            console.log('Nouvelle instance ajoutée à la base de données sst-incident:', response.data);
        } else {
            console.log(`L'identifiant de l'incident ${incidentId} existe déjà dans la base de données sst-incident. Pas besoin d'ajouter une nouvelle instance.`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la nouvelle instance à la base de données sst-incident:', error);
    }
}


async function fetchData() {
    try {
        const snapshot = await firebaseRef.once('value');
        const firebaseData = snapshot.val();

        const sstResponse = await axios.get(sstAPIUrl);
        const sstData = sstResponse.data; // Données de la base SST
        
        // Filtrer les données pour ne récupérer que celles dont l'attribut "presence" n'est pas "sorti"
        const filteredData = Object.entries(firebaseData).filter(([key, item]) => 
            item.disponibilite !== undefined && // Filtrer par "disponibilite" défini
            item.disponibilite !== "occupé" // Filtrer par "disponibilite" différent de "occupé"
        );
        
        // Récupérer l'identifiant de l'incident à partir de la valeur de l'attribut "disponibilite"
        filteredData.forEach(async ([key, item]) => {
            const match = item.disponibilite.match(/dispo (\d+)/); // Utilisation d'une expression régulière
            if (match && match[1]) {
                const incidentId = match[1]; // Identifiant de l'incident isolé
                console.log("ID Firebase:", key);
                console.log("Identifiant de l'incident:", incidentId);
                
                // Recherche de la correspondance dans la liste des SST
                const sstRecord = sstData.find(record => record.id_firebase === key);
                
                if (sstRecord) {
                    console.log("Informations du SST:");
                    console.log("Nom:", sstRecord.nom);
                    console.log("Prénom:", sstRecord.prenom);
                    console.log("Numéro de téléphone:", sstRecord.numero_tel);
                    console.log("Identifiant SST:", sstRecord.id_sst);

                    // Ajouter une nouvelle instance à la base de données sst-incident
                    await addToSSTIncident(incidentId, sstRecord.id_sst, `${sstRecord.nom} ${sstRecord.prenom}`);
                } else {
                    console.log("Aucune information trouvée pour l'identifiant Firebase:", key);
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
setInterval(fetchData, 60000); // Récupérer toutes les minutes
