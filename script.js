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
        opcoes: ["Fungos e bactérias", "Peixes", "Aves", "Mamíferos"],
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
        opcoes: ["Ecossistema", "População", "Planeta", "Espécie"],
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

let perguntaAtual = 0;
let pontos = 0;
let vidas = 3;

const inicio = document.getElementById("inicio");
const jogo = document.getElementById("jogo");
const final = document.getElementById("final");

const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const feedback = document.getElementById("feedback");

const pontosElemento = document.getElementById("pontos");
const vidasElemento = document.getElementById("vidas");
const numeroPergunta = document.getElementById("numeroPergunta");

const btnIniciar = document.getElementById("btnIniciar");
const btnProxima = document.getElementById("btnProxima");
const btnReiniciar = document.getElementById("btnReiniciar");

const resultado = document.getElementById("resultado");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");


btnIniciar.addEventListener("click", iniciarJogo);
btnProxima.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", reiniciarJogo);


function iniciarJogo() {
    inicio.classList.add("escondido");
    jogo.classList.remove("escondido");

    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;

    atualizarPlacar();
    mostrarPergunta();
}


function mostrarPergunta() {

    feedback.textContent = "";
    btnProxima.classList.add("escondido");

    const perguntaAtualObj = perguntas[perguntaAtual];

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    pergunta.textContent = perguntaAtualObj.pergunta;

    opcoes.innerHTML = "";

    perguntaAtualObj.opcoes.forEach(opcao => {

        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.classList.add("opcao");

        botao.addEventListener("click", () => {
            verificarResposta(botao, opcao);
        });

        opcoes.appendChild(botao);
    });
}


function verificarResposta(botao, respostaEscolhida) {

    const respostaCorreta =
        perguntas[perguntaAtual].resposta;

    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === respostaCorreta) {
            btn.classList.add("correta");
        }
    });

    if (respostaEscolhida === respostaCorreta) {

        pontos += 10;

        feedback.textContent =
            "🎉 Muito bem! Você acertou!";

        feedback.style.color = "#2e7d32";

    } else {

        vidas--;

        botao.classList.add("errada");

        feedback.textContent =
            `❌ Ops! A resposta correta era: ${respostaCorreta}`;

        feedback.style.color = "#c62828";
    }

    atualizarPlacar();

    if (vidas <= 0) {

        feedback.textContent =
            "💔 Você ficou sem vidas!";

        setTimeout(finalizarJogo, 1200);

    } else {

        btnProxima.classList.remove("escondido");
    }
}


function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}


function atualizarPlacar() {

    pontosElemento.textContent = pontos;
    vidasElemento.textContent = vidas;
}


function finalizarJogo() {

    jogo.classList.add("escondido");
    final.classList.remove("escondido");

    pontuacaoFinal.textContent = pontos;

    if (pontos >= 80) {

        resultado.textContent =
            "🌟 Excelente! Você é um verdadeiro especialista em Ciências!";

    } else if (pontos >= 50) {

        resultado.textContent =
            "👏 Muito bom! Você conhece bastante sobre Ciências!";

    } else {

        resultado.textContent =
            "📚 Continue estudando! Você pode melhorar na próxima rodada!";
    }
}


function reiniciarJogo() {

    final.classList.add("escondido");
    inicio.classList.remove("escondido");

    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;
}
