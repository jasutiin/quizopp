import { prisma } from '../../../lib/prisma';
import type {
  UserModel,
  UserCreateInput,
  UserUpdateInput,
} from './users.model';

export const findUserByIdInDB = async (
  id: number
): Promise<UserModel | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      games: {
        include: {
          game: {
            select: {
              id: true,
              status: true,
              quiz: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const findUserByEmailInDB = async (
  email: string
): Promise<UserModel | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUserInDB = async (
  data: UserCreateInput
): Promise<UserModel> => {
  return prisma.user.create({
    data,
    include: {
      _count: {
        select: {
          games: true,
          answers: true,
        },
      },
    },
  });
};

export const updateUserInDB = async (
  id: number,
  data: UserUpdateInput
): Promise<UserModel> => {
  return prisma.user.update({
    where: { id },
    data,
    include: {
      _count: {
        select: {
          games: true,
          answers: true,
        },
      },
    },
  });
};

export const deleteUserInDB = async (id: number): Promise<UserModel> => {
  return prisma.user.delete({
    where: { id },
    include: {
      _count: {
        select: {
          games: true,
          answers: true,
        },
      },
    },
  });
};
