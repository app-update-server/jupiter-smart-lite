(function() {
    // --- CONFIGURAÇÃO REALISTA (Elite) ---
    const NOTIFICATION_DELAY = 60000; // 20 segundos
    const DISPLAY_TIME = 6000;        // Fica visível por 6s
    const MAX_NOTIFICATIONS = 3;      // Limite por sessão
    
    let count = 0;

    // --- BANCO DE DADOS EXPANDIDO ---
    const data = [
        { name: "Ricardo M.", city: "São Paulo, SP", action: "acabou de comprar." },
        { name: "Ana Paula", city: "Rio de Janeiro, RJ", action: "fez uma doação." },
        { name: "Carlos E.", city: "Belo Horizonte, MG", action: "comprou o Júpiter Lite." },
        { name: "Fernanda L.", city: "Curitiba, PR", action: "garantiu a licença Lite." },
        { name: "Roberto G.", city: "Porto Alegre, RS", action: "está organizando as finanças." },
        { name: "William B.", city: "Rio de Janeiro, RJ", action: "garantiu essa oferta." },
        { name: "Anderson G.", city: "Belo Horizonte, MG", action: "acabou de comprar." },
        { name: "Viviane L.", city: "Rio de Janeiro, RJ", action: "acessou o checkout." },
        { name: "Juliana S.", city: "Salvador, BA", action: "baixou o software." },
        { name: "Marcos P.", city: "Recife, PE", action: "começou a usar." },
        { name: "Patrícia A.", city: "Brasília, DF", action: "garantiu a licença." },
        { name: "Lucas M.", city: "Florianópolis, SC", action: "fez uma doação." },
        { name: "Beatriz C.", city: "Manaus, AM", action: "acabou de comprar." },
        { name: "Eduardo V.", city: "Goiânia, GO", action: "está online agora." },
        { name: "Larissa T.", city: "Fortaleza, CE", action: "garantiu o desconto." },
        { name: "Rafael D.", city: "Campinas, SP", action: "comprou o Júpiter Lite." },
        { name: "Sofia R.", city: "Vitória, ES", action: "ajudou a causa animal." },
        { name: "Bruno K.", city: "Joinville, SC", action: "baixou o software." }
    ];

    // Bloqueio Mobile (Mantém leveza em telas pequenas)
    if (window.innerWidth <= 768) return; 

    const style = document.createElement('style');
    style.innerHTML = `
        .social-toast {
            position: fixed; 
            bottom: 30px; left: 30px;
            background: #fff;
            border-left: 4px solid #f97316;
            padding: 15px 25px; 
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.12);
            display: flex; align-items: center;
            gap: 15px; z-index: 9999; font-family: 'Inter', sans-serif;
            transform: translateY(100px); 
            opacity: 0; 
            transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
            max-width: 350px; 
            pointer-events: none;
            will-change: transform, opacity; /* Otimização GPU */
        }
        .social-toast.visible { transform: translateY(0); opacity: 1; pointer-events: auto; }
        
        .st-icon { font-size: 24px; animation: pulseIcon 2s infinite; }
        
        .st-content { font-size: 0.9rem; line-height: 1.4; color: #334155; }
        .st-name { font-weight: 700; color: #1e293b; }
        .st-time { font-size: 0.75rem; color: #94a3b8; display: block; margin-top: 2px; }
        
        .close-toast { 
            position: absolute; top: 8px; right: 10px; 
            font-size: 14px; cursor: pointer; color: #cbd5e1; transition:0.2s; 
        }
        .close-toast:hover { color: #f97316; }

        @keyframes pulseIcon {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    const toast = document.createElement('div');
    toast.className = 'social-toast';
    document.body.appendChild(toast);

    function showToast() {
        if (count >= MAX_NOTIFICATIONS) return;

        const item = data[Math.floor(Math.random() * data.length)];
        const timeAgo = Math.floor(Math.random() * 10) + 2;

        // 1. Inserção no DOM (Causa invalidação de layout)
        toast.innerHTML = `
            <span class="close-toast">&times;</span>
            <div class="st-icon">🔥</div>
            <div class="st-content">
                <span class="st-name">${item.name}</span> de ${item.city}<br>
                ${item.action}
                <span class="st-time">Há ${timeAgo} minutos</span>
            </div>
        `;

        // 2. SOLUÇÃO DO REFLOW (Performance):
        // Usamos requestAnimationFrame duplo para garantir que o navegador 
        // tenha tempo de processar o HTML antes de aplicar a classe de animação.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('visible');
            });
        });
        
        // Botão de fechar manual
        const closeBtn = toast.querySelector('.close-toast');
        if(closeBtn) {
            closeBtn.onclick = () => {
                toast.classList.remove('visible');
            };
        }

        setTimeout(() => {
            toast.classList.remove('visible');
        }, DISPLAY_TIME);

        count++;
    }

    // Inicia o ciclo
    setTimeout(() => {
        showToast();
        setInterval(showToast, NOTIFICATION_DELAY + DISPLAY_TIME);
    }, 8000);
})();