// Banco de Dados dos Flashcards de Ciências (6º Ano)
const flashcardsData = [
  {
    question: "Qual é a camada mais interna e quente da Terra?",
    answer: "O Núcleo! Ele fica no centro do planeta, é feito principalmente de ferro e níquel, e possui temperaturas altíssimas."
  },
  {
    question: "O que é Condensação?",
    answer: "É a passagem do estado gasoso para o estado líquido! Exemplo: o vapor de água que esfria e vira gotinhas na tampa da panela."
  },
  {
    question: "Qual organela realiza a fotossíntese nas plantas?",
    answer: "O Cloroplasto! Ele contém a clorofila (que dá a cor verde) e capta a luz do Sol para produzir o alimento da planta."
  },
  {
    question: "Qual o papel das plantas na cadeia alimentar?",
    answer: "Elas são Produtoras! Fabricam o próprio alimento através da fotossíntese e servem de base para os consumidores."
  },
  {
    question: "Como separar uma mistura de água e areia?",
    answer: "Usando a Filtração! A areia fica retida no filtro de papel enquanto a água passa limpa."
  }
];

let currentCardIndex = 0;

// Elementos do DOM
const flashcard = document.getElementById("flashcard");
const flashcardQuestion = document.getElementById("flashcard-question");
const flashcardAnswer = document.getElementById("flashcard-answer");
const flashcardCounter = document.getElementById("flashcard-counter");
const btnPrevCard = document.getElementById("btn-prev-card");
const btnNextCard = document.getElementById("btn-next-card");

// Eventos
flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

btnPrevCard.addEventListener("click", () => changeFlashcard(-1));
btnNextCard.addEventListener("click", () => changeFlashcard(1));

function loadFlashcard() {
  flashcard.classList.remove("flipped");
  const currentCard = flashcardsData[currentCardIndex];
  
  flashcardQuestion.textContent = currentCard.question;
  flashcardAnswer.textContent = currentCard.answer;
  flashcardCounter.textContent = `Card \({currentCardIndex + 1} de\){flashcardsData.length}`;
}

function changeFlashcard(direction) {
  currentCardIndex += direction;
  
  if (currentCardIndex < 0) {
    currentCardIndex = flashcardsData.length - 1;
  } else if (currentCardIndex >= flashcardsData.length) {
    currentCardIndex = 0;
  }
  
  loadFlashcard();
}

// Iniciar a aplicação
loadFlashcard();
