require('rootpath')();
const express = require('express');
const cron = require('node-cron');
const emailService = require('./Email Notification/email.service');

// routes
var task =   cron.schedule("*/30 * * * * *", function() {
    emailService.getScheduledEmails()
  });
task.start()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes

app.use('/emails', require('./Email Notification/email.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));