'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Question } from '@/types/quiz';

interface SliderInputProps {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}

export function SliderInput({ question, value, onChange }: SliderInputProps) {
  const min = question.min || 1;
  const max = question.max || 10;
  const [localValue, setLocalValue] = useState(value || Math.floor((min + max) / 2));

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalValue(val);
    onChange(val);
  };

  const getLabel = () => {
    if (localValue <= 3) return 'Low';
    if (localValue <= 6) return 'Moderate';
    return 'High';
  };

  const getColor = () => {
    if (localValue <= 3) return 'emerald';
    if (localValue <= 6) return 'amber';
    return 'red';
  };

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-600',
      light: 'bg-emerald-100',
    },
    amber: {
      bg: 'bg-amber-500',
      text: 'text-amber-600',
      light: 'bg-amber-100',
    },
    red: {
      bg: 'bg-red-500',
      text: 'text-red-600',
      light: 'bg-red-100',
    },
  };

  const colors = colorClasses[getColor()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          key={localValue}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.light}`}
        >
          <span className={`text-3xl font-bold ${colors.text}`}>{localValue}</span>
        </motion.div>
        <p className={`mt-2 font-medium ${colors.text}`}>{getLabel()} Stress</p>
      </div>

      <div className="px-4">
        <input
          type="range"
          min={min}
          max={max}
          step={question.step || 1}
          value={localValue}
          onChange={handleChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-500"
          style={{
            background: `linear-gradient(to right, #10b981 0%, #10b981 ${
              ((localValue - min) / (max - min)) * 100
            }%, #e5e7eb ${((localValue - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Low ({min})</span>
          <span>High ({max})</span>
        </div>
      </div>
    </motion.div>
  );
}
