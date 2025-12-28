'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import type { HealthWarning } from '@/types/quiz';

interface HealthWarningsProps {
  warnings: HealthWarning[];
  onDismiss?: (index: number) => void;
}

export function HealthWarnings({ warnings, onDismiss }: HealthWarningsProps) {
  if (warnings.length === 0) return null;

  const getIcon = (type: HealthWarning['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 flex-shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  const getStyles = (type: HealthWarning['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColor = (type: HealthWarning['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-amber-500';
      case 'info':
        return 'text-blue-500';
    }
  };

  return (
    <AnimatePresence>
      <div className="space-y-3">
        {warnings.map((warning, index) => (
          <motion.div
            key={`${warning.type}-${index}`}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border ${getStyles(warning.type)}`}
          >
            <div className="flex gap-3">
              <span className={getIconColor(warning.type)}>{getIcon(warning.type)}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{warning.title}</h4>
                <p className="text-sm mt-1 opacity-90">{warning.message}</p>
              </div>
              {onDismiss && (
                <button
                  onClick={() => onDismiss(index)}
                  className="p-1 hover:bg-black/5 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

interface InlineWarningProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export function InlineWarning({ message, type = 'warning' }: InlineWarningProps) {
  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      case 'info':
        return 'text-blue-600';
    }
  };

  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-sm mt-2 flex items-center gap-1.5 ${getStyles()}`}
    >
      <AlertTriangle className="w-4 h-4" />
      {message}
    </motion.p>
  );
}
