const MAX_QUESTIONS = 8;
const MAX_TIME_PER_QUESTION = 10;

export const startGame = (io, socket, payload) => {
  const { gameId, quizId } = payload;
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

  playQuestion(io, gameId, MAX_TIME_PER_QUESTION, 0, questions);
};

const playQuestion = (io, gameId, time, questionIndex, questions) => {
  let timeLeft = time;

  io.to(gameId).emit('game:nextQuestion', {
    question: questions[questionIndex],
  });

  const timerInterval = setInterval(() => {
    updateTimer(io, gameId, timeLeft);
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      if (questionIndex < MAX_QUESTIONS - 1) {
        playQuestion(io, gameId, time, questionIndex + 1, questions);
      }
    }
  }, 1000);
};

const updateTimer = (io, gameId, time) => {
  io.to(gameId).emit('timer:update', { time });
};
