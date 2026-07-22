import React, { useState, useEffect } from 'react';

interface VisualGeneratorProps {
  onCodeChange: (generatedCode: string) => void;
}

const VisualGenerator: React.FC<VisualGeneratorProps> = ({ onCodeChange }) => {
  const [compType, setCompType] = useState<'card' | 'button' | 'alert'>('card');
  
  // Card states
  const [cardName, setCardName] = useState('Guilherme Santos');
  const [cardRole, setCardRole] = useState('UI/UX Designer');
  const [cardBio, setCardBio] = useState('Criando experiências digitais incríveis com foco em usabilidade e estética moderna.');
  const [cardGradient, setCardGradient] = useState('from-indigo-500 via-purple-500 to-pink-500');
  const [cardRadius, setCardRadius] = useState('rounded-3xl');

  // Button states
  const [btnText, setBtnText] = useState('Explorar Agora');
  const [btnColor, setBtnColor] = useState('bg-indigo-600 hover:bg-indigo-700');
  const [btnRadius, setBtnRadius] = useState('rounded-xl');
  const [btnIcon, setBtnIcon] = useState('🚀');

  // Alert states
  const [alertTitle, setAlertTitle] = useState('Aviso Importante');
  const [alertMsg, setAlertMsg] = useState('Seu progresso de aprendizado está sendo salvo localmente no seu navegador.');
  const [alertType, setAlertType] = useState('info');

  useEffect(() => {
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
    onCodeChange(generated);
  }, [
    compType, cardName, cardRole, cardBio, cardGradient, cardRadius,
    btnText, btnColor, btnRadius, btnIcon, alertTitle, alertMsg, alertType
  ]);

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-card">
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
              {type === 'card' ? '📇 Card' : type === 'button' ? '🔘 Botão' : '🚨 Alerta'}
            </button>
          ))}
        </div>
      </div>

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

      <div className="p-4 bg-indigo-50/30 border border-indigo-100 dark:border-indigo-950/30 rounded-2xl text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
        💡 <strong>Sincronização Automática:</strong> O código HTML correspondente está sendo gerado em tempo real. Você pode alternar de volta para o <strong>Editor de Código</strong> a qualquer momento para ver e editar o código gerado manualmente!
      </div>
    </div>
  );
};

export default VisualGenerator;