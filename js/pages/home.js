// ===== PÁGINA INICIAL - HOME =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS DO DOM =====
    const heroPrimaryCTA = document.getElementById('heroPrimaryCTA');
    const heroSecondaryCTA = document.getElementById('heroSecondaryCTA');
    const scheduleVisitBtn = document.getElementById('scheduleVisitBtn');
    const contactTeamBtn = document.getElementById('contactTeamBtn');
    
    // ===== INICIALIZAR MODAL =====
    initModal(imoveisData);
    
    // ===== RENDERIZAR IMÓVEIS EM DESTAQUE =====
    renderPropertyCards(imoveisData, 'propertiesGrid', true);
    initVideoHoverImoveis(imoveisData);
    
    // ===== CONTADORES ANIMADOS =====
    function animarContador(elementId, valorFinal, duracao = 2000) {
        const elemento = document.getElementById(elementId);
        if (!elemento) return;
        
        let valorAtual = 0;
        const incremento = valorFinal / (duracao / 16);
        
        const timer = setInterval(() => {
            valorAtual += incremento;
            if (valorAtual >= valorFinal) {
                elemento.textContent = valorFinal.toLocaleString('pt-PT');
                clearInterval(timer);
            } else {
                elemento.textContent = Math.floor(valorAtual).toLocaleString('pt-PT');
            }
        }, 16);
    }
    
    // ===== EVENT LISTENERS =====
    
    if (heroPrimaryCTA) {
        heroPrimaryCTA.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
            
            setTimeout(() => {
                const mensagem = encodeURIComponent('Olá! Gostaria de falar com um consultor da Eduardo Imóveis.');
                window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
            }, 300);
        });
    }
    
    if (heroSecondaryCTA) {
        heroSecondaryCTA.addEventListener('click', function() {
            const imoveisSection = document.getElementById('imoveis');
            if (imoveisSection) {
                window.location.href = 'imoveis.html#pesquisaInput';
                // imoveisSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (scheduleVisitBtn) {
        scheduleVisitBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
            
            setTimeout(() => {
                const mensagem = encodeURIComponent(
                    'Olá! Gostaria de agendar uma visita para conhecer os imóveis disponíveis.'
                );
                window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
            }, 300);
        });
    }
    
    if (contactTeamBtn) {
        contactTeamBtn.addEventListener('click', function() {
            window.location.href = 'tel:+244947135687';
        });
    }
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const imoveisSection = document.getElementById('imoveis');
            if (imoveisSection) {
                imoveisSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    const aboutSection = document.getElementById('sobre');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContador('yearsCounter', 10);
                    animarContador('propertiesSoldCounter', 450);
                    animarContador('clientsCounter', 800);
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }
});