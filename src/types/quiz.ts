export type UnitSystem = 'imperial' | 'metric';

export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'text'
  | 'number'
  | 'height'
  | 'weight'
  | 'date'
  | 'email'
  | 'slider'
  | 'image-choice';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  image?: string;
  description?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditionalDisplay?: {
    questionId: string;
    values: string[];
  };
}

export interface QuizAnswer {
  questionId: string;
  value: string | string[] | number;
}

export interface UserProfile {
  gender?: 'male' | 'female' | 'other';
  age?: number;
  heightCm?: number;
  weightKg?: number;
  goalWeightKg?: number;
  activityLevel?: string;
  fitnessGoal?: string;
  targetDate?: string;
  email?: string;
  name?: string;
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  healthyWeightMin: number;
  healthyWeightMax: number;
  weightToLose: number;
  weeklyWeightLoss: number;
  estimatedWeeks: number;
  isGoalRealistic: boolean;
  warnings: HealthWarning[];
}

export interface HealthWarning {
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, QuizAnswer>;
  userProfile: UserProfile;
  healthMetrics: HealthMetrics | null;
  unitSystem: UnitSystem;
  isCompleted: boolean;
  showExitIntent: boolean;
}
