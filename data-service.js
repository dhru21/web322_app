var employees = {};
var departments = {};
var fs = require("fs");

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    try {
      fs.readFile("./data/employees.json", function (err, data) {
        if (err) throw err;
        employees = JSON.parse(data);
      });
      fs.readFile("./data/departments.json", function (err, data) {
        if (err) throw err;
        departments = JSON.parse(data);
      });
    } catch (ex) {
      reject("Unable to read file!");
    }
    resolve("JSON file successfully read.");
  });
};

module.exports.getAllEmployees = function () {
  var allEmployees = [];
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < employees.length; i++) {
      allEmployees.push(employees[i]);
    }
    if (allEmployees.length == 0) {
      reject("No results returned");
    }
    resolve(allEmployees);
  });
};

module.exports.getManagers = function () {
  var manager = [];
  return new Promise(function (resolve, reject) {
    if (employees.length == 0) {
      reject("No results returned");
    } else {
      for (var k = 0; k < employees.length; k++) {
        if (employees[k].isManager == true) {
          manager.push(employees[k]);
        }
      }
      if (manager.length == 0) {
        reject("No results returned");
      }
    }
    resolve(manager);
  });
};

module.exports.getDepartments = function () {
  var department = [];
  return new Promise(function (resolve, reject) {
    if (employees.length == 0) {
      reject("No results returned");
    } else {
      for (var j = 0; j < departments.length; j++) {
        department.push(departments[j]);
      }
      if (department.length == 0) {
        reject("No results returned");
      }
    }
    resolve(department);
  });
};
