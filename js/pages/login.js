// ===== PÁGINA DE LOGIN =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS DO DOM =====
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');
    const registerModalOverlay = document.getElementById('registerModalOverlay');
    const registerModalClose = document.getElementById('registerModalClose');
    const registerForm = document.getElementById('registerForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const headerCta = document.getElementById('headerCta');
    
    // ===== WHATSAPP HEADER =====
    if (headerCta) {
        headerCta.addEventListener('click', function() {
            const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre os imóveis disponíveis.');
            window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
        });
    }
    
    // ===== TOGGLE VISIBILIDADE DA PALAVRA-PASSE =====
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Trocar ícone
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // ===== LOGIN FORM =====
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const remember = document.getElementById('remember').checked;
            const alert = document.getElementById('loginAlert');
            
            // Validação básica
            if (!email || !password) {
                showAlert(alert, 'Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert(alert, 'Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular login (apenas para demonstração)
            // Em produção, isso seria uma chamada AJAX para o backend
            if (email === 'demo@eduardoimoveis.co.ao' && password === '123456') {
                showAlert(alert, 'Login efetuado com sucesso! Redirecionando...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showAlert(alert, 'Email ou palavra-passe incorretos. Tente demo@eduardoimoveis.co.ao / 123456', 'error');
            }
        });
    }
    
    // ===== ABRIR MODAL DE REGISTRO =====
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // ===== FECHAR MODAL DE REGISTRO =====
    if (registerModalClose) {
        registerModalClose.addEventListener('click', function() {
            registerModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Fechar modal ao clicar fora
    if (registerModalOverlay) {
        registerModalOverlay.addEventListener('click', function(e) {
            if (e.target === registerModalOverlay) {
                registerModalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && registerModalOverlay.classList.contains('active')) {
            registerModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== FORMULÁRIO DE REGISTRO =====
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('regNome').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const telefone = document.getElementById('regTelefone').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const confirmPassword = document.getElementById('regConfirmPassword').value.trim();
            const termos = document.getElementById('regTermos').checked;
            const alert = document.getElementById('registerAlert');
            
            // Validações
            if (!nome || !email || !password || !confirmPassword) {
                showAlert(alert, 'Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert(alert, 'Por favor, insira um email válido.', 'error');
                return;
            }
            
            if (password.length < 6) {
                showAlert(alert, 'A palavra-passe deve ter pelo menos 6 caracteres.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert(alert, 'As palavras-passe não coincidem.', 'error');
                return;
            }
            
            if (!termos) {
                showAlert(alert, 'Deve aceitar os Termos e Condições e a Política de Privacidade.', 'error');
                return;
            }
            
            // Simular registro bem-sucedido
            showAlert(alert, 'Conta criada com sucesso! Faça login para continuar.', 'success');
            
            setTimeout(() => {
                registerModalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                registerForm.reset();
            }, 2000);
        });
    }
    
    // ===== FORMATAÇÃO DE TELEFONE NO REGISTRO =====
    const regTelefone = document.getElementById('regTelefone');
    if (regTelefone) {
        regTelefone.addEventListener('input', function(e) {
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
    
    // ===== BOTÕES DE LOGIN SOCIAL =====
    const googleBtn = document.getElementById('googleLogin');
    const facebookBtn = document.getElementById('facebookLogin');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showAlert(document.getElementById('loginAlert'), 'Login com Google em desenvolvimento. Use demo@eduardoimoveis.co.ao', 'error');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            showAlert(document.getElementById('loginAlert'), 'Login com Facebook em desenvolvimento. Use demo@eduardoimoveis.co.ao', 'error');
        });
    }
    
    // ===== FUNÇÕES AUXILIARES =====
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showAlert(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = 'flex';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
});