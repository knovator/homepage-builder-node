const express = require('express');
const app = express();
const PORT = 8080;
// const {  } = require('../.');

app.get('/status', (_req, res) => {
  res.send('All Okay');
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
