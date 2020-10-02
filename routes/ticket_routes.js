var express = require('express');
var router = express.Router();

const tickets = require("../controllers/ticket_controller.js");

// Create a new Ticket
router.post("/", tickets.create);

// Read all Tickets
router.get("/", tickets.findAll);

// Read tickets for a user
router.get("/user", tickets.findByUser);

// Read tickets for a user
router.get("/assignee", tickets.findByAssignee);

// Update a Ticket with id
router.put("/:id", tickets.update);

// Delete a Ticket with id
router.delete("/:id", tickets.delete);


module.exports = router;

