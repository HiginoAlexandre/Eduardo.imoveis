// ===== MODAL DE DETALHES DO IMÓVEL =====

function initModal(imoveisData) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');
    
    if (!modalOverlay || !modal || !modalClose || !modalContent) return;

    let currentMediaIndex = 0;
    let currentImovel = null;

    function updateMedia(index) {
        const container = document.getElementById('mainMediaContainer');
        if (!container || !currentImovel) return;

        const media = currentImovel.imagens[index];
        const isVideoFile = isVideo(media);

        currentMediaIndex = index;

        let mediaHTML = '';
        if (isVideoFile) {
            mediaHTML = `
                <div class="video-wrapper">
                    <video class="main-media" controls autoplay muted loop>
                        <source src="${media}" type="video/mp4">
                        Seu navegador não suporta vídeos.
                    </video>
                </div>
            `;
        } else {
            mediaHTML = `<img src="${media}" alt="Imagem ${index + 1}" class="main-media">`;
        }

        if (currentImovel.imagens.length > 1) {
            container.innerHTML = `
                ${mediaHTML}
                <button class="gallery-nav-btn gallery-nav-prev" id="galleryPrevBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="gallery-nav-btn gallery-nav-next" id="galleryNextBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="gallery-counter">${index + 1}/${currentImovel.imagens.length}</div>
            `;

            document.getElementById('galleryPrevBtn').addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentMediaIndex - 1 + currentImovel.imagens.length) % currentImovel.imagens.length;
                updateMedia(newIndex);
                updateActiveThumbnail(newIndex);
            });

            document.getElementById('galleryNextBtn').addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentMediaIndex + 1) % currentImovel.imagens.length;
                updateMedia(newIndex);
                updateActiveThumbnail(newIndex);
            });
        } else {
            container.innerHTML = mediaHTML;
        }
    }

    function updateActiveThumbnail(index) {
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function abrirModal(id) {
        const imovel = imoveisData.find(i => i.id === id);
        if (!imovel) return;

        currentImovel = imovel;
        currentMediaIndex = 0;

        const badgeClass = getBadgeClass(imovel.status || 'sale');
        const badgeText = getBadgeText(imovel.status || 'sale');
        const tipoIcon = getTipoIcon(imovel.tipo);

        const thumbnailsHTML = imovel.imagens.map((media, index) => {
            return `<img src="${media}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`;
        }).join('');

        modalContent.innerHTML = `
            <div class="modal-gallery">
                <div class="main-image-container" id="mainMediaContainer">
                </div>
                <div class="thumbnails">
                    ${thumbnailsHTML}
                </div>
            </div>
            <div class="modal-details">
                <h2 class="modal-title">${imovel.titulo}</h2>
                <div class="modal-subtitle">
                    <span><i class="fas fa-map-marker-alt"></i> ${imovel.localizacao}</span>
                    <span class="property-badge ${badgeClass}" style="position: static;">${badgeText}</span>
                </div>
                
                <div class="modal-price">
                    <span class="modal-price-currency">KZ</span>
                    ${formatCurrency(imovel.preco)}
                    ${imovel.status === 'rent' ? '<span style="font-size: 1rem; margin-left: 5px;">/mês</span>' : ''}
                </div>
                
                <div class="specs-grid">
                    ${imovel.area ? `
                        <div class="spec-item">
                            <div class="spec-icon"><i class="fas fa-arrows-alt"></i></div>
                            <div class="spec-content">
                                <h4>Área Total</h4>
                                <p>${imovel.area} m²</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${imovel.quartos > 0 ? `
                        <div class="spec-item">
                            <div class="spec-icon"><i class="fas fa-bed"></i></div>
                            <div class="spec-content">
                                <h4>Quartos</h4>
                                <p>${imovel.quartos}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${imovel.suites > 0 ? `
                        <div class="spec-item">
                            <div class="spec-icon"><i class="fas fa-bath"></i></div>
                            <div class="spec-content">
                                <h4>Suítes</h4>
                                <p>${imovel.suites}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${imovel.wc > 0 ? `
                        <div class="spec-item">
                            <div class="spec-icon"><i class="fas fa-toilet"></i></div>
                            <div class="spec-content">
                                <h4>WCs</h4>
                                <p>${imovel.wc}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${imovel.garagem > 0 ? `
                        <div class="spec-item">
                            <div class="spec-icon"><i class="fas fa-car"></i></div>
                            <div class="spec-content">
                                <h4>Garagem</h4>
                                <p>${imovel.garagem} vaga(s)</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="property-description">
                    <h3 class="description-title">Descrição</h3>
                    <p class="description-text">${imovel.descricao}</p>
                </div>
                
                <div class="modal-cta">
                    <button class="modal-btn modal-btn-primary" id="modalWhatsappBtn">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="modal-btn modal-btn-secondary" id="modalCallBtn">
                        <i class="fas fa-phone-alt"></i> Ligar
                    </button>
                </div>
            </div>
        `;

        setTimeout(() => {
            updateMedia(0);
        }, 100);

        modalOverlay.classList.add('active');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
                thumb.addEventListener('click', function () {
                    currentMediaIndex = index;
                    updateMedia(index);
                    updateActiveThumbnail(index);
                });
            });
        }, 200);

        setTimeout(() => {
            const whatsappBtn = document.getElementById('modalWhatsappBtn');
            const callBtn = document.getElementById('modalCallBtn');

            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', function () {
                    const mensagem = encodeURIComponent(
                        `Olá! Estou interessado no imóvel "${imovel.titulo}" que vi no site da Eduardo Imóveis.`
                    );
                    window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
                });
            }

            if (callBtn) {
                callBtn.addEventListener('click', function () {
                    window.location.href = 'tel:+244947135687';
                });
            }
        }, 200);
    }

    function fecharModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }

    modalClose.addEventListener('click', fecharModal);
    
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            fecharModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            fecharModal();
        }
    });

    document.addEventListener('openPropertyModal', function (e) {
        abrirModal(e.detail.id);
    });

    return { abrirModal, fecharModal };
}