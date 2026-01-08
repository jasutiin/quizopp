import type { UserModel } from '../../../generated/prisma/models';

export type UserCreateInput = {
  email: string;
  password: string;
  username?: string;
};

export type UserUpdateInput = {
  email?: string;
  username?: string;
};

export type UserResponse = Omit<UserModel, 'password'>;

export type { UserModel };
