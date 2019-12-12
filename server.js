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
app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + '/public'));

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'db.json'));
  // fs.readFile()
});

app.post('/api/notes', (req, res) => {
  var allNotes = require('./public/db.json');
  var newNote = req.body;
  allNotes.push(newNote);
  fs.writeFile ('./public/db.json', JSON.stringify(allNotes), function(err) {
    if (err) throw err;
    res.send(`Note Added: ${newNote}`);
    }
  )
});

app.delete('/api/notes/:title', (req, res) => {
  fs.readFile('./public/db.json', 'utf8', (err, jsonString) => {
    if (err) throw err;
    let deleteNote = req.params.title;
    let json = JSON.parse(jsonString);
    const jsonDelete = json.filter(item => item.title !== deleteNote);
  fs.writeFile ('./public/db.json', JSON.stringify(jsonDelete), function(err) {
    if (err) throw err;
    res.send('Note Deleted');
    }
  )
} )
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});