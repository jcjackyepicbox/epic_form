const express = require('express');

export const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});
