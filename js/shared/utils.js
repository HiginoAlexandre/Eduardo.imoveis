// ===== FUNÇÕES UTILITÁRIAS COMPARTILHADAS =====

// Formatar moeda (KZ)
function formatCurrency(valor) {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Obter classe do badge baseado no status
function getBadgeClass(status) {
    const badges = {
        'sale': 'badge-sale',
        'rent': 'badge-rent',
        'sold': 'badge-sold',
        'featured': 'badge-featured'
    };
    return badges[status] || 'badge-sale';
}

// Obter texto do badge baseado no status
function getBadgeText(status) {
    const textos = {
        'sale': 'VENDA',
        'rent': 'ARRENDAMENTO',
        'sold': 'VENDIDO',
        'featured': 'DESTAQUE'
    };
    return textos[status] || 'DISPONÍVEL';
}

// Ícones dos tipos de imóvel
function getTipoIcon(tipo) {
    const icons = {
        'Apartamento': '<i class="fas fa-building"></i>',
        'Moradia': '<i class="fas fa-home"></i>',
        'Terreno': '<i class="fas fa-tree"></i>',
        'Cobertura': '<i class="fas fa-sun"></i>',
        'Comercial': '<i class="fas fa-store"></i>'
    };
    return icons[tipo] || '<i class="fas fa-building"></i>';
}

// Verificar se é vídeo
function isVideo(media) {
    return media.toLowerCase().includes('.mp4') ||
        media.toLowerCase().includes('.webm') ||
        media.toLowerCase().includes('.ogg');
}