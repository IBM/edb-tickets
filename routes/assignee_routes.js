var express = require('express');
var router = express.Router();

const assignees = require("../controllers/assignee_controller.js");

// Create a new Assignee
router.post("/", assignees.create);

// Read all Assignees
router.get("/", assignees.findAll);

module.exports = router;
