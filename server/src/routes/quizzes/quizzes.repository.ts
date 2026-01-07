import { prisma } from '../../../lib/prisma';
import type {
  QuizModel,
  QuizCreateInput,
  QuizUpdateInput,
} from './quizzes.model';

export const findAllQuizzesInDB = async (): Promise<QuizModel[]> => {
  return prisma.quiz.findMany({
    include: {
      questions: true,
      _count: {
        select: { games: true },
      },
    },
  });
};

export const findQuizByIdInDB = async (
  id: number
): Promise<QuizModel | null> => {
  return prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: true,
      games: {
        include: {
          players: {
            include: {
              user: {
                select: { id: true, username: true },
              },
            },
          },
        },
      },
      _count: {
        select: { games: true },
      },
    },
  });
};

export const createQuizInDB = async (
  data: QuizCreateInput
): Promise<QuizModel> => {
  return prisma.quiz.create({
    data,
    include: {
      questions: true,
    },
  });
};

export const updateQuizInDB = async (
  id: number,
  data: QuizUpdateInput
): Promise<QuizModel> => {
  return prisma.quiz.update({
    where: { id },
    data,
    include: {
      questions: true,
    },
  });
};

export const deleteQuizInDB = async (id: number): Promise<QuizModel> => {
  return prisma.quiz.delete({
    where: { id },
    include: {
      questions: true,
    },
  });
};
