var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(__dirname + '/public'));
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var data = require("./db/db.json");

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.json(data);
});

app.post("/api/notes", function (req, res) {
    data.push(req.body);
    res.json(data);
});

app.delete("/api/notes/:id", function (req, res) {
    const id = Number(req.params.id);
    const newNotes = data.filter((el) => el.id != id);
    if(newNotes){
        data = newNotes;
        res.json(data);
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});