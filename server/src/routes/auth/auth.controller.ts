import { Router } from 'express';
import { userSignUp, userLogin } from './auth.service';

const router = Router();

router.post('/auth/signup', (req, res) => {
  const { username, email, password } = req.body;

  const responseObj = userSignUp();

  res.send(
    `POST request to /auth/signup with ${username} ${email} ${password}`
  );
});

router.post('/auth/login', (req, res) => {
  res.send('POST request to /auth/login!');
});

export default router;
