import { addUserToDB, findUserByEmail } from './auth.repository';
import { generateRandomSessionToken, createSession } from './session';
import { hashPassword, verifyPasswordHash } from './password';

export const userLogin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('Incorrect email or password.');
  }

  if (!user.password) {
    throw new Error(
      'This account uses OAuth login. Please use Google sign-in.'
    );
  }

  if (!password) {
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

export const userOAuth = async (email: string, username: string) => {
  var user = await findUserByEmail(email);

  if (!user) {
    user = await addUserToDB(username, email);
  }

  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);

  return { session, sessionToken };
};
