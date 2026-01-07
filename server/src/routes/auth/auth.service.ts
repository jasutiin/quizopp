import type { Request, Response, NextFunction } from 'express';
import { addUserToDB, findUserByEmail } from './auth.repository';
import {
  generateRandomSessionToken,
  createSession,
  validateSession,
} from './session';
import { hashPassword, verifyPasswordHash } from './password';

export const userLogin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('Incorrect email or password.');
  }

  const validPassword = await verifyPasswordHash(user.password, password);

  if (!validPassword) {
    throw new Error('Incorrect email or password.');
  }

  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);

  return { session, sessionToken };
};

export const userSignUp = async (
  username: string,
  email: string,
  password: string
) => {
  const passwordHash = await hashPassword(password);
  const user = await addUserToDB(username, email, passwordHash);
  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);

  return { session, sessionToken };
};

export const authorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized: No session token' });
  }

  try {
    const { session, user } = await validateSession(sessionToken);

    if (!session || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid session' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Session validation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
