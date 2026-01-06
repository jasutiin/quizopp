import { Router } from 'express';
import { userSignUp, userLogin } from './auth.service';

const router = Router();

router.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { session, sessionToken } = await userSignUp(
      username,
      email,
      password
    );

    res.cookie('session', sessionToken, {
      httpOnly: true, // prevents browser js access
      expires: session.expiresAt,
    });
    res.status(201).json({ message: 'User created and logged in' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ error: message });
  }
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { session, sessionToken } = await userLogin(email, password);

    res.cookie('session', sessionToken, {
      httpOnly: true, // prevents browser js access
      expires: session.expiresAt,
    });
    res.status(201).json({ message: 'User created and logged in' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ error: message });
  }
});

export default router;
