const express = require('express');
const app = express();
const fields = require('./fields.json');

app.use(express.static('public'));

app.get('/fields', (req, res) => {
  res.json(fields);
});

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});
