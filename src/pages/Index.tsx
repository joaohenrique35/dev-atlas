import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TagDetail from '../components/TagDetail';
import Playground from '../components/Playground';
import Quiz from '../components/Quiz';
import Achievements from '../components/Achievements';
import { htmlTagsData } from '../data/htmlTags';
import { Search, Sparkles, Compass, Code, BookOpen, Moon, Sun, Layers } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [selectedTag, setSelectedTag] = useState<string>('img');
  const [activeTab, setActiveTab] = useState<'docs' | 'playground' | 'quiz' | 'achievements'>('docs');
  const [searchQuery, setSearchQuery] = useState('');
  const [playgroundCode, setPlaygroundCode] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
    <div className={`min-h-screen flex bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        selectedTag={selectedTag}
        onSelectTag={handleSelectTag}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">DevAtlas Explorer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">HTML5 Edition</span>
          </div>

          <div className="flex items-center gap-4">
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
            {/* Hero Search Section (Only shown if we are on the default state or want a quick search) */}
            <div className="bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent dark:from-indigo-950/10 py-12 px-8 border-b border-border/40">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 text-xs font-bold">
                  <Sparkles size={12} />
                  Aprenda HTML de forma interativa com IA
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  O que você quer construir hoje?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto text-sm">
                  Explore a enciclopédia interativa de tags HTML. Busque uma tag abaixo ou selecione uma sugestão rápida.
                </p>

                {/* Large Search Bar */}
                <div className="relative max-w-xl mx-auto shadow-xl shadow-indigo-500/5 rounded-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
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
                    className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="text-xs text-muted-foreground font-medium">Sugestões rápidas:</span>
                  {suggestions.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleSelectTag(tag)}
                      className="px-3 py-1 text-xs font-mono font-semibold bg-card hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400 border border-border rounded-lg transition-all"
                    >
                      <{tag}>
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
        ) : (
          <Achievements />
        )}

        {/* Footer */}
        <footer className="border-t border-border/40 py-6 bg-card/50 mt-auto">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;