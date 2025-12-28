'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { lbsToKg, kgToLbs, isValidWeight, getHealthyWeightRange } from '@/utils/healthCalculations';
import { InlineWarning } from '@/components/HealthWarnings';
import { UnitToggle } from '@/components/UnitToggle';

interface WeightInputProps {
  value?: number; // Always stored in kg
  onChange: (valueKg: number) => void;
  isGoalWeight?: boolean;
}

export function WeightInput({ value, onChange, isGoalWeight = false }: WeightInputProps) {
  const { unitSystem, userProfile, healthMetrics } = useQuizStore();
  const [localValue, setLocalValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      if (unitSystem === 'imperial') {
        setLocalValue(Math.round(kgToLbs(value)).toString());
      } else {
        setLocalValue(value.toString());
      }
    }
  }, [value, unitSystem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    setError(null);
    setSuggestion(null);

    if (val === '') {
      return;
    }

    const numValue = parseFloat(val);

    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }

    const weightKg = unitSystem === 'imperial' ? lbsToKg(numValue) : numValue;
    const validation = isValidWeight(weightKg);

    if (!validation.valid) {
      setError(validation.message || 'Invalid weight');
      return;
    }

    // If this is goal weight, validate against healthy range
    if (isGoalWeight && userProfile.heightCm) {
      const healthyRange = getHealthyWeightRange(userProfile.heightCm);

      if (weightKg < healthyRange.min) {
        const minDisplay = unitSystem === 'imperial'
          ? `${Math.round(kgToLbs(healthyRange.min))} lbs`
          : `${healthyRange.min} kg`;
        setError(`Goal weight is below healthy range. Minimum recommended: ${minDisplay}`);

        // Still allow the change but show the warning
        onChange(weightKg);
        return;
      }

      if (weightKg < healthyRange.min * 0.9) {
        setSuggestion(
          `Consider a goal weight of at least ${
            unitSystem === 'imperial'
              ? `${Math.round(kgToLbs(healthyRange.min))} lbs`
              : `${healthyRange.min} kg`
          } for optimal health.`
        );
      }
    }

    // Check if trying to gain weight when goal is to lose
    if (isGoalWeight && userProfile.weightKg && weightKg > userProfile.weightKg) {
      setSuggestion(
        "Your goal weight is higher than your current weight. Is muscle building your goal?"
      );
    }

    onChange(weightKg);
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

      <div className="relative">
        <input
          type="number"
          value={localValue}
          onChange={handleChange}
          placeholder={unitSystem === 'imperial' ? '150' : '68'}
          className={`w-full px-4 py-4 text-xl font-medium text-center border-2 rounded-xl focus:outline-none transition-colors ${
            error
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-emerald-500'
          }`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {unitSystem === 'imperial' ? 'lbs' : 'kg'}
        </span>
      </div>

      {error && <InlineWarning message={error} type="error" />}
      {suggestion && !error && <InlineWarning message={suggestion} type="info" />}

      {/* Show healthy weight range if we have height data */}
      {isGoalWeight && userProfile.heightCm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Healthy weight range for your height: </span>
            {unitSystem === 'imperial'
              ? `${Math.round(kgToLbs(getHealthyWeightRange(userProfile.heightCm).min))} - ${Math.round(kgToLbs(getHealthyWeightRange(userProfile.heightCm).max))} lbs`
              : `${getHealthyWeightRange(userProfile.heightCm).min} - ${getHealthyWeightRange(userProfile.heightCm).max} kg`}
          </p>
        </div>
      )}
    </motion.div>
  );
}
