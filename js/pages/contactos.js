// ===== PÁGINA DE CONTACTOS =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS DO DOM =====
    const headerCta = document.getElementById('headerCta');
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');
    const telefoneInput = document.getElementById('telefone');
    
    // ===== WHATSAPP HEADER =====
    if (headerCta) {
        headerCta.addEventListener('click', function() {
            const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre os imóveis disponíveis.');
            window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
        });
    }
    
    // ===== FORMULÁRIO DE CONTACTO =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            const privacidade = document.getElementById('privacidade').checked;

            if (!nome || !email || !telefone || !mensagem) {
                showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            if (!privacidade) {
                showAlert('Deve aceitar a Política de Privacidade e os Termos e Condições.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Por favor, insira um email válido.', 'error');
                return;
            }

            // Simular envio com sucesso
            showAlert('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
            contactForm.reset();

            // Opcional: enviar para WhatsApp como fallback
            const assunto = document.getElementById('assunto').value;
            const assuntoTexto = {
                'informacao': 'Informações Gerais',
                'visita': 'Agendar Visita',
                'imovel': 'Interesse num Imóvel',
                'avaliacao': 'Avaliação de Imóvel',
                'financeiro': 'Questão Financeira',
                'outro': 'Outro'
            }[assunto] || 'Informações Gerais';

            const mensagemWhatsApp = `*Nova mensagem do site*\n\n*Nome:* ${nome}\n*Email:* ${email}\n*Telefone:* ${telefone}\n*Assunto:* ${assuntoTexto}\n*Mensagem:* ${mensagem}`;
            
            // Descomentar a linha abaixo para ativar o envio para WhatsApp
            // window.open(`https://wa.me/244947135687?text=${encodeURIComponent(mensagemWhatsApp)}`, '_blank');
        });
    }

    // ===== VALIDAÇÃO DE EMAIL =====
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ===== EXIBIR ALERTA =====
    function showAlert(message, type) {
        if (!formAlert) return;
        
        formAlert.textContent = message;
        formAlert.className = `alert alert-${type}`;
        formAlert.style.display = 'flex';

        setTimeout(() => {
            formAlert.style.display = 'none';
        }, 5000);
    }

    // ===== FORMATAR TELEFONE =====
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '+' + value;
                } else if (value.length <= 6) {
                    value = '+' + value.slice(0, 3) + ' ' + value.slice(3);
                } else if (value.length <= 9) {
                    value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
                } else {
                    value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9) + ' ' + value.slice(9, 12);
                }
                e.target.value = value;
            }
        });
    }

    // ===== ANIMAÇÃO DE ENTRADA DOS CARDS =====
    const cards = document.querySelectorAll('.info-card, .faq-item, .map-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== BOTÕES DE AÇÃO RÁPIDA =====
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // O link já tem o href, mas podemos adicionar um pequeno efeito
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});