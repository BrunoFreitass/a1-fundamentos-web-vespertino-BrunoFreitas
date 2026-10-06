//codigo com getElementById
//const formulario = document.getElementById("form-reserva");       // o <form> inteiro
//const campoNome = document.getElementById("nome");                // caixa "Nome Completo"
//const campoTelefone = document.getElementById("telefone");        // caixa "Telefone (WhatsApp)"
//const campoData = document.getElementById("data_visita");         // caixa "Data da Visita"
//const campoQuantidade = document.getElementById("quantidade");    // caixa "Quantidade de Pessoas"
//const campoPacote = document.getElementById("pacote");            // lista "Escolha o Pacote"
//const resumo = document.getElementById("resumo-pacote");          // parágrafo que mostra o preço escolhido
//const mensagem = document.getElementById("mensagem-sucesso");     // parágrafo de "reserva enviada"


const formulario = document.querySelector("#form-reserva");       // o <form> inteiro
const campoNome = document.querySelector("#nome");                // caixa "Nome Completo"
const campoTelefone = document.querySelector("#telefone");        // caixa "Telefone (WhatsApp)"
const campoData = document.querySelector("#data_visita");         // caixa "Data da Visita"
const campoQuantidade = document.querySelector("#quantidade");    // caixa "Quantidade de Pessoas"
const campoPacote = document.querySelector("#pacote");            // lista "Escolha o Pacote"
const resumo = document.querySelector("#resumo-pacote");          // parágrafo que mostra o preço escolhido
const mensagem = document.querySelector("#mensagem-sucesso");     // mensagem de sucesso

// Tabela de preços: cada valor do <option> aponta para o seu preço em reais
const precos = {
    "pacote-250g": 25,   // value="pacote-250g" custa R$ 25
    "pacote-500g": 50    // value="pacote-500g" custa R$ 50
};


// FUNÇÃO 1 - DATA MÍNIMA (regra das 48h de antecedência)
// Bloqueia no calendário os dias antes de "hoje + 2 dias"

function definirDataMinima() {
    const data = new Date();                                    // pega a data de hoje
    data.setDate(data.getDate() + 2);                           // soma 2 dias (48h)
    const ano = data.getFullYear();                             // ano com 4 dígitos (ex: 2026)
    const mes = String(data.getMonth() + 1).padStart(2, "0");   // mês com 2 dígitos (getMonth começa no 0)
    const dia = String(data.getDate()).padStart(2, "0");        // dia com 2 dígitos (ex: 05)
    campoData.min = `${ano}-${mes}-${dia}`;                     // o input date exige o formato AAAA-MM-DD
}


// FUNÇÃO 2 - MÁSCARA DO TELEFONE
// Enquanto a pessoa digita, monta o formato "95 98116-2474" sozinho

function formatarTelefone() {
    const numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11); // tira tudo que não é número e limita a 11 dígitos
    let formatado = numeros;                                              // começa só com os números

    if (numeros.length > 7) {                                             // já tem DDD + 5 dígitos + o resto
        formatado = numeros.slice(0, 2) + " " + numeros.slice(2, 7) + "-" + numeros.slice(7); // "95 98116-2474"
    } else if (numeros.length > 2) {                                      // já passou do DDD
        formatado = numeros.slice(0, 2) + " " + numeros.slice(2);         // "95 98116"
    }

    campoTelefone.value = formatado;                                      // coloca o texto formatado de volta na caixa
}


// FUNÇÃO 3 - RESUMO DO PACOTE
// Mostra o preço do pacote escolhido logo abaixo da lista

function atualizarResumo() {
    const preco = precos[campoPacote.value];   // busca o preço do pacote selecionado (undefined se nada foi escolhido)

    if (preco) {                               // se encontrou um preço...
        resumo.textContent = "Valor do pacote: " + preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); // escreve "R$ 25,00"
    } else {                                   // se voltou para "Selecione uma opção..."
        resumo.textContent = "";               // apaga o texto do resumo
    }
}


// FUNÇÃO 4 - ENVIO DO FORMULÁRIO
// Só roda quando todos os campos obrigatórios estão certos
// (o próprio navegador bloqueia o envio se algum "required", "pattern", "min" ou "max" falhar)

function enviarReserva(evento) {
    evento.preventDefault();                                          // impede a página de recarregar (não temos servidor)

    const nome = campoNome.value.trim();                              // nome digitado, sem espaços nas pontas
    const pessoas = campoQuantidade.value;                            // quantidade de pessoas
    const dataBR = campoData.value.split("-").reverse().join("/");    // transforma "2026-10-05" em "05/10/2026"

    mensagem.textContent = `Obrigado, ${nome}! Sua reserva para ${pessoas} pessoa(s) em ${dataBR} foi recebida. Entraremos em contato pelo WhatsApp.`; // monta a mensagem
    mensagem.hidden = false;                                          // mostra o parágrafo que estava escondido

    formulario.reset();                                               // limpa todos os campos do formulário
    atualizarResumo();                                                // apaga o resumo do pacote, já que a lista voltou ao início
    mensagem.scrollIntoView({ behavior: "smooth", block: "center" }); // rola a tela até a mensagem
}


// LIGANDO AS FUNÇÕES AOS EVENTOS
// addEventListener("evento", função) = "quando acontecer X, rode a função Y"

definirDataMinima();                                        // roda uma vez assim que a página abre
campoTelefone.addEventListener("input", formatarTelefone);  // "input" = a cada tecla digitada no telefone
campoPacote.addEventListener("change", atualizarResumo);    // "change" = quando troca a opção da lista
formulario.addEventListener("submit", enviarReserva);       // "submit" = quando clica em "Enviar Reserva"
