'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Question } from '@/types/quiz';
import { InlineWarning } from '@/components/HealthWarnings';

interface NumberInputProps {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}

export function NumberInput({ question, value, onChange }: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value?.toString() || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    if (val === '') {
      setError(null);
      return;
    }

    const numValue = parseInt(val, 10);

    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }

    if (question.validation) {
      if (question.validation.min && numValue < question.validation.min) {
        setError(question.validation.message || `Minimum value is ${question.validation.min}`);
        return;
      }
      if (question.validation.max && numValue > question.validation.max) {
        setError(question.validation.message || `Maximum value is ${question.validation.max}`);
        return;
      }
    }

    setError(null);
    onChange(numValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="relative">
        <input
          type="number"
          value={localValue}
          onChange={handleChange}
          placeholder={question.placeholder}
          min={question.validation?.min}
          max={question.validation?.max}
          className={`w-full px-4 py-4 text-xl font-medium text-center border-2 rounded-xl focus:outline-none transition-colors ${
            error
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-emerald-500'
          }`}
        />
        {question.unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {question.unit}
          </span>
        )}
      </div>
      {error && <InlineWarning message={error} type="error" />}
    </motion.div>
  );
}
