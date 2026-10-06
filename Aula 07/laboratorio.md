# Laboratório 07: Componentes Interativos com DOM e Eventos

## 🎯 Objetivo
Construir dois componentes essenciais de interfaces modernas:
1. Um **Contador Interativo** com incrementador, decrementador e alerta visual.
2. Um **Menu Mobile Hambúrguer** que abre e fecha dinamicamente ao clique do usuário através de manipulação de classes CSS com JavaScript.

---

## 🛠️ Passo 1: O HTML (`index.html`)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laboratório 07 — DOM e Eventos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- 1. COMPONENTE MENU MOBILE -->
    <header class="header">
        <div class="logo">ITEAM Interativo</div>
        <button id="btn-menu" class="btn-menu" aria-label="Abrir Menu">☰</button>
        <nav id="menu-navegacao" class="menu-navegacao">
            <a href="#">Início</a>
            <a href="#">Projetos</a>
            <a href="#">Equipe</a>
            <a href="#">Contato</a>
        </nav>
    </header>

    <!-- 2. COMPONENTE CONTADOR INTERATIVO -->
    <main class="container">
        <section class="card-contador">
            <h2>Contador de Inscrições</h2>
            <div id="valor-contador" class="display-numero">0</div>
            
            <div class="botoes-grupo">
                <button id="btn-diminuir" class="btn btn-vermelho">-1</button>
                <button id="btn-zerar" class="btn btn-cinza">Zerar</button>
                <button id="btn-aumentar" class="btn btn-verde">+1</button>
            </div>
            
            <p id="mensagem-status" class="status-msg">Inicie a contagem.</p>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>
```

---

## 🛠️ Passo 2: O CSS (`style.css`)
```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 16px 24px;
    border-bottom: 1px solid #e2e8f0;
    position: relative;
}

.logo {
    font-weight: 700;
    font-size: 18px;
    color: #2563eb;
}

.btn-menu {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: none; /* Oculto em telas grandes */
}

.menu-navegacao {
    display: flex;
    gap: 20px;
}

.menu-navegacao a {
    text-decoration: none;
    color: #475569;
    font-weight: 500;
}

/* Responsividade do Menu Mobile */
@media (max-width: 600px) {
    .btn-menu {
        display: block; /* Visível no celular */
    }

    .menu-navegacao {
        display: none; /* Oculto por padrão no celular */
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }

    /* Classe ativada via JavaScript */
    .menu-navegacao.aberto {
        display: flex;
    }
}

.container {
    display: flex;
    justify-content: center;
    padding: 60px 20px;
}

.card-contador {
    background-color: #ffffff;
    padding: 32px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    text-align: center;
    max-width: 350px;
    width: 100%;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
}

.display-numero {
    font-size: 54px;
    font-weight: 800;
    margin: 20px 0;
    color: #0f172a;
    transition: color 0.2s ease;
}

.display-numero.positivo { color: #16a34a; }
.display-numero.negativo { color: #dc2626; }

.botoes-grupo {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.btn {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    color: #ffffff;
}

.btn-verde { background-color: #16a34a; }
.btn-vermelho { background-color: #dc2626; }
.btn-cinza { background-color: #64748b; }
.status-msg { margin-top: 16px; font-size: 13px; color: #64748b; }
```

---

## 🛠️ Passo 3: O JavaScript (`script.js`)
```javascript
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
```

---

## 🛠️ Passo 4: Testando a Interatividade
1. Abra no navegador via Live Server.
2. Clique nos botões `+1`, `-1` e `Zerar`. Veja o número mudar e as classes CSS trocarem de cor instantaneamente.
3. Diminua a largura da janela para menos de 600px.
4. Clique no botão de hambúrguer `☰` e veja o menu deslizar e recolher dinamicamente!
