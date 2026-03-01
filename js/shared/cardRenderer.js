// ===== RENDERIZAÇÃO DE CARDS DE IMÓVEIS =====

function renderPropertyCards(imoveis, containerId, isDestaque = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Se for destaque, pegar apenas os 6 primeiros
    const imoveisParaRender = isDestaque ? imoveis.slice(0, 6) : imoveis;
    
    const html = imoveisParaRender.map(imovel => {
        const badgeClass = getBadgeClass(imovel.status || 'sale');
        const badgeText = getBadgeText(imovel.status || 'sale');
        const tipoIcon = getTipoIcon(imovel.tipo);
        
        return `
            <div class="property-card" data-id="${imovel.id}">
                <div class="property-image-container">
                    <img src="${imovel.imagens[0]}" alt="${imovel.titulo}" class="property-image" loading="lazy">
                    <div class="property-badge ${badgeClass}">${badgeText}</div>
                </div>
                
                <div class="property-content">
                    <h3 class="property-title">${imovel.titulo}</h3>
                    
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${imovel.localizacao}
                    </div>
                    
                    <div class="property-price">
                        <span class="price-currency">KZ</span>
                        ${formatCurrency(imovel.preco)}
                        ${imovel.status === 'rent' ? '<span style="font-size: 0.9rem; margin-left: 5px;">/mês</span>' : ''}
                    </div>
                    
                    <div class="property-details-list">
                        ${imovel.area ? `
                            <div class="property-detail">
                                <div class="detail-icon"><i class="fas fa-arrows-alt"></i></div>
                                <div class="detail-text">
                                    <span class="detail-value">${imovel.area}m²</span>
                                    <span class="detail-label">Área</span>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${imovel.quartos > 0 ? `
                            <div class="property-detail">
                                <div class="detail-icon"><i class="fas fa-bed"></i></div>
                                <div class="detail-text">
                                    <span class="detail-value">${imovel.quartos}</span>
                                    <span class="detail-label">Quartos</span>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${imovel.suites > 0 ? `
                            <div class="property-detail">
                                <div class="detail-icon"><i class="fas fa-bath"></i></div>
                                <div class="detail-text">
                                    <span class="detail-value">${imovel.suites}</span>
                                    <span class="detail-label">Suítes</span>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${imovel.garagem > 0 ? `
                            <div class="property-detail">
                                <div class="detail-icon"><i class="fas fa-car"></i></div>
                                <div class="detail-text">
                                    <span class="detail-value">${imovel.garagem}</span>
                                    <span class="detail-label">Garagem</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="property-type-badge">
                        ${tipoIcon} ${imovel.tipo}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
    
    // Adicionar eventos de clique aos cards
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            // Disparar evento personalizado para o modal
            document.dispatchEvent(new CustomEvent('openPropertyModal', { detail: { id } }));
        });
    });
    
    return document.querySelectorAll('.property-card');
}