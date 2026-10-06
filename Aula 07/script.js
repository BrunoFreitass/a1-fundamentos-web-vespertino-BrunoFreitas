// ==========================================================================
// 1. LÓGICA DO MENU MOBILE (TOGGLE DE CLASSE)
// ==========================================================================
const btnMenu = document.querySelector("#btn-menu");
const menuNavegacao = document.querySelector("#menu-navegacao");

btnMenu.addEventListener("click", () => {
    // Alterna a classe 'aberto' ao clicar no botão hambúrguer
    menuNavegacao.classList.toggle("aberto");
});

// ==========================================================================
// 2. LÓGICA DO CONTADOR INTERATIVO
// ==========================================================================
let contador = 0;

const displayNumero = document.querySelector("#valor-contador");
const mensagemStatus = document.querySelector("#mensagem-status");
const btnAumentar = document.querySelector("#btn-aumentar");
const btnDiminuir = document.querySelector("#btn-diminuir");
const btnZerar = document.querySelector("#btn-zerar");

// Função para atualizar a tela e as cores
function atualizarInterface() {
    displayNumero.textContent = contador;

    // Remove classes anteriores
    displayNumero.classList.remove("positivo", "negativo");

    if (contador > 0) {
        displayNumero.classList.add("positivo");
        mensagemStatus.textContent = "Contagem positiva em andamento!";
    } else if (contador < 0) {
        displayNumero.classList.add("negativo");
        mensagemStatus.textContent = "Atenção: Contagem negativa!";
    } else {
        mensagemStatus.textContent = "Contador zerado.";
    }
}

// Eventos de clique nos botões
btnAumentar.addEventListener("click", () => {
    contador++;
    atualizarInterface();
});

btnDiminuir.addEventListener("click", () => {
    contador--;
    atualizarInterface();
});

btnZerar.addEventListener("click", () => {
    contador = 0;
    atualizarInterface();
});