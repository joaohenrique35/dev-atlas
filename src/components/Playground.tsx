import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Sparkles, Code } from 'lucide-react';
import { showSuccess } from '../utils/toast';

interface PlaygroundProps {
  initialCode?: string;
  tagName?: string;
}

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

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Playground Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-950/50 dark:text-indigo-400">
            <Code size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base">Playground Interativo</h2>
            <p className="text-xs text-muted-foreground">Edite o código abaixo e veja o resultado instantaneamente</p>
          </div>
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