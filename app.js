const questions = [
  {
    question: "What does HTML stand for?",
    answer: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High-Level Machine Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question:
      "Which programming language is known as the backbone of web development?",
    answer: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Ruby", correct: false },
    ],
  },
  {
    question: "What is the purpose of CSS in web development?",
    answer: [
      { text: "To structure content", correct: false },
      { text: "To add styles to a webpage", correct: true },
      { text: "To add interactivity", correct: false },
      { text: "To write server-side code", correct: false },
    ],
  },
  {
    question: "Which symbol is used to denote comments in JavaScript?",
    answer: [
      { text: "#", correct: false },
      { text: "%", correct: false },
      { text: "//", correct: true },
      { text: "/**/", correct: false },
    ],
  },
  {
    question: "Which of these is a Python data type?",
    answer: [
      { text: "Array", correct: false },
      { text: "String", correct: true },
      { text: "Pointer", correct: false },
      { text: "Class", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const iscorrect = selectedBtn.dataset.correct === "true";
  if (iscorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
