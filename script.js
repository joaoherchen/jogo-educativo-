```javascript
// ================================
// BIOAVENTURA - JOGO DE CIÊNCIAS
// ================================

let pontuacao = 0;


// ================================
// PERGUNTAS DO QUIZ
// ================================

const perguntasQuiz = [
    {
        pergunta: "Qual destes é um ser vivo?",
        opcoes: ["Pedra", "Árvore", "Água", "Sol"],
        correta: 1
    },
    {
        pergunta: "Qual é o principal produtor de um ecossistema?",
        opcoes: ["Plantas", "Leões", "Fungos", "Bactérias"],
        correta: 0
    },
    {
        pergunta: "O que é um ecossistema?",
        opcoes: [
            "Apenas um grupo de animais",
            "Apenas as plantas de um lugar",
            "Seres vivos e elementos não vivos interagindo",
            "Somente a água de um ambiente"
        ],
        correta: 2
    },
    {
        pergunta: "Qual organismo é um consumidor?",
        opcoes: ["Capim", "Alga", "Coelho", "Árvore"],
        correta: 2
    },
    {
        pergunta: "Qual é a principal fonte de energia para a maioria dos ecossistemas?",
        opcoes: ["Lua", "Sol", "Vento", "Solo"],
        correta: 1
    },
    {
        pergunta: "Qual destes atua na decomposição da matéria orgânica?",
        opcoes: ["Fungos", "Girassóis", "Coelhos", "Águias"],
        correta: 0
    }
];


// ================================
// FLASHCARDS
// ================================

const flashcards = [
    [
        "Produtores",
        "São seres vivos, como as plantas, que produzem seu próprio alimento, geralmente por fotossíntese."
    ],
    [
        "Ecossistema",
        "É o conjunto de seres vivos e elementos não vivos que interagem em determinado ambiente."
    ],
    [
        "Decompositores",
        "Fungos e muitas bactérias decompõem restos de seres vivos e devolvem nutrientes ao ambiente."
    ],
    [
        "Sol",
        "É a principal fonte de energia para a maioria dos ecossistemas."
    ],
    [
        "Consumidores",
        "São seres vivos que obtêm energia alimentando-se de outros organismos."
    ]
];


// ================================
// VERDADEIRO OU FALSO
// ================================

const perguntasVF = [
    [
        "As plantas são produtoras porque conseguem produzir seu próprio alimento.",
        true
    ],
    [
        "A água é um ser vivo.",
        false
    ],
    [
        "Os decompositores ajudam a reciclar nutrientes no ambiente.",
        true
    ],
    [
        "O Sol é uma fonte importante de energia para os ecossistemas.",
        true
    ],
    [
        "Todos os animais produzem seu próprio alimento.",
        false
    ],
    [
        "Um ecossistema possui apenas seres vivos.",
        false
    ]
];


// ================================
// VARIÁVEIS DOS JOGOS
// ================================

let quizAtual = 0;
let vidas = 3;
let quizRespondida = false;

let flashAtual = 0;
let flashVirado = false;

let vfAtual = 0;
let vfRespondida = false;


// ================================
// FUNÇÕES AUXILIARES
// ================================

function el(id) {
    return document.getElementById(id);
}


function esconderTelas() {

    const telas = [
        "menu",
        "quiz",
        "flashcards",
        "verdadeiro",
        "resultado"
    ];

    telas.forEach(id => {

        const tela = el(id);

        if (tela) {
            tela.classList.add("escondido");
        }

    });
}


function atualizarPontos() {

    if (el("pontosMenu")) {
        el("pontosMenu").textContent = pontuacao;
    }

    if (el("quizPontos")) {
        el("quizPontos").textContent = pontuacao;
    }

    if (el("vfPontos")) {
        el("vfPontos").textContent = pontuacao;
    }
}


function adicionarPontos(valor) {

    pontuacao += valor;

    atualizarPontos();
}


// ================================
// NAVEGAÇÃO ENTRE MODOS
// ================================

function abrirModo(modo) {

    esconderTelas();

    if (modo === "quiz") {

        el("quiz").classList.remove("escondido");

        iniciarQuiz();

    }

    else if (modo === "flashcards") {

        el("flashcards").classList.remove("escondido");

        iniciarFlashcards();

    }

    else if (modo === "verdadeiro") {

        el("verdadeiro").classList.remove("escondido");

        iniciarVF();

    }
}


function voltarMenu() {

    esconderTelas();

    el("menu").classList.remove("escondido");

    atualizarPontos();
}


// ================================
// QUIZ
// ================================

function iniciarQuiz() {

    quizAtual = 0;
    vidas = 3;
    quizRespondida = false;

    mostrarQuiz();
}


function mostrarQuiz() {

    const pergunta = perguntasQuiz[quizAtual];

    quizRespondida = false;

    el("quizNumero").textContent =
        `Pergunta ${quizAtual + 1} de ${perguntasQuiz.length}`;

    el("quizPergunta").textContent =
        pergunta.pergunta;

    el("quizVidas").textContent =
        "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);

    el("quizFeedback").textContent = "";

    el("quizProxima").classList.add("escondido");


    const opcoes = el("quizOpcoes");

    opcoes.innerHTML = "";


    pergunta.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.className = "opcao";

        botao.textContent = opcao;

        botao.addEventListener("click", function () {

            responderQuiz(indice);

        });

        opcoes.appendChild(botao);

    });


    atualizarPontos();
}


function responderQuiz(indice) {

    if (quizRespondida || vidas <= 0) {
        return;
    }

    quizRespondida = true;

    const pergunta = perguntasQuiz[quizAtual];

    const botoes =
        [...el("quizOpcoes").querySelectorAll("button")];


    botoes.forEach(botao => {

        botao.disabled = true;

    });


    if (indice === pergunta.correta) {

        adicionarPontos(10);

        el("quizFeedback").textContent =
            "🎉 Correto! Você ganhou 10 pontos!";

    }

    else {

        vidas--;

        el("quizVidas").textContent =
            "❤️".repeat(vidas) +
            "🖤".repeat(3 - vidas);

        el("quizFeedback").textContent =
            `❌ Incorreto! A resposta correta é: ${pergunta.opcoes[pergunta.correta]}`;

    }


    if (vidas <= 0) {

        el("quizProxima").textContent =
            "🏆 Ver resultado";

    }

    else if (quizAtual === perguntasQuiz.length - 1) {

        el("quizProxima").textContent =
            "🏆 Ver resultado";

    }

    else {

        el("quizProxima").textContent =
            "➡️ Próxima pergunta";

    }


    el("quizProxima").classList.remove("escondido");
}


function proximaQuiz() {

    if (!quizRespondida) {
        return;
    }


    if (
        vidas <= 0 ||
        quizAtual >= perguntasQuiz.length - 1
    ) {

        mostrarResultado();

        return;

    }


    quizAtual++;

    mostrarQuiz();
}


// ================================
// FLASHCARDS
// ================================

function iniciarFlashcards() {

    flashAtual = 0;
    flashVirado = false;

    mostrarFlashcard();
}


function mostrarFlashcard() {

    const card = flashcards[flashAtual];

    el("flashNumero").textContent =
        `Cartão ${flashAtual + 1} de ${flashcards.length}`;

    el("flashFrente").textContent =
        card[0];

    el("flashVerso").textContent =
        card[1];

    el("flashVerso").classList.add("escondido");

    flashVirado = false;
}


function virarFlashcard() {

    flashVirado = !flashVirado;


    if (flashVirado) {

        el("flashVerso").classList.remove("escondido");

    }

    else {

        el("flashVerso").classList.add("escondido");

    }
}


function proximoFlashcard() {

    flashAtual++;


    if (flashAtual >= flashcards.length) {

        flashAtual = 0;

    }


    mostrarFlashcard();
}


// ================================
// VERDADEIRO OU FALSO
// ================================

function iniciarVF() {

    vfAtual = 0;
    vfRespondida = false;

    mostrarVF();
}


function mostrarVF() {

    const pergunta = perguntasVF[vfAtual];

    vfRespondida = false;


    el("vfNumero").textContent =
        `Afirmação ${vfAtual + 1} de ${perguntasVF.length}`;

    el("vfPergunta").textContent =
        pergunta[0];

    el("vfFeedback").textContent = "";

    el("vfProxima").classList.add("escondido");


    const botoes =
        document.querySelectorAll("#verdadeiro .vf-btn");


    botoes.forEach(botao => {

        botao.disabled = false;

    });


    atualizarPontos();
}


function responderVF(resposta) {

    if (vfRespondida) {
        return;
    }

    vfRespondida = true;


    const correta = perguntasVF[vfAtual][1];


    const botoes =
        document.querySelectorAll("#verdadeiro .vf-btn");


    botoes.forEach(botao => {

        botao.disabled = true;

    });


    if (resposta === correta) {

        adicionarPontos(10);

        el("vfFeedback").textContent =
            "🎉 Correto! Você ganhou 10 pontos!";

    }

    else {

        el("vfFeedback").textContent =
            `❌ Incorreto! A resposta era ${correta ? "Verdadeiro" : "Falso"}.`;

    }


    if (vfAtual === perguntasVF.length - 1) {

        el("vfProxima").textContent =
            "🏆 Ver resultado";

    }

    else {

        el("vfProxima").textContent =
            "➡️ Próxima";

    }


    el("vfProxima").classList.remove("escondido");
}


function proximaVF() {

    if (!vfRespondida) {
        return;
    }


    if (vfAtual >= perguntasVF.length - 1) {

        mostrarResultado();

        return;

    }


    vfAtual++;

    mostrarVF();
}


// ================================
// RESULTADO
// ================================

function mostrarResultado() {

    esconderTelas();

    el("resultado").classList.remove("escondido");


    el("pontuacaoFinal").textContent =
        `${pontuacao} pontos`;


    if (pontuacao >= 80) {

        el("mensagemResultado").textContent =
            "🏆 Excelente! Você mandou muito bem!";

    }

    else if (pontuacao >= 40) {

        el("mensagemResultado").textContent =
            "🌟 Muito bem! Continue estudando Ciências!";

    }

    else {

        el("mensagemResultado").textContent =
            "📚 Continue praticando! Você vai aprender cada vez mais!";

    }
}


// ================================
// REINICIAR JOGO
// ================================

function reiniciarJogo() {

    pontuacao = 0;

    atualizarPontos();

    voltarMenu();
}


// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener("DOMContentLoaded", function () {

    atualizarPontos();

    el("quizProxima").addEventListener(
        "click",
        proximaQuiz
    );

    el("vfProxima").addEventListener(
        "click",
        proximaVF
    );


    esconderTelas();

    el("menu").classList.remove("escondido");

});
```
