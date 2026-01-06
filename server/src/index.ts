import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
