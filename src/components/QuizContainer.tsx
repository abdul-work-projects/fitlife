'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { questions, shouldShowQuestion } from '@/data/questions';
import { ProgressBar } from './ProgressBar';
import { QuestionRenderer } from './QuestionRenderer';
import { HealthWarnings } from './HealthWarnings';
import { ExitIntentPopup } from './ExitIntentPopup';
import type { Question } from '@/types/quiz';

export function QuizContainer() {
  const router = useRouter();
  const {
    currentStep,
    answers,
    userProfile,
    healthMetrics,
    showExitIntent,
    setCurrentStep,
    setAnswer,
    updateUserProfile,
    calculateMetrics,
    setShowExitIntent,
    completeQuiz,
  } = useQuizStore();

  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter questions based on conditional logic
  const visibleQuestions = questions.filter((q) => shouldShowQuestion(q, answers));
  const totalSteps = visibleQuestions.length;
  const currentQuestion = visibleQuestions[currentStep];

  // Get current answer
  const currentAnswer = currentQuestion ? answers[currentQuestion.id]?.value : undefined;

  // Check if current answer is valid
  const isAnswerValid = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;

    if (currentAnswer === undefined || currentAnswer === null) return false;

    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length > 0;
    }

    if (typeof currentAnswer === 'string') {
      return currentAnswer.trim() !== '';
    }

    if (typeof currentAnswer === 'number') {
      return !isNaN(currentAnswer);
    }

    return true;
  };

  // Handle answer change
  const handleAnswerChange = (value: string | string[] | number) => {
    if (!currentQuestion) return;

    setAnswer({ questionId: currentQuestion.id, value });

    // Update user profile for specific questions
    switch (currentQuestion.id) {
      case 'gender':
        updateUserProfile({ gender: value as 'male' | 'female' | 'other' });
        break;
      case 'age':
        updateUserProfile({ age: value as number });
        break;
      case 'height':
        updateUserProfile({ heightCm: value as number });
        break;
      case 'current-weight':
        updateUserProfile({ weightKg: value as number });
        break;
      case 'goal-weight':
        updateUserProfile({ goalWeightKg: value as number });
        calculateMetrics();
        break;
      case 'email':
        updateUserProfile({ email: value as string });
        break;
      case 'activity-level':
        updateUserProfile({ activityLevel: value as string });
        break;
      case 'fitness-goal':
        updateUserProfile({ fitnessGoal: value as string });
        break;
    }
  };

  // Handle next
  const handleNext = async () => {
    if (!isAnswerValid()) return;

    // Auto-advance for single choice questions
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - complete quiz and redirect to checkout
      setIsSubmitting(true);
      completeQuiz();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/checkout');
    }
  };

  // Handle back
  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
      // First step - show exit intent
      setShowExitIntent(true);
    }
  };

  // Exit intent detection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && currentStep > 2) {
        setShowExitIntent(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [currentStep, setShowExitIntent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isAnswerValid()) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, currentAnswer]);

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FitLife Quiz
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            {/* Question header */}
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900"
              >
                {currentQuestion.title}
              </motion.h1>
              {currentQuestion.subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-500"
                >
                  {currentQuestion.subtitle}
                </motion.p>
              )}
            </div>

            {/* Health warnings */}
            {healthMetrics && healthMetrics.warnings.length > 0 && (
              <HealthWarnings warnings={healthMetrics.warnings} />
            )}

            {/* Question input */}
            <div className="mt-8">
              <QuestionRenderer
                question={currentQuestion}
                value={currentAnswer}
                onChange={handleAnswerChange}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <button
            onClick={handleNext}
            disabled={!isAnswerValid() || isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              isAnswerValid() && !isSubmitting
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating your plan...
              </>
            ) : currentStep === totalSteps - 1 ? (
              <>
                Get My Plan
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Keyboard hint */}
          {isAnswerValid() && !isSubmitting && (
            <p className="text-center text-sm text-gray-400 mt-3">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">Enter</kbd> to
              continue
            </p>
          )}
        </motion.div>
      </main>

      {/* Exit intent popup */}
      <ExitIntentPopup
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
        onContinue={() => setShowExitIntent(false)}
      />
    </div>
  );
}
