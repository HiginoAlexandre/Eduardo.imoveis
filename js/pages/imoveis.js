// ===== PÁGINA DE IMÓVEIS =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== VARIÁVEIS GLOBAIS =====
    let dadosFiltrados = [...imoveisData];
    let paginaAtual = 1;
    const itensPorPagina = 6;

    // Filtros
    let filtroNegocio = 'todos'; // 'todos', 'venda', 'arrendamento'
    let filtroTipo = 'todos';
    let filtroPreco = [];
    let filtroQuartos = 'todos';
    let termoPesquisa = '';

    // ===== ELEMENTOS DO DOM =====
    const itemsGrid = document.getElementById('itemsGrid');
    const pesquisaInput = document.getElementById('pesquisaInput');
    const pesquisaBtn = document.getElementById('pesquisaBtn');
    const resetBtn = document.getElementById('resetFiltros');
    const toggleFiltrosBtn = document.getElementById('toggleFiltrosBtn');
    const filtrosSection = document.querySelector('.filtros-section');

    // Contadores e navegação
    const mostrandoInicio = document.getElementById('mostrandoInicio');
    const mostrandoFim = document.getElementById('mostrandoFim');
    const totalResultados = document.getElementById('totalResultados');

    const navTopPrev = document.getElementById('navTopPrev');
    const navTopNext = document.getElementById('navTopNext');
    const navBottomPrev = document.getElementById('navBottomPrev');
    const navBottomNext = document.getElementById('navBottomNext');
    const navTopInfo = document.getElementById('navTopInfo');
    const navBottomInfo = document.getElementById('navBottomInfo');

    // Checkboxes e filtros
    const precoCheckboxes = document.querySelectorAll('#precoCheckboxes input[type="checkbox"]');
    const filtroNegocioContainer = document.getElementById('filtroNegocio');
    const filtroTipoContainer = document.getElementById('filtroTipo');
    const filtroQuartosContainer = document.getElementById('filtroQuartos');

    // ===== INICIALIZAR MODAL =====
    initModal(imoveisData);

    // ===== FUNÇÕES AUXILIARES =====
    function matchesPesquisa(imovel, termo) {
        if (!termo) return true;

        termo = termo.toLowerCase().trim();

        // Campos para pesquisa
        const campos = [
            imovel.titulo,
            imovel.localizacao,
            imovel.tipo,
            imovel.descricao
        ].map(c => c.toLowerCase());

        return campos.some(campo => campo.includes(termo));
    }

    // ===== FILTRAR IMÓVEIS =====
    function filtrarImoveis() {
        let resultados = [...imoveisData];

        // Filtrar por tipo de negócio
        if (filtroNegocio !== 'todos') {
            resultados = resultados.filter(imovel => {
                if (filtroNegocio === 'venda') return imovel.status === 'sale';
                if (filtroNegocio === 'arrendamento') return imovel.status === 'rent';
                return true;
            });
        }

        // Filtrar por tipo de imóvel
        if (filtroTipo !== 'todos') {
            resultados = resultados.filter(imovel => imovel.tipo === filtroTipo);
        }

        // Filtrar por quartos
        if (filtroQuartos !== 'todos') {
            resultados = resultados.filter(imovel => {
                if (filtroQuartos === '4') return imovel.quartos >= 4;
                return imovel.quartos === parseInt(filtroQuartos);
            });
        }

        // Filtrar por preço
        if (filtroPreco.length > 0) {
            resultados = resultados.filter(imovel => {
                return filtroPreco.some(faixa => {
                    switch (faixa) {
                        case 'ate-50': return imovel.preco <= 50000000;
                        case '50-100': return imovel.preco > 50000000 && imovel.preco <= 100000000;
                        case '100-200': return imovel.preco > 100000000 && imovel.preco <= 200000000;
                        case '200-300': return imovel.preco > 200000000 && imovel.preco <= 300000000;
                        case 'acima-300': return imovel.preco > 300000000;
                        default: return true;
                    }
                });
            });
        }

        // Filtrar por pesquisa
        if (termoPesquisa) {
            resultados = resultados.filter(imovel => matchesPesquisa(imovel, termoPesquisa));
        }

        dadosFiltrados = resultados;
        paginaAtual = 1;
        renderizarImoveis();
    }

    // ===== RENDERIZAR IMÓVEIS =====
    function renderizarImoveis() {
        const total = dadosFiltrados.length;
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = Math.min(inicio + itensPorPagina, total);
        const imoveisPagina = dadosFiltrados.slice(inicio, fim);

        // Atualizar contadores
        if (totalResultados) totalResultados.textContent = total;
        if (mostrandoInicio) mostrandoInicio.textContent = total > 0 ? inicio + 1 : 0;
        if (mostrandoFim) mostrandoFim.textContent = fim;

        // Atualizar info de paginação
        const totalPaginas = Math.ceil(total / itensPorPagina) || 1;
        const paginaInfo = `Página ${paginaAtual} de ${totalPaginas}`;
        if (navTopInfo) navTopInfo.textContent = paginaInfo;
        if (navBottomInfo) navBottomInfo.textContent = paginaInfo;

        // Atualizar botões de navegação
        const isFirstPage = paginaAtual === 1;
        const isLastPage = fim >= total;

        if (navTopPrev) navTopPrev.disabled = isFirstPage;
        if (navBottomPrev) navBottomPrev.disabled = isFirstPage;
        if (navTopNext) navTopNext.disabled = isLastPage;
        if (navBottomNext) navBottomNext.disabled = isLastPage;

        if (imoveisPagina.length === 0) {
            if (itemsGrid) {
                itemsGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>Nenhum imóvel encontrado</h3>
                        <p>Tente ajustar os filtros ou a pesquisa.</p>
                        <button onclick="window.resetarFiltros()">Ver todos</button>
                    </div>
                `;
            }
            return;
        }

        // Usar o renderizador compartilhado
        renderPropertyCards(imoveisPagina, 'itemsGrid', false);
        initVideoHoverImoveis(imoveisData);
    }

    // ===== TOGGLE FILTROS - SOMENTE QUANDO CLICA =====
    if (toggleFiltrosBtn && filtrosSection) {
        // Remover a classe 'collapsed' inicialmente para garantir que os filtros comecem abertos
        filtrosSection.classList.remove('collapsed');
        
        // Adicionar evento de clique para toggle manual
        toggleFiltrosBtn.addEventListener('click', function () {
            filtrosSection.classList.toggle('collapsed');
            
            // Opcional: mudar o ícone quando recolhido/expandido
            const icon = this.querySelector('i');
            if (icon) {
                if (filtrosSection.classList.contains('collapsed')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    }

    // ===== RESETAR FILTROS =====
    window.resetarFiltros = function () {
        filtroNegocio = 'todos';
        filtroTipo = 'todos';
        filtroPreco = [];
        filtroQuartos = 'todos';
        termoPesquisa = '';

        // Resetar UI
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filtro === 'todos' || 
                btn.dataset.tipo === 'todos' || 
                btn.dataset.quartos === 'todos') {
                btn.classList.add('active');
            }
        });

        precoCheckboxes.forEach(cb => cb.checked = false);

        if (pesquisaInput) pesquisaInput.value = '';

        filtrarImoveis();
    };

    // ===== EVENT LISTENERS =====

    // Filtro por negócio
    if (filtroNegocioContainer) {
        filtroNegocioContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.filtro-btn');
            if (!btn || !btn.dataset.filtro) return;

            filtroNegocioContainer.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filtroNegocio = btn.dataset.filtro;
            filtrarImoveis();
        });
    }

    // Filtro por tipo de imóvel
    if (filtroTipoContainer) {
        filtroTipoContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.filtro-btn');
            if (!btn || !btn.dataset.tipo) return;

            filtroTipoContainer.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filtroTipo = btn.dataset.tipo;
            filtrarImoveis();
        });
    }

    // Filtro por quartos
    if (filtroQuartosContainer) {
        filtroQuartosContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.filtro-btn');
            if (!btn || !btn.dataset.quartos) return;

            filtroQuartosContainer.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filtroQuartos = btn.dataset.quartos;
            filtrarImoveis();
        });
    }

    // Checkboxes de preço
    precoCheckboxes.forEach(cb => {
        cb.addEventListener('change', function () {
            filtroPreco = Array.from(precoCheckboxes)
                .filter(c => c.checked)
                .map(c => c.value);
            filtrarImoveis();
        });
    });

    // Pesquisa
    if (pesquisaInput) {
        pesquisaInput.addEventListener('input', function (e) {
            termoPesquisa = e.target.value;
            filtrarImoveis();
        });

        pesquisaInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                termoPesquisa = this.value;
                filtrarImoveis();
            }
        });
    }

    if (pesquisaBtn) {
        pesquisaBtn.addEventListener('click', function () {
            termoPesquisa = pesquisaInput ? pesquisaInput.value : '';
            // filtrarCarros();

            const itemsGrid = document.getElementById('navTop');
            if (itemsGrid) {
                itemsGrid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Botão reset
    if (resetBtn) {
        resetBtn.addEventListener('click', window.resetarFiltros);
    }

    // Navegação
    function mudarPagina(direcao) {
        const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
        const novaPagina = paginaAtual + direcao;

        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            paginaAtual = novaPagina;
            renderizarImoveis();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    if (navTopPrev) {
        navTopPrev.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(-1);
        });
    }

    if (navTopNext) {
        navTopNext.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(1);
        });
    }

    if (navBottomPrev) {
        navBottomPrev.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(-1);
        });
    }

    if (navBottomNext) {
        navBottomNext.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(1);
        });
    }

    // ===== INICIALIZAR =====
    filtrarImoveis();
});