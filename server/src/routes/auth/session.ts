import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import {
  createSessionInDB,
  deleteSessionInDB,
  findUniqueSessionInDB,
  updateSessionInDB,
} from './auth.repository';
import type { Session } from './auth.model';

export const generateRandomSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30 days

const fromSessionTokenToSessionId = (sessionToken: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
};

export const createSession = async (sessionToken: string, userId: number) => {
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  createSessionInDB(session);

  return session;
};

export const validateSession = async (sessionToken: string) => {
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const result = await findUniqueSessionInDB(sessionId);

  if (!result) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await deleteSessionInDB(sessionId);

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    await updateSessionInDB(session, sessionId);
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string) => {
  await deleteSessionInDB(sessionId);
};
