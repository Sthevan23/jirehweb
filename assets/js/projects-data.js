/**
 * ============================================================
 *  PORTFÓLIO DA JIREHWEB
 * ============================================================
 *  Campos de cada projeto:
 *   - name:        nome do projeto / cliente
 *   - category:    use uma das opções do formulário para o botão
 *                  "Quero um projeto assim" pré-selecionar o tipo
 *                  (Site institucional, Catálogo digital, Loja virtual,
 *                   Sistema personalizado, Gestão comercial, Landing page)
 *   - description: resumo curto do projeto
 *   - url:         endereço publicado ("" se ainda não estiver no ar)
 *   - image:       captura de tela do computador (16:10)
 *   - imageMobile: captura de tela do celular (9:19)
 *   - colors:      duas cores do projeto para o brilho do card
 *   - layout:      ilustração usada se não houver imagem
 *                  (institucional | catalogo | loja | sistema | landing)
 *   - concept:     true para marcas fictícias / projetos conceito
 *                  (exibe o selo "Projeto conceito")
 *
 *  Os cards aparecem em duas colunas, na ordem desta lista.
 * ============================================================
 */
window.JW_PROJECTS = [
  {
    name: "Verissimo Pratas 925",
    category: "Loja virtual",
    description: "E-commerce de joias em prata 925 com catálogo por categorias, busca, carrinho, cálculo de frete, cupons e painel administrativo de produtos, estoque e pedidos.",
    url: "https://verissimopratas.com.br/",
    image: "assets/img/projetos/verissimo.webp",
    imageMobile: "assets/img/projetos/verissimo-mobile.webp",
    colors: ["#7b8c5e", "#c9d4b4"],
    layout: "loja"
  },
  {
    name: "Gostinho de Casa",
    category: "Sistema personalizado",
    description: "Sistema de pedidos de marmitas com montagem de kits, cardápio do mês, carrinho, checkout, área do cliente e painel para gerenciar o cardápio e os pedidos.",
    url: "https://gostinhodecasa.seuproximosite.com.br/",
    image: "assets/img/projetos/gostinho.webp",
    imageMobile: "assets/img/projetos/gostinho-mobile.webp",
    colors: ["#1f5a3d", "#e2a74f"],
    layout: "sistema"
  },
  {
    name: "Ateliê Mariah",
    category: "Loja virtual",
    description: "Loja virtual de vestidos de festa com coleções, novidades e promoções, carrinho, checkout, área da cliente, favoritos e painel administrativo.",
    url: "",
    image: "assets/img/projetos/mariah.webp",
    imageMobile: "assets/img/projetos/mariah-mobile.webp",
    colors: ["#b89b72", "#5b4636"],
    layout: "loja"
  },
  {
    name: "Gimarry Bolos",
    category: "Catálogo digital",
    description: "Catálogo de bolos personalizados com busca por tema, filtros por categoria e carrinho que envia o pedido pelo WhatsApp.",
    url: "https://gimarrybolos.com.br/",
    image: "assets/img/projetos/gimarry.webp",
    imageMobile: "assets/img/projetos/gimarry-mobile.webp",
    colors: ["#e8628f", "#f5b8cb"],
    layout: "catalogo"
  },
  {
    name: "O! Pudim",
    category: "Catálogo digital",
    description: "Site de pudins artesanais com sabores, carrinho, reserva de encomendas de Natal e painel administrativo.",
    url: "",
    image: "assets/img/projetos/opudim.webp",
    imageMobile: "assets/img/projetos/opudim-mobile.webp",
    colors: ["#b5651d", "#f0c27b"],
    layout: "catalogo"
  },
  {
    name: "Azuleijo",
    category: "Loja virtual",
    description: "Conceito de e-commerce premium de pisos e revestimentos, com vitrine por ambientes, busca, favoritos e carrinho.",
    url: "",
    image: "assets/img/projetos/azuleijo.webp",
    imageMobile: "assets/img/projetos/azuleijo-mobile.webp",
    colors: ["#0f4a3c", "#c2602a"],
    layout: "loja",
    concept: true
  }
];
