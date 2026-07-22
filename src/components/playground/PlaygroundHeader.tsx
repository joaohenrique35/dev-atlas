import React from 'react';
import { Code, Share2, Download, RotateCcw, Copy, Check, LayoutTemplate } from 'lucide-react';
import { playgroundTemplates, Template } from '../../data/playgroundTemplates';

interface PlaygroundHeaderProps {
  shared: boolean;
  copied: boolean;
  onShare: () => void;
  onDownload: () => void;
  onReset: () => void;
  onCopy: () => void;
  onSelectTemplate: (code: string) => void;
}

const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  shared,
  copied,
  onShare,
  onDownload,
  onReset,
  onCopy,
  onSelectTemplate,
}) => {
  return (
    <div className="flex flex-col px-6 py-4 border-b border-border bg-card gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-950/50 dark:text-indigo-400">
            <Code size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base">Playground Interativo</h2>
            <p className="text-xs text-muted-foreground">Edite o código abaixo e veja o resultado instantaneamente</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors text-indigo-600 dark:text-indigo-400"
            title="Gerar link de compartilhamento"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">{shared ? 'Compartilhado!' : 'Compartilhar'}</span>
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
            title="Baixar como arquivo .html"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Baixar HTML</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
            title="Restaurar código original"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Resetar</span>
          </button>
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* Templates Selector */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-3">
        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
          <LayoutTemplate size={14} /> Templates:
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {playgroundTemplates.map((tpl: Template, idx: number) => (
            <button
              key={idx}
              onClick={() => onSelectTemplate(tpl.code)}
              className="px-2.5 py-1 text-xs font-semibold border border-border rounded-lg hover:bg-muted transition-colors shrink-0"
              title={tpl.description}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundHeader;