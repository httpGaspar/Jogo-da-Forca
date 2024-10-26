const palavrasPorTema = {
    Casa: ["Geladeira", "Sofá", "Televisão", "Cama"],
    Frutas: ["Morango", "Melancia", "Jaca", "Tomate"],
    Animais: ["Zebra", "Girafa", "Hornintorrinco", "Javali"]
};

let palavraSecreta = "";
let temaAtual = "";
let erros = 0;
let letrasCorretas = [];
let letrasTentadas = [];
let maxErros = 6;

//função para iniciar o jogo e selecionar uma palavra
function iniciarJogo() {
    const urlParans = new URLSearchParams(window.location.search);
    const tema = urlParans.get("tema");

    //define o tema na pagina
    document.querySelector(".tema h1").innerText = `Tema: ${tema}`;

    const palavras = palavrasPorTema[tema];
    palavraSecreta = palavras[Math.floor(Math.random()* palavras.length)].toUpperCase();
    letrasCorretas = Array(palavraSecreta.length).fill("_");

    atualizarPalavraDisplay();
    
    // Adiciona evento de keyup ao input
    const inputLetra = document.getElementById("inputLetra");
    inputLetra.addEventListener("keyup", function(event) {
        if (event.key.match(/^[a-zA-Z]$/)) { // Verifica se a tecla pressionada é uma letra
            adivinharLetra(inputLetra.value);
            inputLetra.value = ""; // Limpa o campo de entrada
        }
    });

    // Adiciona eventos de clique aos botões do teclado
    const botoes = document.querySelectorAll(".teclado button");
    botoes.forEach(botao => {
        botao.addEventListener("click", function() {
            adivinharLetra(botao.innerText);
        });
    });
}

function atualizarPalavraDisplay() {
    document.getElementById("letras").innerText = letrasCorretas.join(" ");
}

//função para tratar as tentativas de adivinhar letras
function adivinharLetra(letra) {
    letra = letra.toUpperCase();

    // Verifica se a letra já foi tentada
    if (letrasTentadas.includes(letra)) {
        alert("Essa letra já foi tentada!");
        return;
    }

    letrasTentadas.push(letra);  // Adiciona a letra às tentativas
    let acertou = false;

    // Verifica se a letra está na palavra
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            letrasCorretas[i] = letra;
            acertou = true;
        }
    }

    // Se a letra não está na palavra, aumenta os erros e atualiza a imagem
    if (!acertou) {
        erros++;
        atualizarImagemForca();
    }

    // Atualiza a exibição da palavra e verifica o estado do jogo
    atualizarPalavraDisplay();
    verificarFimDeJogo();
}

//função para atualizar a imagem da forca
function atualizarImagemForca() {
    const imagem = document.querySelector(".imagemForca");
    imagem.src = `../assets/forca-${erros}.jpg`;
}

//função para verificar o fim do jogo
function verificarFimDeJogo() {
    if (letrasCorretas.join("") === palavraSecreta) {
        alert("Parabéns! Você venceu!");
    } else if (erros >= maxErros) {
        alert(`Você perdeu! A palavra era: ${palavraSecreta}`);
        reiniciarJogo();
    }
}

// Função para reiniciar o jogo redirecionando para a página inicial
function reiniciarJogo() {
    window.location.href = "index.html";
}

// Inicializa o jogo ao carregar a página
window.onload = iniciarJogo;