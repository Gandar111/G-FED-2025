let express = require('express');
let router = express.Router();

//es ist wie in Java ein Objekt von einer Klasse zu erstellen und dann kannst du anhand dieser Variable oder diese Objekt alle Methoden der Klasse aufgerufen
const mongoCRUDs = require('../db/mongoCRUDs');

// Wird bei GET http://localhost:8001/users aufgerufen 
router.get('/', async function(req, res) {
  try {
    //let userDoc = await mongo_cruds.findOneUser("admina", "pass1234");
    let users = await mongoCRUDs.findAllUsers();
    if(users)
      res.status(200).json(users);
    else {
      res.status(404).send(`Users not found!`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something is not right!!");
  }
});

// Wird bei  
// POST http://localhost:8001/users mit payload 
// {"username":"xyz", "password":"zyx"}
// erwartet eine payload diesen Formats ^^^
// der Header Content-Type: application/json MUSS mitgeschickt
// 
router.post('/', async function(req, res) {
  // wird automatisch in ein JS-Objekt umgewandelt, 
  // wenn Content-Type: application/json gesetzt ist
  let userToLogin = req.body;  
  console.log (userToLogin);
  //(userToLogin.username === "admina") {
    try {
    //let userDoc = await mongo_cruds.findOneUser("admina", "pass1234");
    let users = await mongoCRUDs.findOneUser(userToLogin.username, userToLogin.password);
    if(users)
      res.status(200).json(users);
    else {
      res.status(404).send(`Users not found!`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something is not right!!");
  }
});

module.exports = router;
