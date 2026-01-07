import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getAllQuizzes,
  getQuizById,
  createNewQuiz,
  updateExistingQuiz,
} from './quizzes.service';
import { authorizeRequest } from '../auth/auth.service';
import type { QuizCreateInput, QuizUpdateInput } from './quizzes.model';

const router = Router();
router.use('/quizzes', authorizeRequest); // run authorizeRequest middleware on any /quizzes endpoint

router.get('/quizzes', async (req: Request, res: Response) => {
  try {
    const quizzes = await getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    res.status(500).json({ error: message });
  }
});

router.get('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid quiz ID' });
    }

    const quiz = await getQuizById(id);
    res.json(quiz);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    const status = message === 'Quiz not found' ? 404 : 500;
    res.status(status).json({ error: message });
  }
});

router.post('/quizzes', async (req: Request, res: Response) => {
  try {
    const data: QuizCreateInput = req.body;

    if (!data.title || typeof data.title !== 'string') {
      return res
        .status(400)
        .json({ error: 'Title is required and must be a string' });
    }

    if (data.description && typeof data.description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string' });
    }

    const quiz = await createNewQuiz(data);
    res.status(201).json(quiz);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ error: message });
  }
});

router.patch('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid quiz ID' });
    }

    const data: QuizUpdateInput = req.body;

    if (
      data.title !== undefined &&
      (typeof data.title !== 'string' || data.title.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({ error: 'Title must be a non-empty string' });
    }

    if (
      data.description !== undefined &&
      typeof data.description !== 'string'
    ) {
      return res.status(400).json({ error: 'Description must be a string' });
    }

    const quiz = await updateExistingQuiz(id, data);
    res.json(quiz);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    const status = message === 'Quiz not found' ? 404 : 400;
    res.status(status).json({ error: message });
  }
});

export default router;
