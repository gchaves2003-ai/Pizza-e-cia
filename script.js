// Criacao dinamica da barra de retorno ao curriculo
function criarBarraNavegacao() {
  const nav = document.createElement("nav");
  nav.className = "nav-retorno";
  nav.style.cssText = "background-color: #0f172a; padding: 12px 20px; border-bottom: 1px solid #334155; text-align: left;";

  const link = document.createElement("a");
  link.href = "https://meu-curriculo-digital-delta.vercel.app/";
  link.textContent = "Voltar ao Curriculo";
  link.style.cssText = "color: #38bdf8; text-decoration: none; font-weight: 600; font-size: 0.9rem; font-family: sans-serif;";

  link.addEventListener("mouseover", () => {
    link.style.textDecoration = "underline";
  });
  link.addEventListener("mouseout", () => {
    link.style.textDecoration = "none";
  });

  nav.appendChild(link);
  document.body.insertBefore(nav, document.body.firstChild);
}

const cardapio = [
  { 
    id: 1, 
    nome: "Calabresa", 
    descricao: "Molho, mussarela, calabresa fatiada e cebola.", 
    preco: 38.00,
    imagem: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&q=80"
  },
  { 
    id: 2, 
    nome: "Margherita", 
    descricao: "Molho, mussarela, tomate e manjericão fresco.", 
    preco: 35.00,
    imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80"
  },
  { 
    id: 3, 
    nome: "Frango c/ Catupiry", 
    descricao: "Molho, frango desfiado e catupiry original.", 
    preco: 42.00,
    imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80"
  },
  { 
    id: 4, 
    nome: "Quatro Queijos", 
    descricao: "Mussarela, provolone, parmesão e gorgonzola.", 
    preco: 45.00,
    imagem: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=500&q=80"
  }
];

let carrinho = [];

const gridPizzas = document.getElementById("grid-pizzas");
const listaCarrinho = document.getElementById("lista-carrinho");
const valorTotalEl = document.getElementById("valor-total");
const btnFinalizar = document.getElementById("btn-finalizar");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

function renderizarCardapio() {
  gridPizzas.innerHTML = "";
  cardapio.forEach(pizza => {
    const card = document.createElement("div");
    card.className = "pizza-card";
    card.innerHTML = `
      <img src="${pizza.imagem}" alt="${pizza.nome}" class="pizza-img" />
      <div class="card-body">
        <h3>${pizza.nome}</h3>
        <p>${pizza.descricao}</p>
        <div class="obs-box">
          <input 
            type="text" 
            id="obs-${pizza.id}" 
            placeholder="Obs: Sem cebola, massa fina..." 
            class="input-obs"
          />
        </div>
        <div class="price-row">
          <strong>R$ ${pizza.preco.toFixed(2).replace(".", ",")}</strong>
          <button class="btn-add" onclick="adicionarAoCarrinho(${pizza.id})">+ Adicionar</button>
        </div>
      </div>
    `;
    gridPizzas.appendChild(card);
  });
}

function adicionarAoCarrinho(id) {
  const pizza = cardapio.find(p => p.id === id);
  const obsInput = document.getElementById(`obs-${id}`);
  const observacao = obsInput ? obsInput.value.trim() : "";

  if (pizza) {
    carrinho.push({
      ...pizza,
      observacao: observacao
    });
    
    if (obsInput) obsInput.value = "";
    
    atualizarCarrinho();
  }
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  
  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio.</li>';
    btnFinalizar.disabled = true;
    valorTotalEl.textContent = "R$ 0,00";
    return;
  }

  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.className = "item-carrinho";
    
    const textoObs = item.observacao ? `<small class="obs-texto">Obs: ${item.observacao}</small>` : "";

    li.innerHTML = `
      <div class="item-info">
        <span><strong>${item.nome}</strong> - R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
        ${textoObs}
      </div>
      <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    listaCarrinho.appendChild(li);
  });

  valorTotalEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  btnFinalizar.disabled = false;
}

btnFinalizar.addEventListener("click", () => {
  carrinho = [];
  atualizarCarrinho();
  mensagemSucesso.classList.remove("hidden");
  
  setTimeout(() => {
    mensagemSucesso.classList.add("hidden");
  }, 4000);
});

// Inicializacao da interface
criarBarraNavegacao();
renderizarCardapio();