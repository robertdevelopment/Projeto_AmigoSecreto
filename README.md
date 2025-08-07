<img src="https://tm.ibxk.com.br/2022/11/20/20165646884001.jpg?ims=1120x420" alt="Imagem do projeto" />

<h1>Resumo do projeto <span style="color:navy;">Amigo Secreto</span></h1>

Projeto em andamento, sendo realizado por integrantes do time **Scuba da Alura**, visando a prática com a linguagem **Java** e os conceitos do **paradigma de orientação a objetos**.

## 🔨 Funcionalidades do projeto

- **Funcionalidade 1: Armazenar nomes de amigos**  
  Os nomes são salvos no array `amigos`, que começa vazio. Sempre que o usuário adiciona um nome, ele é colocado dentro desse array.

- **Funcionalidade 2: Adicionar um amigo à lista**  
  Captura o nome digitado no campo de texto. Valida se o nome não está vazio. Adiciona o nome ao array `amigos` e atualiza a lista exibida na tela.

- **Funcionalidade 3: Exibir todos os amigos na tela**  
  Pega o elemento HTML da lista (por exemplo: `<ul id="listaAmigos">`). Limpa a lista atual com `innerHTML = ""` para evitar duplicatas. Percorre o array `amigos`, cria um `<li>` para cada nome e adiciona esses elementos à lista na tela.

- **Funcionalidade 4: Sortear um amigo aleatoriamente**  
  Verifica se há pelo menos um nome no array. Usa `Math.random()` e `Math.floor()` para gerar um índice aleatório. Escolhe um nome com base nesse índice e mostra o nome sorteado dentro de um elemento na tela (por exemplo: `<div id="resultado">`).

## ✔️ Técnicas e tecnologias utilizadas

- `JavaScript`
- `VS Code`
