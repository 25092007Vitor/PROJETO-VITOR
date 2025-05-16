document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const serviceCards = document.querySelectorAll('.service-card');
    const currentYearSpan = document.createElement('span');

    // Toggle do menu mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
    });

    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Ativa animação dos cards de serviço
        serviceCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                card.classList.add('active');
            }
        });
    });

    // Scroll suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Validação de formulário (básica)
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', e => {
        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const mensagem = form.mensagem.value.trim();

        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            e.preventDefault();
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            e.preventDefault();
        }
    });

    // Inserção dinâmica do ano no rodapé (opcional)
    const footer = document.querySelector('footer p');
    if (footer && footer.textContent.includes('2025')) {
        footer.innerHTML = `&copy; ${new Date().getFullYear()} AgroTech. Todos os direitos reservados.`;
    }
});