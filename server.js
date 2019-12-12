var fs = require('fs');
var express = require("express");
var path = require("path");
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3600;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('/public'));
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'db.json'));
});

app.post('/api/notes', (req, res) => {
  var newNote = req.body;
  // var data = fs.readFileSync('db.json');
  // var json = JSON.parse(data);
  // json.push();
  // fs.writeFile("db.json", JSON.stringify(json))
  res.json(newNote);
});

// app.delete('/api/notes/:id', (req, res) => {
  // var json = { ... };
  // var key = "foo";
  // delete json[key];
// })

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});