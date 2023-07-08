var username;
var currentQuestion = 0;
var score = 0;
var timer;
var timeLeft = 60; // Total time for the quiz (in seconds)

var questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Madrid", "Rome"],
        correctAnswer: 0
    },
    {
        question: "Who is the author of 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Charles Dickens"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Jupiter", "Saturn", "Mars", "Earth"],
        correctAnswer: 0
    },
    {
        question: "What is the fastest field sport?",
        choices: ["Hurling", "Camogie", "Soccer", "Football"],
        correctAnswer: 0
    },
    {
        question: "What is the capital of Portugal?",
        choices: ["Porto", "Lisbon", "Braga", "Amadora"],
        correctAnswer: 1
    },
    {
        question: "How many valves does the heart have?",
        choices: ["2", "3", "4", "6"],
        correctAnswer: 1
    },
    {
        question: "How many elements are in the periodic table? ",
        choices: ["126", "165", "94", "118"],
        correctAnswer: 3
    },

];

function startQuiz() {
    username = document.getElementById("username").value;
    if (username.trim() !== "") {
        document.getElementById("username-form").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        showQuestion();
        startTimer();
    }
}

function showQuestion() {
    var questionElement = document.getElementById("question");
    var choicesElement = document.getElementById("choices");
    var question = questions[currentQuestion];

    questionElement.textContent = question.question;

    clearChoices(choicesElement);
    createChoices(choicesElement, question.choices);
}

function clearChoices(choicesElement) {
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }
}

function createChoices(choicesElement, choices) {
    for (var i = 0; i < choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = choices[i];
        choice.setAttribute("onclick", "checkAnswer(" + i + ")");
        choicesElement.appendChild(choice);
    }
}


function checkAnswer(choice) {
    var question = questions[currentQuestion];

    if (choice === question.correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

function endQuiz() {
    clearInterval(timer);
    var quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "<h2>Quiz Ended</h2><p>Username: " + username + "</p><p>Score: " + score + "</p>";

    var restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.setAttribute("onclick", "restartQuiz()");
    quizContainer.appendChild(restartButton);
}

function restartQuiz() {
    location.reload();
}





function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = "Time Left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}
