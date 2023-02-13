import app from './app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { port } = require('./configApp');

app.listen(port || 5000, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
});
