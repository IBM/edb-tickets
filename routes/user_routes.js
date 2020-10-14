var express = require('express');
var router = express.Router();

const users = require("../controllers/user_controller.js");

// Read all Users
router.get("/", users.findAll);

module.exports = router;
