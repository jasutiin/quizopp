import { Router } from 'express';
import gamesController from './games/games.controller.js';
import matchmakingController from './matchmaking/matchmaking.controller.js';
import quizzesController from './quizzes/quizzes.controller.js';
import usersController from './users/users.controller.js';
import authController from './auth/auth.controller.js';

const api = Router()
  .use(gamesController)
  .use(matchmakingController)
  .use(quizzesController)
  .use(usersController)
  .use(authController);

export default Router().use('/api', api);
