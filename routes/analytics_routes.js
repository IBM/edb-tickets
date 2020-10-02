var express = require('express');
var router = express.Router();
var request = require('request');
let jsonData = require('../data/dashboardSpec.json');

const dde_client_id = process.env.CA_CLIENT_ID;
const dde_client_secret = process.env.CA_CLIENT_SECRET;
const dde_endpoint_url = process.env.CA_ENDPOINT_URL;

const dde_web_domain = dde_endpoint_url;
dde_web_domain.replace('/daas/', '');
let dde_session_code = 'undefined';

// retrieve session code
router.get("/getCAcode", function(req, result ) {

  // create a session on Cognos Analytics Embedded Dashboard service
  var options = {
    url: "https://dde-us-south.analytics.ibm.com/daas/v1/session",
    headers: {
      "Authorization": "Basic " + new Buffer(dde_client_id + ":" + dde_client_secret).toString("base64"),
      "content-type": "application/json",
    },
    body: {
      "expiresIn": 3600,
      "webDomain": dde_web_domain
    },
    json: true // Automatically stringifies the body to JSON
  };

  // get CA instance session token
  request.post(options, (err, res, body) => {
    if (err) {
      // POST failed...
      console.log('CA Session post failed!');
      console.log(JSON.stringify(err));
      return console.log(err);
    }
    console.log('CA Session post suceeded');
    console.log('CA Session response: ' + JSON.stringify(body));
    dde_session_code = body["sessionCode"];
    console.log('dde_session_code: ' + dde_session_code);
    result.send({ caSessionCode: dde_session_code });
  });
});

// retrieve dashboard spec
router.get("/getDashboard", function(req, res ) {
  console.log('CA dashboard: ' + jsonData);
  res.send(jsonData);
});

module.exports = router;
