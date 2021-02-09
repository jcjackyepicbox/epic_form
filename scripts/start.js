const { app } = require('../build/server/index');
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server running on http://localhost:${port}`);
});
