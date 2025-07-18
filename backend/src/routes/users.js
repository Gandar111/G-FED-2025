const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");

// Verbindungsdaten zur Datenbank
//const uri = "mongodb://locationdb_ghamdan:oIqaln3KH@mongodb1.f4.htw-berlin.de:27017/locationdb?authMechanism=DEFAULT";
const uri = "mongodb+srv://ghamdan:x.net/locationdb?retryWrites=true&w=majority"
// Funktion zur Verbindung mit der Benutzer-Collection
async function connectToUserDB() {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db('locationdb').collection('users');
}

// GET: Alle Benutzer abrufen (optional für Admin)
router.get('/', async function (req, res) {
    try {
        const collection = await connectToUserDB();
        const users = await collection.find({}, { projection: { password: 0 } }).toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        res.status(500).send("Internal Server Error");
    }
});

// POST: Login-Anfrage prüfen
router.post('/', async function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Benutzername und Passwort erforderlich.");
    }

    try {
        const collection = await connectToUserDB();
        const user = await collection.findOne({ username, password });

        if (user) {
            // Passwort nicht senden
            delete user.password;
            res.status(200).json(user);
        } else {
            res.status(401).send("Login fehlgeschlagen. Benutzer nicht gefunden.");
        }
    } catch (err) {
        console.error("Fehler beim Login:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
