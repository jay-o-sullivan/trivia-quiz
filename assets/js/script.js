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
    }
    ,
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
    var errorMessage = document.getElementById("error-message");

    if (username.trim() === "") {
        errorMessage.textContent = "Please enter a username.";
    } else {
        errorMessage.textContent = "";
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

document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the feedback text
    var feedbackText = document.getElementById("feedback-text").value;

    // Validate if the feedback is not empty
    if (feedbackText.trim() !== "") {
        // Hide the feedback form and display the thank you message
        document.getElementById("feedback-form").style.display = "none";
        document.getElementById("thank-you-message").style.display = "block";
    }
});

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
    var choices = document.getElementById("choices").getElementsByTagName("button");

    // Disable all choices to prevent further selection
    for (var i = 0; i < choices.length; i++) {
        choices[i].setAttribute("disabled", "true");
    }

    var selectedChoice = choices[choice];

    if (choice === question.correctAnswer) {
        selectedChoice.classList.add("correct");
        score++;
    } else {
        selectedChoice.classList.add("wrong");
        choices[question.correctAnswer].classList.add("correct");
    }

    currentQuestion++;

    if (currentQuestion === questions.length) {
        endQuiz();
    } else {
        setTimeout(function() {
            showQuestion();
            resetChoices(choices);
        }, 1500);
    }
}

function resetChoices(choices) {
    for (var i = 0; i < choices.length; i++) {
        choices[i].classList.remove("correct");
        choices[i].classList.remove("wrong");
        choices[i].removeAttribute("disabled");
    }
}

// Existing code...


function endQuiz() {
    clearInterval(timer);
    var quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "<h2>Quiz Ended</h2><p>Username: " + username + "</p><p>Score: " + score + "</p>";

    var restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.setAttribute("onclick", "restartQuiz()");
    quizContainer.appendChild(restartButton);
    var feedbackSection = document.getElementById("feedback-section");
    feedbackSection.style.display = "block";
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
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }