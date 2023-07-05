// Get DOM elements
const usernameInput = document.getElementById('username-input');
const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');

// Event listener for the Start Quiz button
startButton.addEventListener('click', startQuiz);

let username = '';
let currentQuestionIndex = 0;
let score = 0;

// Quiz questions
const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 0
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
    correctAnswer: 0
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Au', 'Ag', 'Gd'],
    correctAnswer: 1
  },
 
];

// Start Quiz function
function startQuiz() {
  username = usernameInput.value.trim();

  // Check if the username is entered
  if (username === '') {
    alert('Please enter your username.');
    return;
  }

  // Display welcome message
  alert(`Welcome, ${username}! Are you ready to start the quiz?`);

  // Clear username input
  usernameInput.value = '';

  // Show the first question
  showQuestion();
}


// Show question function
function showQuestion() {
    // Check if all questions have been answered
    if (currentQuestionIndex >= quizQuestions.length) {
      // Display quiz summary
      showQuizSummary();
      return;
    }
  
    // Get the current question
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    // Display question
    questionElement.textContent = currentQuestion.question;
  
    // Clear options container
    optionsContainer.innerHTML = '';
  
    // Create options buttons
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.classList.add('option');
      optionButton.addEventListener('click', () => checkAnswer(index));
      optionsContainer.appendChild(optionButton);
    });
  
    // Start timer
    startTimer();
  }
  
  // Timer variables
  const timeLimit = 10; // Time limit in seconds
  let timer; // Timer variable
  
  // Start timer function
  function startTimer() {
    let timeRemaining = timeLimit;
  
    // Display initial time remaining
    updateTimerDisplay(timeRemaining);
  
    // Start countdown
    timer = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay(timeRemaining);
  
      // Check if time is up
      if (timeRemaining <= 0) {
        clearInterval(timer);
        handleTimeUp();
      }
    }, 1000);
  }
  
  // Update timer display function
  function updateTimerDisplay(time) {
    // Display remaining time
    const seconds = time < 10 ? '0' + time : time;
    timerElement.textContent = `Time Remaining: ${seconds}s`;
  }
  
  // Handle time up function
  function handleTimeUp() {
    feedbackElement.textContent = 'Time is up!';
    currentQuestionIndex++;
    showQuestion();
  }
  

// Check answer function
function checkAnswer(answerIndex) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Check if the answer is correct
  if (answerIndex === currentQuestion.correctAnswer) {
    score++;
    feedbackElement.textContent = 'Correct answer!';
  } else {
    feedbackElement.textContent = 'Wrong answer!';
  }

  // Increment the question index
  currentQuestionIndex++;

  // Show the next question
  showQuestion();
}

// Show quiz summary function
function showQuizSummary() {
  // Hide question container
  questionContainer.style.display = 'none';

  // Display quiz summary message
  const summaryMessage = `Quiz completed! You scored ${score} out of ${quizQuestions.length} questions.`;
  scoreElement.textContent = summaryMessage;

}
