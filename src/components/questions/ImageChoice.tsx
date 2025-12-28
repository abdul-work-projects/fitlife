'use client';

import { motion } from 'framer-motion';
import { Check, Target, Dumbbell, Flame, Heart, User, Zap, Scale, Trophy } from 'lucide-react';
import type { Question } from '@/types/quiz';

interface ImageChoiceProps {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'lose-weight': <Scale className="w-8 h-8" />,
  'build-muscle': <Dumbbell className="w-8 h-8" />,
  'get-toned': <Flame className="w-8 h-8" />,
  'improve-health': <Heart className="w-8 h-8" />,
  'slim': <User className="w-8 h-8" />,
  'athletic': <Zap className="w-8 h-8" />,
  'muscular': <Dumbbell className="w-8 h-8" />,
  'balanced': <Target className="w-8 h-8" />,
};

export function ImageChoice({ question, value, onChange }: ImageChoiceProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {question.options?.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08 }}
          onClick={() => onChange(option.value)}
          className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 text-center transition-all ${
            value === option.value
              ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {value === option.value && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
              value === option.value
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {iconMap[option.value] || <Trophy className="w-8 h-8" />}
          </div>
          <div>
            <span className="font-semibold text-gray-900">{option.label}</span>
            {option.description && (
              <p className="text-xs text-gray-500 mt-1">{option.description}</p>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
