import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getUserById,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
} from './users.service';
import { authorizeRequest } from '../auth/auth.service';
import type { UserCreateInput, UserUpdateInput } from './users.model';

const router = Router();
router.use('/users', authorizeRequest); // run authorizeRequest middleware on any /users endpoint

router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await getUserById(id);
    const { password, ...userResponse } = user; // remove password from response

    res.json(userResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    const status = message === 'User not found' ? 404 : 500;
    res.status(status).json({ error: message });
  }
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const data: UserCreateInput = req.body;

    if (!data.email || typeof data.email !== 'string') {
      return res
        .status(400)
        .json({ error: 'Email is required and must be a string' });
    }

    if (!data.password || typeof data.password !== 'string') {
      return res
        .status(400)
        .json({ error: 'Password is required and must be a string' });
    }

    if (data.username && typeof data.username !== 'string') {
      return res.status(400).json({ error: 'Username must be a string' });
    }

    const user = await createNewUser(data);
    const { password, ...userResponse } = user; // remove password from response

    res.status(201).json(userResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ error: message });
  }
});

router.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const data: UserUpdateInput = req.body;

    if (
      data.email !== undefined &&
      (typeof data.email !== 'string' || !data.email.includes('@'))
    ) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    if (data.username !== undefined && typeof data.username !== 'string') {
      return res.status(400).json({ error: 'Username must be a string' });
    }

    const user = await updateExistingUser(id, data);
    const { password, ...userResponse } = user; // remove password from response

    res.json(userResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    const status = message === 'User not found' ? 404 : 400;
    res.status(status).json({ error: message });
  }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await deleteExistingUser(id);
    const { password, ...userResponse } = user; // remove password from response

    res.json({ message: 'User deleted successfully', user: userResponse });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    const status = message === 'User not found' ? 404 : 500;
    res.status(status).json({ error: message });
  }
});

export default router;
