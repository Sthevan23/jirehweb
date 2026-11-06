/**
 * ============================================================
 *  PORTFÓLIO DA JIREHWEB
 * ============================================================
 *  Os itens abaixo são EXEMPLOS DEMONSTRATIVOS (demo: true) e
 *  aparecem no site com o selo "Exemplo".
 *
 *  Para cadastrar um projeto real:
 *   - name:        nome do projeto ou do cliente
 *   - category:    use uma das opções do formulário para o botão
 *                  "Quero um projeto assim" pré-selecionar o tipo
 *                  (Site institucional, Catálogo digital, Loja virtual,
 *                   Sistema personalizado, Gestão comercial, Landing page)
 *   - description: resumo curto do projeto
 *   - url:         endereço publicado (deixe "" se não houver)
 *   - image:       caminho de uma captura de tela (opcional, ex.:
 *                  "assets/img/projetos/cliente.webp"); sem imagem,
 *                  é exibida uma interface ilustrativa no mockup
 *   - colors:      duas cores do projeto para o mockup e o brilho
 *   - layout:      institucional | catalogo | loja | sistema | landing
 *   - demo:        false para projetos reais (remove o selo "Exemplo")
 * ============================================================
 */
window.JW_PROJECTS = [
  {
    name: "Site institucional",
    category: "Site institucional",
    description: "Estrutura para apresentar empresa, serviços e diferenciais, com chamadas claras para contato.",
    url: "",
    image: "",
    colors: ["#2f7bff", "#8b5cf6"],
    layout: "institucional",
    demo: true
  },
  {
    name: "Catálogo digital",
    category: "Catálogo digital",
    description: "Produtos organizados por categoria, com fotos, descrições e pedido direto pelo WhatsApp.",
    url: "",
    image: "",
    colors: ["#22d3ee", "#2f7bff"],
    layout: "catalogo",
    demo: true
  },
  {
    name: "Loja virtual",
    category: "Loja virtual",
    description: "Vitrine de produtos com carrinho, cálculo de frete e pagamento online ou finalização pelo WhatsApp.",
    url: "",
    image: "",
    colors: ["#a855f7", "#ec4899"],
    layout: "loja",
    demo: true
  },
  {
    name: "Painel de gestão",
    category: "Gestão comercial",
    description: "Painel administrativo com pedidos, produtos, controle financeiro e relatórios.",
    url: "",
    image: "",
    colors: ["#10b981", "#2f7bff"],
    layout: "sistema",
    demo: true
  },
  {
    name: "Landing page de campanha",
    category: "Landing page",
    description: "Página única e objetiva para divulgar um serviço ou campanha e captar novos contatos.",
    url: "",
    image: "",
    colors: ["#f59e0b", "#8b5cf6"],
    layout: "landing",
    demo: true
  }
];
