const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

// Verbindungsdaten zur Datenbank
//const uri = "mongodb://locationdb_ghamdan:oIqaln3KH@mongodb1.f4.htw-berlin.de:27017/locationdb?authMechanism=DEFAULT";
const uri = "mongodb+srv://ghamdan:U8fi2J1sX1Th78n4@cluster0.kdql6tk.mongodb.net/locationdb?retryWrites=true&w=majority";



// Funktion zur Datenbankverbindung
async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db('locationdb').collection('locations');
}

//GET: Alle Locations
router.get('/', async function (req, res) {
    try {
        const collection = await connectToDatabase();
        const locations = await collection.find({}).toArray();  //ALLE Daten holen
        res.status(200).json(locations);                        //Array → kein .map Fehler
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// GET: Ein Location-Dokument anhand des Namens suchen
router.get('/search', async function (req, res) {
    try {
        const collection = await connectToDatabase();
        const query = { name: req.query.name };
        const doc = await collection.findOne(query);

        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).send("Location not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// DELETE: Ein Location-Dokument löschen anhand des Namens
router.delete('/:id', async function (req, res) {
    try {
        const collection = await connectToDatabase();
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount > 0) {
            res.status(200).send("Location deleted");
        } else {
            res.status(404).send("Location not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// POST: Ein neues Location-Dokument hinzufügen
router.post('/', async function (req, res) {
    try {
        const collection = await connectToDatabase();
        const result = await collection.insertOne(req.body);

        res.status(201).json(result);   // Erfolgsmeldung + MongoDB result
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/:id/like', async function(req, res) {
    try {
        const collection = await connectToDatabase();
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $inc: { likes: 1 } },
            { returnDocument: 'after', upsert: false }
        );
        res.status(200).json(result.value);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/:id', async function (req, res) {
  try {
    const collection = await connectToDatabase();

    const updatedData = { ...req.body };
    delete updatedData._id;

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Update fehlgeschlagen");
  }
});

// GET /ort/:id → Eintrag nach ID zurückgeben
router.get('/:id', async function (req, res) {
  try {
    const collection = await connectToDatabase();
    const result = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!result) {
      return res.status(404).send('Location not found');
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Interner Fehler beim Abrufen des Standorts");
  }
});




module.exports = router;
