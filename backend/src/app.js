const express = require('express');
const cors = require('cors');                                 // ✅ HIER cors importieren
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/ort');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ort', locationsRouter);

app.use(express.static(path.join(__dirname, '../public')));   // optional: statische Dateien

// 404-Handler
app.use(function(req, res) {
    res.status(404).send('Not found: ' + req.path);
});

// Fehler-Handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('error: ' + err.message);
});

module.exports = app;
