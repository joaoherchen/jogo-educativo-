```javascript
// ========================================
// BIOAVENTURA
// Jogo educativo de Ciências
// ========================================


// ========================================
// SISTEMA GERAL
// ========================================

let pontuacao = 0;


// Abre um dos três modos de jogo
function abrirModo(modo) {

    esconderTelas();

    document
        .getElementById(modo)
        .classList.remove("escondido");

    if (modo === "quiz") {
        iniciarQuiz();
    }

    if (modo === "flashcards") {
        iniciarFlashcards();
    }

    if (modo === "verdadeiro") {
        iniciarVF();
    }
}


// Esconde todas as telas
function esconderTelas() {

    document
        .querySelectorAll(".tela")
        .forEach(tela => {

            tela.classList.add("escondido");

        });
}


// Volta para o menu
function voltarMenu() {

    esconderTelas();

    document
        .getElementById("menu")
        .classList.remove("escondido");

    document.getElementById("pontosMenu")
        .textContent = pontuacao;
}


// Adiciona pontos
function adicionarPontos(valor) {

    pontuacao += valor;

    document.getElementById("pontosMenu")
        .textContent = pontuacao;
}


// ========================================
// QUIZ
// ========================================

const perguntasQuiz = [

    {
        pergunta: "Qual destes é um ser vivo?",

        opcoes: [
            "Pedra",
            "Árvore",
            "Água",
            "Ar"
        ],

        resposta: "Árvore"
    },

    {
        pergunta:
        "Qual é a principal fonte de energia para a maioria dos ecossistemas?",

        opcoes: [
            "Lua",
            "Sol",
            "Chuva",
            "Vento"
        ],

        resposta: "Sol"
    },

    {
        pergunta:
        "Qual destes animais é herbívoro?",

        opcoes: [
            "Leão",
            "Vaca",
            "Águia",
            "Tubarão"
        ],

        resposta: "Vaca"
    },

    {
        pergunta:
        "Qual destes é um fator não vivo de um ecossistema?",

        opcoes: [
            "Peixe",
            "Árvore",
            "Temperatura",
            "Bactéria"
        ],

        resposta: "Temperatura"
    },

    {
        pergunta:
        "Qual grupo ajuda na decomposição da matéria orgânica?",

        opcoes: [
            "Fungos e bactérias",
            "Peixes",
            "Aves",
            "Mamíferos"
        ],

        resposta: "Fungos e bactérias"
    },

    {
        pergunta:
        "Qual animal é um mamífero?",

        opcoes: [
            "Sapo",
            "Galinha",
            "Cachorro",
            "Lagarto"
        ],

        resposta: "Cachorro"
    }

];


let quizAtual = 0;

let quizVidas = 3;


// Inicia o quiz
function iniciarQuiz() {

    quizAtual = 0;

    quizVidas = 3;

    mostrarQuiz();
}


// Mostra uma pergunta
function mostrarQuiz() {

    const pergunta =
        perguntasQuiz[quizAtual];


    document.getElementById("quizNumero")
        .textContent =
        `Pergunta ${quizAtual + 1} de ${perguntasQuiz.length}`;


    document.getElementById("quizPergunta")
        .textContent =
        pergunta.pergunta;


    document.getElementById("quizPontos")
        .textContent =
        pontuacao;


    document.getElementById("quizVidas")
        .textContent =
        quizVidas;


    document.getElementById("quizFeedback")
        .textContent = "";


    document.getElementById("quizProxima")
        .classList.add("escondido");


    const container =
        document.getElementById("quizOpcoes");


    container.innerHTML = "";


    pergunta.opcoes.forEach(opcao => {

        const botao =
            document.createElement("button");


        botao.textContent =
            opcao;


        botao.onclick = () => {

            responderQuiz(opcao);

        };


        container.appendChild(botao);

    });
}


// Verifica a resposta
function responderQuiz(resposta) {

    const correta =
        perguntasQuiz[quizAtual].resposta;


    const feedback =
        document.getElementById("quizFeedback");


    if (resposta === correta) {

        adicionarPontos(10);


        feedback.textContent =
            "🎉 Muito bem! Você acertou! +10 pontos";


        feedback.style.color =
            "#2e7d32";

    }

    else {

        quizVidas--;


        document.getElementById("quizVidas")
            .textContent =
            quizVidas;


        feedback.textContent =
            `❌ Ops! A resposta correta era: ${correta}`;


        feedback.style.color =
            "#c62828";

    }


    document
        .querySelectorAll("#quizOpcoes button")
        .forEach(botao => {

            botao.disabled = true;

        });


    document.getElementById("quizProxima")
        .classList.remove("escondido");


    if (quizVidas <= 0) {

        feedback.textContent =
            "💔 Você ficou sem vidas!";

        setTimeout(
            mostrarResultado,
            1200
        );

    }

}


// Botão próxima pergunta
document.getElementById("quizProxima")
    .addEventListener("click", () => {

        quizAtual++;


        if (
            quizAtual <
            perguntasQuiz.length
        ) {

            mostrarQuiz();

        }

        else {

            mostrarResultado();

        }

    });


// ========================================
// FLASHCARDS
// ========================================

const flashcards = [

    {
        frente:
        "🌱 O que são produtores?",

        verso:
        "São seres vivos que produzem seu próprio alimento, como as plantas."
    },

    {
        frente:
        "🌎 O que é um ecossistema?",

        verso:
        "É o conjunto dos seres vivos e dos fatores não vivos de uma região."
    },

    {
        frente:
        "🍄 O que são decompositores?",

        verso:
        "São organismos que decompõem restos de seres vivos, como fungos e bactérias."
    },

    {
        frente:
        "☀️ Qual é a principal fonte de energia dos ecossistemas?",

        verso:
        "O Sol é a principal fonte de energia para a maioria dos ecossistemas."
    },

    {
        frente:
        "🐾 O que é um consumidor?",

        verso:
        "É um ser vivo que obtém energia alimentando-se de outros seres vivos."
    }

];


let flashAtual = 0;

let flashVirado = false;


// Inicia os flashcards
function iniciarFlashcards() {

    flashAtual = 0;

    flashVirado = false;

    mostrarFlashcard();

}


// Mostra o cartão
function mostrarFlashcard() {

    const card =
        flashcards[flashAtual];


    document.getElementById("flashFrente")
        .textContent =
        card.frente;


    document.getElementById("flashVerso")
        .textContent =
        card.verso;


    document.getElementById("flashFrente")
        .classList.remove("escondido");


    document.getElementById("flashVerso")
        .classList.add("escondido");


    document.getElementById("flashNumero")
        .textContent =
        `Cartão ${flashAtual + 1} de ${flashcards.length}`;


    flashVirado = false;

}


// Vira o cartão
function virarFlashcard() {

    flashVirado =
        !flashVirado;


    document.getElementById("flashFrente")
        .classList.toggle("escondido");


    document.getElementById("flashVerso")
        .classList.toggle("escondido");

}


// Próximo cartão
function proximoFlashcard() {

    flashAtual++;


    if (
        flashAtual >=
        flashcards.length
    ) {

        flashAtual = 0;

    }


    mostrarFlashcard();

}


// ========================================
// VERDADEIRO OU FALSO
// ========================================

const perguntasVF = [

    {
        pergunta:
        "As plantas são seres vivos.",

        resposta: true
    },

    {
        pergunta:
        "A água é um ser vivo.",

        resposta: false
    },

    {
        pergunta:
        "O Sol fornece energia para muitos ecossistemas.",

        resposta: true
    },

    {
        pergunta:
        "Os fungos podem atuar como decompositores.",

        resposta: true
    },

    {
        pergunta:
        "As pedras são seres vivos.",

        resposta: false
    },

    {
        pergunta:
        "Os animais precisam obter alimento para conseguir energia.",

        resposta: true
    }

];


let vfAtual = 0;


// Inicia o modo
function iniciarVF() {

    vfAtual = 0;

    mostrarVF();

}


// Mostra pergunta
function mostrarVF() {

    document.getElementById("vfNumero")
        .textContent =
        `Pergunta ${vfAtual + 1} de ${perguntasVF.length}`;


    document.getElementById("vfPergunta")
        .textContent =
        perguntasVF[vfAtual].pergunta;


    document.getElementById("vfPontos")
        .textContent =
        pontuacao;


    document.getElementById("vfFeedback")
        .textContent = "";


    document.getElementById("vfProxima")
        .classList.add("escondido");

}


// Responde verdadeiro ou falso
function responderVF(resposta) {

    const correta =
        perguntasVF[vfAtual].resposta;


    const feedback =
        document.getElementById("vfFeedback");


    if (resposta === correta) {

        adicionarPontos(10);


        feedback.textContent =
            "🎉 Correto! +10 pontos";


        feedback.style.color =
            "#2e7d32";

    }

    else {

        feedback.textContent =
            "❌ Incorreto! Tente novamente na próxima.";

        feedback.style.color =
            "#c62828";

    }


    document.getElementById("vfPontos")
        .textContent =
        pontuacao;


    document.getElementById("vfProxima")
        .classList.remove("escondido");

}


// Próxima pergunta
function proximoVF() {

    vfAtual++;


    if (
        vfAtual <
        perguntasVF.length
    ) {

        mostrarVF();

    }

    else {

        mostrarResultado();

    }

}


// ========================================
// RESULTADO
// ========================================

function mostrarResultado() {

    esconderTelas();


    document.getElementById("resultado")
        .classList.remove("escondido");


    document.getElementById("pontuacaoFinal")
        .textContent =
        pontuacao;


    let mensagem;


    if (pontuacao >= 80) {

        mensagem =
            "🌟 Excelente! Você é um verdadeiro especialista em Ciências!";

    }

    else if (pontuacao >= 40) {

        mensagem =
            "👏 Muito bem! Você está aprendendo bastante!";

    }

    else {

        mensagem =
            "📚 Continue estudando e tente novamente!";

    }


    document.getElementById("mensagemResultado")
        .textContent =
        mensagem;

}
```
