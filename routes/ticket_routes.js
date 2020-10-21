/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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

