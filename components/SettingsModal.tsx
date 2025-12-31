import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Save, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentKey }) => {
  const [inputValue, setInputValue] = useState(currentKey);

  useEffect(() => {
    setInputValue(currentKey);
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Key size={20} />
            </div>
            <h3 className="font-bold text-lg">API Key 設定</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Input Section */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              輸入您的 Gemini API Key
            </label>
            <div className="relative">
                <input 
                type="password" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 font-mono text-sm"
                />
                <ShieldCheck className="absolute left-3 top-3 text-slate-400" size={18} />
            </div>
            <p className="text-xs text-slate-500">
              您的 Key 僅會儲存在瀏覽器的 Local Storage 中，不會傳送至我們的伺服器。
            </p>
          </div>

          {/* Instructions Section */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                第一次使用？如何獲取 API Key
            </h4>
            <ol className="text-xs text-blue-700 space-y-2 list-decimal list-inside">
                <li>前往 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-bold hover:text-blue-900 inline-flex items-center gap-0.5">Google AI Studio <ExternalLink size={10}/></a></li>
                <li>登入您的 Google 帳號。</li>
                <li>點擊 <strong>"Create API key"</strong> 按鈕。</li>
                <li>選擇現有專案或建立新專案以取得金鑰。</li>
                <li>複製金鑰並貼上至上方欄位。</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            <Save size={16} />
            儲存設定
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;