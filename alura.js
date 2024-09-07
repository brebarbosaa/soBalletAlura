let carrinho = [];
let quantidadeItens = 0;

// Carregar a quantidade de itens do localStorage ao carregar a página
quantidadeItens = parseInt(localStorage.getItem('quantidadeItens')) || 0;

const contador = document.getElementById('contador');
const btnCarrinho = document.getElementById('btnCarrinho');
const carrinhoDiv = document.getElementById('carrinho');

// Atualizar o contador ao carregar a página
contador.textContent = quantidadeItens;

function adicionarAoCarrinho(nome, preco) {
    let item = { nome, preco };
    carrinho.push(item);
    quantidadeItens++;
    contador.textContent = quantidadeItens;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    renderizarCarrinho();
}

function renderizarCarrinho() {
    const listaCarrinho = document.getElementById('listaCarrinho');
    listaCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        // Adicione um botão para remover o item
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerDoCarrinho(index);
        itemLi.appendChild(btnRemover);
        listaCarrinho.appendChild(itemLi);
    });
}

function removerDoCarrinho(indice) {
    carrinho.splice(indice, 1);
    quantidadeItens--;
    contador.textContent = quantidadeItens;

    // Atualizar o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

btnCarrinho.addEventListener('click', () => {
    document.getElementById("carrinhoModal").style.display = "block";
});

// Fechar o modal quando clicar no X
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    document.getElementById("carrinhoModal").style.display = "none";
};
