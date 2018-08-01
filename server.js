//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port http://localhost:3000", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "ultravga1280",
    server: "localhost",
    database: "baza4"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, res) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                         console.log(res);
                                       res.send(res);
                                            }
                               });
                       }
      });           
}

//GET API
app.get("/api/user", function(req , res){
                var query = "SELECT * FROM [Table_user];";
                executeQuery (res, query);
});

//GET API by id
app.get("/api/user/:id", function(req , res){
    var query = "SELECT * FROM [Table_user] WHERE id = "+req.params.id+";";
    executeQuery (res, query);
});

//POST API
 app.post("/api/user", function(req , res){
                var query = "INSERT INTO [Table_user] (Name,Email,Password) VALUES ( " + req.body.Name+","+req.body.Email+","+req.body.Password+");";
                executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE [Table_user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id+";";
                executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user/:id", function(req , res){
                var query = "DELETE FROM [Table_user] WHERE id=" + req.params.id+";";
                executeQuery (res, query);
});