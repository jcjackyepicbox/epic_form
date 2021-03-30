const { app } = require('../build/server/index');
const port = 3000;

process.env.NODE_ENV = 'production';

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server running on http://localhost:${port}`);
});
