/*********************************************************************************
 *  WEB322 – Assignment 02
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Dhruv Bipinbhai Patel
 *
 *  Student ID: 142572197
 *
 *  Date: 02/05/2021
 *
 *  Online (Heroku) Link: https://dhruvpatel21.herokuapp.com/
 *
 ********************************************************************************/

const path = require("path");
var express = require("express");
var app = express();
var dataService = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
  return new Promise(function (res, req) {
    dataService
      .initialize()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/node_modules/views/home.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/node_modules/views/about.html"));
});

app.get("/site", function (req, res) {
  res.sendFile(path.join(__dirname + "/node_modules/public/css/site.css"));
});

app.get("/employees", function (req, res) {
  dataService
    .getAllEmployees()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});

app.get("/managers", function (req, res) {
  dataService
    .getManagers()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});

app.get("/departments", function (req, res) {
  dataService
    .getDepartments()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});

app.use(function (req, res) {
  res.status(404).send("Page not found");
});

app.listen(HTTP_PORT, onHttpStart);
