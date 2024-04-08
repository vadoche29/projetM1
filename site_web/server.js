const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware pour analyser les données JSON
app.use(bodyParser.json());

// Clé secrète pour la signature JWT (à remplacer par une vraie clé sécurisée)
const secretKey = fs.readFileSync('./private.key', 'utf8');
//console.log(secretKey);

// Route de connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;
	console.log(req.body);

    // Vérification des identifiants (à remplacer par votre propre logique d'authentification)
    if (email === 'laurent.etienne@isen-ouest.yncrea.fr' && password === 'admin') {
        // Générer un token JWT avec le rôle d'administrateur
        const token = jwt.sign({ role: 'admin' }, secretKey);
        res.json({ token });
    } else if (email === 'user' && password === 'user') {
        // Générer un token JWT avec le rôle d'utilisateur
        const token = jwt.sign({ role: 'user' }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
