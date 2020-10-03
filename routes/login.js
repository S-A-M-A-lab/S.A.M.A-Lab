var login = require("express").Router();
var db = require("../db/database.js");
var bcrypt = require("bcryptjs");

login.post("/login", (req, res) => {
  var user = req.body;
  console.log(user);
  let sql =
    "SELECT password FROM users WHERE username = " + '"' + user.username + '"';
  db.connection.query(sql, (err, data) => {
    if (err) console.error(err);
    res.send(bcrypt.compareSync(user.password, data[0].password));
  });
});

module.exports = login;
