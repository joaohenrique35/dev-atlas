import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Lock, Sparkles, BookOpen, Code, HelpCircle, Trophy, RotateCcw, Trash2 } from 'lucide-react';
import { showSuccess } from '../utils/toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: string;
  isUnlocked: boolean;
}

const Achievements: React.FC = () => {
  const [stats, setStats] = useState({
    viewedTags: [] as string[],
    quizHighScore: 0,
    playgroundUsed: false,
    completedMissions: [] as string[],
  });
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const loadStats = () => {
    const viewed = JSON.parse(localStorage.getItem('devatlas_viewed_tags') || '[]');
    const score = parseInt(localStorage.getItem('devatlas_quiz_highscore') || '0', 10);
    const playground = localStorage.getItem('devatlas_playground_used') === 'true';
    const completed = JSON.parse(localStorage.getItem('devatlas_completed_missions') || '[]');

    setStats({
      viewedTags: viewed,
      quizHighScore: score,
      playgroundUsed: playground,
      completedMissions: completed,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleResetProgress = () => {
    localStorage.removeItem('devatlas_viewed_tags');
    localStorage.removeItem('devatlas_quiz_highscore');
    localStorage.removeItem('devatlas_playground_used');
    localStorage.removeItem('devatlas_completed_missions');
    
    loadStats();
    setShowConfirmReset(false);
    showSuccess("Todo o seu progresso foi reiniciado com sucesso! 🚀");
  };

  const totalTagsAvailable = 22; // img, div, form, video, section, a, ul, table, button, input, canvas, iframe, audio, picture, p, main, footer, select, textarea, details, summary, dialog
  const tagsProgress = Math.min(Math.round((stats.viewedTags.length / totalTagsAvailable) * 100), 100);

  const achievementsList: Achievement[] = [
    {
      id: 'first_tag',
      title: 'Primeiros Passos',
      description: 'Explorou sua primeira tag HTML na enciclopédia.',
      icon: <BookOpen size={20} />,
      requirement: 'Visualizar 1 tag',
      isUnlocked: stats.viewedTags.length >= 1,
    },
    {
      id: 'explorer',
      title: 'Explorador HTML',
      description: 'Demonstrou curiosidade ao estudar diversas tags.',
      icon: <Sparkles size={20} />,
      requirement: 'Visualizar 5 tags',
      isUnlocked: stats.viewedTags.length >= 5,
    },
    {
      id: 'html_master',
      title: 'Mestre da Enciclopédia',
      description: 'Estudou e explorou uma grande variedade de tags HTML5.',
      icon: <Trophy size={20} className="text-amber-500" />,
      requirement: 'Visualizar 12 tags',
      isUnlocked: stats.viewedTags.length >= 12,
    },
    {
      id: 'code_scientist',
      title: 'Cientista de Código',
      description: 'Experimentou e testou códigos no Playground interativo.',
      icon: <Code size={20} />,
      requirement: 'Usar o Playground',
      isUnlocked: stats.playgroundUsed,
    },
    {
      id: 'quiz_master',
      title: 'Mestre do Quiz',
      description: 'Provou seu conhecimento gabaritando o desafio de HTML5.',
      icon: <Trophy size={20} />,
      requirement: 'Acertar 5 perguntas no Quiz',
      isUnlocked: stats.quizHighScore === 5,
    },
    {
      id: 'mission_master',
      title: 'Mestre dos Desafios',
      description: 'Completou com sucesso todas as missões práticas de código.',
      icon: <Award size={20} />,
      requirement: 'Completar 3 missões práticas',
      isUnlocked: stats.completedMissions.length >= 3,
    },
  ];

  const unlockedCount = achievementsList.filter(a => a.isUnlocked).length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
          <Trophy size={32} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">Suas Conquistas</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Aprenda tags, pratique no playground e complete quizzes para desbloquear medalhas exclusivas!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-2xl space-y-2 shadow-sm">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tags Dominadas</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stats.viewedTags.length}</span>
            <span className="text-sm text-muted-foreground">/ {totalTagsAvailable}</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${tagsProgress}%` }} />
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl space-y-2 shadow-sm">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Missões Concluídas</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stats.completedMissions.length}</span>
            <span className="text-sm text-muted-foreground">/ 3 desafios</span>
          </div>
          <p className="text-xs text-muted-foreground">Desafios práticos validados</p>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl space-y-2 shadow-sm">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Medalhas</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{unlockedCount}</span>
            <span className="text-sm text-muted-foreground">/ {achievementsList.length}</span>
          </div>
          <p className="text-xs text-muted-foreground">Conquistas desbloqueadas</p>
        </div>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Galeria de Medalhas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievementsList.map(achievement => (
            <div 
              key={achievement.id}
              className={`p-5 border rounded-2xl flex items-start gap-4 transition-all ${
                achievement.isUnlocked 
                  ? 'bg-card border-indigo-100 dark:border-indigo-950/50 shadow-sm' 
                  : 'bg-muted/20 border-border/60 opacity-75'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                achievement.isUnlocked 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {achievement.isUnlocked ? achievement.icon : <Lock size={18} />}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-foreground truncate">{achievement.title}</h4>
                  {achievement.isUnlocked && (
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <CheckCircle2 size={10} /> Desbloqueado
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
                <p className="text-[10px] font-semibold text-indigo-600/80 dark:text-indigo-400/80 pt-1">
                  Requisito: {achievement.requirement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="pt-6 border-t border-border flex flex-col items-center justify-center space-y-4">
        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-xl transition-all"
          >
            <Trash2 size={14} />
            Reiniciar Todo o Progresso
          </button>
        ) : (
          <div className="p-6 bg-rose-50/30 border border-rose-100 dark:border-rose-950/30 rounded-2xl text-center space-y-4 max-w-md animate-in zoom-in-95 duration-200">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-400">Tem certeza absoluta?</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Isso apagará permanentemente todas as suas medalhas, tags visualizadas, pontuações do quiz e missões concluídas.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetProgress}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Sim, Reiniciar
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground/80 text-xs font-semibold rounded-xl transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;