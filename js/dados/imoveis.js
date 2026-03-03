// ===== DADOS DOS IMÓVEIS =====
const imoveisData = [
    {
        id: 1,
        titulo: "Apartamento T3 com Vista Mar",
        tipo: "Apartamento",
        localizacao: "Marginal, Luanda",
        preco: 185000000,
        area: 180,
        quartos: 3,
        suites: 1,
        wc: 3,
        garagem: 2,
        condicao: "novo",
        status: "sale", // sale, rent, sold
        imagens: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "video/video.mp4"
        ],
        descricao: "Deslumbrante apartamento T3 na Marginal, com vista panorâmica para o mar. Acabamentos de luxo, cozinha totalmente equipada, área de lazer completa e segurança 24h."
    },
    {
        id: 2,
        titulo: "Moradia V4 em Condomínio Fechado",
        tipo: "Moradia",
        localizacao: "Talatona, Luanda",
        preco: 250000000,
        area: 350,
        quartos: 4,
        suites: 3,
        wc: 5,
        garagem: 3,
        condicao: "usado",
        status: "sale",
        imagens: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
        ],
        descricao: "Moradia espaçosa em condomínio fechado, com piscina, jardim, churrasqueira e área de festas. Acabamentos de alto padrão, móveis planejados e sistema de segurança."
    },
    {
        id: 3,
        titulo: "Terreno 1000m² Zona Comercial",
        tipo: "Terreno",
        localizacao: "Via Expressa, Luanda",
        preco: 95000000,
        area: 1000,
        quartos: 0,
        suites: 0,
        wc: 0,
        garagem: 0,
        condicao: "novo",
        status: "sale",
        imagens: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
        ],
        descricao: "Terreno plano em zona de grande crescimento, ideal para construção comercial ou residencial. Documentação regularizada, próximo a supermercados e escolas."
    },
    {
        id: 4,
        titulo: "Apartamento T2 Mobilado",
        tipo: "Apartamento",
        localizacao: "Ingombotas, Luanda",
        preco: 85000000,
        area: 120,
        quartos: 2,
        suites: 1,
        wc: 2,
        garagem: 1,
        condicao: "usado",
        status: "sale",
        imagens: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        descricao: "Apartamento T2 totalmente mobilado e equipado, pronto a habitar. Localização central, próximo a comércios, serviços e transportes."
    },
    {
        id: 5,
        titulo: "Cobertura Duplex V3",
        tipo: "Cobertura",
        localizacao: "Miramar, Luanda",
        preco: 320000000,
        area: 280,
        quartos: 3,
        suites: 2,
        wc: 4,
        garagem: 3,
        condicao: "novo",
        status: "sale",
        imagens: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800"
        ],
        descricao: "Cobertura duplex de luxo com terraço, piscina privativa e vista 360° para a cidade. Acabamentos importados, lareira, automação residencial."
    },
    {
        id: 6,
        titulo: "Imóvel Comercial - Loja",
        tipo: "Comercial",
        localizacao: "Kinaxixi, Luanda",
        preco: 145000000,
        area: 200,
        quartos: 0,
        suites: 0,
        wc: 2,
        garagem: 0,
        condicao: "usado",
        status: "rent",
        imagens: [
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
        ],
        descricao: "Loja comercial em zona nobre, com grande movimento. Ideal para comércio, escritório ou showroom. Estrutura em ótimo estado."
    },
    {
        id: 7,
        titulo: "Moradia V5 com Piscina",
        tipo: "Moradia",
        localizacao: "Benfica, Luanda",
        preco: 380000000,
        area: 450,
        quartos: 5,
        suites: 4,
        wc: 6,
        garagem: 4,
        condicao: "novo",
        status: "sale",
        imagens: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
            "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800"
        ],
        descricao: "Elegante moradia em condomínio exclusivo, com piscina, jardim paisagístico, churrasqueira e salão de festas. Acabamentos de luxo."
    },
    {
        id: 8,
        titulo: "Apartamento T1 para Arrendar",
        tipo: "Apartamento",
        localizacao: "Mutamba, Luanda",
        preco: 1200000,
        area: 65,
        quartos: 1,
        suites: 0,
        wc: 1,
        garagem: 0,
        condicao: "usado",
        status: "rent",
        imagens: [
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"
        ],
        descricao: "Apartamento T1 funcional, ideal para solteiro ou casal. Localização central, próximo a comércios e transportes. Pronto a habitar."
    }
];