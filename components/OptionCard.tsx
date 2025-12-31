import React from 'react';
import { PromptOption } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface OptionCardProps {
  option: PromptOption;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-lg border-2 p-3 transition-all duration-200
        hover:shadow-md hover:border-indigo-300
        ${isSelected 
          ? 'border-indigo-600 bg-indigo-50 shadow-indigo-100' 
          : 'border-slate-200 bg-white shadow-sm'
        }
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className={`font-bold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
          {option.label}
        </h4>
        <div className={isSelected ? 'text-indigo-600' : 'text-slate-300'}>
          {isSelected ? <CheckCircle2 size={16} /> : <Circle size={16} />}
        </div>
      </div>
      
      <p className="text-xs text-slate-500 mb-2 leading-snug line-clamp-2">
        {option.description}
      </p>

      {/* Visual Preview Badge for Colors */}
      {option.previewColor && (
        <div className={`h-2 w-full rounded-full ${option.previewColor} border border-slate-100`} />
      )}
    </div>
  );
};

export default OptionCard;