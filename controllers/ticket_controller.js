const db = require("../models/index.js");
const Ticket = db.Ticket;
const User = db.User;
const Assignee = db.Assignee;
const Op = db.Sequelize.Op;

// console.log("DB", db);

// Create and Save a new Ticket
exports.create = (req, res) => {

  // TODO: validate req contents
  console.log("REQ.BODY", req.body)

  const user = {
    ...req.body  // TODO: get it from the inpug
  }

  const ticket = {
    ...req.body  // TODO: map what to keep/toss?
  }

  User.upsert(user, { returning: true})
  .then(data => {
    console.log("USERDATA", data[0]);
    console.log("USER ID", data[0].id);
    return Ticket.create({ ...ticket, user_id: data[0].id })
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

// Retrieve all Tickets created by a user
exports.findByUser = (req, res) => {
  let email = req.query.email;
  Ticket.findAll({
    include:[{
      model: User,
      where: {
        email: decodeURIComponent(email),
      },
    }],
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

// Create Assignee
exports.createAssignee = (req, res) => {

  const user = {
    ...req.body
  }

  Assignee.upsert(user, { returning: true})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'ERROR: Something went wrong. :('
      })
    })
  }

// Retrieve all Tickets assigned to an assignee
exports.findByAssignee = (req, res) => {
  let email = req.query.email;
  Ticket.findAll({
    include:[{
      model: Assignee,
      where: {
        email: decodeURIComponent(email),
      },
    }],
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


// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  Ticket.findAll()
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

// Find a single Ticket with an id
exports.findOne = (req, res) => {

};

// Update a Ticket by the id in the request
exports.update = (req, res) => {

  console.log("TICKET CONTROLLER: ", "UPDATE");
  console.log("ID: ", req.body.id);
  console.log("BODY: ", req.body);

  // const ticket = {
    // ...req.body  // TODO: map what to keep/toss?
  // };

  // Not sure why I'm getting camel case sometimes.
  req.body.user_id = req.body.user_id || req.body.UserId;
  req.body.assignee_id = req.body.assignee_id || req.body.AssigneeId;

  // Ticket.update({subject: req.body.subject, text: req.body.text}, { where: {id: req.body.id}, returning: true } )
  Ticket.update(req.body, { where: {id: req.body.id}, returning: true } )
    .then(data => {
      console.log("RESULT:", data);
      res.send(data[1]);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'ERROR: Something went wrong. :('
      })
    })

};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  console.log("TICKET CONTROLLER: ", "DELETE");
  console.log("REQ: ", req);
  Ticket.destroy({ where: {id: req.params.id} } )
    .then(data => {
      console.log("RESULT:", data);
      res.send({ id: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'ERROR: Something went wrong. :('
      })
    })

};

// Delete all Tickets from the database.
exports.deleteAll = (req, res) => {
  console.log("TICKET CONTROLLER: ", "DELETE_ALL");

};

// Find all published Tickets
exports.findAllPublished = (req, res) => {

};
