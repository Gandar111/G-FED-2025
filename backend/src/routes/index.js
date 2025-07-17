/*let express = require('express');
let router = express.Router();

/!* GET http://localhost:8000/ returns index.html *!/
router.get('/', function(req, res) {
  res.render('index.html', { title: 'Home' });
});

module.exports = router;*/
let express = require('express');
let router = express.Router();

/* GET http://localhost:8000/ → Backend-Status anzeigen */
router.get('/', function(req, res) {
  res.send('Backend läuft auf http://13.60.78.19:8001');
});

module.exports = router;

