(function() {
    // 1. Bloqueio Mobile: Se for celular, nem carrega o script
    if (window.innerWidth <= 768) return;

    // 2. Verifica se já mostrou (Memória Persistente)
    if (localStorage.getItem('jupiter_exit_shown') === 'true') return;

    const style = document.createElement('style');
    style.innerHTML = `
        .exit-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.9);
            z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; transition: opacity 0.3s;
            backdrop-filter: blur(5px);
        }
        .exit-overlay.visible { opacity: 1; visibility: visible; }
        
        .exit-modal {
            background: white; width: 90%; max-width: 450px; padding: 35px;
            border-radius: 16px; text-align: center; position: relative;
            border-top: 6px solid #f97316; /* Laranja */
            transform: translateY(20px); transition: transform 0.3s;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .exit-overlay.visible .exit-modal { transform: translateY(0); }
        
        .exit-x-btn { 
            position: absolute; top: 10px; right: 15px; 
            font-size: 24px; cursor: pointer; background: none; border: none; 
            color: #94a3b8; transition: color 0.2s;
        }
        .exit-x-btn:hover { color: #ef4444; }
        
        .exit-icon { font-size: 40px; margin-bottom: 15px; display: block; }
        .exit-title { color:#1e293b; margin-bottom:10px; font-size: 1.6rem; font-weight: 800; line-height: 1.2; }
        .exit-text { color:#64748b; font-size: 1rem; margin-bottom: 25px; line-height: 1.5; }
        .exit-highlight { font-weight: 700; color: #f97316; }

        /* Botão Principal (Bloco) */
        .exit-btn { 
            background: #2563eb; color: white; 
            display: block; width: 100%; padding: 16px; 
            border-radius: 8px; font-weight: 800; text-decoration: none; 
            font-size: 1.1rem; margin-top: 20px; 
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            transition: transform 0.2s, background-color 0.2s;
        }
        .exit-btn:hover { background: #1d4ed8; transform: translateY(-2px); }

        /* Botão Secundário (Link Abaixo) */
        .exit-close-link { 
            display: block; /* Garante quebra de linha */
            margin-top: 15px; 
            font-size: 0.9rem; 
            color: #94a3b8; 
            text-decoration: underline; 
            cursor: pointer; 
            background: none; 
            border: none; 
            width: 100%;
        }
        .exit-close-link:hover { color: #64748b; }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'exit-overlay';
    overlay.innerHTML = `
        <div class="exit-modal">
            <button class="exit-x-btn">&times;</button>
            <span class="exit-icon">🐶</span>
            <h2 class="exit-title">Espere! Os animais precisam de você...</h2>
            <p class="exit-text">
                Antes de ir, lembre-se: Ao organizar suas finanças com o Júpiter Lite, você doa automaticamente para a <span class="exit-highlight">AMPARA Animal</span>.
                <br><br>
                É menos que um lanche (R$ 19,90) por uma licença vitalícia.
            </p>
            
            <a href="#comprar" class="exit-btn">QUERO AJUDAR AGORA</a>
            
            <button class="exit-close-link">Não, obrigado.</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const closeExit = () => {
        overlay.classList.remove('visible');
        localStorage.setItem('jupiter_exit_shown', 'true'); // Grava para sempre
    };

    let hasTriggered = false;

    // Gatilho: Mouse saindo da tela (Desktop)
    document.addEventListener('mouseleave', (e) => {
        // Só dispara se o mouse sair POR CIMA (tentar fechar aba) e se nunca disparou antes
        if (e.clientY < 0 && !hasTriggered && !localStorage.getItem('jupiter_exit_shown')) {
            overlay.classList.add('visible');
            hasTriggered = true; // Trava para não disparar 2x na mesma sessão
        }
    });

    // Eventos de clique
    overlay.querySelector('.exit-x-btn').addEventListener('click', closeExit);
    overlay.querySelector('.exit-close-link').addEventListener('click', closeExit);
    
    // Se clicar no botão de comprar, também fecha o popup e marca como visto
    overlay.querySelector('.exit-btn').addEventListener('click', () => {
        closeExit();
        // O href já faz o scroll
    });
})();