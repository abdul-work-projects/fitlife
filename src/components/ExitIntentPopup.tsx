'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Save } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export function ExitIntentPopup({ isOpen, onClose, onContinue }: ExitIntentPopupProps) {
  const { currentStep, totalSteps } = useQuizStore();
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold">Wait! Don&apos;t leave yet</h2>
                <p className="text-white/90 mt-2">
                  You&apos;re {progress}% through your personalized plan
                </p>
              </div>

              {/* Progress visualization */}
              <div className="p-6">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                        Your Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-emerald-600">
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-emerald-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-gray-600 text-sm">
                    Your progress has been saved. You can continue where you left off or come back
                    later.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={onContinue}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
                    >
                      Continue Quiz
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Save & Exit
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Your data is secure
                  </span>
                  <span>|</span>
                  <span>No spam, ever</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
