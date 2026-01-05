import express from 'express';
import routes from './routes/routes.js';

const app = express();
app.use(routes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
