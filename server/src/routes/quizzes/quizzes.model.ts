import type { QuizModel } from '../../../generated/prisma/models';

export type QuizCreateInput = {
  title: string;
  description?: string;
};

export type QuizUpdateInput = {
  title?: string;
  description?: string;
};

export type { QuizModel };
