I miss QuizUp so I made my own : )

## Server

To run the server, do `cd server` (assuming you're in the root directory) then `npm run dev`. This runs the TypeScript code directly from `src/index.ts` with auto-reload enabled

Everytime you make changes to the schema in `prisma/schema.prisma`, you need to run `npx prisma migrate dev` to make those changes in the database. If you want to add a name for your migration for documentation purposes, you can add `--name <value>`. The full command would then be `npx prisma migrate dev --name <value>`.

## Authentication

### Session-based authentication

One form of authentication that was implemented in this project is **session-based authentication**. This is for when the user signs up or logs in with an email and password.

![session auth diagram](./public/session_auth.png)

In the diagram above, it shows how the server handles a user login. After the user is logged in, all subsequent requests to the server that need to be authorized has the HTTP-only cookie attached to the request headers. This happens because I set up middleware that runs on each request before the actual logic runs:

```
// this function is in server/src/routes/auth/auth.service.ts
export const authorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.cookies.session;

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
```

<br>

Article I read for implementing email/password session-based authentication: https://www.robinwieruch.de/how-to-roll-your-own-auth/

Video I watched for implementing OAuth 2.0 authorization: https://www.youtube.com/watch?v=lOSs7jHO7QU
