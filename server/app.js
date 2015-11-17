var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sql_solo_challenge_week6';

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.get('/people', function(req,res){
    var theseEmployees = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT users.* FROM users");

        query.on('row', function (row) {
            theseEmployees.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(theseEmployees);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

app.post('/thisaddress', function(req,res){
    var thisAddress = [];
    //var findAddress = {
    //    id : req.body.id
    //};

    var findAddress = req.body.id;

    console.log(findAddress);

    pg.connect(connectionString, function(err, client, done){

        var query = client.query("SELECT users.name, addresses.* FROM users JOIN addresses ON users.id = addresses.user_id" +
            " WHERE users.id = " + findAddress);

        query.on('row', function (row) {
            thisAddress.push(row);
        });

        query.on('end', function () {
            client.end();
            return res.json(thisAddress);
        });

        if (err) {
            console.log(err);
        }
        console.log(query);
    });
    console.log(thisAddress);
});

app.get("/*", function(req,res,next){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;