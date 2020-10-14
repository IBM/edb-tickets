const db = require("../models/index.js");
const Assignee = db.Assignee;

// Retrieve all Assignees from the database.
exports.findAll = (req, res) => {
  Assignee.findAll()
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
