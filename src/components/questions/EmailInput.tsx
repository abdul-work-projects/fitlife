'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import type { Question } from '@/types/quiz';
import { InlineWarning } from '@/components/HealthWarnings';

interface EmailInputProps {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
}

export function EmailInput({ question, value, onChange }: EmailInputProps) {
  const [localValue, setLocalValue] = useState(value || '');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    if (val === '') {
      setError(null);
      setIsValid(false);
      return;
    }

    if (validateEmail(val)) {
      setError(null);
      setIsValid(true);
      onChange(val);
    } else {
      setError('Please enter a valid email address');
      setIsValid(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Mail className="w-5 h-5" />
        </div>
        <input
          type="email"
          value={localValue}
          onChange={handleChange}
          placeholder={question.placeholder}
          className={`w-full pl-12 pr-12 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors ${
            error
              ? 'border-red-300 focus:border-red-500'
              : isValid
              ? 'border-emerald-300 focus:border-emerald-500'
              : 'border-gray-200 focus:border-emerald-500'
          }`}
        />
        {isValid && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {error && <InlineWarning message={error} type="error" />}

      <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-600">
          Your email is secure with us. We&apos;ll send your personalized plan and won&apos;t spam you.
        </p>
      </div>
    </motion.div>
  );
}
