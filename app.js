const { Sequelize } = require("sequelize");
var configs = require('./config/config.js');
var models = require('./models/index.js');
const sequelize = new Sequelize(configs['development']);

(async () => {
  //await models.sequelize.sync({ force: true });  // Clobber for testing
  await models.sequelize.sync({ alter: true });
})();

(async () => {
  await sequelize.sync();
  // Code here
})();

var httpErrors = require('http-errors');
var bodyParser = require('body-parser');
var logger = require('morgan');

var userRoutes = require('./routes/user_routes');
var assigneeRoutes = require('./routes/assignee_routes');
const ticketRoutes = require('./routes/ticket_routes');

const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const cors = require("cors");

app.use(cors());



//////
//////
//////
//////

app.use(logger('dev'));

// Serve a static version of the client at /
app.use(express.static('dist', {fallthrough: true}));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/assignees', assigneeRoutes);
app.use('/api/v1/tickets', ticketRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(httpErrors(404));
});

// Internal errors
app.use(function(err, req, res ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set port and listen for requests
app.listen(process.env.PORT || 8080);

module.exports = app;
