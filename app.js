const express = require('express');
const app = express();
const fields = require('./fields.json');

app.use(express.static('public'));

app.get('/fields', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.json(fields);
});

module.exports = app;
