import type { Request, Response, NextFunction } from 'express';
import { validateSession } from './session';

export const authorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.cookies.session;
  console.log('authorizeRequest called for path:', req.path);

  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized: No session token' });
  }

  try {
    const { session, user } = await validateSession(sessionToken);

    if (!session || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid session' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Session validation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const authorizeProtectedEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  const { userId } = req.params; // the user id to be viewed or edited

  // if the user who requested does not match the id of the user resource, they can't edit
  if (user.id != userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized: You do not own this resource' });
  }

  next();
};
