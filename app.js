let amigos = [];

function exibirAmigos() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach(function(amigo){
        let li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    amigos.push(nome);
    exibirAmigos();
    input.value = "";
}

function sortearAmigo() {
    if (amigos.length === 0){
        alert("Não há amigos para sortear.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAleatorio];

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado}</strong>`;
}
