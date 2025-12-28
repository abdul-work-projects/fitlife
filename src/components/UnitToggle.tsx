'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import type { UnitSystem } from '@/types/quiz';

export function UnitToggle() {
  const { unitSystem, setUnitSystem } = useQuizStore();

  const handleToggle = (system: UnitSystem) => {
    setUnitSystem(system);
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => handleToggle('imperial')}
        className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
          unitSystem === 'imperial' ? 'text-white' : 'text-gray-600'
        }`}
      >
        {unitSystem === 'imperial' && (
          <motion.div
            layoutId="unit-toggle"
            className="absolute inset-0 bg-emerald-500 rounded-full"
            initial={false}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10">lbs / ft</span>
      </button>
      <button
        onClick={() => handleToggle('metric')}
        className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
          unitSystem === 'metric' ? 'text-white' : 'text-gray-600'
        }`}
      >
        {unitSystem === 'metric' && (
          <motion.div
            layoutId="unit-toggle"
            className="absolute inset-0 bg-emerald-500 rounded-full"
            initial={false}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10">kg / cm</span>
      </button>
    </div>
  );
}
