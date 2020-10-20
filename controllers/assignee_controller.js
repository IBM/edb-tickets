const db = require("../models/index.js");
const User = db.User;
const Assignee = db.Assignee;

// Create and Save a new Assignee
exports.create = (req, res) => {

  // TODO: validate req contents
  console.log("REQ.BODY", req.body)

  const user = {
    ...req.body  // TODO: get it from the input
  }

  const assignee = {
    ...req.body  // TODO: map what to keep/toss?
  }

  User.upsert(user, { returning: true})
  .then(data => {
    console.log("USERDATA", data[0]);
    console.log("USER ID", data[0].id);
    return Assignee.create({ ...assignee, user_id: data[0].id })
  })
  .then(data => {
    console.log("RESULT:", data);
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || 'ERROR: Something went wrong. :('
    })
  })

};

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
