let currentQuestionIndex = 0;
let questions = [];
let score = 0;

// Fetch the quiz data
fetch('quiz_data_corrected.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
    updateScoreCounter();
  })
  .catch(error => console.error('Error fetching the quiz data:', error));

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById('question-text').innerHTML = 'Quiz completed!';
    document.getElementById('options-list').innerHTML = '';
    document.querySelector('.footer').style.display = 'none';
    return;
  }

  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').innerHTML = question.question;
  document.getElementById('question-number').innerHTML = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  document.getElementById('options-list').innerHTML = question.options.map((option, index) => `
    <li class="option" onclick="checkAnswer('${option}', ${index})">${option}</li>
  `).join('');
}

function checkAnswer(selectedOption, index) {
  const correctAnswer = questions[currentQuestionIndex].correct;
  const selectedElement = document.querySelector(`#options-list .option:nth-child(${index + 1})`);
  const correctIndex = questions[currentQuestionIndex].options.indexOf(correctAnswer);
  const correctElement = document.querySelector(`#options-list .option:nth-child(${correctIndex + 1})`);

  if (selectedOption === correctAnswer) {
    selectedElement.classList.add('correct');
    score++;
    updateScoreCounter();
  } else {
    selectedElement.classList.add('incorrect');
    correctElement.classList.add('correct');
  }

  // Disable all options after selection
  document.querySelectorAll('.option').forEach(option => {
    option.onclick = null;
  });
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function resetScore() {
  score = 0;
  updateScoreCounter();
  loadQuestion();
}

function updateScoreCounter() {
  document.getElementById('score').innerHTML = `Score: ${score}`;
}
