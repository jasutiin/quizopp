import {
  findAllQuizzesInDB,
  findQuizByIdInDB,
  createQuizInDB,
  updateQuizInDB,
  deleteQuizInDB,
} from './quizzes.repository';
import type { QuizCreateInput, QuizUpdateInput } from './quizzes.model';

export const getAllQuizzes = async () => {
  return findAllQuizzesInDB();
};

export const getQuizById = async (id: number) => {
  const quiz = await findQuizByIdInDB(id);
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  return quiz;
};

export const createNewQuiz = async (data: QuizCreateInput) => {
  if (!data.title || data.title.trim().length === 0) {
    throw new Error('Quiz title is required');
  }
  return createQuizInDB(data);
};

export const updateExistingQuiz = async (id: number, data: QuizUpdateInput) => {
  await getQuizById(id);

  if (
    data.title !== undefined &&
    (!data.title || data.title.trim().length === 0)
  ) {
    throw new Error('Quiz title cannot be empty');
  }

  return updateQuizInDB(id, data);
};

export const deleteExistingQuiz = async (id: number) => {
  await getQuizById(id);

  return deleteQuizInDB(id);
};
