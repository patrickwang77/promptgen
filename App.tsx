import React, { useState, useEffect } from 'react';
import { CategoryKey, PromptState, PromptOption } from './types';
import { CATEGORIES, PRESETS } from './constants';
import OptionCard from './components/OptionCard';
import PreviewPanel from './components/PreviewPanel';
import SettingsModal from './components/SettingsModal';
import { Wand2, Sparkles, Layout, PenTool, Eye, Settings, Key } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'presets' | 'builder' | 'preview'>('presets');
  const [selections, setSelections] = useState<PromptState>({
    style: null,
    structure: null,
    elements: null,
    color: null,
    layout: null,
  });

  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedKey) {
        setApiKey(storedKey);
    }
  }, []);

  const handleSaveKey = (key: string) => {
    localStorage.setItem('GEMINI_API_KEY', key);
    setApiKey(key);
    setIsSettingsOpen(false);
  };

  const handleSelection = (category: CategoryKey, option: PromptOption) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category]?.id === option.id ? null : option
    }));
  };

  const applyPreset = (presetData: PromptState) => {
    setSelections(presetData);
    setActiveTab('builder'); // Move to builder to refine
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetSelections = () => {
    setSelections({
      style: null,
      structure: null,
      elements: null,
      color: null,
      layout: null,
    });
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const totalCategories = CATEGORIES.length;
  const progressPercent = (selectedCount / totalCategories) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter pb-12">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 bg-opacity-95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-200">
              <Wand2 size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">Prompt Genius</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-1">Infographic Generator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {selectedCount === totalCategories ? 'Ready to Preview' : 'Progress'}
                </div>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                    className={`h-full transition-all duration-500 ${selectedCount === totalCategories ? 'bg-green-500' : 'bg-indigo-500'}`}
                    style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Settings Button */}
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className={`p-2 rounded-lg border transition-all ${apiKey ? 'border-green-200 bg-green-50 text-green-600 hover:bg-green-100' : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                title="API Key Settings"
            >
                {apiKey ? <Key size={20} /> : <Settings size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sticky top-[68px] z-30">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-1.5 rounded-xl shadow-sm inline-flex gap-1">
                <button 
                    onClick={() => setActiveTab('presets')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'presets' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                    <Layout size={16} />
                    <span className="hidden sm:inline">Presets</span>
                </button>
                <button 
                    onClick={() => setActiveTab('builder')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'builder' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                    <PenTool size={16} />
                    <span className="hidden sm:inline">Builder</span>
                </button>
                <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
                >
                    <Eye size={16} />
                    <span>Preview & Export</span>
                </button>
            </div>
        </div>

        {/* TAB 1: PRESETS */}
        {activeTab === 'presets' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {PRESETS.map((preset) => (
                    <button
                        key={preset.name}
                        onClick={() => applyPreset(preset.data)}
                        className="group relative overflow-hidden bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all text-left"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={40} className="text-indigo-600"/>
                        </div>
                        <h3 className="font-bold text-base text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                        {preset.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed pr-8">{preset.description}</p>
                    </button>
                    ))}
                </div>
            </div>
        )}

        {/* TAB 2: BUILDER */}
        {activeTab === 'builder' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                {CATEGORIES.map((category) => (
                    <section key={category.key} id={category.key}>
                        <div className="mb-3 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold border border-slate-200">
                                {category.title.split('.')[0]}
                             </div>
                            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">
                                {category.title.split('. ')[1]}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {category.options.map((option) => (
                            <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={selections[category.key]?.id === option.id}
                                onClick={() => handleSelection(category.key, option)}
                            />
                            ))}
                        </div>
                    </section>
                ))}
                
                <div className="flex justify-center pt-8">
                    <button 
                        onClick={() => setActiveTab('preview')}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                        Proceed to Preview
                        <Eye size={18} />
                    </button>
                </div>
            </div>
        )}

        {/* TAB 3: PREVIEW & EXPORT */}
        {activeTab === 'preview' && (
            <PreviewPanel selections={selections} onReset={resetSelections} apiKey={apiKey} />
        )}

      </main>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onSave={handleSaveKey}
        currentKey={apiKey}
      />
    </div>
  );
};

export default App;