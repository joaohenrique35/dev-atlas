import React, { useState } from 'react';
import { htmlTagsData, HTMLTag } from '../data/htmlTags';
import { Search, BookOpen, Code, ChevronRight, ChevronDown, Sparkles, Layers, HelpCircle, Trophy } from 'lucide-react';

interface SidebarProps {
  selectedTag: string;
  onSelectTag: (tagName: string) => void;
  activeTab: 'docs' | 'playground' | 'quiz' | 'achievements';
  setActiveTab: (tab: 'docs' | 'playground' | 'quiz' | 'achievements') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedTag,
  onSelectTag,
  activeTab,
  setActiveTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Estrutura': true,
    'Texto': true,
    'Formulários': true,
    'Multimídia': true,
    'Tabelas': false,
    'Listas': false,
    'Semântica': false,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group tags by category
  const categories: Record<string, HTMLTag[]> = {
    'Estrutura': [],
    'Texto': [],
    'Formulários': [],
    'Multimídia': [],
    'Tabelas': [],
    'Listas': [],
    'Semântica': [],
  };

  Object.values(htmlTagsData).forEach(tag => {
    if (categories[tag.category]) {
      // Filter by search query
      if (
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        categories[tag.category].push(tag);
      }
    }
  });

  return (
    <aside className="w-80 border-r border-border bg-card flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo / Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Layers size={20} className="animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              DevAtlas
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Enciclopédia HTML Interativa</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-4 gap-1 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold rounded-lg transition-all ${
              activeTab === 'docs'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Documentação"
          >
            <BookOpen size={12} />
            Docs
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold rounded-lg transition-all ${
              activeTab === 'playground'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Playground"
          >
            <Code size={12} />
            Play
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold rounded-lg transition-all ${
              activeTab === 'quiz'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Quiz"
          >
            <HelpCircle size={12} />
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold rounded-lg transition-all ${
              activeTab === 'achievements'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Conquistas"
          >
            <Trophy size={12} />
            Medalhas
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Buscar tag (ex: img, div)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Tags List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4 scrollbar-thin">
        {Object.entries(categories).map(([category, tags]) => {
          if (tags.length === 0 && searchQuery !== '') return null;

          const isExpanded = expandedCategories[category];

          return (
            <div key={category} className="space-y-1">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between py-1.5 px-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                <span>{category}</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full font-medium">
                    {tags.length}
                  </span>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>

              {isExpanded && (
                <div className="space-y-0.5 pl-1">
                  {tags.map(tag => {
                    const cleanName = tag.name.replace(/[<>]/g, '');
                    const isSelected = selectedTag === cleanName && activeTab === 'docs';

                    return (
                      <button
                        key={tag.name}
                        onClick={() => {
                          onSelectTag(cleanName);
                          setActiveTab('docs');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all text-left ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-950/50 dark:text-indigo-400'
                            : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <span className="font-mono">{tag.name}</span>
                        <span className="text-xs text-muted-foreground font-normal truncate max-w-[120px]">
                          {tag.description}
                        </span>
                      </button>
                    );
                  })}
                  {tags.length === 0 && (
                    <p className="text-xs text-muted-foreground/60 italic pl-3 py-1">Nenhuma tag encontrada</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;