(function() {
    // --- CONFIGURAÇÃO REALISTA ---
    const NOTIFICATION_DELAY = 25000; // 25 segundos entre notificações (Mais natural)
    const DISPLAY_TIME = 5000;       // Fica visível por 5s
    const MAX_NOTIFICATIONS = 3;     // Mostra só 3 vezes e para
    
    let count = 0;

    const data = [
        { name: "Ricardo M.", city: "São Paulo, SP", action: "acabou de comprar." },
        { name: "Ana Paula", city: "Rio de Janeiro, RJ", action: "fez uma doação." },
        { name: "Carlos E.", city: "Belo Horizonte, MG", action: "comprou o Júpiter Lite." },
        { name: "Fernanda L.", city: "Curitiba, PR", action: "garantiu a licença Lite." },
        { name: "Roberto G.", city: "Porto Alegre, RS", action: "está organizando as finanças." },
		{ name: "William B.", city: "Rio de Janeiro, RJ", action: "garantiu essa oferta." },
		{ name: "Anderson G.", city: "Belo Horizonte, MG", action: "acabou de comprar." },
		{ name: "Viviane L.", city: "Rio de Janeiro, RJ", action: "acessou o checkout" }
    ];

    // Bloqueio Mobile (Opcional: Se quiser que apareça no celular, remova o if abaixo)
    if (window.innerWidth <= 768) return; 

    const style = document.createElement('style');
    style.innerHTML = `
        .social-toast {
            position: fixed; bottom: 20px; left: 20px; background: #fff;
            border-left: 4px solid #2563eb; padding: 15px 20px; border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15); display: flex; align-items: center;
            gap: 15px; z-index: 9999; font-family: 'Inter', sans-serif;
            transform: translateX(-150%); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-width: 320px; opacity: 0; pointer-events: none; /* Não atrapalha clique */
        }
        .social-toast.visible { transform: translateX(0); opacity: 1; pointer-events: auto; }
        .st-icon { font-size: 24px; }
        .st-content { font-size: 0.85rem; line-height: 1.3; color: #334155; }
        .st-name { font-weight: 700; color: #1e293b; }
        .st-time { font-size: 0.75rem; color: #94a3b8; display: block; margin-top: 2px; }
        .close-toast { position: absolute; top: 5px; right: 8px; font-size: 12px; cursor: pointer; color: #ccc; }
    `;
    document.head.appendChild(style);

    const toast = document.createElement('div');
    toast.className = 'social-toast';
    document.body.appendChild(toast);

    function showToast() {
        if (count >= MAX_NOTIFICATIONS) return; // Para depois de 3

        const item = data[Math.floor(Math.random() * data.length)];
        const timeAgo = Math.floor(Math.random() * 15) + 2;

        toast.innerHTML = `
            <span class="close-toast">&times;</span>
            <div class="st-icon">🔥</div>
            <div class="st-content">
                <span class="st-name">${item.name}</span> de ${item.city}<br>
                ${item.action}
                <span class="st-time">Há ${timeAgo} minutos</span>
            </div>
        `;

        toast.classList.add('visible');
        
        // Botão de fechar manual
        toast.querySelector('.close-toast').onclick = () => {
            toast.classList.remove('visible');
        };

        setTimeout(() => {
            toast.classList.remove('visible');
        }, DISPLAY_TIME);

        count++;
    }

    // Inicia o ciclo com delay inicial maior para não assustar
    setTimeout(() => {
        showToast();
        setInterval(showToast, NOTIFICATION_DELAY + DISPLAY_TIME);
    }, 10000); // Espera 10s para começar
})();