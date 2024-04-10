const axios = require('axios');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const moment = require('moment-timezone');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notif-65177-default-rtdb.europe-west1.firebasedatabase.app"
});

const firebaseRef = admin.database().ref('utilisateurs');
const djangoAPIUrl = 'http://10.10.64.10:8000/api/sst';
const sstSiteAPIUrl = 'http://10.10.64.10:8000/api/sst-site';

// Fonction pour récupérer l'identifiant SST correspondant à partir de la base de données SST
async function getIdSst(id_firebase) {
    try {
        const response = await axios.get(djangoAPIUrl);
        const sstData = response.data;
        
        for (const item of sstData) {
            if (item.id_firebase === id_firebase) {
                return item.id_sst;
            }
        }

        console.error('Aucun identifiant SST correspondant trouvé pour id_firebase:', id_firebase);
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'identifiant SST:', error);
        throw error;
    }
}

firebaseRef.on('value', async (snapshot) => {
    const firebaseData = snapshot.val();
    const promises = [];

    Object.keys(firebaseData).forEach(async id_firebase => {
        const firebaseItem = firebaseData[id_firebase];
        if (firebaseItem.presence === "sorti") {
            // Si la valeur de présence est "sorti", mettez à jour la date de départ
            promises.push(updateDepartureDate(id_firebase));
            console.log("Presence is sorti for id_firebase:", id_firebase);
        }
    });

    await Promise.all(promises);
});


async function updateDepartureDate(id_firebase) {
    try {
        const id_sst = await getIdSst(id_firebase);
        if (id_sst !== null) {
            // Récupérer les données de la base de données sst-site
            const response = await axios.get(sstSiteAPIUrl);
            const sstSiteData = response.data;

            // Rechercher l'enregistrement correspondant à id_sst dans la base de données
            const sstRecord = sstSiteData.find(record => record.id_sst === id_sst);
            if (sstRecord) {
                const sstId = sstRecord.id; // Récupérer l'id correspondant
                const updatedData = {
                    date_depart: moment().format('YYYY-MM-DD HH:mm:ss')
                };
                await axios.put(`${sstSiteAPIUrl}/update-departure-date/${sstId}`, updatedData);
                console.log(`Departure date updated for SST with id_sst ${id_sst} and id ${sstId}.`);
            } else {
                console.error('No corresponding record found for id_sst:', id_sst);
            }
        } else {
            console.error('No corresponding SST ID found for id_firebase:', id_firebase);
        }
    } catch (error) {
        console.error('Error updating departure date:', error);
        throw error;
    }
}

async function checkAndAddData() {
    try {
        const [djangoResponse, firebaseSnapshot] = await Promise.all([
            axios.get(djangoAPIUrl),
            firebaseRef.once('value')
        ]);

        console.log("Firebase snapshot retrieved successfully.");
        
        const djangoData = djangoResponse.data;
        const firebaseData = firebaseSnapshot.val();

        //console.log("Firebase data:", firebaseData);

        const promises = [];

        Object.keys(firebaseData).forEach(async id_firebase => {
            //console.log("Processing id_firebase:", id_firebase);
            
            const firebaseItem = firebaseData[id_firebase];
            const matchingDjangoData = djangoData.find(item => item.id_firebase === id_firebase);
            //console.log("Presence:", firebaseItem.presence);

            if (!matchingDjangoData) {
                console.log("Data not found in Django for id_firebase:", id_firebase);

                const mappedData = {
                    id_firebase: id_firebase,
                    nom: firebaseItem.nom,
                    prenom: firebaseItem.prenom,
                    numero_tel: firebaseItem.numeroTelephone,
                    site: firebaseItem.site,
                };

                promises.push(axios.post(djangoAPIUrl, mappedData));
            } else {
                if (
                    matchingDjangoData.nom !== firebaseItem.nom ||
                    matchingDjangoData.prenom !== firebaseItem.prenom ||
                    matchingDjangoData.numero_tel !== firebaseItem.numeroTelephone ||
                    matchingDjangoData.site !== firebaseItem.site
                )
                    {
                        // Ajoutez des logs pour afficher les valeurs spécifiques qui ne correspondent pas
                        if (matchingDjangoData.nom !== firebaseItem.nom) {
                            console.log("Nom ne correspond pas:");
                            console.log("  Django:", matchingDjangoData.nom);
                            console.log("  Firebase:", firebaseItem.nom);
                        }
                        if (matchingDjangoData.prenom !== firebaseItem.prenom) {
                            console.log("Prenom ne correspond pas:");
                            console.log("  Django:", matchingDjangoData.prenom);
                            console.log("  Firebase:", firebaseItem.prenom);
                        }
                        if (matchingDjangoData.numero_tel.toString() !== firebaseItem.numeroTelephone) {
                            console.log("Numero de telephone ne correspond pas:");
                            console.log("  Django:", matchingDjangoData.numero_tel.toString());
                            console.log("  Firebase:", firebaseItem.numeroTelephone);
                        }
                        if (matchingDjangoData.site !== firebaseItem.site) {
                            console.log("Site ne correspond pas:");
                            console.log("  Django:", matchingDjangoData.site);
                            console.log("  Firebase:", firebaseItem.site);
                        }

                        const updatedData = {
                            id_firebase: id_firebase,
                            nom: firebaseItem.nom,
                            prenom: firebaseItem.prenom,
                            numero_tel: firebaseItem.numeroTelephone,
                            site: firebaseItem.site,
                        };

                        promises.push(axios.put(`${djangoAPIUrl}/${matchingDjangoData.id_sst}`, updatedData));
                        console.log("Data updated successfully for id_firebase:", id_firebase);
                    }
            }

            if (firebaseItem.presence !== "sorti") {
                //console.log("Presence is oui for id_firebase:", id_firebase);
                
                promises.push(new Promise(async (resolve, reject) => {
                    try {
                        const id_sst = await getIdSst(id_firebase);
                        //console.log("id_sst for id_firebase:", id_firebase, "is:", id_sst);
                        
                        if (id_sst !== null) {

                            const response = await axios.get(sstSiteAPIUrl);
                            const sstSiteData = response.data;
                            
                            if (sstSiteData.find(item => item.id_sst === id_sst)) {
                                console.log('Data already exists in geo_notification_sst_site for id_firebase:', id_firebase);

                                const sstRecord = sstSiteData.find(record => record.id_sst === id_sst);
                                if (sstRecord) {
                                    const sstId = sstRecord.id; // Récupérer l'id correspondant
                                    const updatedData = {
                                        site_isen: firebaseItem.presence,
                                        date_arrivee: new Date().toISOString(),
                                        date_depart: null
                                    };
                                    await axios.put(`${sstSiteAPIUrl}/update-departure-date/${sstId}`, updatedData);
                                    console.log(`Arrival date updated for SST with id_sst ${id_sst}.`);
                                }
                            }

                            else {
                                const geoNotificationData = {
                                id_sst: id_sst,
                                site_isen: firebaseItem.presence,
                                date_arrivee: new Date().toISOString()};

                                await axios.post(sstSiteAPIUrl, geoNotificationData);
                                console.log('Data successfully added to geo_notification_sst_site for id_firebase:', id_firebase);
                            }
                        } else {
                            console.error('No corresponding SST ID found for id_firebase:', id_firebase);
                        }
                        resolve();
                    } catch (error) {
                        console.error('Error adding data to geo_notification_sst_site for id_firebase:', id_firebase, error);
                        reject(error);
                    }
                }));
            }
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Error retrieving or adding data:', error);
    }
}

checkAndAddData();
setInterval(checkAndAddData, 60000);


