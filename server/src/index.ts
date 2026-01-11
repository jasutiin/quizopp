import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// @ts-ignore
import passport from 'passport';
import routes from './routes/routes';
import { Server } from 'socket.io';
import registerMatchmakingHandlers from './socket/matchmaking/matchmaking.handler';
import registerGameHandlers from './socket/games/games.handler';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || '1234567890',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(routes);
const PORT = 3000;

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(httpServer);

const onConnection = (socket) => {
  registerMatchmakingHandlers(io, socket);
  registerGameHandlers(io, socket);
};

io.on('connection', onConnection);

io.on('disconnect', (socket) => {
  console.log('A user disconnected');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
