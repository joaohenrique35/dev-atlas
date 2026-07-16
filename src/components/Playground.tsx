import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Sparkles, Code, LayoutTemplate, Download, Share2, Sliders, Eye } from 'lucide-react';
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
  const [shared, setShared] = useState(false);
  const [editorMode, setEditorMode] = useState<'code' | 'visual'>('code');

  // Visual Generator States
  const [compType, setCompType] = useState<'card' | 'button' | 'alert'>('card');
  const [cardName, setCardName] = useState('Guilherme Santos');
  const [cardRole, setCardRole] = useState('UI/UX Designer');
  const [cardBio, setCardBio] = useState('Criando experiências digitais incríveis com foco em usabilidade e estética moderna.');
  const [cardGradient, setCardGradient] = useState('from-indigo-500 via-purple-500 to-pink-500');
  const [cardRadius, setCardRadius] = useState('rounded-3xl');
  
  const [btnText, setBtnText] = useState('Explorar Agora');
  const [btnColor, setBtnColor] = useState('bg-indigo-600 hover:bg-indigo-700');
  const [btnRadius, setBtnRadius] = useState('rounded-xl');
  const [btnIcon, setBtnIcon] = useState('🚀');

  const [alertTitle, setAlertTitle] = useState('Aviso Importante');
  const [alertMsg, setAlertMsg] = useState('Seu progresso de aprendizado está sendo salvo localmente no seu navegador.');
  const [alertType, setAlertType] = useState('info');

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  // Generate code dynamically when visual options change
  useEffect(() => {
    if (editorMode === 'visual') {
      let generated = '';
      if (compType === 'card') {
        generated = `<div class="p-8 ${cardRadius} bg-gradient-to-br ${cardGradient} text-white shadow-2xl max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="Foto de Perfil" class="w-24 h-24 rounded-full mx-auto border-4 border-white/40 shadow-lg" />
  <h3 class="text-2xl font-extrabold mt-4">${cardName}</h3>
  <p class="text-white/80 text-sm font-medium">${cardRole}</p>
  <p class="mt-3 text-white/90 text-xs leading-relaxed">${cardBio}</p>
  <div class="mt-6 flex justify-center gap-3">
    <a href="#" class="px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">Seguir</a>
    <a href="#" class="px-4 py-2 bg-white/20 text-white rounded-xl text-xs font-bold hover:bg-white/30 transition-colors">Mensagem</a>
  </div>
</div>`;
      } else if (compType === 'button') {
        generated = `<button class="inline-flex items-center gap-2 px-6 py-3 ${btnColor} text-white font-bold ${btnRadius} shadow-lg shadow-indigo-500/10 hover:scale-105 active:scale-95 transition-all text-sm">
  <span>${btnIcon}</span>
  <span>${btnText}</span>
</button>`;
      } else if (compType === 'alert') {
        const colorsMap = {
          success: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-900', icon: '✅', titleColor: 'text-emerald-800' },
          info: { bg: 'bg-blue-50 border-blue-200 text-blue-900', icon: 'ℹ️', titleColor: 'text-blue-800' },
          warning: { bg: 'bg-amber-50 border-amber-200 text-amber-900', icon: '⚠️', titleColor: 'text-amber-800' },
          error: { bg: 'bg-rose-50 border-rose-200 text-rose-900', icon: '🚨', titleColor: 'text-rose-800' }
        };
        const currentStyle = colorsMap[alertType as keyof typeof colorsMap] || colorsMap.info;

        generated = `<div class="flex items-start gap-3 p-5 border rounded-2xl max-w-md shadow-sm ${currentStyle.bg}">
  <span class="text-xl shrink-0">${currentStyle.icon}</span>
  <div class="space-y-1">
    <h4 class="font-bold text-sm ${currentStyle.titleColor}">${alertTitle}</h4>
    <p class="text-xs leading-relaxed opacity-90">${alertMsg}</p>
  </div>
</div>`;
      }
      setCode(generated);
    }
  }, [
    editorMode, compType, cardName, cardRole, cardBio, cardGradient, cardRadius,
    btnText, btnColor, btnRadius, btnIcon, alertTitle, alertMsg, alertType
  ]);

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
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors text-indigo-600 dark:text-indigo-400"
            title="Gerar link de compartilhamento"
          >
            <Share2 size={14} />
            {shared ? 'Compartilhado!' : 'Compartilhar'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
            title="Baixar como arquivo .html"
          >
            <Download size={14} />
            Baixar HTML
          </button>
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
        {/* Left Column: Code Editor OR Visual Generator */}
        <div className="flex flex-col border-r border-border h-full overflow-hidden">
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
              <Sparkles size={12} /> Suporta Tailwind CSS
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
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-card">
              {/* Component Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Tipo de Componente</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['card', 'button', 'alert'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setCompType(type)}
                      className={`py-2.5 text-xs font-bold border rounded-xl transition-all ${
                        compType === type
                          ? 'border-indigo-600 bg-indigo-50/30 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400'
                          : 'border-border hover:bg-muted text-foreground/80'
                      }`}
                    >
                      {type === 'card' ? '📇 Card de Perfil' : type === 'button' ? '🔘 Botão Moderno' : '🚨 Alerta / Aviso'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Controls based on Component Type */}
              {compType === 'card' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Nome</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Cargo</label>
                      <input
                        type="text"
                        value={cardRole}
                        onChange={(e) => setCardRole(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Biografia</label>
                    <textarea
                      value={cardBio}
                      onChange={(e) => setCardBio(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Gradiente de Fundo</label>
                      <select
                        value={cardGradient}
                        onChange={(e) => setCardGradient(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="from-indigo-500 via-purple-500 to-pink-500">Sunset (Indigo/Pink)</option>
                        <option value="from-emerald-400 to-cyan-500">Ocean (Emerald/Cyan)</option>
                        <option value="from-amber-500 to-rose-500">Fire (Amber/Rose)</option>
                        <option value="from-slate-800 to-slate-950">Dark (Slate/Black)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Arredondamento</label>
                      <select
                        value={cardRadius}
                        onChange={(e) => setCardRadius(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="rounded-none">Sem Arredondamento</option>
                        <option value="rounded-xl">Suave (rounded-xl)</option>
                        <option value="rounded-2xl">Médio (rounded-2xl)</option>
                        <option value="rounded-3xl">Super Arredondado (rounded-3xl)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {compType === 'button' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Texto do Botão</label>
                      <input
                        type="text"
                        value={btnText}
                        onChange={(e) => setBtnText(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Ícone / Emoji</label>
                      <input
                        type="text"
                        value={btnIcon}
                        onChange={(e) => setBtnIcon(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Cor do Botão</label>
                      <select
                        value={btnColor}
                        onChange={(e) => setBtnColor(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="bg-indigo-600 hover:bg-indigo-700">Indigo</option>
                        <option value="bg-emerald-600 hover:bg-emerald-700">Esmeralda</option>
                        <option value="bg-rose-600 hover:bg-rose-700">Rosa / Vermelho</option>
                        <option value="bg-amber-500 hover:bg-amber-600">Amarelo / Laranja</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Arredondamento</label>
                      <select
                        value={btnRadius}
                        onChange={(e) => setBtnRadius(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="rounded-none">Sem Arredondamento</option>
                        <option value="rounded-lg">Padrão (rounded-lg)</option>
                        <option value="rounded-xl">Suave (rounded-xl)</option>
                        <option value="rounded-full">Pílula (rounded-full)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {compType === 'alert' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Título do Alerta</label>
                      <input
                        type="text"
                        value={alertTitle}
                        onChange={(e) => setAlertTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Tipo de Alerta</label>
                      <select
                        value={alertType}
                        onChange={(e) => setAlertType(e.target.value)}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="info">ℹ️ Informativo (Azul)</option>
                        <option value="success">✅ Sucesso (Verde)</option>
                        <option value="warning">⚠️ Atenção (Amarelo)</option>
                        <option value="error">🚨 Erro / Perigo (Vermelho)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Mensagem</label>
                    <textarea
                      value={alertMsg}
                      onChange={(e) => setAlertMsg(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Code Sync Notice */}
              <div className="p-4 bg-indigo-50/30 border border-indigo-100 dark:border-indigo-950/30 rounded-2xl text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
                💡 <strong>Sincronização Automática:</strong> O código HTML correspondente está sendo gerado em tempo real. Você pode alternar de volta para o <strong>Editor de Código</strong> a qualquer momento para ver e editar o código gerado manualmente!
              </div>
            </div>
          )}
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