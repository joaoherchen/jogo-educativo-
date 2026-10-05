// Banco de Conteúdo de Ciências (6º Ano)
const scienceData = [
  {
    question: "Qual é a camada mais interna e quente da Terra?",
    options: ["Núcleo", "Manto", "Crosta terrestre", "Litosfera"],
    answer: 0,
    explanation: "O Núcleo é a camada central da Terra, composta principalmente por ferro e níquel, alcançando altíssimas temperaturas."
  },
  {
    question: "Qual é a mudança do estado gasoso para o estado líquido?",
    options: ["Condensação", "Vaporização", "Fusão", "Sublimação"],
    answer: 0,
    explanation: "A Condensação ocorre quando o vapor de água esfria e retorna ao estado líquido (exemplo: as gotinhas na tampa da panela)."
  },
  {
    question: "Qual organela é responsável pela fotossíntese nas células vegetais?",
    options: ["Cloroplasto", "Mitocôndria", "Núcleo", "Ribossomo"],
    answer: 0,
    explanation: "Os Cloroplastos possuem clorofila (pigmento verde) e captam a luz do sol para fabricar o alimento da planta."
  },
  {
    question: "Na cadeia alimentar, qual é o papel desempenhado pelas plantas?",
    options: ["Produtores", "Consumidores primários", "Decompositores", "Consumidores secundários"],
    answer: 0,
    explanation: "As plantas são Produtoras porque conseguem produzir o próprio alimento por meio do processo de fotossíntese."
  },
  {
    question: "Qual método é mais adequado para separar uma mistura de água e areia?",
    options: ["Filtração", "Evaporação", "Catação", "Atração magnética"],
    answer: 0,
    explanation: "A Filtração retém os grãos sólidos de areia no filtro enquanto a água líquida passa normalmente."
  }
];

// Estado do Jogo
let currentCardIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;

// Elementos do DOM
const menuScreen = document.getElementById("menu-screen");
const flashcardScreen = document.getElementById("flashcard-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const btnModeFlashcard = document.getElementById("btn-mode-flashcard");
const btnModeQuiz = document.getElementById("btn-mode-quiz");
const btnBackMenu1 = document.getElementById("btn-back-menu-1");
const btnRestart = document.getElementById("btn-restart");

// Elementos Flashcards
const flashcard = document.getElementById("flashcard");
const flashcardQuestion = document.getElementById("flashcard-question");
const flashcardAnswer = document.getElementById("flashcard-answer");
const flashcardCounter = document.getElementById("flashcard-counter");
const btnPrevCard = document.getElementById("btn-prev-card");
const btnNextCard = document.getElementById("btn-next-card");

// Elementos Quiz
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score-display");
const livesDisplay = document.getElementById("lives-display");

// Eventos de Navegação
btnModeFlashcard.addEventListener("click", startFlashcards);
btnModeQuiz.addEventListener("click", startQuiz);
btnBackMenu1.addEventListener("click", showMenu);
btnRestart.addEventListener("click", showMenu);

flashcard.addEventListener("click", () => flashcard.classList.toggle("flipped"));
btnPrevCard.addEventListener("click", () => changeFlashcard(-1));
btnNextCard.addEventListener("click", () => changeFlashcard(1));

function showMenu() {
  [flashcardScreen, quizScreen, endScreen].forEach(s => s.classList.remove("active"));
  menuScreen.classList.add("active");
}

/* --- MODO FLASHCARDS --- */
function startFlashcards() {
  menuScreen.classList.remove("active");
  flashcardScreen.classList.add("active");
  currentCardIndex = 0;
  loadFlashcard();
}

function loadFlashcard() {
  flashcard.classList.remove("flipped");
  const data = scienceData[currentCardIndex];
  flashcardQuestion.textContent = data.question;
  flashcardAnswer.textContent = data.explanation;
  flashcardCounter.textContent = `Card ${currentCardIndex + 1} de ${scienceData.length}`;
}

function changeFlashcard(direction) {
  currentCardIndex += direction;
  if (currentCardIndex < 0) currentCardIndex = scienceData.length - 1;
  if (currentCardIndex >= scienceData.length) currentCardIndex = 0;
  loadFlashcard();
}

/* --- MODO QUIZ --- */
function startQuiz() {
  menuScreen.classList.remove("active");
  quizScreen.classList.add("active");
  currentQuestionIndex = 0;
  score = 0;
  lives = 3;
  updateHUD();
  loadQuestion();
}

function loadQuestion() {
  const data = scienceData[currentQuestionIndex];
  questionNumber.textContent = `Pergunta ${currentQuestionIndex + 1} de ${scienceData.length}`;
  questionText.textContent = data.question;
  optionsContainer.innerHTML = "";

  data.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-option");
    btn.textContent = opt;
    btn.onclick = () => selectOption(idx, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectOption(idx, btn) {
  const data = scienceData[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".btn-option");
  buttons.forEach(b => b.disabled = true);

  if (idx === data.answer) {
    btn.classList.add("correct");
    score += 20;
  } else {
    btn.classList.add("wrong");
    buttons[data.answer].classList.add("correct");
    lives--;
  }

  updateHUD();

  setTimeout(() => {
    if (lives <= 0) {
      endGame(false);
    } else if (currentQuestionIndex + 1 < scienceData.length) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      endGame(true);
    }
  }, 1200);
}

function updateHUD() {
  scoreDisplay.textContent = `Pontos: ${score}`;
  livesDisplay.textContent = `Vidas: ${"❤️".repeat(lives)}`;
}

function endGame(won) {
  quizScreen.classList.remove("active");
  endScreen.classList.add("active");
  document.getElementById("end-title").textContent = won ? "🎉 Parabéns! Mestre em Ciências!" : "💔 Fim de Jogo!";
  document.getElementById("final-score-text").textContent = `Você conquistou ${score} pontos.`;
}
