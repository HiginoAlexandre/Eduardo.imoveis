// ===== HEADER COMPONENT =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const headerCta = document.getElementById('headerCta');
    
    if (menuToggle && menuOverlay && menuClose) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuClose.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (headerCta) {
        headerCta.addEventListener('click', function() {
            const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre os imóveis disponíveis.');
            window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
        });
    }
});