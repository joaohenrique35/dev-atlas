import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TagDetail from '../components/TagDetail';
import Playground from '../components/Playground';
import Quiz from '../components/Quiz';
import Achievements from '../components/Achievements';
import Missions from '../components/Missions';
import { htmlTagsData } from '../data/htmlTags';
import { useIsMobile } from '../hooks/use-mobile';
import { 
  Search, Sparkles, Compass, Code, BookOpen, Moon, Sun, Layers, 
  Menu, X, Trophy, Award, HelpCircle 
} from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [selectedTag, setSelectedTag] = useState<string>('img');
  const [activeTab, setActiveTab] = useState<'docs' | 'playground' | 'quiz' | 'missions' | 'achievements'>('docs');
  const [searchQuery, setSearchQuery] = useState('');
  const [playgroundCode, setPlaygroundCode] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  const isMobile = useIsMobile();

  // Check for shared code in URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#code=')) {
      try {
        const base64Code = hash.substring(6);
        const decodedCode = decodeURIComponent(escape(atob(base64Code)));
        if (decodedCode) {
          setPlaygroundCode(decodedCode);
          setActiveTab('playground');
          // Clear hash to avoid re-triggering on reload
          window.history.replaceState(null, '', window.location.pathname);
        }
      } catch (e) {
        console.error("Erro ao decodificar código compartilhado:", e);
      }
    }
  }, []);

  // Track viewed tags for achievements
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('devatlas_viewed_tags') || '[]');
    if (!viewed.includes(selectedTag)) {
      const updated = [...viewed, selectedTag];
      localStorage.setItem('devatlas_viewed_tags', JSON.stringify(updated));
    }
  }, [selectedTag]);

  // Track playground usage
  useEffect(() => {
    if (activeTab === 'playground') {
      localStorage.setItem('devatlas_playground_used', 'true');
    }
  }, [activeTab]);

  const handleSelectTag = (tagName: string) => {
    const cleanName = tagName.replace(/[<>]/g, '');
    if (htmlTagsData[cleanName]) {
      setSelectedTag(cleanName);
      setActiveTab('docs');
      setIsMobileMenuOpen(false); // Close drawer on mobile after selection
    }
  };

  const handleOpenInPlayground = (code: string) => {
    setPlaygroundCode(code);
    setActiveTab('playground');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currentTagData = htmlTagsData[selectedTag] || htmlTagsData['img'];

  // Quick suggestions
  const suggestions = ['div', 'img', 'form', 'video', 'section', 'button', 'input'];

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden lg:block">
        <Sidebar
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Mobile Drawer / Slide-over for Tags List */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-background h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="absolute right-4 top-4">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Sidebar
                selectedTag={selectedTag}
                onSelectTag={handleSelectTag}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pb-20 lg:pb-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors text-foreground"
              title="Abrir Menu de Tags"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:inline-block">DevAtlas Explorer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 hidden sm:inline-block" />
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">HTML5 Edition</span>
            </div>
          </div>

          {/* App Title on Mobile */}
          <div className="lg:hidden flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
              <Layers size={14} />
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              DevAtlas
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
              title="Alternar Tema"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Content Switcher */}
        {activeTab === 'docs' ? (
          <div className="flex-1">
            {/* Hero Search Section */}
            <div className="bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent dark:from-indigo-950/10 py-8 lg:py-12 px-4 lg:px-8 border-b border-border/40">
              <div className="max-w-3xl mx-auto text-center space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 text-[10px] lg:text-xs font-bold">
                  <Sparkles size={12} />
                  Aprenda HTML de forma interativa com IA
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                  O que você quer construir hoje?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto text-xs lg:text-sm">
                  Explore a enciclopédia interativa de tags HTML. Busque uma tag abaixo ou selecione uma sugestão rápida.
                </p>

                {/* Large Search Bar */}
                <div className="relative max-w-xl mx-auto shadow-xl shadow-indigo-500/5 rounded-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Pesquise uma tag HTML (ex: form, video, a)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      const clean = e.target.value.replace(/[<>]/g, '').toLowerCase();
                      if (htmlTagsData[clean]) {
                        setSelectedTag(clean);
                      }
                    }}
                    className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-2xl text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                  <span className="text-[10px] lg:text-xs text-muted-foreground font-medium">Sugestões rápidas:</span>
                  {suggestions.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleSelectTag(tag)}
                      className="px-2.5 py-1 text-[10px] lg:text-xs font-mono font-semibold bg-card hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400 border border-border rounded-lg transition-all"
                    >
                      {"<" + tag + ">"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag Detail View */}
            <TagDetail
              tag={currentTagData}
              onNavigateToTag={handleSelectTag}
              onOpenInPlayground={handleOpenInPlayground}
            />
          </div>
        ) : activeTab === 'playground' ? (
          <Playground
            initialCode={playgroundCode || currentTagData.syntax}
            tagName={currentTagData.name}
          />
        ) : activeTab === 'quiz' ? (
          <Quiz />
        ) : activeTab === 'missions' ? (
          <Missions />
        ) : (
          <Achievements />
        )}

        {/* Footer */}
        <footer className="border-t border-border/40 py-6 bg-card/50 mt-auto">
          <MadeWithDyad />
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar (Only visible on Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'docs'
              ? 'text-indigo-600 dark:text-indigo-400 scale-105'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen size={18} className="mb-0.5" />
          Docs
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'playground'
              ? 'text-indigo-600 dark:text-indigo-400 scale-105'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Code size={18} className="mb-0.5" />
          Play
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'quiz'
              ? 'text-indigo-600 dark:text-indigo-400 scale-105'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <HelpCircle size={18} className="mb-0.5" />
          Quiz
        </button>
        <button
          onClick={() => setActiveTab('missions')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'missions'
              ? 'text-indigo-600 dark:text-indigo-400 scale-105'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Trophy size={18} className="mb-0.5" />
          Desafios
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'achievements'
              ? 'text-indigo-600 dark:text-indigo-400 scale-105'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Award size={18} className="mb-0.5" />
          Medalhas
        </button>
      </div>
    </div>
  );
};

export default Index;