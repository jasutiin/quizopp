import { Router } from 'express';
import quizzesController from './quizzes/quizzes.controller.js';
import usersController from './users/users.controller.js';
import authController from './auth/auth.controller.js';

const api = Router()
  .use(quizzesController)
  .use(usersController)
  .use(authController);

export default Router().use('/api', api);
