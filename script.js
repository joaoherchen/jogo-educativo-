```javascript
// ==============================
// SISTEMA GERAL
// ==============================

let pontuacao = 0;

function adicionarPontos(valor) {

    pontuacao += valor;

    document.getElementById("pontosMenu").textContent =
        pontuacao;
}

function esconderTodas() {

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.add("escondido");
    });
}

function abrirModo(modo) {

    esconderTodas();

    document
        .getElementById(modo)
        .classList.remove("escondido");

    if (modo === "quiz") iniciarQuiz();
    if (modo === "flashcards") iniciarFlashcards();
    if (modo === "verdadeiro") iniciarVF();
    if (modo === "relampago") iniciarRelampago();
    if (modo === "classificacao") iniciarClassificacao();
    if (modo === "associacao") iniciarAssociacao();
}

function voltarMenu() {

    esconderTodas();

    document
        .getElementById("menu")
        .classList.remove("escondido");

    document.getElementById("pontosMenu").textContent =
        pontuacao;
}


// ==============================
// QUIZ
// ==============================

const perguntasQuiz = [

    {
        pergunta: "Qual destes é um ser vivo?",
        opcoes: ["Pedra", "Árvore", "Água", "Ar"],
        resposta: "Árvore"
    },

    {
        pergunta: "Qual é a principal fonte de energia para a maioria dos ecossistemas?",
        opcoes: ["Lua", "Sol", "Chuva", "Vento"],
        resposta: "Sol"
    },

    {
        pergunta: "Qual destes animais é herbívoro?",
        opcoes: ["Leão", "Vaca", "Águia", "Tubarão"],
        resposta: "Vaca"
    },

    {
        pergunta: "Qual é um fator não vivo de um ecossistema?",
        opcoes: ["Peixe", "Árvore", "Temperatura", "Bactéria"],
        resposta: "Temperatura"
    },

    {
        pergunta: "Qual grupo ajuda a decompor matéria orgânica?",
        opcoes: [
            "Fungos e bactérias",
            "Peixes",
            "Aves",
            "Mamíferos"
        ],
        resposta: "Fungos e bactérias"
    }
];

let quizAtual = 0;
let quizVidas = 3;

function iniciarQuiz() {

    quizAtual = 0;
    quizVidas = 3;

    mostrarQuiz();
}

function mostrarQuiz() {

    const p = perguntasQuiz[quizAtual];

    document.getElementById("quizNumero").textContent =
        `Pergunta ${quizAtual + 1} de ${perguntasQuiz.length}`;

    document.getElementById("quizPergunta").textContent =
        p.pergunta;

    document.getElementById("quizPontos").textContent =
        pontuacao;

    document.getElementById("quizVidas").textContent =
        quizVidas;

    document.getElementById("quizFeedback").textContent = "";

    document
        .getElementById("quizProxima")
        .classList.add("escondido");

    const container =
        document.getElementById("quizOpcoes");

    container.innerHTML = "";

    p.opcoes.forEach(opcao => {

        const botao =
            document.createElement("button");

        botao.textContent = opcao;

        botao.addEventListener(
            "click",
            () => responderQuiz(opcao)
        );

        container.appendChild(botao);
    });
}

function responderQuiz(resposta) {

    const correta =
        perguntasQuiz[quizAtual].resposta;

    const feedback =
        document.getElementById("quizFeedback");

    if (resposta === correta) {

        adicionarPontos(10);

        feedback.textContent =
            "🎉 Correto! +10 pontos";

        feedback.style.color = "#2e7d32";

    } else {

        quizVidas--;

        document.getElementById("quizVidas").textContent =
            quizVidas;

        feedback.textContent =
            `❌ Incorreto! Resposta: ${correta}`;

        feedback.style.color = "#c62828";
    }

    document
        .getElementById("quizProxima")
        .classList.remove("escondido");

    document
        .querySelectorAll("#quizOpcoes button")
        .forEach(botao => {
            botao.disabled = true;
        });

    if (quizVidas <= 0) {

        feedback.textContent =
            "💔 Você ficou sem vidas!";

        setTimeout(() => mostrarResultado(), 1200);
    }
}

document
    .getElementById("quizProxima")
    .addEventListener("click", () => {

        quizAtual++;

        if (quizAtual < perguntasQuiz.length) {
            mostrarQuiz();
        } else {
            mostrarResultado();
        }
    });


// ==============================
// FLASHCARDS
// ==============================

const flashcards = [

    {
        frente: "🌱 O que são produtores?",
        verso: "São seres vivos que produzem seu próprio alimento, como as plantas."
    },

    {
        frente: "🌎 O que é um ecossistema?",
        verso: "É o conjunto dos seres vivos e dos fatores não vivos de uma região."
    },

    {
        frente: "🍄 O que são decompositores?",
        verso: "São organismos que decompõem restos de seres vivos, como fungos e bactérias."
    },

    {
        frente: "☀️ Qual é a principal fonte de energia dos ecossistemas?",
        verso: "O Sol é a principal fonte de energia para a maioria dos ecossistemas."
    }
];

let flashAtual = 0;
let flashVirado = false;

function iniciarFlashcards() {

    flashAtual = 0;
    flashVirado = false;

    mostrarFlashcard();
}

function mostrarFlashcard() {

    const card = flashcards[flashAtual];

    document.getElementById("flashFrente").textContent =
        card.frente;

    document.getElementById("flashVerso").textContent =
        card.verso;

    document.getElementById("flashFrente")
        .classList.remove("escondido");

    document.getElementById("flashVerso")
        .classList.add("escondido");

    document.getElementById("flashNumero").textContent =
        `Cartão ${flashAtual + 1} de ${flashcards.length}`;

    flashVirado = false;
}

function virarFlashcard() {

    flashVirado = !flashVirado;

    document.getElementById("flashFrente")
        .classList.toggle("escondido");

    document.getElementById("flashVerso")
        .classList.toggle("escondido");
}

function proximoFlashcard() {

    flashAtual++;

    if (flashAtual >= flashcards.length) {
        flashAtual = 0;
    }

    mostrarFlashcard();
}


// ==============================
// VERDADEIRO OU FALSO
// ==============================

const perguntasVF = [

    {
        pergunta: "As plantas são seres vivos.",
        resposta: true
    },

    {
        pergunta: "A água é um ser vivo.",
        resposta: false
    },

    {
        pergunta: "O Sol fornece energia para muitos ecossistemas.",
        resposta: true
    },

    {
        pergunta: "Os fungos podem atuar como decompositores.",
        resposta: true
    }
];

let vfAtual = 0;

function iniciarVF() {

    vfAtual = 0;

    mostrarVF();
}

function mostrarVF() {

    document.getElementById("vfNumero").textContent =
        `Pergunta ${vfAtual + 1} de ${perguntasVF.length}`;

    document.getElementById("vfPergunta").textContent =
        perguntasVF[vfAtual].pergunta;

    document.getElementById("vfFeedback").textContent = "";

    document
        .getElementById("vfProxima")
        .classList.add("escondido");
}

function responderVF(resposta) {

    const correta =
        perguntasVF[vfAtual].resposta;

    const feedback =
        document.getElementById("vfFeedback");

    if (resposta === correta) {

        adicionarPontos(10);

        feedback.textContent =
            "🎉 Correto! +10 pontos";

        feedback.style.color = "#2e7d32";

    } else {

        feedback.textContent =
            "❌ Resposta incorreta!";

        feedback.style.color = "#c62828";
    }

    document
        .getElementById("vfProxima")
        .classList.remove("escondido");
}

function proximoVF() {

    vfAtual++;

    if (vfAtual < perguntasVF.length) {
        mostrarVF();
    } else {
        mostrarResultado();
    }
}


// ==============================
// DESAFIO RELÂMPAGO
// ==============================

const perguntasRelampago = [

    {
        pergunta: "Qual animal é mamífero?",
        opcoes: ["Peixe", "Cachorro", "Sapo", "Galinha"],
        resposta: "Cachorro"
    },

    {
        pergunta: "Qual é um fator não vivo?",
        opcoes: ["Árvore", "Peixe", "Água", "Fungo"],
        resposta: "Água"
    },

    {
        pergunta: "Qual é um produtor?",
        opcoes: ["Planta", "Leão", "Águia", "Lobo"],
        resposta: "Planta"
    }
];

let relampagoAtual = 0;
let tempo = 15;
let intervalo;

function iniciarRelampago() {

    relampagoAtual = 0;

    mostrarRelampago();
}

function iniciarTimer() {

    clearInterval(intervalo);

    tempo = 15;

    document.getElementById("tempo").textContent =
        tempo;

    intervalo = setInterval(() => {

        tempo--;

        document.getElementById("tempo").textContent =
            tempo;

        if (tempo <= 0) {

            clearInterval(intervalo);

            document.getElementById("relampagoFeedback")
                .textContent =
                "⏰ Tempo esgotado!";

            setTimeout(proximaRelampago, 1000);
        }

    }, 1000);
}

function mostrarRelampago() {

    const p =
        perguntasRelampago[relampagoAtual];

    document.getElementById("relampagoNumero")
        .textContent =
        `Pergunta ${relampagoAtual + 1} de ${perguntasRelampago.length}`;

    document.getElementById("relampagoPergunta")
        .textContent =
        p.pergunta;

    document.getElementById("relampagoFeedback")
        .textContent = "";

    const container =
        document.getElementById("relampagoOpcoes");

    container.innerHTML = "";

    p.opcoes.forEach(opcao => {

        const botao =
            document.createElement("button");

        botao.textContent = opcao;

        botao.onclick = () => responderRelampago(opcao);

        container.appendChild(botao);
    });

    iniciarTimer();
}

function responderRelampago(resposta) {

    clearInterval(intervalo);

    const correta =
        perguntasRelampago[relampagoAtual].resposta;

    if (resposta === correta) {

        adicionarPontos(15);

        document.getElementById("relampagoFeedback")
            .textContent =
            "⚡ Acertou! +15 pontos";

    } else {

        document.getElementById("relampagoFeedback")
            .textContent =
            "❌ Resposta incorreta!";
    }

    setTimeout(proximaRelampago, 1000);
}

function proximaRelampago() {

    relampagoAtual++;

    if (relampagoAtual < perguntasRelampago.length) {

        mostrarRelampago();

    } else {

        clearInterval(intervalo);

        mostrarResultado();
    }
}


// ==============================
// CLASSIFICAÇÃO
// ==============================

const itensClassificacao = [

    {
        item: "🌳 Árvore",
        resposta: "vivo"
    },

    {
        item: "💧 Água",
        resposta: "naovivo"
    },

    {
        item: "🐟 Peixe",
        resposta: "vivo"
    },

    {
        item: "☀️ Luz solar",
        resposta: "naovivo"
    },

    {
        item: "🍄 Fungo",
        resposta: "vivo"
    }
];

let classAtual = 0;

function iniciarClassificacao() {

    classAtual = 0;

    mostrarClassificacao();
}

function mostrarClassificacao() {

    document.getElementById("classItem")
        .textContent =
        itensClassificacao[classAtual].item;

    document.getElementById("classFeedback")
        .textContent = "";

    document.getElementById("classProxima")
        .classList.add("escondido");
}

function classificar(categoria) {

    const correta =
        itensClassificacao[classAtual].resposta;

    const feedback =
        document.getElementById("classFeedback");

    if (categoria === correta) {

        adicionarPontos(10);

        feedback.textContent =
            "🎉 Correto! +10 pontos";

        feedback.style.color = "#2e7d32";

    } else {

        feedback.textContent =
            "❌ Tente lembrar das características dos seres vivos.";

        feedback.style.color = "#c62828";
    }

    document.getElementById("classProxima")
        .classList.remove("escondido");
}

function proximaClassificacao() {

    classAtual++;

    if (classAtual < itensClassificacao.length) {

        mostrarClassificacao();

    } else {

        mostrarResultado();
    }
}


// ==============================
// ASSOCIAÇÃO
// ==============================

const associacoes = [

    {
        conceito: "🌱 Produtor",
        opcoes: [
            "Produz seu próprio alimento",
            "Animal que caça",
            "Fator não vivo"
        ],
        resposta: "Produz seu próprio alimento"
    },

    {
        conceito: "🍄 Decompositor",
        opcoes: [
            "Produz luz",
            "Decompõe matéria orgânica",
            "É sempre um animal"
        ],
        resposta: "Decompõe matéria orgânica"
    },

    {
        conceito: "🌎 Ecossistema",
        opcoes: [
            "Somente animais",
            "Somente plantas",
            "Seres vivos e fatores não vivos"
        ],
        resposta: "Seres vivos e fatores não vivos"
    }
];

let assocAtual = 0;

function iniciarAssociacao() {

    assocAtual = 0;

    mostrarAssociacao();
}

function mostrarAssociacao() {

    const item =
        associacoes[assocAtual];

    document.getElementById("assocConceito")
        .textContent =
        item.conceito;

    document.getElementById("assocFeedback")
        .textContent = "";

    document.getElementById("assocProxima")
        .classList.add("escondido");

    const container =
        document.getElementById("assocOpcoes");

    container.innerHTML = "";

    item.opcoes.forEach(opcao => {

        const botao =
            document.createElement("button");

        botao.textContent = opcao;

        botao.onclick =
            () => responderAssociacao(opcao);

        container.appendChild(botao);
    });
}

function responderAssociacao(resposta) {

    const correta =
        associacoes[assocAtual].resposta;

    const feedback =
        document.getElementById("assocFeedback");

    if (resposta === correta) {

        adicionarPontos(10);

        feedback.textContent =
            "🔗 Associação correta! +10 pontos";

        feedback.style.color = "#2e7d32";

    } else {

        feedback.textContent =
            "❌ Associação incorreta.";

        feedback.style.color = "#c62828";
    }

    document.getElementById("assocProxima")
        .classList.remove("escondido");
}

function proximaAssociacao() {

    assocAtual++;

    if (assocAtual < associacoes.length) {

        mostrarAssociacao();

    } else {

        mostrarResultado();
    }
}


// ==============================
// RESULTADO FINAL
// ==============================

function mostrarResultado() {

    esconderTodas();

    document
        .getElementById("resultado")
        .classList.remove("escondido");

    document.getElementById("pontuacaoFinal")
        .textContent =
        pontuacao;

    let mensagem;

    if (pontuacao >= 100) {

        mensagem =
            "🌟 Excelente! Você é um mestre da BioAventura!";

    } else if (pontuacao >= 50) {

        mensagem =
            "👏 Muito bem! Você está aprendendo bastante!";

    } else {

        mensagem =
            "📚 Continue estudando e tente novamente!";
    }

    document.getElementById("mensagemResultado")
        .textContent =
        mensagem;
}
```
