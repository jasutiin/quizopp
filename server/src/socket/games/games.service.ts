const MAX_QUESTIONS = 8;
const MAX_TIME_PER_QUESTION = 13; // three seconds for showing the question, 10 seconds for showing the answers
const SHOW_QUESTIONS_TIME = MAX_TIME_PER_QUESTION - 3;

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
    if (timeLeft == SHOW_QUESTIONS_TIME) {
      io.to(gameId).emit('game:showAnswers');
    }

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
