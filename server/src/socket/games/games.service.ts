const MAX_QUESTIONS = 8;
const MAX_TIME_PER_QUESTION = 13; // three seconds for showing the question, 10 seconds for showing the answers
const SHOW_QUESTIONS_TIME = MAX_TIME_PER_QUESTION - 3;

interface GameState {
  submissions: Record<number, string[]>; // question index, a list of answers
  questions: string[];
}

export const gameStates = new Map<string, GameState>(); // this is for the whole server across all sessions, key: gameId

export const startGame = (io, socket, payload) => {
  const { gameId, quizId } = payload;
  console.log(`Starting game ${gameId} for quiz ${quizId}`);

  // TODO: call the database for a list of random questions from a quizId
  const questions = [
    'question1',
    'question2',
    'question3',
    'question4',
    'question5',
    'question6',
    'question7',
    'question8',
  ];

  const gameState: GameState = {
    submissions: {},
    questions,
  };

  gameStates.set(gameId, gameState);
  playQuestion(io, gameId, MAX_TIME_PER_QUESTION, 0);
};

const playQuestion = (io, gameId, time, questionIndex) => {
  const gameState = gameStates.get(gameId);
  if (!gameState) return;

  console.log(`Playing question ${questionIndex} in game ${gameId}`);

  let timeLeft = time;

  io.to(gameId).emit('game:nextQuestion', {
    question: gameState.questions[questionIndex],
    questionIndex,
  });

  // set a timer interval that calls itself every second
  const timerInterval = setInterval(() => {
    if (timeLeft == SHOW_QUESTIONS_TIME) {
      io.to(gameId).emit('game:showAnswers');
    }

    updateTimer(io, gameId, timeLeft);
    timeLeft--;

    if (timeLeft < 0 || gameState.submissions[questionIndex]?.length == 2) {
      clearInterval(timerInterval); // basically stops the timer
      if (gameState.submissions[questionIndex]?.length == 2) {
        console.log(
          `Both players submitted answers early for question ${questionIndex} in game ${gameId}`
        );
      }
      if (questionIndex < MAX_QUESTIONS - 1) {
        playQuestion(io, gameId, time, questionIndex + 1);
      } else {
        console.log(`Game ${gameId} finished`);
        io.to(gameId).emit('game:finished');
      }
    }
  }, 1000);
};

const updateTimer = (io, gameId, time) => {
  io.to(gameId).emit('timer:update', { time });
};
