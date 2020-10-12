
const { Sequelize } = require("sequelize");
var configs = require('./config/config.js');
var models = require('./models/index.js');
const sequelize = new Sequelize(configs['development']);

(async () => {
  // await models.sequelize.sync({ force: true });  // Clobber for testing
  await models.sequelize.sync({ alter: true });
})();

(async () => {
  await sequelize.sync();
  // Code here
})();

var httpErrors = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const ticketRoutes = require("./routes/ticket_routes");

const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));



//////
//////
//////
//////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.static('dist'));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/tickets', ticketRoutes);

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
