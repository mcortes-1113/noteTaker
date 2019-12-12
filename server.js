var fs = require('fs');
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3600;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'db.json'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

// app.post('/api/notes', (req, res) => {
//   res.json(newNote);
// });

// app.delete('/api/notes/:id', (req, res) => {
// })

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});