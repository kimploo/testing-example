const express = require('express');
const router = require('./routes');

const app = express();
const PORT = 3000;

app.use('/', router);

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT} port`);
});

module.exports = app;
