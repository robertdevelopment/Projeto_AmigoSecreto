let amigos = [];

// Função para mostrar notificações personalizadas
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.textContent = mensagem;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeInUp 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Função para mostrar modal personalizado
function mostrarModal(titulo, mensagem, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${titulo}</h3>
            <p>${mensagem}</p>
            <div class="modal-buttons">
                <button class="confirm" onclick="confirmarModal(true)">Sim</button>
                <button class="cancel" onclick="confirmarModal(false)">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    window.modalCallback = callback;
}

function confirmarModal(confirmado) {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
    if (window.modalCallback) {
        window.modalCallback(confirmado);
        window.modalCallback = null;
    }
}

// Função para reproduzir sons (simulados com Web Audio API)
function reproduzirSom(tipo) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(tipo) {
            case 'adicionar':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                break;
            case 'sortear':
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
                break;
            case 'resetar':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
                break;
            case 'erro':
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                break;
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Fallback silencioso se Web Audio API não estiver disponível
        console.log('Som:', tipo);
    }
}

function exibirAmigos() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    if (amigos.length === 0) {
        lista.innerHTML = '<div class="empty-state">Nenhum amigo adicionado ainda. Adicione pelo menos 2 amigos para fazer o sorteio!</div>';
        return;
    }

    amigos.forEach(function(amigo, index){
        let li = document.createElement("li");
        li.textContent = amigo;
        li.style.animationDelay = `${index * 0.1}s`;
        lista.appendChild(li);
    });
}

function limparResultado() {
    document.getElementById("resultado").innerHTML = "";
}

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (nome === "") {
        input.classList.add('shake-animation');
        setTimeout(() => input.classList.remove('shake-animation'), 500);
        mostrarNotificacao("Por favor, insira um nome.", 'warning');
        reproduzirSom('erro');
        return;
    }

    if (amigos.includes(nome)) {
        input.classList.add('shake-animation');
        setTimeout(() => input.classList.remove('shake-animation'), 500);
        mostrarNotificacao("Este nome já foi adicionado!", 'error');
        reproduzirSom('erro');
        input.value = "";
        return;
    }

    amigos.push(nome);
    exibirAmigos();
    input.value = "";
    limparResultado();
    mostrarNotificacao(`${nome} foi adicionado à lista!`, 'success');
    reproduzirSom('adicionar');
    
    // Destacar o último item adicionado
    setTimeout(() => {
        const ultimoItem = document.querySelector('#listaAmigos li:last-child');
        if (ultimoItem) {
            ultimoItem.style.background = 'linear-gradient(45deg, #ffe5d9, #ffcab0)';
            ultimoItem.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ultimoItem.style.background = 'linear-gradient(45deg, #f0f0f0, #ffffff)';
                ultimoItem.style.transform = 'scale(1)';
            }, 1000);
        }
    }, 100);
}

function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarNotificacao("Adicione pelo menos 2 amigos para fazer o sorteio!", 'warning');
        reproduzirSom('erro');
        return;
    }

    const botaoSortear = document.querySelector('.button-draw');
    const icone = botaoSortear.querySelector('img');
    
    // Animação de carregamento
    icone.classList.add('spinning');
    botaoSortear.disabled = true;
    botaoSortear.style.opacity = '0.7';
    
    // Simular embaralhamento
    let contador = 0;
    const intervalo = setInterval(() => {
        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoTemporario = amigos[indiceAleatorio];
        document.getElementById("resultado").innerHTML = `Sorteando... <strong>${amigoTemporario}</strong>`;
        contador++;
        
        if (contador >= 10) {
            clearInterval(intervalo);
            
            // Resultado final
            const indiceFinal = Math.floor(Math.random() * amigos.length);
            const amigoSorteado = amigos[indiceFinal];
            
            const resultado = document.getElementById("resultado");
            resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado}</strong>`;
            resultado.classList.add('highlight', 'slide-in');
            
            setTimeout(() => {
                resultado.classList.remove('highlight', 'slide-in');
            }, 2000);
            
            // Restaurar botão
            icone.classList.remove('spinning');
            botaoSortear.disabled = false;
            botaoSortear.style.opacity = '1';
            
            mostrarNotificacao(`🎉 ${amigoSorteado} foi sorteado!`, 'success');
            reproduzirSom('sortear');
        }
    }, 150);
}

function resetarLista() {
    if (amigos.length === 0) {
        mostrarNotificacao("A lista já está vazia!", 'warning');
        return;
    }
    
    mostrarModal(
        "Confirmar Reset", 
        "Tem certeza que deseja limpar toda a lista de amigos?", 
        function(confirmado) {
            if (confirmado) {
                amigos = [];
                exibirAmigos();
                limparResultado();
                mostrarNotificacao("Lista resetada com sucesso!", 'success');
                reproduzirSom('resetar');
            }
        }
    );
}

// Adicionar evento de Enter no input
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('amigo');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarAmigo();
        }
    });
    
    // Inicializar com estado vazio
    exibirAmigos();
});

