const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');

let shuffledQuestions, currentQuestionIndex, score, timer;

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;
  timerElement.innerText = timer;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  startTimer();
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    timerElement.innerText = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    endGame();
  }
  if (!correct) {
    timer -= 10;
    if (timer < 0) timer = 0;
    timerElement.innerText = timer;
  } else {
    score += 10;
  }
}

function setStatusClass(element, correct) {
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function endGame() {
  questionContainerElement.classList.add('hide');
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
  const initials = prompt("Game over! Enter your initials to save your score:");
  if (initials) {
    alert(`Score saved! ${initials}: ${score}`);
  }
}

const questions = [
    {
      question: 'What is the capital of France?',
      answers: [
        { text: 'Paris', correct: true },
        { text: 'London', correct: false },
        { text: 'Berlin', correct: false },
        { text: 'Madrid', correct: false },
      ]
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answers: [
        { text: 'Mars', correct: true },
        { text: 'Jupiter', correct: false },
        { text: 'Saturn', correct: false },
        { text: 'Venus', correct: false },
      ]
    },
    {
      question: 'What is the largest planet in our solar system?',
      answers: [
        { text: 'Jupiter', correct: true },
        { text: 'Saturn', correct: false },
        { text: 'Earth', correct: false },
        { text: 'Mars', correct: false },
      ]
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      answers: [
        { text: 'William Shakespeare', correct: true },
        { text: 'Jane Austen', correct: false },
        { text: 'Charles Dickens', correct: false },
        { text: 'Mark Twain', correct: false },
      ]
    },
    {
      question: 'What is the largest organ in the human body?',
      answers: [
        { text: 'Heart', correct: false },
        { text: 'Liver', correct: false },
        { text: 'Skin', correct: true },
        { text: 'Lung', correct: false },
      ]
    },
  ];
  
