import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizState, QuizAnswer, UserProfile, UnitSystem, HealthMetrics } from '@/types/quiz';
import { calculateHealthMetrics } from '@/utils/healthCalculations';

interface QuizStore extends QuizState {
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setAnswer: (answer: QuizAnswer) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setUnitSystem: (system: UnitSystem) => void;
  calculateMetrics: () => void;
  setShowExitIntent: (show: boolean) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

const TOTAL_STEPS = 30;

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      totalSteps: TOTAL_STEPS,
      answers: {},
      userProfile: {},
      healthMetrics: null,
      unitSystem: 'imperial',
      isCompleted: false,
      showExitIntent: false,

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      setAnswer: (answer) => {
        const { answers } = get();
        set({
          answers: {
            ...answers,
            [answer.questionId]: answer,
          },
        });
      },

      updateUserProfile: (profile) => {
        const { userProfile } = get();
        const updatedProfile = { ...userProfile, ...profile };
        set({ userProfile: updatedProfile });

        // Recalculate metrics if we have enough data
        if (updatedProfile.heightCm && updatedProfile.weightKg) {
          get().calculateMetrics();
        }
      },

      setUnitSystem: (system) => set({ unitSystem: system }),

      calculateMetrics: () => {
        const { userProfile } = get();
        if (userProfile.heightCm && userProfile.weightKg) {
          const metrics = calculateHealthMetrics(
            userProfile.heightCm,
            userProfile.weightKg,
            userProfile.goalWeightKg,
            userProfile.age,
            userProfile.gender
          );
          set({ healthMetrics: metrics });
        }
      },

      setShowExitIntent: (show) => set({ showExitIntent: show }),

      completeQuiz: () => set({ isCompleted: true }),

      resetQuiz: () =>
        set({
          currentStep: 0,
          answers: {},
          userProfile: {},
          healthMetrics: null,
          isCompleted: false,
          showExitIntent: false,
        }),
    }),
    {
      name: 'fitness-quiz-storage',
      partialize: (state) => ({
        answers: state.answers,
        userProfile: state.userProfile,
        unitSystem: state.unitSystem,
        currentStep: state.currentStep,
      }),
    }
  )
);
