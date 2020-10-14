const db = require("../models/index.js");
const User = db.User;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      console.log("FIND ALL RESULT:", data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'ERROR: Something went wrong. :('
      })
    })
};
