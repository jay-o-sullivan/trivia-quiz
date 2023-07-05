// Get DOM elements
const usernameInput = document.getElementById('username-input');
const startButton = document.getElementById('start-button');

// Event listener for the Start Quiz button
startButton.addEventListener('click', startQuiz);

// Start Quiz function
function startQuiz() {
    const username = usernameInput.value;

    // Check if the username is entered
    if (username.trim() === '') {
        alert('Please enter your username.');
        return;
    }

    // Display welcome message
    alert(`Welcome, ${username}! Are you ready to start the quiz?`);


    // Clear username input
    usernameInput.value = '';
}
