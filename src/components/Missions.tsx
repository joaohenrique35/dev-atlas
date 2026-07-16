import React, { useState, useEffect } from 'react';
import { Code, CheckCircle2, Play, RotateCcw, Sparkles, Trophy, ArrowRight, AlertCircle } from 'lucide-react';
import { showSuccess, showError } from '../utils/toast';

interface Mission {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  description: string;
  instructions: string[];
  startingCode: string;
  validate: (code: string) => { success: boolean; message: string };
}

const missionsList: Mission[] = [
  {
    id: 'mission_button',
    title: 'Missão 1: O Botão de Sucesso',
    difficulty: 'Fácil',
    description: 'Crie um botão de ação verde e elegante usando Tailwind CSS.',
    instructions: [
      'Use a tag <button> para criar o botão.',
      'Adicione a classe "bg-emerald-500" ou "bg-emerald-600" para a cor de fundo.',
      'Adicione a classe "rounded-xl" ou "rounded-2xl" para arredondar as bordas.',
      'O texto dentro do botão deve ser "Enviar".'
    ],
    startingCode: `<button class="px-6 py-3 text-white font-bold">
  Clique aqui
</button>`,
    validate: (code: string) => {
      const cleanCode = code.toLowerCase();
      if (!cleanCode.includes('<button') || !cleanCode.includes('</button>')) {
        return { success: false, message: 'Você precisa usar a tag <button> para criar o botão!' };
      }
      if (!cleanCode.includes('bg-emerald-500') && !cleanCode.includes('bg-emerald-600')) {
        return { success: false, message: 'O botão precisa ter a classe de cor de fundo "bg-emerald-500" ou "bg-emerald-600"!' };
      }
      if (!cleanCode.includes('rounded-xl') && !cleanCode.includes('rounded-2xl') && !cleanCode.includes('rounded-lg')) {
        return { success: false, message: 'Adicione uma classe de bordas arredondadas como "rounded-xl" ou "rounded-2xl"!' };
      }
      if (!code.includes('Enviar')) {
        return { success: false, message: 'O texto interno do botão deve ser exatamente "Enviar" (respeitando maiúsculas e minúsculas)!' };
      }
      return { success: true, message: 'Excelente! Você criou um botão de sucesso perfeito! 🎉' };
    }
  },
  {
    id: 'mission_image',
    title: 'Missão 2: Imagem Acessível',
    difficulty: 'Médio',
    description: 'Insira uma imagem de forma totalmente acessível para leitores de tela.',
    instructions: [
      'Use a tag <img> para inserir a imagem.',
      'Adicione o atributo "src" com qualquer link de imagem (ex: https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300).',
      'Adicione o atributo "alt" com uma descrição clara da imagem (não deixe vazio!).',
      'Adicione a classe "shadow-lg" para dar profundidade.'
    ],
    startingCode: `<img 
  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300" 
/>`,
    validate: (code: string) => {
      const cleanCode = code.toLowerCase();
      if (!cleanCode.includes('<img')) {
        return { success: false, message: 'Você precisa usar a tag <img>!' };
      }
      if (!cleanCode.includes('src=')) {
        return { success: false, message: 'A imagem precisa ter o atributo "src" definido!' };
      }
      if (!cleanCode.includes('alt=')) {
        return { success: false, message: 'Acessibilidade em primeiro lugar! Adicione o atributo "alt" com uma descrição.' };
      }
      // Check if alt is empty
      const altMatch = cleanCode.match(/alt=["'](.*?)["']/);
      if (altMatch && altMatch[1].trim() === '') {
        return { success: false, message: 'O atributo "alt" não pode ficar vazio! Descreva a imagem.' };
      }
      if (!cleanCode.includes('shadow-lg') && !cleanCode.includes('shadow-xl') && !cleanCode.includes('shadow-md')) {
        return { success: false, message: 'Adicione a classe "shadow-lg" para dar um efeito de sombra elegante!' };
      }
      return { success: true, message: 'Incrível! Sua imagem está linda e totalmente acessível! 🌟' };
    }
  },
  {
    id: 'mission_card',
    title: 'Missão 3: O Container Secreto',
    difficulty: 'Difícil',
    description: 'Crie um card moderno com fundo gradiente e texto centralizado.',
    instructions: [
      'Use uma tag <div> como container principal.',
      'Adicione um gradiente de fundo usando as classes "bg-gradient-to-r", "from-indigo-500" e "to-purple-600".',
      'Adicione espaçamento interno com a classe "p-8".',
      'Adicione bordas arredondadas com "rounded-3xl".',
      'Insira um título <h3> com o texto "DevAtlas" dentro do container.'
    ],
    startingCode: `<div class="text-white">
  <!-- Seu código aqui -->
</div>`,
    validate: (code: string) => {
      const cleanCode = code.toLowerCase();
      if (!cleanCode.includes('<div') || !cleanCode.includes('</div>')) {
        return { success: false, message: 'Você precisa usar uma tag <div> como container!' };
      }
      if (!cleanCode.includes('bg-gradient-to-r') || !cleanCode.includes('from-indigo-500') || !cleanCode.includes('to-purple-600')) {
        return { success: false, message: 'O gradiente de fundo deve ir de indigo-500 para purple-600!' };
      }
      if (!cleanCode.includes('p-8') && !cleanCode.includes('p-6') && !cleanCode.includes('p-10')) {
        return { success: false, message: 'Adicione espaçamento interno usando a classe "p-8"!' };
      }
      if (!cleanCode.includes('rounded-3xl') && !cleanCode.includes('rounded-2xl')) {
        return { success: false, message: 'Arredonde as bordas do card com a classe "rounded-3xl"!' };
      }
      if (!cleanCode.includes('<h3') || !cleanCode.includes('</h3>') || !code.includes('DevAtlas')) {
        return { success: false, message: 'Insira um título <h3> contendo exatamente o texto "DevAtlas"!' };
      }
      return { success: true, message: 'Espetacular! Você dominou o design moderno com Tailwind e HTML! 🏆' };
    }
  }
];

const Missions: React.FC = () => {
  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const [code, setCode] = useState(missionsList[0].startingCode);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('devatlas_completed_missions') || '[]');
    setCompletedMissions(completed);
    setCode(missionsList[activeMissionIdx].startingCode);
    setValidationError(null);
  }, [activeMissionIdx]);

  const handleReset = () => {
    setCode(missionsList[activeMissionIdx].startingCode);
    setValidationError(null);
    showSuccess("Código restaurado para o padrão!");
  };

  const handleValidate = () => {
    const currentMission = missionsList[activeMissionIdx];
    const result = currentMission.validate(code);

    if (result.success) {
      setValidationError(null);
      showSuccess(result.message);
      
      if (!completedMissions.includes(currentMission.id)) {
        const updated = [...completedMissions, currentMission.id];
        setCompletedMissions(updated);
        localStorage.setItem('devatlas_completed_missions', JSON.stringify(updated));
      }
    } else {
      setValidationError(result.message);
      showError("Alguns requisitos não foram atendidos.");
    }
  };

  const currentMission = missionsList[activeMissionIdx];
  const isCompleted = completedMissions.includes(currentMission.id);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-border bg-card gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-950/50 dark:text-indigo-400">
            <Trophy size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base">Desafios de Código</h2>
            <p className="text-xs text-muted-foreground">Complete missões práticas para testar suas habilidades</p>
          </div>
        </div>

        {/* Mission Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {missionsList.map((mission, idx) => {
            const isActive = idx === activeMissionIdx;
            const isMissionDone = completedMissions.includes(mission.id);

            return (
              <button
                key={mission.id}
                onClick={() => setActiveMissionIdx(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10'
                    : 'bg-card border-border hover:bg-muted text-foreground/80'
                }`}
              >
                {isMissionDone && <CheckCircle2 size={12} className={isActive ? 'text-white' : 'text-emerald-500'} />}
                <span>{mission.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Instructions & Requirements (4 cols) */}
        <div className="lg:col-span-4 border-r border-border bg-card flex flex-col h-full overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                currentMission.difficulty === 'Fácil'
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                  : currentMission.difficulty === 'Médio'
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
                  : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
              }`}>
                Dificuldade: {currentMission.difficulty}
              </span>
              {isCompleted && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Concluído!
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground">{currentMission.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{currentMission.description}</p>
          </div>

          {/* Instructions List */}
          <div className="space-y-3 bg-muted/40 border border-border/40 p-5 rounded-2xl">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} className="text-indigo-500" />
              Requisitos da Missão
            </h4>
            <ul className="space-y-3">
              {currentMission.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Validation Feedback */}
          {validationError && (
            <div className="p-4 bg-rose-50/30 border border-rose-100 dark:border-rose-950/30 rounded-2xl flex items-start gap-2.5 text-rose-800 dark:text-rose-400 animate-in slide-in-from-bottom-2 duration-300">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="font-bold text-xs">Requisito pendente:</h5>
                <p className="text-xs leading-relaxed opacity-90">{validationError}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 space-y-2 mt-auto">
            <button
              onClick={handleValidate}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Play size={14} fill="currentColor" />
              Validar Código
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-muted hover:bg-muted/80 text-foreground/80 font-medium rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={12} />
              Resetar Código
            </button>
          </div>
        </div>

        {/* Right Column: Editor & Live Preview (8 cols) */}
        <div className="lg:col-span-8 grid grid-rows-2 h-full overflow-hidden">
          {/* Code Editor */}
          <div className="flex flex-col border-b border-border overflow-hidden">
            <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">Editor de Código</span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                <Code size={12} /> HTML5 + Tailwind CSS
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-6 font-mono text-sm bg-slate-950 text-slate-100 focus:outline-none resize-none overflow-y-auto leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Live Preview */}
          <div className="flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900/40">
            <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Resultado em Tempo Real</span>
            </div>
            <div className="flex-1 p-6 flex items-center justify-center overflow-auto">
              <div className="w-full max-w-xl bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-border/60 p-6 min-h-[180px] flex items-center justify-center">
                <iframe
                  title="Mission Preview"
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
                            min-height: 40vh;
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
                  className="w-full h-[180px] border-none bg-transparent"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;