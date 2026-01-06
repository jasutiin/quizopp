import { prisma } from '../../../lib/prisma';
import type { Session } from './auth.model';

export const createSessionInDB = async (session: Session) => {
  return await prisma.session.create({
    data: {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt,
    },
  });
};

export const updateSessionInDB = async (
  session: Session,
  sessionId: string
) => {
  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      expiresAt: session.expiresAt,
    },
  });
};

export const deleteSessionInDB = async (sessionId: string) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};

export const findUniqueSessionInDB = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  return session;
};

export const addUserToDB = async (
  username: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      username: username,
    },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
