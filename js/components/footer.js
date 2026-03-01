// ===== FOOTER COMPONENT =====
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    const footerCtaBtn = document.getElementById('footerCtaBtn');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (footerCtaBtn) {
        footerCtaBtn.addEventListener('click', function() {
            const mensagem = encodeURIComponent('Olá! Gostaria de solicitar uma visita para ver imóveis.');
            window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
        });
    }
});