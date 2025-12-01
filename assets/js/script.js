document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DO MODO ESCURO ---
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Ícone (seleciona o <i> dentro do botão)
    const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

    // Verifica preferência salva
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if(icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
            } else {
                localStorage.setItem('theme', 'light');
                if(icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
            }
        });
    }

    // --- 2. MENU MOBILE (HAMBURGUER) ---
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('main-menu');
    const menuLinks = document.querySelectorAll('.menu a'); // Seleciona todos os links do menu

    if(mobileBtn && menu) {
        mobileBtn.addEventListener('click', () => {
            menu.classList.toggle('open');
            const menuIcon = mobileBtn.querySelector('i');
            if (menu.classList.contains('open')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Fecha o menu automaticamente ao clicar em qualquer link (Substitui o onclick do HTML)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menu.classList.remove('open');
                    const menuIcon = mobileBtn.querySelector('i');
                    if(menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // --- 3. VOLTAR AO TOPO ---
    const backToTopBtn = document.getElementById('backToTop');

    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("visible");
                backToTopBtn.style.display = "block"; // Força exibição
                setTimeout(() => { backToTopBtn.style.opacity = "1"; }, 10);
            } else {
                backToTopBtn.style.opacity = "0";
                setTimeout(() => { 
                    if(window.scrollY <= 300) backToTopBtn.style.display = "none"; 
                }, 400);
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});