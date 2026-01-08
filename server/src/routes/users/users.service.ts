import {
  findUserByIdInDB,
  findUserByEmailInDB,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
} from './users.repository';
import type { UserCreateInput, UserUpdateInput } from './users.model';

export const getUserById = async (id: number) => {
  const user = await findUserByIdInDB(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const createNewUser = async (data: UserCreateInput) => {
  const existingUser = await findUserByEmailInDB(data.email);

  if (existingUser) {
    throw new Error('Email already in use');
  }

  if (!data.email || !data.email.includes('@')) {
    throw new Error('Valid email is required');
  }

  if (!data.password || data.password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  return createUserInDB(data);
};

export const updateExistingUser = async (id: number, data: UserUpdateInput) => {
  await getUserById(id);

  if (data.email) {
    const existingUser = await findUserByEmailInDB(data.email);
    if (existingUser && existingUser.id !== id) {
      throw new Error('Email already in use');
    }

    if (!data.email.includes('@')) {
      throw new Error('Valid email is required');
    }
  }

  return updateUserInDB(id, data);
};

export const deleteExistingUser = async (id: number) => {
  await getUserById(id);
  return deleteUserInDB(id);
};
