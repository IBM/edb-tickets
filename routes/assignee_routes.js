var express = require('express');
var router = express.Router();

const assignees = require("../controllers/assignee_controller.js");

// Read all Assignees
router.get("/", assignees.findAll);

module.exports = router;
