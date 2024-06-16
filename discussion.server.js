const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const customResourceResponse = require('./utils/constants.utils');
const db = require('./lib/db');
const discussionRoutes = require('./routes/discussion.routes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(db.discussionMongoURI, {
})
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

// routes
app.use('/api/v1', discussionRoutes);

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send({
    message: 'The requested URL could not be found.',
    statusCode: 404,
  });
});

app.use((error, req, res, next) => {
  const { message } = customResourceResponse.serverError;
  const data = {
    Code: `${error.code ? error.code : ''}`,
    Stacktrace: `${error.stack}`
  };
  res.status(500).json({ message, data });
});

const port = process.env.DISCUSSION_API_PORT || 8082;

console.log(`Discussion server started and listening on port ${port}`);

app.listen(port);