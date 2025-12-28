'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { feetInchesToCm, cmToFeetInches, isValidHeight } from '@/utils/healthCalculations';
import { InlineWarning } from '@/components/HealthWarnings';
import { UnitToggle } from '@/components/UnitToggle';

interface HeightInputProps {
  value?: number; // Always stored in cm
  onChange: (valueCm: number) => void;
}

export function HeightInput({ value, onChange }: HeightInputProps) {
  const { unitSystem } = useQuizStore();
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      if (unitSystem === 'imperial') {
        const { feet: f, inches: i } = cmToFeetInches(value);
        setFeet(f.toString());
        setInches(i.toString());
      } else {
        setCm(value.toString());
      }
    }
  }, [value, unitSystem]);

  const handleImperialChange = (newFeet: string, newInches: string) => {
    setFeet(newFeet);
    setInches(newInches);

    const f = parseInt(newFeet, 10) || 0;
    const i = parseInt(newInches, 10) || 0;

    if (f > 0 || i > 0) {
      const heightCm = feetInchesToCm(f, i);
      const validation = isValidHeight(heightCm);

      if (!validation.valid) {
        setError(validation.message || 'Invalid height');
        return;
      }

      setError(null);
      onChange(heightCm);
    }
  };

  const handleMetricChange = (newCm: string) => {
    setCm(newCm);

    const heightCm = parseInt(newCm, 10);

    if (isNaN(heightCm)) {
      setError(null);
      return;
    }

    const validation = isValidHeight(heightCm);

    if (!validation.valid) {
      setError(validation.message || 'Invalid height');
      return;
    }

    setError(null);
    onChange(heightCm);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex justify-center">
        <UnitToggle />
      </div>

      {unitSystem === 'imperial' ? (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Feet</label>
            <input
              type="number"
              value={feet}
              onChange={(e) => handleImperialChange(e.target.value, inches)}
              placeholder="5"
              min="3"
              max="8"
              className={`w-full px-4 py-4 text-xl font-medium text-center border-2 rounded-xl focus:outline-none transition-colors ${
                error
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-emerald-500'
              }`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Inches</label>
            <input
              type="number"
              value={inches}
              onChange={(e) => handleImperialChange(feet, e.target.value)}
              placeholder="10"
              min="0"
              max="11"
              className={`w-full px-4 py-4 text-xl font-medium text-center border-2 rounded-xl focus:outline-none transition-colors ${
                error
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-emerald-500'
              }`}
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Centimeters</label>
          <input
            type="number"
            value={cm}
            onChange={(e) => handleMetricChange(e.target.value)}
            placeholder="178"
            min="100"
            max="250"
            className={`w-full px-4 py-4 text-xl font-medium text-center border-2 rounded-xl focus:outline-none transition-colors ${
              error
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-emerald-500'
            }`}
          />
        </div>
      )}

      {error && <InlineWarning message={error} type="error" />}
    </motion.div>
  );
}
