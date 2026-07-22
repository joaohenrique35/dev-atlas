import React, { useState, useEffect } from 'react';
import { Sparkles, Code, Sliders, Eye } from 'lucide-react';
import { showSuccess } from '../utils/toast';
import { useIsMobile } from '../hooks/use-mobile';
import PlaygroundHeader from './playground/PlaygroundHeader';
import VisualGenerator from './playground/VisualGenerator';
import PlaygroundPreview from './playground/PlaygroundPreview';

interface PlaygroundProps {
  initialCode?: string;
  tagName?: string;
}

const Playground: React.FC<PlaygroundProps> = ({ initialCode = '', tagName = 'img' }) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [editorMode, setEditorMode] = useState<'code' | 'visual'>('code');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const isMobile = useIsMobile();

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
    setEditorMode('code');
    showSuccess("Template carregado com sucesso!");
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevAtlas Export - ${tagName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center p-6">
  ${code}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devatlas-${tagName.replace(/[<>]/g, '')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess("Arquivo HTML baixado com sucesso!");
  };

  const handleShare = () => {
    try {
      const encodedCode = btoa(unescape(encodeURIComponent(code)));
      const shareUrl = `${window.location.origin}${window.location.pathname}#code=${encodedCode}`;
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      showSuccess("Link de compartilhamento copiado!");
      setTimeout(() => setShared(false), 2000);
    } catch (e) {
      showSuccess("Erro ao gerar link de compartilhamento.");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Playground Header */}
      <PlaygroundHeader
        shared={shared}
        copied={copied}
        onShare={handleShare}
        onDownload={handleDownload}
        onReset={handleReset}
        onCopy={handleCopy}
        onSelectTemplate={handleLoadTemplate}
      />

      {/* Mobile Tab Switcher (Only visible on Mobile) */}
      {isMobile && (
        <div className="flex border-b border-border bg-muted/30 p-1">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileView === 'editor'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            <Code size={14} />
            Editor / Gerador
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileView === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            <Eye size={14} />
            Resultado
          </button>
        </div>
      )}

      {/* Editor & Preview Split Screen */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Column: Code Editor OR Visual Generator */}
        <div className={`flex flex-col border-r border-border h-full overflow-hidden ${isMobile && mobileView !== 'editor' ? 'hidden' : 'flex'}`}>
          {/* Mode Switcher */}
          <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-1 bg-card border border-border p-0.5 rounded-xl">
              <button
                onClick={() => setEditorMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  editorMode === 'code'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Code size={12} />
                Editor de Código
              </button>
              <button
                onClick={() => setEditorMode('visual')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  editorMode === 'visual'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sliders size={12} />
                Gerador Visual
              </button>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
              <Sparkles size={12} /> Suporta Tailwind
            </span>
          </div>

          {/* Editor Content */}
          {editorMode === 'code' ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-6 font-mono text-sm bg-slate-950 text-slate-100 focus:outline-none resize-none overflow-y-auto leading-relaxed"
              spellCheck="false"
              placeholder="Escreva seu código HTML aqui..."
            />
          ) : (
            <VisualGenerator onCodeChange={setCode} />
          )}
        </div>

        {/* Live Preview Column */}
        <div className={`flex flex-col h-full overflow-hidden ${isMobile && mobileView !== 'preview' ? 'hidden' : 'flex'}`}>
          <PlaygroundPreview code={code} />
        </div>
      </div>
    </div>
  );
};

export default Playground;