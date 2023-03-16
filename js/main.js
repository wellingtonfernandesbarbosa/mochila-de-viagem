const lista = document.getElementById('lista');
const form = document.getElementById("novoItem");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Cancela o comportamento padrão do clique em link
    
    const nome = evento.target.elements["nome"]; // Capturando o valor do atributo "nome"
    const quantidade = evento.target.elements["quantidade"]; // Capturando o valor do atributo "quantidade"    
    
    const existe = itens.find(element => element.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)
        itens[existe.id] = itemAtual;
    } else {
        itemAtual.id = itens.length

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    nome.focus();
    quantidade.value = "";
});

function criaElemento(item){
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
};

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}