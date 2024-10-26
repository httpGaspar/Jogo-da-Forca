// Objeto que contém listas de palavras divididas por tema
const palavrasPorTema = {
    Casa: ["Geladeira", "Estante", "Televisão", "Cama"],
    Frutas: ["Morango", "Melancia", "Jaca", "Tomate"],
    Animais: ["Zebra", "Girafa", "Hornintorrinco", "Javali"]
};

// Variáveis globais para armazenar o estado do jogo
let palavraSecreta = ""; // A palavra que o jogador deve adivinhar
let temaAtual = ""; // O tema atual selecionado (não usado no código)
let erros = 0; // Contador de erros
let letrasCorretas = []; // Array para armazenar as letras corretas adivinhadas
let letrasTentadas = []; // Array para armazenar as letras que já foram tentadas
let maxErros = 6; // Número máximo de erros permitidos

// Função para iniciar o jogo e selecionar uma palavra
function iniciarJogo() {
    const urlParams = new URLSearchParams(window.location.search); // realiza a pesquisa da url recebida na outra página
    const tema = urlParams.get("tema"); // Pega o tema selecionado na URL

    // Define o tema na página
    document.querySelector(".tema h1").innerText = `Tema: ${tema}`;

    // Seleciona uma palavra aleatória do tema escolhido
    const palavras = palavrasPorTema[tema]; // Obtém a lista de palavras do tema
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(); // Escolhe uma palavra aleatória e a converte para maiúsculas
    letrasCorretas = Array(palavraSecreta.length).fill("_"); // Preenche o array de letras corretas com underscores

    atualizarPalavraDisplay(); // Atualiza a exibição da palavra na tela
    
    // Adiciona evento de keyup ao input para capturar a letra digitada
    const inputLetra = document.getElementById("inputLetra"); // Obtém o campo de entrada
    inputLetra.addEventListener("keyup", function(event) {
        // Verifica se a tecla pressionada é uma letra
        if (event.key.match(/^[a-zA-Z]$/)) {
            adivinharLetra(inputLetra.value); // Chama a função para tentar adivinhar a letra
            inputLetra.value = ""; // Limpa o campo de entrada
        }
    });

    // Adiciona eventos de clique aos botões do teclado virtual
    const botoes = document.querySelectorAll(".teclado button"); // Seleciona todos os botões do teclado
    botoes.forEach(botao => {
        botao.addEventListener("click", function() {
            adivinharLetra(botao.innerText); // Chama a função ao clicar no botão
        });
    });
}

// Função para atualizar a exibição da palavra na tela
function atualizarPalavraDisplay() {
    document.getElementById("letras").innerText = letrasCorretas.join(" "); // Mostra as letras corretas e underscores
}

// Função para tratar as tentativas de adivinhar letras
function adivinharLetra(letra) {
    letra = letra.toUpperCase(); // Converte a letra para maiúscula

    // Verifica se a letra já foi tentada
    if (letrasTentadas.includes(letra)) {
        alert("Essa letra já foi tentada!"); // Alerta o jogador se a letra já foi tentada
        return; // Sai da função
    }

    letrasTentadas.push(letra); // Adiciona a letra às tentativas
    let acertou = false; // Variável para verificar se a letra foi acertada

    // Verifica se a letra está na palavra secreta
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            letrasCorretas[i] = letra; // Atualiza a letra correta no array
            acertou = true; // Marca que a letra foi acertada
        }
    }

    // Se a letra não está na palavra, aumenta os erros e atualiza a imagem
    if (!acertou) {
        erros++; // Incrementa o contador de erros
        atualizarImagemForca(); // Atualiza a imagem da forca
    }

    // Atualiza a exibição da palavra e verifica o estado do jogo
    atualizarPalavraDisplay(); // Atualiza a exibição da palavra
    verificarFimDeJogo(); // Verifica se o jogo terminou
}

// Função para atualizar a imagem da forca
function atualizarImagemForca() {
    const imagem = document.querySelector(".imagemForca"); // Seleciona a imagem da forca
    imagem.src = `../assets/forca-${erros}.jpg`; // Atualiza a imagem com base no número de erros
}

function mostrarModalVitoria() {
    document.getElementById("modalVitoria").style.display = "block"; // Exibe o modal de vitória
}

// Função para mostrar o modal de derrota
function mostrarModalDerrota() {
    document.getElementById("palavraPerdida").innerText = palavraSecreta; // Exibe a palavra perdida
    document.getElementById("modalDerrota").style.display = "block"; // Exibe o modal de derrota
}

// Função para fechar o modal
function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none"; // Esconde o modal
}

// Função para verificar o fim do jogo
function verificarFimDeJogo() {
    if (letrasCorretas.join("") === palavraSecreta) {
        mostrarModalVitoria(); // Mostra mensagem de vitória
    } else if (erros >= maxErros) {
        mostrarModalDerrota(); // Mostra mensagem de derrota
    }
}

// Função para reiniciar o jogo redirecionando para a página inicial
function reiniciarJogo() {
    window.location.href = "index.html"; // Redireciona para a página inicial
}
// Inicializa o jogo ao carregar a página
window.onload = iniciarJogo; // Chama a função iniciarJogo quando a página é carregada