'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Question } from '@/types/quiz';

interface MultipleChoiceProps {
  question: Question;
  value?: string[];
  onChange: (value: string[]) => void;
}

export function MultipleChoice({ question, value = [], onChange }: MultipleChoiceProps) {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      // If selecting "none", clear other selections
      if (optionValue === 'none') {
        onChange(['none']);
      } else {
        // If selecting another option, remove "none" if present
        const newValue = value.filter((v) => v !== 'none');
        onChange([...newValue, optionValue]);
      }
    }
  };

  return (
    <div className="grid gap-3">
      {question.options?.map((option, index) => {
        const isSelected = value.includes(option.value);
        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleOption(option.value)}
            className={`relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              isSelected
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
              }`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <span className="font-medium text-gray-900">{option.label}</span>
              {option.description && (
                <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
              )}
            </div>
          </motion.button>
        );
      })}
      <p className="text-sm text-gray-500 text-center mt-2">
        Select all that apply
      </p>
    </div>
  );
}
