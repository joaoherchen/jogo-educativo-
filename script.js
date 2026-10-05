// ======================================================
// BANCO DE PERGUNTAS
// ======================================================

const perguntas = [
    {
        pergunta: "Qual destes é um ser vivo?",
        opcoes: ["Pedra", "Árvore", "Água", "Ar"],
        resposta: "Árvore"
    },

    {
        pergunta: "Qual é a principal fonte de energia para a maioria dos ecossistemas?",
        opcoes: ["Lua", "Sol", "Vento", "Chuva"],
        resposta: "Sol"
    },

    {
        pergunta: "Como são chamados os seres vivos que produzem seu próprio alimento?",
        opcoes: ["Consumidores", "Produtores", "Decompositores", "Predadores"],
        resposta: "Produtores"
    },

    {
        pergunta: "Qual animal abaixo é um herbívoro?",
        opcoes: ["Leão", "Onça", "Vaca", "Águia"],
        resposta: "Vaca"
    },

    {
        pergunta: "Qual destes é um fator não vivo de um ecossistema?",
        opcoes: ["Peixe", "Árvore", "Temperatura", "Bactéria"],
        resposta: "Temperatura"
    },

    {
        pergunta: "Qual grupo é responsável pela decomposição da matéria orgânica?",
        opcoes: [
            "Fungos e bactérias",
            "Peixes",
            "Aves",
            "Mamíferos"
        ],
        resposta: "Fungos e bactérias"
    },

    {
        pergunta: "Qual é o órgão responsável pela respiração dos peixes?",
        opcoes: ["Pulmões", "Brânquias", "Pele", "Nariz"],
        resposta: "Brânquias"
    },

    {
        pergunta: "Qual destes animais é um mamífero?",
        opcoes: ["Sapo", "Galinha", "Cachorro", "Lagarto"],
        resposta: "Cachorro"
    },

    {
        pergunta: "O conjunto formado pelos seres vivos e pelos elementos não vivos de uma região é chamado de:",
        opcoes: [
            "Ecossistema",
            "População",
            "Planeta",
            "Espécie"
        ],
        resposta: "Ecossistema"
    },

    {
        pergunta: "Qual atitude ajuda na preservação do meio ambiente?",
        opcoes: [
            "Jogar lixo nos rios",
            "Desperdiçar água",
            "Reciclar materiais",
            "Desmatar florestas"
        ],
        resposta: "Reciclar materiais"
    }
];


// ======================================================
// ELEMENTOS DAS TELAS
// ======================================================

const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const flashcards = document.getElementById("flashcards");
const verdadeiroFalso = document.getElementById("verdadeiroFalso");
const final = document.getElementById("final");


// ======================================================
// BOTÕES DO MENU
// ======================================================

const btnQuiz = document.getElementById("btnQuiz");
const btnFlashcards = document.getElementById("btnFlashcards");
const btnVerdadeiroFalso =
    document.getElementById("btnVerdadeiroFalso");

const btnVoltar = document.querySelectorAll(".btnVoltar");

const btnMenuFinal = document.getElementById("btnMenuFinal");


// ======================================================
// QUIZ
// ======================================================

let perguntaAtual = 0;
let pontosQuiz = 0;
let vidasQuiz = 3;

const perguntaElemento =
    document.getElementById("pergunta");

const opcoesElemento =
    document.getElementById("opcoes");

const feedbackQuiz =
    document.getElementById("feedbackQuiz");

const numeroPergunta =
    document.getElementById("numeroPergunta");

const pontosQuizElemento =
    document.getElementById("pontosQuiz");

const vidasQuizElemento =
    document.getElementById("vidasQuiz");

const btnProxima =
    document.getElementById("btnProxima");


// ======================================================
// FLASHCARDS
// ======================================================

let flashAtual = 0;
let mostrandoResposta = false;

const flashPergunta =
    document.getElementById("flashPergunta");

const flashResposta =
    document.getElementById("flashResposta");

const contadorFlashcard =
    document.getElementById("contadorFlashcard");

const btnVirar =
    document.getElementById("btnVirar");

const btnAnterior =
    document.getElementById("btnAnterior");

const btnProximoFlash =
    document.getElementById("btnProximoFlash");


// ======================================================
// VERDADEIRO OU FALSO
// ======================================================

const perguntasVF = [
    {
        pergunta: "A água é um elemento essencial para a vida.",
        resposta: true
    },

    {
        pergunta: "As plantas são consumidores na cadeia alimentar.",
        resposta: false
    },

    {
        pergunta: "O Sol é uma importante fonte de energia para os ecossistemas.",
        resposta: true
    },

    {
        pergunta: "Os fungos podem atuar como decompositores.",
        resposta: true
    },

    {
        pergunta: "Todos os animais produzem seu próprio alimento.",
        resposta: false
    },

    {
        pergunta: "Os peixes respiram principalmente por meio das brânquias.",
        resposta: true
    },

    {
        pergunta: "A reciclagem pode ajudar na preservação do meio ambiente.",
        resposta: true
    },

    {
        pergunta: "Uma pedra é considerada um ser vivo.",
        resposta: false
    },

    {
        pergunta: "Os seres humanos fazem parte dos ecossistemas.",
        resposta: true
    },

    {
        pergunta: "Desmatar florestas sempre ajuda o meio ambiente.",
        resposta: false
    }
];

let perguntaAtualVF = 0;
let pontosVF = 0;
let vidasVF = 3;

const perguntaVF =
    document.getElementById("perguntaVF");

const numeroVF =
    document.getElementById("numeroVF");

const feedbackVF =
    document.getElementById("feedbackVF");

const pontosVFElemento =
    document.getElementById("pontosVF");

const vidasVFElemento =
    document.getElementById("vidasVF");

const btnVerdadeiro =
    document.getElementById("btnVerdadeiro");

const btnFalso =
    document.getElementById("btnFalso");

const btnProximoVF =
    document.getElementById("btnProximoVF");


// ======================================================
// RESULTADO
// ======================================================

const resultado =
    document.getElementById("resultado");

const pontuacaoFinal =
    document.getElementById("pontuacaoFinal");


// ======================================================
// FUNÇÃO PARA MOSTRAR UMA TELA
// ======================================================

function mostrarTela(tela) {

    inicio.classList.add("escondido");
    quiz.classList.add("escondido");
    flashcards.classList.add("escondido");
    verdadeiroFalso.classList.add("escondido");
    final.classList.add("escondido");

    tela.classList.remove("escondido");
}


// ======================================================
// MENU
// ======================================================

btnQuiz.addEventListener("click", iniciarQuiz);

btnFlashcards.addEventListener(
    "click",
    iniciarFlashcards
);

btnVerdadeiroFalso.addEventListener(
    "click",
    iniciarVerdadeiroFalso
);

btnVoltar.forEach(botao => {
    botao.addEventListener("click", () => {
        mostrarTela(inicio);
    });
});

btnMenuFinal.addEventListener("click", () => {
    mostrarTela(inicio);
});


// ======================================================
// INICIAR QUIZ
// ======================================================

function iniciarQuiz() {

    perguntaAtual = 0;
    pontosQuiz = 0;
    vidasQuiz = 3;

    mostrarTela(quiz);

    atualizarQuiz();

    mostrarPergunta();
}


// ======================================================
// MOSTRAR PERGUNTA DO QUIZ
// ======================================================

function mostrarPergunta() {

    feedbackQuiz.textContent = "";

    btnProxima.classList.add("escondido");

    const perguntaAtualObj =
        perguntas[perguntaAtual];

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    perguntaElemento.textContent =
        perguntaAtualObj.pergunta;

    opcoesElemento.innerHTML = "";

    perguntaAtualObj.opcoes.forEach(opcao => {

        const botao =
            document.createElement("button");

        botao.textContent = opcao;

        botao.classList.add("opcao");

        botao.addEventListener(
            "click",
            () => verificarResposta(botao, opcao)
        );

        opcoesElemento.appendChild(botao);
    });
}


// ======================================================
// VERIFICAR RESPOSTA DO QUIZ
// ======================================================

function verificarResposta(
    botao,
    respostaEscolhida
) {

    const respostaCorreta =
        perguntas[perguntaAtual].resposta;

    const botoes =
        document.querySelectorAll(".opcao");

    botoes.forEach(btn => {

        btn.disabled = true;

        if (btn.textContent === respostaCorreta) {
            btn.classList.add("correta");
        }
    });

    if (respostaEscolhida === respostaCorreta) {

        pontosQuiz += 10;

        feedbackQuiz.textContent =
            "🎉 Muito bem! Você acertou!";

        feedbackQuiz.style.color = "#2e7d32";

    } else {

        vidasQuiz--;

        botao.classList.add("errada");

        feedbackQuiz.textContent =
            `❌ Ops! A resposta correta era: ${respostaCorreta}`;

        feedbackQuiz.style.color = "#c62828";
    }

    atualizarQuiz();

    if (vidasQuiz <= 0) {

        feedbackQuiz.textContent =
            "💔 Você ficou sem vidas!";

        setTimeout(() => {
            finalizarJogo(
                pontosQuiz,
                "Quiz"
            );
        }, 1000);

    } else {

        btnProxima.classList.remove("escondido");
    }
}


// ======================================================
// PRÓXIMA PERGUNTA DO QUIZ
// ======================================================

btnProxima.addEventListener(
    "click",
    () => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            finalizarJogo(
                pontosQuiz,
                "Quiz"
            );
        }
    }
);


// ======================================================
// ATUALIZAR QUIZ
// ======================================================

function atualizarQuiz() {

    pontosQuizElemento.textContent =
        pontosQuiz;

    vidasQuizElemento.textContent =
        vidasQuiz;
}


// ======================================================
// FLASHCARDS
// ======================================================

function iniciarFlashcards() {

    flashAtual = 0;
    mostrandoResposta = false;

    mostrarTela(flashcards);

    mostrarFlashcard();
}


function mostrarFlashcard() {

    const card =
        perguntas[flashAtual];

    contadorFlashcard.textContent =
        `Cartão ${flashAtual + 1} de ${perguntas.length}`;

    flashPergunta.textContent =
        card.pergunta;

    flashResposta.textContent =
        `Resposta: ${card.resposta}`;

    flashResposta.classList.add("escondido");

    mostrandoResposta = false;
}


btnVirar.addEventListener(
    "click",
    () => {

        mostrandoResposta =
            !mostrandoResposta;

        if (mostrandoResposta) {

            flashResposta.classList.remove(
                "escondido"
            );

            btnVirar.textContent =
                "🔙 Esconder resposta";

        } else {

            flashResposta.classList.add(
                "escondido"
            );

            btnVirar.textContent =
                "🔄 Virar cartão";
        }
    }
);


btnAnterior.addEventListener(
    "click",
    () => {

        if (flashAtual > 0) {

            flashAtual--;

            mostrarFlashcard();
        }
    }
);


btnProximoFlash.addEventListener(
    "click",
    () => {

        if (flashAtual < perguntas.length - 1) {

            flashAtual++;

            mostrarFlashcard();

        } else {

            flashAtual = 0;

            mostrarFlashcard();
        }
    }
);


// ======================================================
// VERDADEIRO OU FALSO
// ======================================================

function iniciarVerdadeiroFalso() {

    perguntaAtualVF = 0;
    pontosVF = 0;
    vidasVF = 3;

    mostrarTela(verdadeiroFalso);

    atualizarVF();

    mostrarPerguntaVF();
}


function mostrarPerguntaVF() {

    feedbackVF.textContent = "";

    btnProximoVF.classList.add("escondido");

    btnVerdadeiro.disabled = false;
    btnFalso.disabled = false;

    btnVerdadeiro.classList.remove(
        "resposta-correta",
        "resposta-errada"
    );

    btnFalso.classList.remove(
        "resposta-correta",
        "resposta-errada"
    );

    const pergunta =
        perguntasVF[perguntaAtualVF];

    numeroVF.textContent =
        `Pergunta ${perguntaAtualVF + 1} de ${perguntasVF.length}`;

    perguntaVF.textContent =
        pergunta.pergunta;
}


function responderVF(respostaEscolhida) {

    const pergunta =
        perguntasVF[perguntaAtualVF];

    const correta =
        pergunta.resposta;

    btnVerdadeiro.disabled = true;
    btnFalso.disabled = true;

    const botaoCorreto =
        correta
            ? btnVerdadeiro
            : btnFalso;

    const botaoEscolhido =
        respostaEscolhida
            ? btnVerdadeiro
            : btnFalso;

    botaoCorreto.classList.add(
        "resposta-correta"
    );

    if (respostaEscolhida === correta) {

        pontosVF += 10;

        feedbackVF.textContent =
            "🎉 Correto! Muito bem!";

        feedbackVF.style.color =
            "#2e7d32";

    } else {

        vidasVF--;

        botaoEscolhido.classList.add(
            "resposta-errada"
        );

        feedbackVF.textContent =
            `❌ Incorreto! A resposta era ${
                correta ? "VERDADEIRO" : "FALSO"
            }.`;

        feedbackVF.style.color =
            "#c62828";
    }

    atualizarVF();

    if (vidasVF <= 0) {

        feedbackVF.textContent =
            "💔 Você ficou sem vidas!";

        setTimeout(() => {

            finalizarJogo(
                pontosVF,
                "Verdadeiro ou Falso"
            );

        }, 1000);

    } else {

        btnProximoVF.classList.remove(
            "escondido"
        );
    }
}


btnVerdadeiro.addEventListener(
    "click",
    () => responderVF(true)
);

btnFalso.addEventListener(
    "click",
    () => responderVF(false)
);


btnProximoVF.addEventListener(
    "click",
    () => {

        perguntaAtualVF++;

        if (
            perguntaAtualVF <
            perguntasVF.length
        ) {

            mostrarPerguntaVF();

        } else {

            finalizarJogo(
                pontosVF,
                "Verdadeiro ou Falso"
            );
        }
    }
);


function atualizarVF() {

    pontosVFElemento.textContent =
        pontosVF;

    vidasVFElemento.textContent =
        vidasVF;
}


// ======================================================
// FINAL DO JOGO
// ======================================================

function finalizarJogo(
    pontuacao,
    modo
) {

    mostrarTela(final);

    pontuacaoFinal.textContent =
        pontuacao;

    if (pontuacao >= 80) {

        resultado.textContent =
            `🌟 Excelente! Você foi muito bem no modo ${modo}!`;

    } else if (pontuacao >= 50) {

        resultado.textContent =
            `👏 Muito bom! Você conhece bastante sobre Ciências!`;

    } else {

        resultado.textContent =
            `📚 Continue estudando! Você pode melhorar na próxima rodada!`;
    }
}
