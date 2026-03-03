// ===== HOVER COM VÍDEO PARA IMÓVEIS =====

function initVideoHoverImoveis(imoveisData) {
    document.querySelectorAll('.property-card').forEach(card => {
        const imageContainer = card.querySelector('.property-image-container');
        const imovelId = parseInt(card.getAttribute('data-id'));
        const imovel = imoveisData.find(i => i.id === imovelId);

        if (!imovel) return;

        // Verificar se o imóvel tem vídeo
        const videoUrl = imovel.imagens.find(img => 
            img.toLowerCase().includes('.mp4') ||
            img.toLowerCase().includes('.webm') ||
            img.toLowerCase().includes('.ogg')
        );

        if (!videoUrl) return; // Sem vídeo, não adiciona eventos

        let videoElement = null;
        let hoverTimeout;

        card.addEventListener('mouseenter', function () {
            hoverTimeout = setTimeout(() => {
                // Criar o vídeo apenas agora
                videoElement = document.createElement('video');
                videoElement.className = 'property-image property-hover-video';
                videoElement.muted = true;
                videoElement.loop = true;
                videoElement.playsInline = true;
                videoElement.preload = 'auto';

                const source = document.createElement('source');
                source.src = videoUrl;
                source.type = 'video/mp4';
                videoElement.appendChild(source);

                // Fallback para outros formatos
                if (videoUrl.includes('.webm')) {
                    source.type = 'video/webm';
                } else if (videoUrl.includes('.ogg')) {
                    source.type = 'video/ogg';
                }

                // Esconder a imagem e mostrar o vídeo
                const imgElement = imageContainer.querySelector('img');
                if (imgElement) imgElement.style.display = 'none';

                // Adicionar o vídeo ao container e tocar
                imageContainer.appendChild(videoElement);

                videoElement.play().catch(e => {
                    console.log('Autoplay bloqueado:', e);
                    videoElement.remove();
                    videoElement = null;
                    if (imgElement) imgElement.style.display = 'block';
                });
            }, 300); // delay de 300ms (igual ao automóveis)
        });

        card.addEventListener('mouseleave', function () {
            clearTimeout(hoverTimeout);

            if (videoElement) {
                videoElement.pause();
                videoElement.remove();
                videoElement = null;
            }

            const imgElement = imageContainer.querySelector('img');
            if (imgElement) imgElement.style.display = 'block';
        });
    });
}