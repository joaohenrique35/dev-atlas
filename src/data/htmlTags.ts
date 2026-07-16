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
    syntax: `<div class="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl">\n  <h3 class="text-xl font-bold">Olá, Dev!</h3>\n  <p class="mt-2 opacity-90">Este é um container estilizado usando uma div.</p>\n</div>`,
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
      { line: '<video controls poster="..." class="...">', explanation: "Inicia o elemento de vídeo com controls nativos habilitados e uma imagem de capa (poster)." },
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
      "Certifique-se de que o text do link seja descritivo (evite 'clique aqui' ou 'saiba mais').",
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
  },
  "button": {
    name: "<button>",
    category: "Formulários",
    description: "Representa um botão clicável para disparar ações.",
    whatIs: "A tag <button> cria um elemento de botão interativo que pode ser clicado pelo usuário para enviar formulários, abrir modais ou disparar qualquer função JavaScript.",
    whatFor: [
      "Disparar ações interativas em páginas web.",
      "Enviar dados de formulários (com type='submit').",
      "Limpar campos de formulários (com type='reset')."
    ],
    syntax: `<button \n  type="button" \n  onclick="alert('Botão clicado!')" \n  class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm"\n>\n  Clique Aqui\n</button>`,
    lineByLine: [
      { line: '<button', explanation: "Inicia a tag de botão." },
      { line: '  type="button"', explanation: "Define o comportamento do botão (evita enviar formulários acidentalmente)." },
      { line: '  onclick="..."', explanation: "Atributo de evento que executa código JavaScript ao ser clicado." },
      { line: '  class="..."', explanation: "Aplica classes de estilo modernas do Tailwind CSS." },
      { line: '>', explanation: "Fecha a abertura da tag." },
      { line: '  Clique Aqui', explanation: "Texto visível dentro do botão." },
      { line: '</button>', explanation: "Fecha a tag de botão." }
    ],
    attributes: [
      { name: "type", description: "Define o tipo do botão ('button', 'submit' ou 'reset').", required: true },
      { name: "disabled", description: "Desabilita o botão, impedindo cliques e interações.", required: false },
      { name: "name", description: "Nome do botão, enviado junto com os dados do formulário.", required: false }
    ],
    bestPractices: [
      "Sempre defina explicitamente o atributo 'type' para evitar comportamentos inesperados em formulários.",
      "Use classes de foco (focus-visible) para garantir acessibilidade por teclado.",
      "Não use botões para links de navegação simples (use a tag <a> para isso)."
    ],
    commonErrors: [
      "Esquecer de definir o atributo 'type', o que faz o botão se comportar como 'submit' por padrão dentro de formulários.",
      "Usar divs estilizadas como botões sem adicionar suporte a teclado e leitores de tela."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <button> foi introduzida no HTML 4.0 para permitir botões muito mais ricos visualmente do que os antigos inputs de tipo botão, aceitando imagens e outros elementos dentro de si.",
    relatedTags: ["input", "a", "form"]
  },
  "input": {
    name: "<input>",
    category: "Formulários",
    description: "Campo de entrada de dados interativo.",
    whatIs: "A tag <input> é usada para criar controles interativos em formulários baseados na web para receber dados do usuário. É um elemento auto-fechável extremamente versátil.",
    whatFor: [
      "Coletar textos, senhas, e-mails e números.",
      "Criar seletores de data, cor e arquivos.",
      "Criar caixas de seleção (checkbox) e botões de rádio (radio)."
    ],
    syntax: `<input \n  type="email" \n  placeholder="seu-email@exemplo.com" \n  required \n  class="w-full max-w-xs px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"\n/>`,
    lineByLine: [
      { line: '<input', explanation: "Inicia a tag de entrada de dados." },
      { line: '  type="email"', explanation: "Define o tipo de dato esperado (valida automaticamente o formato de e-mail)." },
      { line: '  placeholder="..."', explanation: "Texto de ajuda exibido dentro do campo antes do usuário digitar." },
      { line: '  required', explanation: "Torna o preenchimento deste campo obrigatório para o envio do formulário." },
      { line: '  class="..."', explanation: "Aplica styles modernos e transições suaves com Tailwind." },
      { line: '/>', explanation: "Fecha a tag auto-fechável." }
    ],
    attributes: [
      { name: "type", description: "Define o tipo de controle (ex: 'text', 'password', 'email', 'checkbox', 'date').", required: true },
      { name: "value", description: "O valor inicial ou atual do campo de entrada.", required: false },
      { name: "placeholder", description: "Texto descritivo temporário exibido no campo.", required: false },
      { name: "required", description: "Indica que o campo deve ser preenchido antes de enviar.", required: false },
      { name: "disabled", description: "Desativa o campo de entrada.", required: false }
    ],
    bestPractices: [
      "Sempre associe um elemento <label> ao input para acessibilidade.",
      "Use o tipo de input mais específico possível (ex: 'tel' para telefones, 'number' para números) para otimizar teclados móveis.",
      "Utilize o atributo 'autocomplete' apropriado para ajudar o usuário a preencher dados comuns."
    ],
    commonErrors: [
      "Não fornecer um rótulo acessível (label) para o input.",
      "Usar inputs de texto genéricos para dados que possuem tipos específicos (como e-mails ou datas)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "O atributo 'type' do input aceita mais de 20 valores diferentes hoje em dia, transformando um simples campo de texto em um seletor de cores completo ou calendário nativo.",
    relatedTags: ["form", "label", "textarea", "select"]
  },
  "canvas": {
    name: "<canvas>",
    category: "Multimídia",
    description: "Container para desenhar gráficos via scripts (JavaScript).",
    whatIs: "A tag <canvas> é usada para desenhar gráficos, animações, jogos e manipulações de imagens em tempo real usando JavaScript.",
    whatFor: [
      "Criar jogos 2D e 3D interativos no navegador.",
      "Gerar gráficos estatísticos e visualizações de dados dinâmicas.",
      "Criar efeitos visuais de fundo e animações complexas."
    ],
    syntax: `<canvas id="demoCanvas" width="200" height="100" class="border border-dashed border-indigo-300 rounded-xl bg-indigo-50/20"></canvas>\n<script>\n  const c = document.getElementById("demoCanvas");\n  if (c) {\n    const ctx = c.getContext("2d");\n    ctx.fillStyle = "#6366f1";\n    ctx.fillRect(20, 20, 160, 60);\n  }\n</script>`,
    lineByLine: [
      { line: '<canvas id="..." ...>', explanation: "Inicia o elemento canvas com dimensões explícitas e borda tracejada." },
      { line: '  const ctx = c.getContext("2d");', explanation: "Obtém o contexto de renderização 2D para desenhar formas." },
      { line: '  ctx.fillStyle = "#6366f1";', explanation: "Define a cor de preenchimento (indigo)." },
      { line: '  ctx.fillRect(20, 20, 160, 60);', explanation: "Desenha um retângulo preenchido nas coordenadas especificadas." },
      { line: '</canvas>', explanation: "Fecha a tag do canvas." }
    ],
    attributes: [
      { name: "width", description: "Largura do canvas em pixels (padrão é 300).", required: false },
      { name: "height", description: "Altura do canvas em pixels (padrão é 150).", required: false }
    ],
    bestPractices: [
      "Sempre defina 'width' e 'height' diretamente nos atributos da tag, não via CSS (o CSS estica a imagem, distorcendo os gráficos).",
      "Forneça um conteúdo de fallback acessível dentro da tag para navegadores antigos ou leitores de tela."
    ],
    commonErrors: [
      "Definir o tamanho do canvas apenas com CSS, resultando em desenhos borrados ou esticados.",
      "Esquecer de verificar se o navegador suporta o contexto 2D antes de desenhar."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <canvas> foi originalmente criada pela Apple em 2004 para uso dentro do Dashboard do macOS e no navegador Safari, antes de ser padronizada pelo consórcio HTML5.",
    relatedTags: ["svg", "img", "video"]
  },
  "iframe": {
    name: "<iframe>",
    category: "Estrutura",
    description: "Incorpora outro documento HTML dentro da página atual.",
    whatIs: "A tag <iframe> (Inline Frame) é usada para aninhar um documento HTML completo dentro de outro, criando uma janela independente.",
    whatFor: [
      "Incorporar mapas interativos (como Google Maps).",
      "Inserir players de vídeo externos (como YouTube ou Vimeo).",
      "Exibir widgets de redes sociais ou anúncios de terceiros."
    ],
    syntax: `<iframe \n  src="https://maps.google.com/maps?q=Paris&t=&z=13&ie=UTF8&iwloc=&output=embed" \n  width="100%" \n  height="200" \n  loading="lazy" \n  class="rounded-2xl border shadow-md"\n></iframe>`,
    lineByLine: [
      { line: '<iframe', explanation: "Inicia a tag do iframe." },
      { line: '  src="..."', explanation: "Define a URL do documento ou serviço externo a ser incorporado." },
      { line: '  width="100%"', explanation: "Define a largura do frame (responsivo)." },
      { line: '  loading="lazy"', explanation: "Adia o carregamento do iframe até que ele esteja próximo da tela visível." },
      { line: '></iframe>', explanation: "Fecha a tag do iframe." }
    ],
    attributes: [
      { name: "src", description: "A URL da página a ser incorporada.", required: true },
      { name: "sandbox", description: "Aplica restrições extras de segurança ao conteúdo do iframe.", required: false },
      { name: "allow", description: "Define políticas de recursos (ex: câmera, microfone, tela cheia).", required: false },
      { name: "loading", description: "Define se carrega imediatamente ('eager') ou sob demanda ('lazy').", required: false }
    ],
    bestPractices: [
      "Sempre use o atributo 'sandbox' para restringir scripts maliciosos de sites de terceiros.",
      "Utilize 'loading=\"lazy\"' para melhorar a performance de carregamento da página principal.",
      "Sempre forneça um título descritivo com o atributo 'title' para acessibilidade."
    ],
    commonErrors: [
      "Não usar 'title', quebrando a acessibilidade para leitores de tela.",
      "Incorporar sites que bloqueiam exibição em frames (via cabeçalho X-Frame-Options)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Os iframes foram introduzidos pela Microsoft no Internet Explorer 3.0 in 1996 e revolucionaram a web ao permitir carregar partes de outras páginas sem recarregar tudo.",
    relatedTags: ["embed", "object"]
  },
  "audio": {
    name: "<audio>",
    category: "Multimídia",
    description: "Incorpora conteúdo de áudio nativo na página.",
    whatIs: "A tag <audio> é usada para reproduzir arquivos de som, músicas ou podcasts diretamente no navegador, sem a necessidade de plugins externos.",
    whatFor: [
      "Reproduzir efeitos sonoros em jogos ou interações.",
      "Criar players de música ou podcasts personalizados.",
      "Adicionar narrações de acessibilidade para conteúdos textuais."
    ],
    syntax: `<audio \n  controls \n  class="w-full max-w-xs bg-slate-100 rounded-full p-1"\n>\n  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />\n  Seu navegador não suporta a tag de áudio.\n</audio>`,
    lineByLine: [
      { line: '<audio controls class="...">', explanation: "Inicia o elemento de áudio com os controles nativos de play, pause e volume habilitados." },
      { line: '  <source src="..." type="audio/mp3" />', explanation: "Especifica o arquivo de áudio e seu formato para decodificação do navegador." },
      { line: '  Seu navegador não suporta...', explanation: "Texto de fallback exibido apenas em navegadores obsoletos." },
      { line: '</audio>', explanation: "Fecha a tag de áudio." }
    ],
    attributes: [
      { name: "src", description: "URL do arquivo de áudio.", required: false },
      { name: "controls", description: "Exibe os controles nativos de reprodução do navegador.", required: false },
      { name: "autoplay", description: "Inicia a reprodução do áudio automaticamente ao carregar.", required: false },
      { name: "loop", description: "Faz o áudio reiniciar automaticamente ao chegar ao fim.", required: false },
      { name: "muted", description: "Inicia o áudio sem som por padrão.", required: false }
    ],
    bestPractices: [
      "Evite usar 'autoplay' sem o consentimento do usuário, pois isso é considerado uma péssima prática de experiência de usuário.",
      "Forneça múltiplos formatos (MP3, OGG, WAV) usando a tag <source> para garantir compatibilidade universal."
    ],
    commonErrors: [
      "Usar autoplay com som ativado (bloqueado por padrão na maioria dos navegadores modernos).",
      "Não fornecer controles visuais, deixando o usuário sem opção de pausar o som."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Antes do HTML5, para ouvir uma música em um site, o usuário precisava ter instalado o plugin do Windows Media Player, RealPlayer ou Adobe Flash.",
    relatedTags: ["video", "source", "track"]
  },
  "picture": {
    name: "<picture>",
    category: "Multimídia",
    description: "Fornece múltiplas versões de uma imagem para design responsivo.",
    whatIs: "A tag <picture> é um container que permite aos desenvolvedores fornecer diferentes fontes de imagem com base na largura da tela, densidade de pixels ou formato suportado.",
    whatFor: [
      "Exibir imagens cortadas de forma diferente para celular e computador (Art Direction).",
      "Fornecer formatos modernos (como WebP/AVIF) com fallback em JPG/PNG para navegadores antigos.",
      "Economizar dados móveis servindo imagens menores para celulares."
    ],
    syntax: `<picture class="block rounded-2xl overflow-hidden shadow-lg max-w-xs">\n  <source media="(max-width: 640px)" srcset="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300" />\n  <source media="(min-width: 641px)" srcset="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600" />\n  <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500" alt="Gradiente responsivo" class="w-full h-auto" />\n</picture>`,
    lineByLine: [
      { line: '<picture class="...">', explanation: "Inicia o container responsivo de imagem." },
      { line: '  <source media="(max-width: 640px)" ... />', explanation: "Especifica a imagem menor a ser carregada em telas de celular (até 640px)." },
      { line: '  <source media="(min-width: 641px)" ... />', explanation: "Especifica a imagem de alta resolução para telas maiores." },
      { line: '  <img src="..." alt="..." />', explanation: "A tag <img> obrigatória que serve como fallback e renderiza a imagem final selecionada." },
      { line: '</picture>', explanation: "Fecha a tag picture." }
    ],
    attributes: [],
    bestPractices: [
      "Sempre inclua uma tag <img> dentro de <picture> como último elemento, caso contrário nada será exibido.",
      "Use <picture> principalmente para direção de arte (cortes diferentes) ou otimização de formatos modernos (AVIF/WebP)."
    ],
    commonErrors: [
      "Esquecer de colocar a tag <img> interna (o navegador não renderizará nada).",
      "Definir regras de mídia conflitantes ou confusas nos atributos 'media'."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <picture> foi criada por um grupo comunitário de desenvolvedores (Responsive Images Community Group) que se uniu para resolver o problema de imagens gigantes em celulares antes do W3C oficializar a tag.",
    relatedTags: ["img", "source", "figure"]
  },
  "header": {
    name: "<header>",
    category: "Semântica",
    description: "Representa um grupo de introdução ou navegação.",
    whatIs: "A tag <header> é um elemento semântico que define o cabeçalho de uma página ou de uma seção específica. Geralmente contém logotipos, títulos, menus de navegação ou formulários de busca.",
    whatFor: [
      "Criar o cabeçalho principal do site (global header).",
      "Definir a introdução de um artigo ou seção de conteúdo.",
      "Agrupar títulos e metadados de um post."
    ],
    syntax: `<header class="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm max-w-md">\n  <div class="flex items-center gap-2">\n    <span class="text-xl">🚀</span>\n    <span class="font-bold text-slate-800 dark:text-white">DevAtlas</span>\n  </div>\n  <nav class="flex gap-3 text-xs font-semibold text-slate-500">\n    <a href="#" class="hover:text-indigo-600">Início</a>\n    <a href="#" class="hover:text-indigo-600">Sobre</a>\n  </nav>\n</header>`,
    lineByLine: [
      { line: '<header class="...">', explanation: "Inicia o cabeçalho semântico com borda inferior e sombra suave." },
      { line: '  <div class="...">', explanation: "Agrupa o logotipo e o nome da marca." },
      { line: '  <nav class="...">', explanation: "Insere um menu de navegação interno." },
      { line: '</header>', explanation: "Fecha a tag do cabeçalho." }
    ],
    attributes: [],
    bestPractices: [
      "Use apenas um <header> principal por página para representar o cabeçalho do site.",
      "Você pode usar múltiplos elementos <header> se eles estiverem dentro de seções independentes como <article> ou <section>.",
      "Não confunda <header> com as tags de título <h1>-<h6> ou com a tag de metadados <head>."
    ],
    commonErrors: [
      "Confundir <header> com <head> (que serve para metadados invisíveis do documento).",
      "Aninhar um <header> dentro de outro <header>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Antes do HTML5, os desenvolvedores criavam cabeçalhos usando <div id=\"header\">. A introdução da tag <header> padronizou essa estrutura para leitores de tela e robôs de busca.",
    relatedTags: ["footer", "nav", "main"]
  },
  "nav": {
    name: "<nav>",
    category: "Semântica",
    description: "Representa uma seção com links de navegação.",
    whatIs: "A tag <nav> é um elemento semântico que agrupa links de navegação, sejam eles internos (para seções da mesma página) ou externos (para outras páginas do site ou da web).",
    whatFor: [
      "Criar menus de navegação principais (header navigation).",
      "Construir sumários ou tabelas de conteúdo (table of contents).",
      "Criar menus de paginação ou links de rodapé."
    ],
    syntax: `<nav class="flex items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xs">\n  <a href="#" class="flex-1 text-center py-2 text-xs font-bold bg-white dark:bg-slate-900 text-indigo-600 rounded-lg shadow-sm">Docs</a>\n  <a href="#" class="flex-1 text-center py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white">Playground</a>\n</nav>`,
    lineByLine: [
      { line: '<nav class="...">', explanation: "Inicia a seção de navegação com fundo cinza suave e bordas arredondadas." },
      { line: '  <a href="..." class="...">Docs</a>', explanation: "Link de navegação ativo com estilo de aba destacada." },
      { line: '  <a href="..." class="...">Playground</a>', explanation: "Link de navegação secundário." },
      { line: '</nav>', explanation: "Fecha a tag de navegação." }
    ],
    attributes: [],
    bestPractices: [
      "Use <nav> apenas para blocos principais de links de navegação. Não há necessidade de usá-lo para todos os links soltos da página.",
      "Adicione um atributo 'aria-label' se você tiver mais de um menu <nav> na mesma página (ex: aria-label=\"Menu Principal\" e aria-label=\"Menu do Rodapé\")."
    ],
    commonErrors: [
      "Envolver listas de links irrelevantes ou externos (como links de redes sociais no rodapé) com a tag <nav>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Os leitores de tela usam a tag <nav> para permitir que usuários com deficiência visual pulem rapidamente a navegação e vão direto para o conteúdo principal da página.",
    relatedTags: ["header", "footer", "a"]
  },
  "aside": {
    name: "<aside>",
    category: "Semântica",
    description: "Representa conteúdo indiretamente relacionado ao conteúdo principal.",
    whatIs: "A tag <aside> define uma seção de uma página que contém conteúdo que está indiretamente relacionado ao conteúdo principal ao seu redor (como barras laterais, anúncios, citações ou glossários).",
    whatFor: [
      "Criar barras laterais de navegação ou widgets (sidebars).",
      "Apresentar caixas de publicidade ou anúncios.",
      "Exibir citações destacadas (pull quotes) em artigos de blog."
    ],
    syntax: `<aside class="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl max-w-xs space-y-3">\n  <h4 class="font-bold text-xs text-indigo-900 uppercase tracking-wider">💡 Dica Rápida</h4>\n  <p class="text-xs text-indigo-800/80 leading-relaxed">Você sabia que tags semânticas ajudam o Google a indexar melhor o seu site? Use-as sempre que possível!</p>\n</aside>`,
    lineByLine: [
      { line: '<aside class="...">', explanation: "Inicia a barra lateral semântica com fundo azul/indigo suave." },
      { line: '  <h4 class="...">💡 Dica Rápida</h4>', explanation: "Título informativo interno." },
      { line: '  <p class="...">...</p>', explanation: "Conteúdo complementar ou dica rápida." },
      { line: '</aside>', explanation: "Fecha a tag aside." }
    ],
    attributes: [],
    bestPractices: [
      "Certifique-se de que o conteúdo dentro de <aside> faça sentido mesmo se for removido da página (ele deve ser complementar, não essencial).",
      "Não use <aside> apenas para posicionar elementos na lateral usando CSS (use Flexbox/Grid para layout e <aside> apenas para semântica)."
    ],
    commonErrors: [
      "Colocar conteúdo principal ou essencial para a compreensão do artigo dentro de um <aside>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A palavra 'aside' em inglês também é usada no teatro para descrever quando um actor fala diretamente com a plateia, fazendo um comentário que os outros personagens em cena não ouvem.",
    relatedTags: ["article", "section", "main"]
  },
  "h1": {
    name: "<h1>",
    category: "Texto",
    description: "Representa o título principal de nível mais alto.",
    whatIs: "A tag <h1> define o título mais importante de uma página web. Ela estabelece o topo da hierarquia de títulos, que vai do <h1> ao <h6>.",
    whatFor: [
      "Definir o título principal de uma página ou artigo.",
      "Indicar o assunto principal do documento para motores de busca.",
      "Melhorar a acessibilidade estrutural da página."
    ],
    syntax: `<h1 class="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">\n  Domine o HTML5\n</h1>`,
    lineByLine: [
      { line: '<h1 class="...">', explanation: "Inicia o título principal aplicando classes de tamanho grande, negrito extra e gradiente de texto com Tailwind." },
      { line: '  Domine o HTML5', explanation: "Texto do título principal." },
      { line: '</h1>', explanation: "Fecha a tag de título principal." }
    ],
    attributes: [],
    bestPractices: [
      "Use apenas um único <h1> por página para garantir uma estrutura de SEO perfeita.",
      "Mantenha a hierarquia correta (não pule de um <h1> direto para um <h3> sem passar pelo <h2>).",
      "O texto do <h1> deve ser descritivo e resumir o assunto principal da página."
    ],
    commonErrors: [
      "Usar múltiplos elementos <h1> na mesma página de forma desordenada.",
      "Usar tags de título apenas para aumentar o tamanho do texto (use classes CSS de tamanho de fonte para isso)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "O Google e outros motores de busca dão um peso enorme ao texto contido na tag <h1> para entender sobre o que é o seu site e decidir em quais pesquisas ele deve aparecer.",
    relatedTags: ["div", "span", "a"]
  },
  "span": {
    name: "<span>",
    category: "Texto",
    description: "Elemento de texto genérico em linha (inline).",
    whatIs: "A tag <span> é um container genérico em linha (inline). Diferente de uma <div> (que é um elemento em bloco), o <span> não quebra a linha do texto, servindo para aplicar estilos ou scripts a partes específicas de um parágrafo.",
    whatFor: [
      "Estilizar uma palavra ou frase específica dentro de um parágrafo.",
      "Adicionar ícones ou pequenos marcadores ao lado de textos.",
      "Servir como alvo para manipulações dinâmicas de texto via JavaScript."
    ],
    syntax: `<p class="text-sm text-slate-600 dark:text-slate-400">\n  Aprenda a criar sites incríveis com o <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold rounded-md">DevAtlas</span> hoje mesmo!\n</p>`,
    lineByLine: [
      { line: '<p class="...">', explanation: "Inicia um parágrafo de texto comum." },
      { line: '  Aprenda a criar...', explanation: "Texto inicial do parágrafo." },
      { line: '  <span class="...">DevAtlas</span>', explanation: "Aplica um fundo destacado e cor roxa apenas na palavra 'DevAtlas' sem quebrar a linha." },
      { line: '  hoje mesmo!', explanation: "Texto final do parágrafo." },
      { line: '</p>', explanation: "Fecha o parágrafo." }
    ],
    attributes: [],
    bestPractices: [
      "Use <span> apenas quando nenhum outro elemento semântico de texto (como <strong>, <em> ou <mark>) for adequado.",
      "Mantenha o uso de spans limpo para não poluir a legibilidade do código HTML."
    ],
    commonErrors: [
      "Usar <span> para criar blocos de layout (use <div> ou tags semânticas para isso).",
      "Substituir tags semânticas de ênfase (como <strong> para negrito importante) por spans estilizados manualmente."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "O <span> é o irmão menor da <div>. Enquanto a <div> organiza a estrutura macro (layout), o <span> cuida dos detalhes micro (estilização fina de palavras e caracteres).",
    relatedTags: ["div", "a", "h1"]
  },
  "p": {
    name: "<p>",
    category: "Texto",
    description: "Representa um parágrafo de texto.",
    whatIs: "A tag <p> é usada para definir blocos de texto ou parágrafos. Ela adiciona automaticamente uma margem vertical antes e depois do bloco para separar visualmente os textos.",
    whatFor: [
      "Exibir blocos de texto legíveis em artigos, notícias e descrições.",
      "Organizar a leitura de conteúdos longos em partes menores.",
      "Melhorar a legibilidade e a estrutura de leitura da página."
    ],
    syntax: `<p class="text-base text-slate-700 dark:text-slate-300 leading-relaxed">\n  O HTML5 é a linguagem de marcação padrão para criar páginas web incríveis.\n</p>`,
    lineByLine: [
      { line: '<p class="...">', explanation: "Inicia o parágrafo aplicando classes de tamanho, cor e espaçamento de linha (leading-relaxed) do Tailwind." },
      { line: '  O HTML5 é a...', explanation: "Texto interno do parágrafo." },
      { line: '</p>', explanation: "Fecha a tag de parágrafo." }
    ],
    attributes: [],
    bestPractices: [
      "Sempre use <p> para textos corridos em vez de usar quebras de linha (<br>) repetidas.",
      "Evite colocar elementos em bloco (como <div> ou <ul>) dentro de um parágrafo, pois isso é inválido no HTML."
    ],
    commonErrors: [
      "Aninhar elementos em bloco dentro de <p>.",
      "Usar <p> vazio apenas para criar espaçamento vertical (use margens CSS para isso)."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <p> é uma das tags mais fundamentais e antigas do HTML, existindo desde a primeira versão da linguagem em 1991.",
    relatedTags: ["span", "div", "h1"]
  },
  "main": {
    name: "<main>",
    category: "Semântica",
    description: "Define o conteúdo principal e exclusivo do documento.",
    whatIs: "A tag <main> engloba o conteúdo central e dominante de uma página web. Este conteúdo deve ser exclusivo e não conter elementos repetidos em outras páginas, como cabeçalhos, rodapés ou menus globais.",
    whatFor: [
      "Indicar aos motores de busca e leitores de tela onde começa o conteúdo real da página.",
      "Melhorar a acessibilidade, permitindo que usuários pulem menus repetitivos diretamente para o conteúdo principal.",
      "Estruturar semanticamente o layout moderno do site."
    ],
    syntax: `<main class="flex-1 max-w-4xl mx-auto p-6 space-y-6">\n  <h1 class="text-3xl font-bold">Painel de Controle</h1>\n  <p class="text-muted-foreground">Bem-vindo ao seu painel principal.</p>\n</main>`,
    lineByLine: [
      { line: '<main class="...">', explanation: "Inicia o container principal com largura máxima centralizada e espaçamento interno." },
      { line: '  <h1>...</h1>', explanation: "Título principal do conteúdo exclusivo." },
      { line: '  <p>...</p>', explanation: "Texto descritivo interno." },
      { line: '</main>', explanation: "Fecha a tag de conteúdo principal." }
    ],
    attributes: [],
    bestPractices: [
      "Deve haver apenas um elemento <main> visível por página.",
      "Não aninhe <main> dentro de elementos como <header>, <nav> ou <footer>."
    ],
    commonErrors: [
      "Incluir mais de um elemento <main> ativo na mesma página.",
      "Colocar o menu de navegação global ou o rodapé dentro da tag <main>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <main> foi introduzida no HTML5 para resolver a falta de um container semântico que representasse o 'coração' do conteúdo de uma página, que antes era feito com <div id=\"content\">.",
    relatedTags: ["header", "footer", "section", "article"]
  },
  "footer": {
    name: "<footer>",
    category: "Semântica",
    description: "Representa o rodapé de uma página ou seção.",
    whatIs: "A tag <footer> define o rodapé de um documento ou de uma seção específica. Geralmente contém informações de direitos autorais, links de termos de uso, redes sociais e dados de contato.",
    whatFor: [
      "Criar o rodapé global do site (global footer).",
      "Adicionar metadados, autoria ou links relacionados ao final de um artigo.",
      "Apresentar informações de copyright e links institucionais."
    ],
    syntax: `<footer class="py-6 border-t border-border text-center text-xs text-muted-foreground bg-card rounded-2xl">\n  <p>© 2025 DevAtlas. Todos os direitos reservados.</p>\n</footer>`,
    lineByLine: [
      { line: '<footer class="...">', explanation: "Inicia o rodapé com espaçamento vertical, borda superior e fundo estilizado." },
      { line: '  <p>© 2025 DevAtlas...</p>', explanation: "Texto de direitos autorais interno." },
      { line: '</footer>', explanation: "Fecha a tag de rodapé." }
    ],
    attributes: [],
    bestPractices: [
      "Use <footer> para agrupar informações de encerramento e contatos.",
      "Assim como o <header>, você pode usar múltiplos footers na página se eles estiverem dentro de seções independentes como <article>."
    ],
    commonErrors: [
      "Colocar o conteúdo principal do site dentro do rodapé.",
      "Confundir <footer> com elementos de layout puramente visuais."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "O uso de rodapés semânticos ajuda os leitores de tela a identificar rapidamente onde terminam as informações principais e onde começam os metadados e links institucionais.",
    relatedTags: ["header", "main", "aside"]
  },
  "select": {
    name: "<select>",
    category: "Formulários",
    description: "Cria uma caixa de seleção suspensa (dropdown).",
    whatIs: "A tag <select> é usada para criar uma lista suspensa de opções, permitindo que o usuário selecione um ou mais itens de uma lista pré-definida.",
    whatFor: [
      "Criar menus de seleção de países, estados ou cidades.",
      "Permitir a escolha de categorias ou filtros em pesquisas.",
      "Coletar preferências do usuário em formulários de cadastro."
    ],
    syntax: `<select class="w-full max-w-xs px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">\n  <option value="html">HTML5</option>\n  <option value="css">CSS3</option>\n  <option value="js">JavaScript</option>\n</select>`,
    lineByLine: [
      { line: '<select class="...">', explanation: "Inicia o menu suspenso aplicando estilos modernos de borda e foco com Tailwind." },
      { line: '  <option value="html">HTML5</option>', explanation: "Primeira opção selecionável com seu respectivo valor de envio." },
      { line: '  <option value="css">CSS3</option>', explanation: "Segunda opção selecionável." },
      { line: '  <option value="js">JavaScript</option>', explanation: "Terceira opção selecionável." },
      { line: '</select>', explanation: "Fecha a tag de seleção." }
    ],
    attributes: [
      { name: "name", description: "Nome do campo enviado junto com o formulário.", required: false },
      { name: "required", description: "Torna a seleção de uma opção obrigatória.", required: false },
      { name: "multiple", description: "Permite que o usuário selecione múltiplas opções (segurando Ctrl/Cmd).", required: false },
      { name: "disabled", description: "Desativa o menu suspenso.", required: false }
    ],
    bestPractices: [
      "Sempre use a tag <option> para definir os itens dentro do <select>.",
      "Forneça uma primeira opção vazia ou desabilitada como instrução (ex: 'Selecione uma opção...').",
      "Use <optgroup> para agrupar opções relacionadas em listas muito longas."
    ],
    commonErrors: [
      "Esquecer de definir o atributo 'value' nas tags <option>, o que faz com que o texto visível seja enviado como valor padrão.",
      "Não associar um <label> ao elemento <select>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "O visual do <select> nativo varia drasticamente entre sistemas operacionais (Windows, macOS, iOS, Android) para se adaptar aos padrões de usabilidade de cada plataforma.",
    relatedTags: ["form", "input", "textarea"]
  },
  "textarea": {
    name: "<textarea>",
    category: "Formulários",
    description: "Campo de entrada de texto multilinha.",
    whatIs: "A tag <textarea> cria um campo de entrada de texto que permite ao usuário digitar várias linhas de texto, ideal para comentários, mensagens ou descrições longas.",
    whatFor: [
      "Criar campos de comentários ou feedback.",
      "Permitir o envio de mensagens de contato detalhadas.",
      "Coletar biografias ou descrições longas de usuários."
    ],
    syntax: `<textarea \n  rows="4" \n  placeholder="Escreva sua mensagem aqui..." \n  class="w-full max-w-md px-4 py-3 bg-background border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"\n></textarea>`,
    lineByLine: [
      { line: '<textarea', explanation: "Inicia a tag de entrada multilinha." },
      { line: '  rows="4"', explanation: "Define a altura inicial do campo em número de linhas de texto." },
      { line: '  placeholder="..."', explanation: "Texto de ajuda temporário exibido antes da digitação." },
      { line: '  class="..."', explanation: "Aplica estilos modernos e desativa o redimensionamento manual (resize-none) com Tailwind." },
      { line: '></textarea>', explanation: "Fecha a tag textarea (não é auto-fechável, diferente do <input>)." }
    ],
    attributes: [
      { name: "rows", description: "Define a altura visível do campo em linhas.", required: false },
      { name: "cols", description: "Define a largura visível do campo em caracteres por linha.", required: false },
      { name: "placeholder", description: "Texto de ajuda temporário.", required: false },
      { name: "required", description: "Torna o preenchimento do campo obrigatório.", required: false },
      { name: "disabled", description: "Desativa o campo de texto.", required: false }
    ],
    bestPractices: [
      "Sempre use a tag de fechamento correspondente </textarea>.",
      "Use a classe CSS 'resize-none' ou 'resize-y' para controlar se o usuário pode redimensionar o campo na tela.",
      "Associe sempre um <label> para garantir acessibilidade."
    ],
    commonErrors: [
      "Tentar definir o valor padrão usando o atributo 'value' (o valor padrão do textarea deve ser colocado entre as tags de abertura e fechamento).",
      "Esquecer de fechar a tag </textarea>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Diferente do <input type=\"text\">, o <textarea> preserva automaticamente as quebras de linha (enters) digitadas pelo usuário ao enviar os dados.",
    relatedTags: ["form", "input", "select"]
  },
  "details": {
    name: "<details>",
    category: "Estrutura",
    description: "Cria um widget de revelação interativo (accordion nativo).",
    whatIs: "A tag <details> cria um container interativo que o usuário pode abrir ou fechar para revelar informações adicionais. É ideal para criar seções de Perguntas Frequentes (FAQ) sem JavaScript.",
    whatFor: [
      "Criar seções de Perguntas Frequentes (FAQ) expansíveis.",
      "Ocultar detalhes técnicos ou códigos que o usuário só vê se desejar.",
      "Criar menus ou painéis retráteis simples."
    ],
    syntax: `<details class="p-4 border border-border rounded-2xl bg-card max-w-md group">\n  <summary class="font-bold text-sm cursor-pointer select-none list-none flex items-center justify-between">\n    <span>Como funciona o DevAtlas?</span>\n    <span class="transition-transform duration-300 group-open:rotate-180">▼</span>\n  </summary>\n  <p class="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">\n    O DevAtlas é uma enciclopédia interativa que ajuda você a dominar o HTML5 e o Tailwind CSS de forma prática e divertida!\n  </p>\n</details>`,
    lineByLine: [
      { line: '<details class="...">', explanation: "Inicia o container expansível aplicando estilos de borda e arredondamento." },
      { line: '  <summary class="...">', explanation: "Define o título visível e clicável do widget (o cabeçalho do accordion)." },
      { line: '    <span>...</span>', explanation: "Texto da pergunta ou título." },
      { line: '  </summary>', explanation: "Fecha o cabeçalho do widget." },
      { line: '  <p class="...">...</p>', explanation: "Conteúdo oculto que será revelado quando o usuário clicar no summary." },
      { line: '</details>', explanation: "Fecha o widget de revelação." }
    ],
    attributes: [
      { name: "open", description: "Indica que o widget deve iniciar aberto por padrão.", required: false }
    ],
    bestPractices: [
      "Sempre inclua uma tag <summary> como primeiro filho direto de <details> para servir de cabeçalho clicável.",
      "Use classes CSS para estilizar o estado aberto usando o seletor 'group-open:' ou 'open:' do Tailwind."
    ],
    commonErrors: [
      "Não incluir a tag <summary>, o que faz o navegador exibir um título padrão sem graça como 'Detalhes'.",
      "Usar <details> para conteúdos extremamente importantes que o usuário não pode deixar de ver."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <details> permite criar accordions e menus expansíveis complexos de forma 100% nativa, sem precisar escrever uma única linha de código JavaScript para controlar o estado aberto/fechado.",
    relatedTags: ["summary", "div", "section"]
  },
  "summary": {
    name: "<summary>",
    category: "Estrutura",
    description: "Define o cabeçalho visível de um elemento <details>.",
    whatIs: "A tag <summary> serve exclusivamente como o cabeçalho clicável e visível de um elemento <details>. Ao clicar nele, o conteúdo oculto do <details> é exibido ou ocultado.",
    whatFor: [
      "Definir o título clicável de um accordion ou FAQ.",
      "Servir como o botão de controle de abertura do widget <details>.",
      "Melhorar a acessibilidade de elementos expansíveis."
    ],
    syntax: `<summary class="font-bold text-sm cursor-pointer select-none list-none flex items-center justify-between">\n  <span>Clique para ver o segredo</span>\n  <span>👁️</span>\n</summary>`,
    lineByLine: [
      { line: '<summary class="...">', explanation: "Inicia o cabeçalho clicável com cursor de clique, desativando a seleção de texto e ocultando a seta padrão do navegador (list-none)." },
      { line: '  <span>...</span>', explanation: "Texto visível do cabeçalho." },
      { line: '</summary>', explanation: "Fecha a tag de cabeçalho." }
    ],
    attributes: [],
    bestPractices: [
      "Deve ser sempre o primeiro filho direto de um elemento <details>.",
      "Use a classe 'list-none' ou estilos CSS específicos para remover a seta padrão do navegador se quiser criar um design personalizado."
    ],
    commonErrors: [
      "Usar <summary> fora de um elemento <details> (ele não terá nenhum comportamento ou utilidade).",
      "Colocar elementos interativos complexos (como links ou botões) dentro de <summary>."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "Por padrão, a maioria dos navegadores exibe uma pequena seta triangular ao lado do texto do <summary> que gira automaticamente quando o widget é aberto.",
    relatedTags: ["details", "div"]
  },
  "dialog": {
    name: "<dialog>",
    category: "Estrutura",
    description: "Representa uma caixa de diálogo ou janela modal nativa.",
    whatIs: "A tag <dialog> representa uma caixa de diálogo, modal ou janela pop-up nativa do navegador. Ela pode ser controlada facilmente via JavaScript usando métodos nativos como showModal() e close().",
    whatFor: [
      "Criar janelas modais de confirmação ou alertas personalizados.",
      "Construir caixas de diálogo interativas de forma nativa.",
      "Melhorar a acessibilidade de modais sem depender de bibliotecas externas pesadas."
    ],
    syntax: `<dialog id="myModal" class="p-6 rounded-3xl border border-border bg-card shadow-2xl max-w-sm backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-in fade-in duration-300">\n  <div class="space-y-4 text-center">\n    <h4 class="font-bold text-lg">Modal Nativo! 🎉</h4>\n    <p class="text-xs text-muted-foreground">Este é um modal criado 100% nativamente com a tag dialog do HTML5.</p>\n    <button onclick="document.getElementById('myModal').close()" class="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">Fechar</button>\n  </div>\n</dialog>\n<button onclick="document.getElementById('myModal').showModal()" class="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">Abrir Modal</button>`,
    lineByLine: [
      { line: '<dialog id="myModal" class="...">', explanation: "Inicia o elemento dialog com estilos de modal e estilização do fundo escurecido (backdrop:bg-black/50)." },
      { line: '  <div class="...">', explanation: "Container interno para organizar o conteúdo." },
      { line: '    <button onclick="...close()">', explanation: "Botão que chama o método close() nativo para fechar o modal." },
      { line: '  </div>', explanation: "Fecha o container interno." },
      { line: '</dialog>', explanation: "Fecha a tag dialog." },
      { line: '<button onclick="...showModal()">', explanation: "Botão externo que chama o método showModal() nativo para abrir o modal com foco e backdrop." }
    ],
    attributes: [
      { name: "open", description: "Indica que a caixa de diálogo está ativa e visível (geralmente controlado via JS).", required: false }
    ],
    bestPractices: [
      "Sempre use o método JavaScript `showModal()` em vez de apenas adicionar o atributo `open` manualmente, pois `showModal()` adiciona o backdrop escurecido e gerencia o foco do teclado perfeitamente.",
      "Estilize o fundo do modal usando o pseudo-elemento `::backdrop` do CSS."
    ],
    commonErrors: [
      "Usar apenas o atributo `open` para exibir o modal, o que impede a navegação por teclado de ficar presa dentro do modal (quebrando a acessibilidade).",
      "Esquecer de fornecer um botão ou forma clara de fechar o modal."
    ],
    compatibility: { chrome: "full", firefox: "full", safari: "full", edge: "full" },
    curiosity: "A tag <dialog> gerencia automaticamente a tecla 'ESC' do teclado: ao pressioná-la, o navegador fecha o modal aberto nativamente, sem que você precise programar isso!",
    relatedTags: ["div", "button"]
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