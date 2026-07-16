import React, { useState, useEffect } from 'react';
import { HTMLTag, generateAIResponse } from '../data/htmlTags';
import { 
  Sparkles, BookOpen, HelpCircle, Code, CheckCircle2, AlertTriangle, 
  Compass, ArrowRight, Play, Check, Copy, MessageSquare, Brain, Lightbulb, ArrowUpRight, Send, Layers, Palette
} from 'lucide-react';
import { showSuccess } from '../utils/toast';

interface TagDetailProps {
  tag: HTMLTag;
  onNavigateToTag: (tagName: string) => void;
  onOpenInPlayground: (code: string) => void;
}

interface Recipe {
  title: string;
  description: string;
  code: string;
}

// Tailwind Styling Recipes database for each tag
const stylingRecipes: Record<string, Recipe[]> = {
  img: [
    {
      title: "Avatar Circular",
      description: "Foto de perfil redonda com borda dupla e sombra suave.",
      code: `<img \n  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" \n  alt="Avatar de usuário" \n  class="w-24 h-24 rounded-full border-4 border-white ring-4 ring-indigo-500 shadow-xl mx-auto"\n/>`
    },
    {
      title: "Capa com Efeito Zoom",
      description: "Imagem de card que expande suavemente ao passar o mouse.",
      code: `<div class="overflow-hidden rounded-2xl max-w-xs shadow-lg bg-slate-900">\n  <img \n    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400" \n    alt="Capa abstrata" \n    class="w-full h-48 object-cover hover:scale-110 transition-transform duration-500 opacity-90 hover:opacity-100"\n  />\n</div>`
    },
    {
      title: "Efeito Duotone / Filtro",
      description: "Imagem estilizada com sobreposição de cor indigo.",
      code: `<div class="relative max-w-xs rounded-2xl overflow-hidden bg-indigo-900 shadow-lg">\n  <img \n    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400" \n    alt="Filtro duotone" \n    class="w-full h-48 object-cover mix-blend-overlay opacity-80"\n  />\n</div>`
    }
  ],
  div: [
    {
      title: "Card Glassmorphism",
      description: "Efeito de vidro fosco translúcido com bordas finas.",
      code: `<div class="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-xs text-center text-slate-800 dark:text-white">\n  <span class="text-2xl">✨</span>\n  <h4 class="font-bold mt-2">Efeito Glass</h4>\n  <p class="text-xs opacity-80 mt-1">Design moderno e translúcido usando Tailwind CSS.</p>\n</div>`
    },
    {
      title: "Container com Brilho Neon",
      description: "Borda colorida com sombra brilhante (glow effect).",
      code: `<div class="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] max-w-xs text-center">\n  <h4 class="font-bold text-indigo-400">Brilho Neon</h4>\n  <p class="text-xs text-slate-400 mt-1">Destaque elementos importantes com sombras coloridas.</p>\n</div>`
    }
  ],
  form: [
    {
      title: "Newsletter Minimalista",
      description: "Formulário inline elegante para captura de e-mails.",
      code: `<form class="flex gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md shadow-md" onsubmit="alert('Inscrito!'); return false;">\n  <input type="email" placeholder="Seu melhor e-mail..." required class="flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none" />\n  <button type="submit" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors">Inscrever</button>\n</form>`
    }
  ],
  button: [
    {
      title: "Botão com Gradiente Animado",
      description: "Gradiente vibrante que se move ou brilha ao passar o mouse.",
      code: `<button class="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all text-sm">\n  Começar Agora 🚀\n</button>`
    },
    {
      title: "Botão Outline Minimalista",
      description: "Borda fina com preenchimento suave no hover.",
      code: `<button class="px-5 py-2.5 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 font-semibold rounded-xl transition-all text-sm">\n  Saber Mais\n</button>`
    }
  ]
};

const TagDetail: React.FC<TagDetailProps> = ({ tag, onNavigateToTag, onOpenInPlayground }) => {
  const [copied, setCopied] = useState(false);
  const [aiMode, setAiMode] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<{ title: string; content: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [currentSyntax, setCurrentSyntax] = useState(tag.syntax);

  // Reset syntax when tag changes
  useEffect(() => {
    setCurrentSyntax(tag.syntax);
  }, [tag]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSyntax);
    setCopied(true);
    showSuccess("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAIAction = (mode: string) => {
    setIsGenerating(true);
    setAiMode(mode);
    setAiResponse(null);
    
    setTimeout(() => {
      const response = generateAIResponse(tag.name, mode);
      setAiResponse(response);
      setIsGenerating(false);
      showSuccess("Explicação gerada pela IA!");
    }, 800);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setAiMode('custom');
    setAiResponse(null);

    const prompt = customPrompt.toLowerCase();
    let responseTitle = `Resposta da IA sobre ${tag.name}`;
    let responseContent = '';

    if (prompt.includes('cor') || prompt.includes('estilo') || prompt.includes('css') || prompt.includes('tailwind')) {
      responseContent = `Para estilizar a tag **${tag.name}** com cores e estilos modernos usando Tailwind CSS, você pode aplicar classes utilitárias diretamente no elemento. \n\n**Exemplo Prático:**\n\`\`\`html\n<!-- Aplicando bordas coloridas, sombras e transições -->\n<${tag.name.replace(/[<>]/g, '')} class="border-2 border-indigo-500 shadow-lg hover:scale-105 transition-transform duration-300">\n\`\`\`\n\nIsso adicionará uma borda azul/indigo, uma sombra elegante e um efeito de zoom suave ao passar o mouse!`;
    } else if (prompt.includes('seo') || prompt.includes('google') || prompt.includes('busca')) {
      responseContent = `A tag **${tag.name}** desempenha um papel crucial no SEO (Search Engine Optimization). \n\nOs robôs de busca do Google utilizam a semântica do HTML para entender a estrutura da sua página. No caso de **${tag.name}**, ela ajuda a definir a relevância do conteúdo. \n\n**Dica de Ouro para SEO:**\n- Se for uma imagem, sempre use o atributo 'alt' descritivo.\n- Se for uma seção, garanta que ela possua um título (h2-h6) claro.\n- Evite usar divs genéricas para conteúdos que possuem tags semânticas específicas.`;
    } else if (prompt.includes('acessibilidade') || prompt.includes('leitor') || prompt.includes('screen reader')) {
      responseContent = `A acessibilidade (a11y) é um pilar fundamental do desenvolvimento web moderno. \n\nPara tornar a tag **${tag.name}** acessível para leitores de tela e navegação por teclado:\n1. Use atributos ARIA se necessário (ex: \`aria-label\` ou \`role\`).\n2. Garanta contraste de cores adequado nos textos internos.\n3. Nunca remova o contorno de foco (\`outline-none\`) sem fornecer uma alternativa visual clara para navegação via teclado (\`focus-visible:ring-2\`).`;
    } else if (prompt.includes('centralizar') || prompt.includes('alinhar') || prompt.includes('meio')) {
      responseContent = `Para centralizar a tag **${tag.name}** na tela, a melhor prática moderna é envolver o elemento em um container flexível (Flexbox) ou em grade (Grid) usando Tailwind CSS.\n\n**Exemplo com Flexbox:**\n\`\`\`html\n<div class="flex items-center justify-center min-h-[200px] bg-slate-50">\n  <!-- Seu elemento ${tag.name} aqui -->\n</div>\n\`\`\`\n\nAs classes \`flex\`, \`items-center\` (alinhamento vertical) e \`justify-center\` (alinhamento horizontal) garantem que o elemento fique perfeitamente no centro!`;
    } else {
      responseContent = `Excelente pergunta sobre a tag **${tag.name}**! \n\nPara este elemento, lembre-se sempre de que a semântica correta e o uso de atributos adequados são as chaves para um código limpo. \n\nSe você deseja aplicar estilos específicos, tente abrir esta tag no **Playground** (clicando no botão no topo da página) e experimente adicionar classes do Tailwind CSS como \`p-6\` (espaçamento), \`rounded-2xl\` (bordas arredondadas) ou \`bg-indigo-500\` (cor de fundo) para ver o resultado em tempo real!`;
    }

    setTimeout(() => {
      setAiResponse({ title: responseTitle, content: responseContent });
      setIsGenerating(false);
      setCustomPrompt('');
      showSuccess("IA respondeu à sua pergunta!");
    }, 1000);
  };

  const handleApplyRecipe = (recipeCode: string) => {
    setCurrentSyntax(recipeCode);
    showSuccess("Receita aplicada ao preview!");
  };

  const cleanTagName = tag.name.replace(/[<>]/g, '');
  const recipes = stylingRecipes[cleanTagName] || [];

  // DOM Tree Path calculation based on category
  const getDomTreePath = () => {
    const base = ['document', 'html', 'body'];
    if (tag.category === 'Semântica') {
      return [...base, 'main', tag.name];
    } else if (tag.category === 'Formulários' && cleanTagName !== 'form') {
      return [...base, 'form', tag.name];
    } else if (tag.category === 'Tabelas' && cleanTagName !== 'table') {
      return [...base, 'table', 'tr', tag.name];
    } else if (tag.category === 'Listas' && cleanTagName !== 'ul') {
      return [...base, 'ul', tag.name];
    }
    return [...base, tag.name];
  };

  const domTreePath = getDomTreePath();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-10 pb-24">
      {/* Header Section */}
      <div className="space-y-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 rounded-full uppercase tracking-wider">
            {tag.category}
          </span>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Compass size={12} /> HTML5 Standard
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight font-mono text-foreground">
              {tag.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
              {tag.description}
            </p>
          </div>
          <button
            onClick={() => onOpenInPlayground(currentSyntax)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm self-start md:self-center"
          >
            <Play size={16} fill="currentColor" />
            Abrir no Playground
          </button>
        </div>
      </div>

      {/* Visual DOM Tree Path */}
      <div className="space-y-3 bg-card border border-border/60 p-5 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Layers size={14} className="text-indigo-500" />
          Caminho Visual na Árvore do DOM
        </h3>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {domTreePath.map((node, idx) => {
            const isLast = idx === domTreePath.length - 1;
            return (
              <React.Fragment key={idx}>
                <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isLast 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10 scale-105' 
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}>
                  {node}
                </div>
                {!isLast && (
                  <span className="text-muted-foreground/40 font-bold text-xs">➔</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
          A árvore do DOM (Document Object Model) representa a estrutura hierárquica do seu site. A tag <strong>{tag.name}</strong> geralmente é aninhada conforme o caminho acima.
        </p>
      </div>

      {/* O que é & Para que serve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3 bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
            <BookOpen size={18} className="text-indigo-500" />
            O que é?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {tag.whatIs}
          </p>
        </div>

        <div className="space-y-3 bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
            <HelpCircle size={18} className="text-indigo-500" />
            Para que serve?
          </h3>
          <ul className="space-y-2">
            {tag.whatFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tailwind Styling Recipes (If available) */}
      {recipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Palette size={20} className="text-indigo-500" />
            Receitas de Estilização com Tailwind CSS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipes.map((recipe, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyRecipe(recipe.code)}
                className="p-4 bg-card border border-border/60 hover:border-indigo-500 hover:bg-indigo-50/5 dark:hover:bg-indigo-950/10 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {recipe.title}
                  </h4>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                    Aplicar
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {recipe.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sintaxe & Exemplo Funcionando */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Code size={20} className="text-indigo-500" />
          Sintaxe e Exemplo Prático
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Block */}
          <div className="relative rounded-2xl overflow-hidden border border-border bg-slate-950 text-slate-100 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">HTML</span>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                title="Copiar código"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed flex-1">
              <code>{currentSyntax}</code>
            </pre>
          </div>

          {/* Live Preview */}
          <div className="border border-border/60 rounded-2xl bg-slate-50 dark:bg-slate-900/20 p-6 flex flex-col justify-center items-center min-h-[200px]">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 self-start">Preview em Tempo Real</span>
            <div className="w-full bg-white dark:bg-slate-950 rounded-xl border border-border/40 p-4 shadow-sm flex items-center justify-center">
              <iframe
                title="Tag Preview"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                    </head>
                    <body class="p-2 flex justify-center items-center bg-transparent">
                      ${currentSyntax}
                    </body>
                  </html>
                `}
                className="w-full h-[180px] border-none bg-transparent"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Explicação Linha por Linha */}
      <div className="space-y-4 bg-muted/40 border border-border/40 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-foreground">Explicação Linha por Linha</h3>
        <div className="space-y-3">
          {tag.lineByLine.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-border/40 last:border-0">
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold md:col-span-1">
                {item.line}
              </span>
              <span className="text-sm text-muted-foreground md:col-span-2">
                {item.explanation}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Principais Atributos */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Principais Atributos</h3>
        <div className="border border-border rounded-2xl overflow-hidden bg-card">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="p-4 font-bold text-foreground">Atributo</th>
                <th className="p-4 font-bold text-foreground">Descrição</th>
                <th className="p-4 font-bold text-foreground">Obrigatoriedade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tag.attributes.map((attr, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{attr.name}</td>
                  <td className="p-4 text-muted-foreground">{attr.description}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      attr.required 
                        ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {attr.required ? 'Obrigatório' : 'Opcional'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Boas Práticas & Erros Comuns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 bg-emerald-50/20 border border-emerald-100 dark:border-emerald-950/30 p-6 rounded-2xl">
          <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
            <CheckCircle2 size={18} />
            Boas Práticas
          </h3>
          <ul className="space-y-2.5">
            {tag.bestPractices.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900/80 dark:text-emerald-300/80">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 bg-rose-50/20 border border-rose-100 dark:border-rose-950/30 p-6 rounded-2xl">
          <h3 className="text-lg font-bold flex items-center gap-2 text-rose-800 dark:text-rose-400">
            <AlertTriangle size={18} />
            Erros Comuns
          </h3>
          <ul className="space-y-2.5">
            {tag.commonErrors.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-rose-900/80 dark:text-rose-300/80">
                <span className="text-rose-500 font-bold mt-0.5">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compatibilidade & Curiosidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Compatibilidade */}
        <div className="space-y-4 bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-foreground">Compatibilidade</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(tag.compatibility).map(([browser, status]) => (
              <div key={browser} className="flex items-center justify-between p-3 bg-muted/40 rounded-xl">
                <span className="capitalize text-sm font-medium text-foreground">{browser}</span>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 rounded-full">
                  {status === 'full' ? 'Suporte Total' : 'Parcial'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Curiosidade */}
        <div className="space-y-4 bg-amber-50/20 border border-amber-100 dark:border-amber-950/20 p-6 rounded-2xl">
          <h3 className="text-lg font-bold flex items-center gap-2 text-amber-800 dark:text-amber-400">
            <Lightbulb size={18} />
            Curiosidade Histórica
          </h3>
          <p className="text-sm text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
            {tag.curiosity}
          </p>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="border border-indigo-100 dark:border-indigo-950/50 bg-gradient-to-br from-indigo-50/30 via-transparent to-violet-50/20 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Assistente de IA DevAtlas</h3>
            <p className="text-sm text-muted-foreground">Gere explicações personalizadas, exercícios e desafios instantaneamente</p>
          </div>
        </div>

        {/* AI Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleAIAction('beginner')}
            className="flex items-center gap-2 p-3 bg-card border border-border hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-sm font-medium transition-all text-left"
          >
            <Brain size={16} className="text-indigo-500" />
            Explique para iniciantes
          </button>
          <button
            onClick={() => handleAIAction('kid')}
            className="flex items-center gap-2 p-3 bg-card border border-border hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-sm font-medium transition-all text-left"
          >
            <MessageSquare size={16} className="text-indigo-500" />
            Explique para 10 anos
          </button>
          <button
            onClick={() => handleAIAction('example')}
            className="flex items-center gap-2 p-3 bg-card border border-border hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-sm font-medium transition-all text-left"
          >
            <Code size={16} className="text-indigo-500" />
            Me dê outro exemplo
          </button>
          <button
            onClick={() => handleAIAction('exercise')}
            className="flex items-center gap-2 p-3 bg-card border border-border hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-sm font-medium transition-all text-left"
          >
            <CheckCircle2 size={16} className="text-indigo-500" />
            Crie um exercício
          </button>
          <button
            onClick={() => handleAIAction('challenge')}
            className="flex items-center gap-2 p-3 bg-card border border-border hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-sm font-medium transition-all text-left"
          >
            <Sparkles size={16} className="text-indigo-500" />
            Crie um desafio
          </button>
          <button
            onClick={() => handleAIAction('compare')}
            className="flex items-center gap-2 p-3 bg-card border border-border hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-sm font-medium transition-all text-left"
          >
            <HelpCircle size={16} className="text-indigo-500" />
            Compare com outra tag
          </button>
        </div>

        {/* Custom Prompt Input */}
        <form onSubmit={handleCustomPromptSubmit} className="relative flex items-center gap-2 bg-card border border-border rounded-2xl p-1.5 shadow-sm">
          <input
            type="text"
            placeholder={`Pergunte qualquer coisa sobre ${tag.name} (ex: "Como mudar a cor?", "Como alinhar?", "SEO")...`}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="flex-1 bg-transparent pl-4 pr-12 py-2.5 text-sm focus:outline-none"
          />
          <button
            type="submit"
            disabled={!customPrompt.trim() || isGenerating}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-all shrink-0"
            title="Enviar pergunta"
          >
            <Send size={16} />
          </button>
        </form>

        {/* AI Response Area */}
        {aiResponse && (
          <div className="mt-6 p-6 bg-card border border-indigo-100 dark:border-indigo-950/50 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h4 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Sparkles size={16} />
                {aiResponse.title}
              </h4>
              <button
                onClick={() => {
                  setAiResponse(null);
                  setAiMode(null);
                }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Fechar
              </button>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {aiResponse.content}
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex items-center justify-center gap-3 py-8 text-indigo-600 dark:text-indigo-400">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold animate-pulse">IA gerando resposta personalizada...</span>
          </div>
        )}
      </div>

      {/* Related Tags Section */}
      <div className="space-y-4 border-t border-border pt-8">
        <h3 className="text-lg font-bold text-foreground">Tags Relacionadas</h3>
        <div className="flex flex-wrap gap-3">
          {tag.relatedTags.map(related => (
            <button
              key={related}
              onClick={() => onNavigateToTag(related)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400 rounded-xl text-sm font-medium transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-950"
            >
              <span className="font-mono"><{related}></span>
              <ArrowUpRight size={14} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagDetail;