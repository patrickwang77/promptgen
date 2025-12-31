import React, { useState, useEffect } from 'react';
import { PromptState } from '../types';
import { Copy, Check, RefreshCw, Sparkles, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface PreviewPanelProps {
  selections: PromptState;
  onReset: () => void;
  apiKey: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ selections, onReset, apiKey }) => {
  const [fullPrompt, setFullPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parts = [
      selections.style?.promptValue,
      selections.structure?.promptValue,
      selections.elements?.promptValue,
      selections.color?.promptValue,
      selections.layout?.promptValue,
    ].filter(Boolean);

    // Prompt for user to copy (optimized for Midjourney/general use)
    const promptText = parts.length > 0 ? `${parts.join(', ')} --ar 3:2 --v 6.0` : '';
    setFullPrompt(promptText);
  }, [selections]);

  const handleCopy = () => {
    if (!fullPrompt) return;
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    // Priority: User supplied key -> Environment variable
    const keyToUse = apiKey || process.env.API_KEY;

    if (!keyToUse) {
      setError("請先在設定 (右上角齒輪圖示) 中輸入您的 API Key。");
      return;
    }
    
    // For GenAI, we strip the Midjourney parameters for better comprehension
    const parts = [
      selections.style?.promptValue,
      selections.structure?.promptValue,
      selections.elements?.promptValue,
      selections.color?.promptValue,
      selections.layout?.promptValue,
    ].filter(Boolean);
    
    const aiPrompt = parts.join(', ');

    if (!aiPrompt) {
      setError("Please select options to build a prompt first.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: keyToUse });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: aiPrompt }],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64String = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            setGeneratedImage(`data:${mimeType};base64,${base64String}`);
            foundImage = true;
            break;
          }
        }
      }
      
      if (!foundImage) {
        throw new Error("No image generated.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image. Please check your API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isEmpty = !fullPrompt;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-12">
      
      {/* 1. Prompt Output Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Sparkles size={16} className="text-indigo-600"/>
             <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Final Prompt</span>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={onReset}
                title="Reset All Selections"
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
            >
                <RefreshCw size={16} />
            </button>
            <button 
                onClick={handleCopy}
                disabled={isEmpty}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border
                    ${isEmpty 
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                        : copied 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'
                    }
                `}
            >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        
        <div className="relative">
          <textarea 
            readOnly
            value={isEmpty ? "Select options from the builder to generate your prompt..." : fullPrompt}
            className={`w-full h-40 p-4 text-sm font-mono resize-none focus:outline-none bg-slate-950
              ${isEmpty ? 'text-slate-500 italic' : 'text-green-400 shadow-inner'}
            `}
          />
        </div>
      </div>

      {/* 2. AI Preview Section */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-xl overflow-hidden relative min-h-[400px] flex flex-col">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/60 to-transparent">
             <div className="flex items-center gap-2 text-white/90">
                <ImageIcon size={18} />
                <span className="text-sm font-bold">AI Effect Preview</span>
                <span className="text-[10px] bg-indigo-500/80 text-white px-1.5 py-0.5 rounded ml-2">Nano Banana</span>
             </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-slate-800/50 relative">
            {generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="AI Generated Preview" 
                  className="w-full h-full object-contain max-h-[600px]"
                />
            ) : (
                <div className="text-center p-8">
                    {isGenerating ? (
                        <div className="flex flex-col items-center gap-3">
                           <Loader2 size={40} className="text-indigo-400 animate-spin" />
                           <p className="text-slate-300 text-sm">Dreaming up your infographic...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 opacity-40">
                            <Sparkles size={48} className="text-slate-400" />
                            <p className="text-slate-400 text-sm">Ready to generate</p>
                        </div>
                    )}
                </div>
            )}
            
            {error && (
              <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center p-6">
                 <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200 max-w-md">
                    <AlertCircle size={24} />
                    <p className="text-sm">{error}</p>
                 </div>
              </div>
            )}
        </div>

        <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-center">
             <button
                onClick={handleGenerate}
                disabled={isGenerating || isEmpty}
                className={`
                   w-full md:w-auto px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                   ${isGenerating || isEmpty
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:translate-y-0'
                   }
                `}
             >
                {isGenerating ? (
                    <>Generating...</>
                ) : (
                    <>
                      <Sparkles size={18} />
                      Generate Preview
                    </>
                )}
             </button>
        </div>
      </div>

    </div>
  );
};

export default PreviewPanel;