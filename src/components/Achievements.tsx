import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Lock, Sparkles, BookOpen, Code, HelpCircle, Trophy } from 'lucide-react';

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
  });

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('devatlas_viewed_tags') || '[]');
    const score = parseInt(localStorage.getItem('devatlas_quiz_highscore') || '0', 10);
    const playground = localStorage.getItem('devatlas_playground_used') === 'true';

    setStats({
      viewedTags: viewed,
      quizHighScore: score,
      playgroundUsed: playground,
    });
  }, []);

  const totalTagsAvailable = 9; // img, div, form, video, section, a, ul, table, button, input (approx 9-10)
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
      id: 'html_expert',
      title: 'Especialista Web',
      description: 'Dominou completamente a estrutura básica estudando todas as tags.',
      icon: <Award size={20} />,
      requirement: 'Visualizar todas as tags',
      isUnlocked: stats.viewedTags.length >= totalTagsAvailable,
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
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recorde no Quiz</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stats.quizHighScore}</span>
            <span className="text-sm text-muted-foreground">/ 5 acertos</span>
          </div>
          <p className="text-xs text-muted-foreground">Sua maior pontuação registrada</p>
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
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
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
    </div>
  );
};

export default Achievements;