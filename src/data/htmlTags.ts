export interface TagAttribute {
  name: string;
  description: string;
  required: boolean;
}

export interface HTMLTag {
  name: string;
  category: 'Estrutura' | 'Texto' | 'Formulários' | 'Multimídia' | 'Tabelas' | 'Listas' | 'Semântica';
  description: string;
  whatIs: string;
  whatFor: string[];
  syntax: string;
  lineByLine: { line: string; explanation: string }[];
  attributes: TagAttribute[];
  bestPractices: string[];
  commonErrors: string[];
  compatibility: {
    chrome: 'full' | 'partial' | 'none';
    firefox: 'full' | 'partial' | 'none';
    safari: 'full' | 'partial' | 'none';
    edge: 'full' | 'partial' | 'none';
  };
  curiosity: string;
  relatedTags: string[];
}

export const htmlTagsData: Record<string, HTMLTag> = {
  "img": {
    name: "<img>",
    category: "Multimídia",
    description: "Incorpora uma imagem no documento HTML.",
    whatIs: "A tag <img> é usada para inserir imagens em uma página web. Ela é uma tag auto-fechável (void element), o que significa que não possui uma tag de fechamento correspondente.",
    whatFor: [
      "Exibir fotografias, ilustrações e logotipos.",
      "Apresentar ícones informativos com descrição alternativa.",
      "Melhorar o apelo visual e a experiência do usuário em artigos e landing pages."
    ],
    syntax: `<img \n  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500" \n  alt="Gradiente abstrato colorido e moderno" \n  width="500" \n  height="300" \n  class="rounded-xl shadow-lg"\n/>`,
    lineByLine: [
      { line: '<img', explanation: "Inicia a tag de imagem." },
      { line: '  src="..."', explanation: "Atributo obrigatório que define o caminho ou URL da imagem a ser exibida." },
      { line: '  alt="..."', explanation: "Texto alternativo essencial para acessibilidade (leitores de tela) e SEO caso a imagem não carregue." },
      { line: '  width="500"', explanation: "Define a largura da imagem em pixels para ajudar o navegador a reservar o espaço correto." },
      { line: '  height="300"', explanation: "Define a altura da imagem em pixels, evitando saltos de layout (CLS)." },
      { line: '/>', explanation: "Fecha a tag auto-fechável." }
    ],
    attributes: [
      { name: "src", description: "URL ou caminho local da imagem.", required: true },
      { name: "alt", description: "Texto alternativo para acessibilidade e SEO.", required: true },
      { name: "loading", description: "Define se carrega imediatamente ('eager') ou sob demanda ('lazy').", required: false },
      { name: "width", description: "Largura da imagem em pixels.", required: false },
      { name: "height", description: "Altura da imagem em pixels.", required: false }
    ],
    bestPractices: [
      "Sempre forneça um atributo 'alt' descritivo e útil.",
      "Utilize 'loading=\"lazy\"' para imagens fora da tela inicial para melhorar a performance.",
      "Defina 'width' e 'height' para evitar mudanças bruscas no layout durante o carregamento.",
      "Use formatos modernos como WebP ou AVIF para melhor compressão."
    ],
    commonErrors: [
      "Esquecer o atributo 'alt' ou deixá-lo vazio para imagens informativas.",
      "Usar imagens gigantescas sem otimização de tamanho.",
      "Tentar fechar a tag com </img> (ela é auto-fechável)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Nos primórdios da web, as páginas eram puramente textuais. A tag <img> foi proposta em 1993 por Marc Andreessen (criador do navegador Mosaic) e revolucionou a internet ao permitir a primeira web visual.",
    relatedTags: ["picture", "figure", "figcaption", "canvas"]
  },
  "div": {
    name: "<div>",
    category: "Estrutura",
    description: "Elemento de divisão genérico em bloco.",
    whatIs: "A tag <div> é um container genérico de fluxo. Ela não tem nenhum significado semântico inerente, servindo puramente para agrupar elementos para estilização (CSS) ou manipulação (JavaScript).",
    whatFor: [
      "Agrupar elementos para aplicar layouts com Flexbox ou Grid.",
      "Criar blocos de conteúdo ou seções estilizadas.",
      "Servir como alvo para manipulações dinâmicas via JavaScript."
    ],
    syntax: `<div class="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl">\n  <h3 className="text-xl font-bold">Olá, Dev!</h3>\n  <p className="mt-2 opacity-90">Este é um container estilizado usando uma div.</p>\n</div>`,
    lineByLine: [
      { line: '<div class="...">', explanation: "Inicia o container genérico aplicando classes de estilo do Tailwind." },
      { line: '  <h3>...</h3>', explanation: "Título interno do container." },
      { line: '  <p>...</p>', explanation: "Parágrafo descritivo interno." },
      { line: '</div>', explanation: "Fecha o container de divisão." }
    ],
    attributes: [
      { name: "class / className", description: "Especifica classes CSS para estilização.", required: false },
      { name: "id", description: "Identificador único para o elemento na página.", required: false },
      { name: "style", description: "Aplica estilos CSS inline diretamente no elemento.", required: false }
    ],
    bestPractices: [
      "Evite a 'divite' (uso excessivo de divs quando tags semânticas como <section>, <article> ou <header> seriam mais adequadas).",
      "Use divs apenas para fins de layout e estilização visual.",
      "Mantenha a estrutura de divs aninhadas o mais simples possível."
    ],
    commonErrors: [
      "Usar <div> para botões clicáveis sem adicionar atributos de acessibilidade (como role=\"button\").",
      "Substituir elementos semânticos de texto (como <p> ou <h1>) por divs estilizadas."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <div> tornou-se a espinha dorsal da era 'Web 2.0', substituindo o antigo design baseado em tabelas (table layouts) que dominava os anos 90.",
    relatedTags: ["span", "section", "article", "main"]
  },
  "form": {
    name: "<form>",
    category: "Formulários",
    description: "Representa um formulário interativo para coletar dados.",
    whatIs: "A tag <form> define uma seção de um documento que contém controles interativos para permitir que um usuário envie informações para um servidor web.",
    whatFor: [
      "Criar formulários de login, cadastro e contato.",
      "Coletar preferências do usuário ou filtros de pesquisa.",
      "Enviar arquivos e mídias para processamento no servidor."
    ],
    syntax: `<form class="space-y-4 p-6 bg-card border rounded-xl max-w-md" onsubmit="alert('Formulário enviado!'); return false;">\n  <div>\n    <label class="block text-sm font-medium mb-1">Seu Nome</label>\n    <input type="text" placeholder="Digite aqui..." class="w-full px-3 py-2 border rounded-lg bg-background" required />\n  </div>\n  <button type="submit" class="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">Enviar</button>\n</form>`,
    lineByLine: [
      { line: '<form class="..." onsubmit="...">', explanation: "Inicia o formulário com espaçamento vertical e um evento de envio simulado." },
      { line: '  <div>', explanation: "Agrupa o campo de entrada e seu rótulo." },
      { line: '    <label>Seu Nome</label>', explanation: "Rótulo acessível para o campo de texto." },
      { line: '    <input type="text" ... required />', explanation: "Campo de entrada de texto obrigatório." },
      { line: '  </div>', explanation: "Fecha o grupo do campo." },
      { line: '  <button type="submit">Enviar</button>', explanation: "Botão que dispara o envio do formulário." },
      { line: '</form>', explanation: "Fecha a tag do formulário." }
    ],
    attributes: [
      { name: "action", description: "A URL para onde os dados do formulário serão enviados.", required: false },
      { name: "method", description: "O método HTTP usado para enviar os dados (geralmente 'get' ou 'post').", required: false },
      { name: "autocomplete", description: "Indica se os campos podem ter preenchimento automático pelo navegador.", required: false },
      { name: "target", description: "Onde exibir a resposta após o envio (ex: '_blank' para nova aba).", required: false }
    ],
    bestPractices: [
      "Sempre associe um <label> a cada <input> usando o atributo 'for' ou aninhando o input.",
      "Use o tipo de input correto (ex: type=\"email\", type=\"tel\") para habilitar teclados otimizados em dispositivos móveis.",
      "Forneça feedback claro de validação de erros."
    ],
    commonErrors: [
      "Esquecer de definir o atributo 'type=\"submit\"' no botão de envio.",
      "Não usar a tag <form> e tentar enviar dados apenas escutando cliques em botões soltos (quebra a acessibilidade do teclado)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Os formulários HTML foram introduzidos na especificação HTML 2.0 em 1995, permitindo que a web deixasse de ser apenas de leitura e passasse a ser interativa.",
    relatedTags: ["input", "label", "button", "select", "textarea"]
  },
  "video": {
    name: "<video>",
    category: "Multimídia",
    description: "Incorpora conteúdo de vídeo nativo na página.",
    whatIs: "A tag <video> é usada para reproduzir arquivos de vídeo diretamente no navegador, sem a necessidade de plugins externos como o antigo Flash Player.",
    whatFor: [
      "Exibir vídeos institucionais, tutoriais ou animações de fundo.",
      "Criar players de vídeo customizados usando a API de mídia do HTML5.",
      "Apresentar pequenos loops visuais silenciosos como alternativa a GIFs pesados."
    ],
    syntax: `<video \n  controls \n  poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500" \n  class="w-full rounded-xl shadow-lg max-w-md"\n>\n  <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32122-large.mp4" type="video/mp4" />\n  Seu navegador não suporta a tag de vídeo.\n</video>`,
    lineByLine: [
      { line: '<video controls poster="..." class="...">', explanation: "Inicia o elemento de vídeo com controles nativos habilitados e uma imagem de capa (poster)." },
      { line: '  <source src="..." type="video/mp4" />', explanation: "Especifica o arquivo de vídeo e seu formato para que o navegador possa decodificar." },
      { line: '  Seu navegador não suporta...', explanation: "Texto de fallback exibido apenas se o navegador do usuário for muito antigo e não suportar HTML5." },
      { line: '</video>', explanation: "Fecha a tag de vídeo." }
    ],
    attributes: [
      { name: "src", description: "URL do vídeo (pode ser usado diretamente na tag ou via <source>).", required: false },
      { name: "controls", description: "Exibe os controles nativos de play, pause, volume e tela cheia.", required: false },
      { name: "autoplay", description: "Inicia a reprodução do vídeo automaticamente ao carregar a página.", required: false },
      { name: "loop", description: "Faz o vídeo reiniciar automaticamente ao chegar ao fim.", required: false },
      { name: "muted", description: "Inicia o vídeo sem som (obrigatório na maioria dos navegadores para funcionar com autoplay).", required: false },
      { name: "poster", description: "Imagem exibida enquanto o vídeo está carregando ou antes do play.", required: false }
    ],
    bestPractices: [
      "Sempre inclua o atributo 'muted' se estiver usando 'autoplay', caso contrário o navegador bloqueará a reprodução automática.",
      "Forneça múltiplos formatos de vídeo (MP4, WebM) usando a tag <source> para máxima compatibilidade.",
      "Use 'playsinline' para evitar que o vídeo abra em tela cheia automaticamente no iOS Safari."
    ],
    commonErrors: [
      "Tentar usar autoplay com som ativado (o navegador vai bloquear o áudio e o vídeo não iniciará).",
      "Não fornecer uma imagem de 'poster', deixando o player preto até o carregamento."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Antes do HTML5 e da tag <video> em 2010, quase todos os vídeos na web dependiam do Adobe Flash Player, que consumia muita bateria e apresentava graves falhas de segurança.",
    relatedTags: ["audio", "source", "track", "iframe"]
  },
  "section": {
    name: "<section>",
    category: "Semântica",
    description: "Representa uma seção genérica autônoma de um documento.",
    whatIs: "A tag <section> é um elemento semântico que agrupa conteúdos relacionados de forma temática. Diferente de uma <div>, ela indica ao navegador e aos leitores de tela que o conteúdo interno possui uma relação lógica.",
    whatFor: [
      "Dividir uma página em capítulos, abas ou seções temáticas (ex: 'Sobre Nós', 'Serviços', 'Contato').",
      "Organizar artigos longos em partes bem definidas.",
      "Melhorar a acessibilidade e a estrutura de SEO do site."
    ],
    syntax: `<section class="p-6 border border-indigo-100 bg-indigo-50/30 rounded-2xl">\n  <h2 class="text-xl font-bold text-indigo-900">Nossa Missão</h2>\n  <p class="mt-2 text-indigo-800/80">Ajudar estudantes de todo o mundo a dominar o desenvolvimento web de forma visual e interativa.</p>\n</section>`,
    lineByLine: [
      { line: '<section class="...">', explanation: "Inicia a seção semântica com estilos suaves em tons de azul/indigo." },
      { line: '  <h2 class="...">Nossa Missão</h2>', explanation: "Título da seção. Prática recomendada: toda seção deve ter um título (h2-h6)." },
      { line: '  <p class="...">...</p>', explanation: "Conteúdo textual da seção." },
      { line: '</section>', explanation: "Fecha a seção semântica." }
    ],
    attributes: [
      { name: "class", description: "Classes CSS para estilização.", required: false },
      { name: "id", description: "Identificador único, muito útil para criar links de âncora (ex: href=\"#missao\").", required: false }
    ],
    bestPractices: [
      "Sempre inclua um título (geralmente de <h2> a <h6>) dentro de cada <section>.",
      "Não use <section> puramente para estilização visual (use <div> para isso).",
      "Se o conteúdo puder ser distribuído de forma totalmente independente (como um post de blog ou comentário), use <article> em vez de <section>."
    ],
    commonErrors: [
      "Usar <section> como um substituto direto para todas as divs do site.",
      "Criar uma <section> sem nenhum título interno identificável."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A introdução de elementos semânticos como <section> no HTML5 ajudou os mecanismos de busca (como o Google) a entenderem muito melhor a hierarquia e a relevância de cada parte de uma página web.",
    relatedTags: ["article", "aside", "nav", "header", "footer"]
  },
  "a": {
    name: "<a>",
    category: "Texto",
    description: "Cria um hiperlink para outras páginas, arquivos ou seções.",
    whatIs: "A tag <a> (âncora) cria um link que permite ao usuário navegar de uma página para outra, fazer download de arquivos ou rolar para seções específicas da mesma página.",
    whatFor: [
      "Navegar entre páginas internas de um site.",
      "Direcionar para sites externos.",
      "Criar links de e-mail (mailto:) ou telefone (tel:).",
      "Criar links de âncora para rolagem suave na mesma página."
    ],
    syntax: `<a \n  href="https://github.com" \n  target="_blank" \n  rel="noopener noreferrer" \n  class="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"\n>\n  Visitar GitHub\n</a>`,
    lineByLine: [
      { line: '<a', explanation: "Inicia a tag de âncora." },
      { line: '  href="https://github.com"', explanation: "Atributo essencial que define o destino do link." },
      { line: '  target="_blank"', explanation: "Instrui o navegador a abrir o link em uma nova aba." },
      { line: '  rel="noopener noreferrer"', explanation: "Medida de segurança crucial ao usar target='_blank' para evitar ataques de phishing." },
      { line: '  class="..."', explanation: "Aplica classes de botão moderno do Tailwind." },
      { line: '>', explanation: "Fecha a abertura da tag." },
      { line: '  Visitar GitHub', explanation: "Texto visível do link (texto âncora)." },
      { line: '</a>', explanation: "Fecha a tag de âncora." }
    ],
    attributes: [
      { name: "href", description: "O destino do link (URL, caminho de arquivo, ID de âncora, mailto:, tel:).", required: true },
      { name: "target", description: "Onde abrir o link (ex: '_blank', '_self', '_parent', '_top').", required: false },
      { name: "rel", description: "Relação entre a página atual e o destino (ex: 'noopener', 'noreferrer', 'nofollow').", required: false },
      { name: "download", description: "Força o navegador a baixar o arquivo apontado em vez de navegar até ele.", required: false }
    ],
    bestPractices: [
      "Sempre use 'rel=\"noopener noreferrer\"' ao abrir links externos em novas abas.",
      "Certifique-se de que o texto do link seja descritivo (evite 'clique aqui' ou 'saiba mais').",
      "Mantenha os links visivelmente distintos do texto comum (com sublinhado ou cor diferente)."
    ],
    commonErrors: [
      "Esquecer o atributo 'href' (transforma a tag em um texto comum sem comportamento de link).",
      "Usar 'javascript:void(0)' no href para criar botões (use a tag <button> para ações interativas)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "O 'a' vem de 'Anchor' (Âncora). Tim Berners-Lee escolheu esse nome porque, no início da hipertextualidade, os links ancoravam pontos específicos de documentos científicos entre si.",
    relatedTags: ["button", "nav", "link"]
  },
  "ul": {
    name: "<ul>",
    category: "Listas",
    description: "Representa uma lista não ordenada de itens.",
    whatIs: "A tag <ul> cria uma lista de itens que não possuem uma ordem cronológica ou numérica específica. Por padrão, os navegadores exibem os itens com marcadores de ponto (bullets).",
    whatFor: [
      "Criar listas de tópicos ou características.",
      "Construir menus de navegação (compostos por <ul>, <li> e <a>).",
      "Apresentar listas de links relacionados ou redes sociais."
    ],
    syntax: `<ul class="space-y-2 list-disc list-inside p-4 bg-amber-50/50 border border-amber-100 rounded-xl text-amber-900">\n  <li>Aprender HTML Semântico</li>\n  <li>Dominar CSS Flexbox e Grid</li>\n  <li>Construir Apps com React</li>\n</ul>`,
    lineByLine: [
      { line: '<ul class="...">', explanation: "Inicia a lista não ordenada aplicando espaçamento entre itens e estilo de marcador de ponto." },
      { line: '  <li>Aprender HTML Semântico</li>', explanation: "Primeiro item da lista usando a tag <li> (List Item)." },
      { line: '  <li>Dominar CSS Flexbox...</li>', explanation: "Segundo item da lista." },
      { line: '  <li>Construir Apps com React</li>', explanation: "Terceiro item da lista." },
      { line: '</ul>', explanation: "Fecha a lista não ordenada." }
    ],
    attributes: [
      { name: "class", description: "Classes CSS para estilização.", required: false }
    ],
    bestPractices: [
      "Os únicos filhos diretos permitidos dentro de um <ul> são elementos <li>.",
      "Use CSS para remover ou personalizar os marcadores padrão se estiver criando menus de navegação.",
      "Mantenha a lista aninhada de forma limpa para facilitar a leitura por leitores de tela."
    ],
    commonErrors: [
      "Colocar tags como <div>, <p> ou <a> diretamente dentro de <ul> sem estarem envolvidas por um <li>.",
      "Usar <ul> apenas para recuar texto na página (use margens CSS para isso)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "As listas são um dos elementos mais antigos do HTML, presentes desde a primeira versão proposta em 1991, pois a web original era focada em organizar documentos acadêmicos.",
    relatedTags: ["ol", "li", "dl", "dt", "dd"]
  },
  "table": {
    name: "<table>",
    category: "Tabelas",
    description: "Representa dados tabulares em duas ou mais dimensões.",
    whatIs: "A tag <table> é usada para organizar e exibir dados estruturados em linhas e colunas, facilitando a comparação e leitura de informações complexas.",
    whatFor: [
      "Exibir relatórios financeiros ou estatísticas.",
      "Apresentar cronogramas, tabelas de preços ou especificações técnicas.",
      "Mostrar dados de bancos de dados de forma legível."
    ],
    syntax: `<div class="overflow-x-auto border rounded-xl">\n  <table class="min-w-full divide-y divide-border text-sm">\n    <thead class="bg-muted/50">\n      <tr>\n        <th class="px-4 py-3 text-left font-medium">Plano</th>\n        <th class="px-4 py-3 text-left font-medium">Preço</th>\n      </tr>\n    </thead>\n    <tbody class="divide-y divide-border">\n      <tr>\n        <td class="px-4 py-3 font-medium">Básico</td>\n        <td class="px-4 py-3 text-muted-foreground">Grátis</td>\n      </tr>\n      <tr>\n        <td class="px-4 py-3 font-medium">Pro</td>\n        <td class="px-4 py-3 text-muted-foreground">R$ 29/mês</td>\n      </tr>\n    </tbody>\n  </table>\n</div>`,
    lineByLine: [
      { line: '<div class="...">', explanation: "Container responsivo para permitir rolagem horizontal em telas pequenas." },
      { line: '  <table class="...">', explanation: "Inicia a tabela com largura total e estilos modernos." },
      { line: '    <thead class="...">', explanation: "Define o cabeçalho da tabela." },
      { line: '      <tr>', explanation: "Inicia uma linha (Table Row) no cabeçalho." },
      { line: '        <th>Plano</th>', explanation: "Célula de cabeçalho (Table Header) em negrito." },
      { line: '      </tr>', explanation: "Fecha a linha do cabeçalho." },
      { line: '    </thead>', explanation: "Fecha a seção do cabeçalho." },
      { line: '    <tbody>', explanation: "Inicia o corpo da tabela onde ficam os dados." },
      { line: '      <tr>', explanation: "Inicia uma linha de dados." },
      { line: '        <td>Básico</td>', explanation: "Célula de dado comum (Table Data)." },
      { line: '      </tr>', explanation: "Fecha a linha de dados." },
      { line: '    </tbody>', explanation: "Fecha o corpo da tabela." },
      { line: '  </table>', explanation: "Fecha a tag da tabela." },
      { line: '</div>', explanation: "Fecha o container responsivo." }
    ],
    attributes: [
      { name: "class", description: "Classes CSS para estilização.", required: false }
    ],
    bestPractices: [
      "Sempre use as tags estruturais <thead>, <tbody> e <tfoot> para organizar a tabela.",
      "Use o atributo 'scope' em elementos <th> para indicar se ele se refere a uma linha ou coluna, melhorando a acessibilidade.",
      "Sempre envolva tabelas em um container com 'overflow-x-auto' para garantir que fiquem responsivas em celulares."
    ],
    commonErrors: [
      "Usar tabelas para criar o layout geral da página (prática obsoleta dos anos 90, use Flexbox/Grid).",
      "Esquecer de alinhar o número de colunas entre as linhas, gerando tabelas tortas."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Nos anos 90, antes do CSS se tornar popular, quase todos os sites usavam tabelas invisíveis e aninhadas para posicionar menus, banners e textos. Era um pesadelo de manutenção!",
    relatedTags: ["tr", "td", "th", "thead", "tbody", "tfoot", "caption"]
  }
};

// Helper to generate dynamic AI responses based on the tag and the requested mode
export function generateAIResponse(tagName: string, mode: string): { title: string; content: string } {
  const tag = htmlTagsData[tagName.replace(/[<>]/g, "")] || htmlTagsData["img"];
  const cleanName = tag.name;

  switch (mode) {
    case "beginner":
      return {
        title: `Explicação para Iniciantes: ${cleanName}`,
        content: `Imagine que construir um site é como construir uma casa. O HTML é a estrutura de tijolos e vigas. \n\nA tag **${cleanName}** é como um bloco pré-fabricado específico. Por exemplo, se você quer colocar uma janela para ver a rua, você usa a tag de imagem. Se você quer criar uma porta de entrada para as pessoas entrarem e deixarem cartas, você usa um formulário. \n\nEla serve para dar um propósito claro a cada pedaço de conteúdo na sua página, para que o navegador saiba exatamente o que desenhar na tela!`
      };
    case "kid":
      return {
        title: `Explicação para Criança de 10 anos: ${cleanName}`,
        content: `Sabe quando você está brincando com blocos de montar (tipo LEGO)? Cada pecinha tem um formato e serve para uma coisa: uma pecinha é uma rodinha, outra é uma janela, outra é um bonequinho. \n\nA tag **${cleanName}** é uma pecinha mágica de LEGO da internet! \n\nQuando você coloca ela no seu código, você está dizendo para o computador: *"Ei, computador! Coloque essa pecinha bem aqui!"*. E o computador, que é super obediente, desenha ela na tela na mesma hora! É como mágica, mas você é o mago!`
      };
    case "example":
      return {
        title: `Outro Exemplo Prático com ${cleanName}`,
        content: `Aqui está um exemplo alternativo e super útil de como aplicar a tag **${cleanName}** no seu dia a dia:\n\n\`\`\`html\n<!-- Exemplo Avançado e Estilizado -->\n<div class="p-8 rounded-3xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white shadow-2xl max-w-md transform hover:scale-105 transition-transform duration-300">\n  <span class="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Dica do DevAtlas</span>\n  <h4 class="text-2xl font-extrabold mt-4">Domine o HTML5</h4>\n  <p class="mt-2 text-white/90 text-sm leading-relaxed">Combinar tags semânticas com classes utilitárias cria interfaces incríveis e extremamente rápidas.</p>\n  <div class="mt-6 flex items-center gap-3">\n    <div class="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center font-bold">🚀</div>\n    <div>\n      <p class="text-xs opacity-75">Criado por</p>\n      <p class="text-sm font-semibold">Equipe DevAtlas</p>\n    </div>\n  </div>\n</div>\n\`\`\``
      };
    case "exercise":
      return {
        title: `Exercício Prático: ${cleanName}`,
        content: `**Objetivo:** Praticar a estrutura básica e os atributos da tag **${cleanName}**.\n\n**Instruções:**\n1. Abra o **Playground** do DevAtlas (na aba ao lado).\n2. Escreva uma estrutura que utilize a tag **${cleanName}**.\n3. Adicione pelo menos dois atributos diferentes (por exemplo, se for uma imagem, use 'src' e 'alt'; se for um formulário, adicione um campo obrigatório).\n4. Personalize o estilo usando classes do Tailwind CSS para deixar o visual incrível.\n\n*Dica: Tente mudar as cores de fundo ou adicionar bordas arredondadas!*`
      };
    case "challenge":
      return {
        title: `Desafio do Guerreiro HTML: ${cleanName}`,
        content: `**O Desafio:** Crie um componente de "Card de Perfil de Usuário" completo e responsivo!\n\n**Requisitos:**\n- Use uma **<div>** principal com sombra, bordas arredondadas e fundo gradiente.\n- Insira uma imagem de perfil redonda usando a tag **<img>** com um texto alternativo perfeito.\n- Adicione o nome do usuário em um título e uma breve biografia.\n- Crie um botão de "Seguir" interativo usando a tag **<a>** ou **<button>**.\n- Garanta que o layout fique bonito tanto no celular quanto no computador.\n\nCopie o código gerado, cole no Playground e veja sua obra de arte ganhar vida!`
      };
    case "compare":
      const comparisonTag = tag.category === "Estrutura" ? "<span>" : tag.category === "Texto" ? "<button>" : "<div>";
      return {
        title: `Comparação: ${cleanName} vs ${comparisonTag}`,
        content: `Uma dúvida muito comum é a diferença entre **${cleanName}** e **${comparisonTag}**.\n\n| Característica | ${cleanName} | ${comparisonTag} |\n| :--- | :--- | :--- |\n| **Tipo de Elemento** | Geralmente Bloco (Block) | Geralmente Linha (Inline) |\n| **Semântica** | Tem significado específico para o navegador | É genérico ou focado em ação |\n| **Uso Principal** | Estruturar conteúdo temático | Estilizar pequenos trechos ou disparar ações |\n\n**Resumo:** Use **${cleanName}** quando quiser dar significado e estrutura ao seu documento. Use **${comparisonTag}** para estilização fina ou interações pontuais.`
      };
    default:
      return { title: "Explicação da IA", content: "Selecione uma das opções de IA para gerar uma explicação personalizada." };
  }
}