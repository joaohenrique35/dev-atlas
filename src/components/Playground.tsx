import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Sparkles, Code, LayoutTemplate } from 'lucide-react';
import { showSuccess } from '../utils/toast';

interface PlaygroundProps {
  initialCode?: string;
  tagName?: string;
}

interface Template {
  name: string;
  description: string;
  code: string;
}

const templates: Template[] = [
  {
    name: "Card de Perfil",
    description: "Card moderno com gradiente e foto de perfil",
    code: `<div class="p-8 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" alt="Foto de Perfil" class="w-24 h-24 rounded-full mx-auto border-4 border-white/40 shadow-lg" />
  <h3 class="text-2xl font-extrabold mt-4">Mariana Silva</h3>
  <p class="text-white/80 text-sm font-medium">Desenvolvedora Front-End</p>
  <p class="mt-3 text-white/90 text-xs leading-relaxed">Apaixonada por criar interfaces interativas, limpas e acessíveis usando HTML5, CSS3 e Tailwind.</p>
  <div class="mt-6 flex justify-center gap-3">
    <a href="#" class="px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">Seguir</a>
    <a href="#" class="px-4 py-2 bg-white/20 text-white rounded-xl text-xs font-bold hover:bg-white/30 transition-colors">Mensagem</a>
  </div>
</div>`
  },
  {
    name: "Formulário de Login",
    description: "Formulário de login limpo e responsivo",
    code: `<form class="w-full max-w-sm p-8 bg-white rounded-3xl border border-slate-100 shadow-xl space-y-5" onsubmit="alert('Login efetuado!'); return false;">
  <div class="text-center space-y-1">
    <h3 class="text-2xl font-bold text-slate-800">Bem-vindo de volta</h3>
    <p class="text-xs text-slate-400">Insira suas credenciais para acessar sua conta</p>
  </div>
  <div class="space-y-4">
    <div>
      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-mail</label>
      <input type="email" placeholder="seu-email@exemplo.com" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
    </div>
    <div>
      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Senha</label>
      <input type="password" placeholder="••••••••" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
    </div>
  </div>
  <button type="submit" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm">
    Entrar na Conta
  </button>
</form>`
  },
  {
    name: "Tabela de Preços",
    description: "Card de precificação de plano profissional",
    code: `<div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl max-w-sm space-y-6 relative overflow-hidden">
  <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Popular</div>
  <div class="space-y-2">
    <h4 class="text-lg font-bold text-slate-800">Plano Pro</h4>
    <p class="text-xs text-slate-400">Ideal para desenvolvedores e criadores individuais</p>
  </div>
  <div class="flex items-baseline gap-1">
    <span class="text-4xl font-black text-slate-800">R$ 49</span>
    <span class="text-xs text-slate-400">/mês</span>
  </div>
  <ul class="space-y-3 text-sm text-slate-600">
    <li class="flex items-center gap-2">
      <span class="text-emerald-500 font-bold">✓</span> Acesso ilimitado a todas as tags
    </li>
    <li class="flex items-center gap-2">
      <span class="text-emerald-500 font-bold">✓</span> Assistente de IA avançado
    </li>
    <li class="flex items-center gap-2">
      <span class="text-emerald-500 font-bold">✓</span> Suporte prioritário 24/7
    </li>
  </ul>
  <button class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm">
    Assinar Agora
  </button>
</div>`
  }
];

const Playground: React.FC<PlaygroundProps> = ({ initialCode = '', tagName = 'img' }) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showSuccess("Código copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    showSuccess("Código restaurado para o padrão!");
  };

  const handleLoadTemplate = (templateCode: string) => {
    setCode(templateCode);
    showSuccess("Template carregado com sucesso!");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Playground Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-border bg-card gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-950/50 dark:text-indigo-400">
            <Code size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base">Playground Interativo</h2>
            <p className="text-xs text-muted-foreground">Edite o código abaixo e veja o resultado instantaneamente</p>
          </div>
        </div>

        {/* Templates Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <LayoutTemplate size={14} /> Templates:
          </span>
          {templates.map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadTemplate(tpl.code)}
              className="px-2.5 py-1 text-xs font-semibold border border-border rounded-lg hover:bg-muted transition-colors"
              title={tpl.description}
            >
              {tpl.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
            title="Restaurar código original"
          >
            <RotateCcw size={14} />
            Resetar
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Screen */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Code Editor */}
        <div className="flex flex-col border-r border-border h-full overflow-hidden">
          <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">Editor HTML</span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
              <Sparkles size={12} /> Suporta Tailwind CSS
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-6 font-mono text-sm bg-slate-950 text-slate-100 focus:outline-none resize-none overflow-y-auto leading-relaxed"
            spellCheck="false"
            placeholder="Escreva seu código HTML aqui..."
          />
        </div>

        {/* Live Preview */}
        <div className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-900/40">
          <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Resultado em Tempo Real</span>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center overflow-auto">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-border/60 p-6 min-h-[300px] flex items-center justify-center">
              {/* Render HTML safely using srcDoc in an iframe to isolate styles and scripts */}
              <iframe
                title="Playground Preview"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta charset="UTF-8">
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>
                        body {
                          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                          padding: 1rem;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          min-height: 80vh;
                          margin: 0;
                          background-color: transparent;
                        }
                      </style>
                    </head>
                    <body>
                      ${code}
                    </body>
                  </html>
                `}
                className="w-full h-[400px] border-none bg-transparent"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;