import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { showSuccess } from '../utils/toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Qual atributo da tag <img> é essencial para acessibilidade e leitores de tela?",
    options: ["src", "alt", "title", "loading"],
    correctAnswer: 1,
    explanation: "O atributo 'alt' fornece um texto alternativo para a imagem, essencial para usuários com deficiência visual que utilizam leitores de tela."
  },
  {
    id: 2,
    question: "Qual tag é mais adequada para agrupar um conteúdo temático independente, como um post de blog?",
    options: ["<div>", "<section>", "<article>", "<aside>"],
    correctAnswer: 2,
    explanation: "A tag <article> é semântica e deve ser usada para conteúdos autônomos e independentes que fazem sentido por si só."
  },
  {
    id: 3,
    question: "Para que serve o atributo 'target=\"_blank\"' na tag <a>?",
    options: [
      "Para baixar o arquivo automaticamente.",
      "Para abrir o link em uma nova aba ou janela.",
      "Para criar um link de e-mail.",
      "Para rolar suavemente até o topo da página."
    ],
    correctAnswer: 1,
    explanation: "O atributo target='_blank' instrui o navegador a abrir o link de destino em uma nova aba ou janela."
  },
  {
    id: 4,
    question: "Qual é o único filho direto permitido dentro de uma tag <ul>?",
    options: ["<div>", "<a>", "<li>", "<p>"],
    correctAnswer: 2,
    explanation: "De acordo com a especificação do HTML5, apenas elementos <li> (List Item) podem ser filhos diretos de uma tag <ul> ou <ol>."
  },
  {
    id: 5,
    question: "Por que devemos incluir o atributo 'muted' ao usar 'autoplay' em um elemento <video>?",
    options: [
      "Para economizar largura de banda de internet.",
      "Porque a maioria dos navegadores bloqueia autoplay com som ativado.",
      "Para melhorar a qualidade de imagem do vídeo.",
      "Para permitir que o vídeo seja baixado mais rápido."
    ],
    correctAnswer: 1,
    explanation: "Para evitar uma experiência de usuário ruim, os navegadores modernos bloqueiam a reprodução automática de vídeos que possuem som ativado."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswered) return;

    const isCorrect = selectedOption === quizQuestions[currentQuestionIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      showSuccess("Resposta correta! Parabéns! 🎉");
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    showSuccess("Quiz reiniciado! Boa sorte! 🚀");
  };

  const currentQuestion = quizQuestions[currentQuestionIdx];

  if (showResults) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8 animate-in fade-in duration-500">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
          <Award size={40} />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Quiz Concluído!</h2>
          <p className="text-muted-foreground">Veja como você se saiu no teste de conhecimentos HTML5</p>
        </div>

        <div className="p-8 bg-card border border-border rounded-3xl max-w-md mx-auto space-y-4 shadow-sm">
          <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
            {score} / {quizQuestions.length}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Você acertou {percentage}% das perguntas!
          </p>
          <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground italic pt-2">
            {percentage === 100 
              ? "Incrível! Você é um verdadeiro mestre do HTML5! 🏆" 
              : percentage >= 60 
              ? "Muito bom! Você tem uma ótima base de HTML. 👍" 
              : "Continue estudando! O DevAtlas está aqui para te ajudar. 📚"}
          </p>
        </div>

        <button
          onClick={handleRestartQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm"<dyad-write path="src/components/Quiz.tsx" description="Finalizando o componente Quiz interativo com perguntas sobre HTML, pontuação, feedback visual e explicações">
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { showSuccess } from '../utils/toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Qual atributo da tag <img> é essencial para acessibilidade e leitores de tela?",
    options: ["src", "alt", "title", "loading"],
    correctAnswer: 1,
    explanation: "O atributo 'alt' fornece um texto alternativo para a imagem, essencial para usuários com deficiência visual que utilizam leitores de tela."
  },
  {
    id: 2,
    question: "Qual tag é mais adequada para agrupar um conteúdo temático independente, como um post de blog?",
    options: ["<div>", "<section>", "<article>", "<aside>"],
    correctAnswer: 2,
    explanation: "A tag <article> é semântica e deve ser usada para conteúdos autônomos e independentes que fazem sentido por si só."
  },
  {
    id: 3,
    question: "Para que serve o atributo 'target=\"_blank\"' na tag <a>?",
    options: [
      "Para baixar o arquivo automaticamente.",
      "Para abrir o link em uma nova aba ou janela.",
      "Para criar um link de e-mail.",
      "Para rolar suavemente até o topo da página."
    ],
    correctAnswer: 1,
    explanation: "O atributo target='_blank' instrui o navegador a abrir o link de destino em uma nova aba ou janela."
  },
  {
    id: 4,
    question: "Qual é o único filho direto permitido dentro de uma tag <ul>?",
    options: ["<div>", "<a>", "<li>", "<p>"],
    correctAnswer: 2,
    explanation: "De acordo com a especificação do HTML5, apenas elementos <li> (List Item) podem ser filhos diretos de uma tag <ul> ou <ol>."
  },
  {
    id: 5,
    question: "Por que devemos incluir o atributo 'muted' ao usar 'autoplay' em um elemento <video>?",
    options: [
      "Para economizar largura de banda de internet.",
      "Porque a maioria dos navegadores bloqueia autoplay com som ativado.",
      "Para melhorar a qualidade de imagem do vídeo.",
      "Para permitir que o vídeo seja baixado mais rápido."
    ],
    correctAnswer: 1,
    explanation: "Para evitar uma experiência de usuário ruim, os navegadores modernos bloqueiam a reprodução automática de vídeos que possuem som ativado."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswered) return;

    const isCorrect = selectedOption === quizQuestions[currentQuestionIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      showSuccess("Resposta correta! Parabéns! 🎉");
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    showSuccess("Quiz reiniciado! Boa sorte! 🚀");
  };

  const currentQuestion = quizQuestions[currentQuestionIdx];

  if (showResults) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8 animate-in fade-in duration-500">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
          <Award size={40} />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Quiz Concluído!</h2>
          <p className="text-muted-foreground">Veja como você se saiu no teste de conhecimentos HTML5</p>
        </div>

        <div className="p-8 bg-card border border-border rounded-3xl max-w-md mx-auto space-y-4 shadow-sm">
          <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
            {score} / {quizQuestions.length}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Você acertou {percentage}% das perguntas!
          </p>
          <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground italic pt-2">
            {percentage === 100 
              ? "Incrível! Você é um verdadeiro mestre do HTML5! 🏆" 
              : percentage >= 60 
              ? "Muito bom! Você tem uma ótima base de HTML. 👍" 
              : "Continue estudando! O DevAtlas está aqui para te ajudar. 📚"}
          </p>
        </div>

        <button
          onClick={handleRestartQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm"
        >
          <RotateCcw size={16} />
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-500">
      {/* Progress Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-950/50 dark:text-indigo-400">
            <HelpCircle size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base">Desafio de Conhecimento</h2>
            <p className="text-xs text-muted-foreground">Pergunta {currentQuestionIdx + 1} de {quizQuestions.length}</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 px-3 py-1 rounded-full">
          Pontuação: {score}
        </span>
      </div>

      {/* Question Card */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground leading-snug">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQuestion.correctAnswer;
            
            let optionStyle = "border-border hover:border-indigo-500 hover:bg-indigo-50/10";
            if (isSelected && !isAnswered) {
              optionStyle = "border-indigo-600 bg-indigo-50/20 text-indigo-600 dark:text-indigo-400";
            } else if (isAnswered) {
              if (isCorrectAnswer) {
                optionStyle = "border-emerald-500 bg-emerald-50/20 text-emerald-700 dark:text-emerald-400";
              } else if (isSelected) {
                optionStyle = "border-rose-500 bg-rose-50/20 text-rose-700 dark:text-rose-400";
              } else {
                optionStyle = "opacity-50 border-border";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full flex items-center justify-between p-4 border rounded-2xl text-sm font-medium transition-all text-left ${optionStyle}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </span>

                {isAnswered && isCorrectAnswer && (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrectAnswer && (
                  <XCircle size={18} className="text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons & Explanation */}
      <div className="space-y-6">
        {!isAnswered ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedOption === null}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm flex items-center justify-center gap-2"
          >
            Confirmar Resposta
          </button>
        ) : (
          <div className="space-y-6">
            {/* Explanation Box */}
            <div className="p-5 bg-indigo-50/30 border border-indigo-100 dark:border-indigo-950/50 rounded-2xl space-y-2 animate-in slide-in-from-bottom-2 duration-300">
              <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1.5">
                <Sparkles size={14} />
                Explicação da Resposta
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              {currentQuestionIdx < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;