import type { Question } from '@/types/quiz';

export const questions: Question[] = [
  // Section 1: Goals & Motivation (Questions 1-5)
  {
    id: 'fitness-goal',
    type: 'image-choice',
    title: 'What is your primary fitness goal?',
    subtitle: 'Choose the goal that matters most to you right now',
    required: true,
    options: [
      { id: 'lose-weight', label: 'Lose Weight', value: 'lose-weight', description: 'Shed extra pounds and feel lighter' },
      { id: 'build-muscle', label: 'Build Muscle', value: 'build-muscle', description: 'Gain strength and muscle mass' },
      { id: 'get-toned', label: 'Get Toned', value: 'get-toned', description: 'Define muscles and look lean' },
      { id: 'improve-health', label: 'Improve Health', value: 'improve-health', description: 'Better overall wellness' },
    ],
  },
  {
    id: 'target-body',
    type: 'image-choice',
    title: 'Which body type represents your goal?',
    subtitle: 'Select the physique you\'re working towards',
    required: true,
    options: [
      { id: 'slim', label: 'Slim & Lean', value: 'slim', description: 'Light and toned' },
      { id: 'athletic', label: 'Athletic', value: 'athletic', description: 'Fit and defined' },
      { id: 'muscular', label: 'Muscular', value: 'muscular', description: 'Strong and built' },
      { id: 'balanced', label: 'Balanced', value: 'balanced', description: 'Healthy and proportionate' },
    ],
  },
  {
    id: 'motivation',
    type: 'multiple-choice',
    title: 'What motivates you to get in shape?',
    subtitle: 'Select all that apply',
    required: true,
    options: [
      { id: 'health', label: 'Better health', value: 'health' },
      { id: 'confidence', label: 'More confidence', value: 'confidence' },
      { id: 'energy', label: 'More energy', value: 'energy' },
      { id: 'event', label: 'Upcoming event', value: 'event' },
      { id: 'medical', label: 'Medical reasons', value: 'medical' },
      { id: 'lifestyle', label: 'Lifestyle change', value: 'lifestyle' },
    ],
  },
  {
    id: 'past-attempts',
    type: 'single-choice',
    title: 'Have you tried to reach your fitness goals before?',
    required: true,
    options: [
      { id: 'never', label: 'This is my first time', value: 'never' },
      { id: 'once', label: 'Once or twice', value: 'once' },
      { id: 'several', label: 'Several times', value: 'several' },
      { id: 'many', label: 'Many times', value: 'many' },
    ],
  },
  {
    id: 'obstacles',
    type: 'multiple-choice',
    title: 'What obstacles have held you back?',
    subtitle: 'Select all that apply',
    required: true,
    conditionalDisplay: {
      questionId: 'past-attempts',
      values: ['once', 'several', 'many'],
    },
    options: [
      { id: 'time', label: 'Lack of time', value: 'time' },
      { id: 'motivation', label: 'Lost motivation', value: 'motivation' },
      { id: 'diet', label: 'Couldn\'t stick to diet', value: 'diet' },
      { id: 'results', label: 'Didn\'t see results', value: 'results' },
      { id: 'injury', label: 'Injury or health issues', value: 'injury' },
      { id: 'knowledge', label: 'Didn\'t know what to do', value: 'knowledge' },
    ],
  },

  // Section 2: Personal Information (Questions 6-10)
  {
    id: 'gender',
    type: 'single-choice',
    title: 'What is your biological sex?',
    subtitle: 'This helps us personalize your program',
    required: true,
    options: [
      { id: 'male', label: 'Male', value: 'male' },
      { id: 'female', label: 'Female', value: 'female' },
      { id: 'other', label: 'Prefer not to say', value: 'other' },
    ],
  },
  {
    id: 'age',
    type: 'number',
    title: 'How old are you?',
    subtitle: 'Your age helps us tailor workouts to your body',
    placeholder: 'Enter your age',
    required: true,
    validation: {
      min: 13,
      max: 100,
      message: 'Please enter a valid age between 13 and 100',
    },
  },
  {
    id: 'height',
    type: 'height',
    title: 'What is your height?',
    subtitle: 'We\'ll use this to calculate your ideal metrics',
    required: true,
  },
  {
    id: 'current-weight',
    type: 'weight',
    title: 'What is your current weight?',
    subtitle: 'Be honest - this is just between us',
    required: true,
  },
  {
    id: 'goal-weight',
    type: 'weight',
    title: 'What is your goal weight?',
    subtitle: 'Where would you like to be?',
    required: true,
  },

  // Section 3: Current Lifestyle (Questions 11-16)
  {
    id: 'activity-level',
    type: 'single-choice',
    title: 'How active are you currently?',
    required: true,
    options: [
      { id: 'sedentary', label: 'Sedentary', value: 'sedentary', description: 'Little to no exercise' },
      { id: 'light', label: 'Lightly Active', value: 'light', description: '1-2 workouts per week' },
      { id: 'moderate', label: 'Moderately Active', value: 'moderate', description: '3-4 workouts per week' },
      { id: 'very', label: 'Very Active', value: 'very', description: '5+ workouts per week' },
    ],
  },
  {
    id: 'daily-activity',
    type: 'single-choice',
    title: 'How would you describe your typical day?',
    required: true,
    options: [
      { id: 'desk', label: 'Mostly sitting (desk job)', value: 'desk' },
      { id: 'standing', label: 'On my feet (retail, teaching)', value: 'standing' },
      { id: 'walking', label: 'Walking around (sales, nursing)', value: 'walking' },
      { id: 'physical', label: 'Physically demanding (construction, sports)', value: 'physical' },
    ],
  },
  {
    id: 'workout-preference',
    type: 'multiple-choice',
    title: 'What types of workouts do you enjoy?',
    subtitle: 'Select all that interest you',
    required: true,
    options: [
      { id: 'strength', label: 'Strength training', value: 'strength' },
      { id: 'cardio', label: 'Cardio (running, cycling)', value: 'cardio' },
      { id: 'hiit', label: 'HIIT workouts', value: 'hiit' },
      { id: 'yoga', label: 'Yoga/Pilates', value: 'yoga' },
      { id: 'sports', label: 'Sports', value: 'sports' },
      { id: 'none', label: 'I\'m open to anything', value: 'none' },
    ],
  },
  {
    id: 'workout-duration',
    type: 'single-choice',
    title: 'How much time can you dedicate to workouts?',
    required: true,
    options: [
      { id: '15', label: '15-20 minutes', value: '15' },
      { id: '30', label: '30-45 minutes', value: '30' },
      { id: '60', label: '45-60 minutes', value: '60' },
      { id: '90', label: '60+ minutes', value: '90' },
    ],
  },
  {
    id: 'workout-frequency',
    type: 'single-choice',
    title: 'How many days per week can you work out?',
    required: true,
    options: [
      { id: '2', label: '2-3 days', value: '2' },
      { id: '4', label: '4-5 days', value: '4' },
      { id: '6', label: '6-7 days', value: '6' },
    ],
  },
  {
    id: 'equipment',
    type: 'single-choice',
    title: 'What equipment do you have access to?',
    required: true,
    options: [
      { id: 'none', label: 'No equipment', value: 'none' },
      { id: 'basic', label: 'Basic (dumbbells, bands)', value: 'basic' },
      { id: 'home', label: 'Home gym', value: 'home' },
      { id: 'full', label: 'Full gym membership', value: 'full' },
    ],
  },

  // Section 4: Diet & Nutrition (Questions 17-22)
  {
    id: 'diet-style',
    type: 'single-choice',
    title: 'How would you describe your current eating habits?',
    required: true,
    options: [
      { id: 'unhealthy', label: 'Could use improvement', value: 'unhealthy' },
      { id: 'average', label: 'Average, some healthy choices', value: 'average' },
      { id: 'healthy', label: 'Mostly healthy', value: 'healthy' },
      { id: 'strict', label: 'Very strict and disciplined', value: 'strict' },
    ],
  },
  {
    id: 'diet-restrictions',
    type: 'multiple-choice',
    title: 'Do you have any dietary restrictions?',
    subtitle: 'Select all that apply',
    required: true,
    options: [
      { id: 'none', label: 'No restrictions', value: 'none' },
      { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
      { id: 'vegan', label: 'Vegan', value: 'vegan' },
      { id: 'gluten', label: 'Gluten-free', value: 'gluten' },
      { id: 'dairy', label: 'Dairy-free', value: 'dairy' },
      { id: 'keto', label: 'Keto/Low-carb', value: 'keto' },
    ],
  },
  {
    id: 'meals-per-day',
    type: 'single-choice',
    title: 'How many meals do you typically eat per day?',
    required: true,
    options: [
      { id: '1-2', label: '1-2 meals', value: '1-2' },
      { id: '3', label: '3 meals', value: '3' },
      { id: '4-5', label: '4-5 smaller meals', value: '4-5' },
      { id: 'irregular', label: 'Irregular/snacking', value: 'irregular' },
    ],
  },
  {
    id: 'water-intake',
    type: 'single-choice',
    title: 'How much water do you drink daily?',
    required: true,
    options: [
      { id: 'little', label: 'Less than 4 glasses', value: 'little' },
      { id: 'moderate', label: '4-6 glasses', value: 'moderate' },
      { id: 'good', label: '6-8 glasses', value: 'good' },
      { id: 'excellent', label: 'More than 8 glasses', value: 'excellent' },
    ],
  },
  {
    id: 'biggest-diet-challenge',
    type: 'single-choice',
    title: 'What\'s your biggest nutrition challenge?',
    required: true,
    options: [
      { id: 'portions', label: 'Portion control', value: 'portions' },
      { id: 'cravings', label: 'Sugar/junk food cravings', value: 'cravings' },
      { id: 'planning', label: 'Meal planning/prep time', value: 'planning' },
      { id: 'emotional', label: 'Emotional eating', value: 'emotional' },
      { id: 'social', label: 'Social situations', value: 'social' },
    ],
  },
  {
    id: 'cooking',
    type: 'single-choice',
    title: 'How comfortable are you with cooking?',
    required: true,
    options: [
      { id: 'none', label: 'I don\'t cook', value: 'none' },
      { id: 'basic', label: 'Basic recipes only', value: 'basic' },
      { id: 'confident', label: 'Comfortable in the kitchen', value: 'confident' },
      { id: 'chef', label: 'I love cooking', value: 'chef' },
    ],
  },

  // Section 5: Health & Limitations (Questions 23-26)
  {
    id: 'health-conditions',
    type: 'multiple-choice',
    title: 'Do you have any health conditions we should know about?',
    subtitle: 'Select all that apply - this helps us keep you safe',
    required: true,
    options: [
      { id: 'none', label: 'No health conditions', value: 'none' },
      { id: 'back', label: 'Back problems', value: 'back' },
      { id: 'knee', label: 'Knee issues', value: 'knee' },
      { id: 'heart', label: 'Heart condition', value: 'heart' },
      { id: 'diabetes', label: 'Diabetes', value: 'diabetes' },
      { id: 'other', label: 'Other condition', value: 'other' },
    ],
  },
  {
    id: 'sleep',
    type: 'single-choice',
    title: 'How many hours of sleep do you get per night?',
    required: true,
    options: [
      { id: 'poor', label: 'Less than 5 hours', value: 'poor' },
      { id: 'fair', label: '5-6 hours', value: 'fair' },
      { id: 'good', label: '7-8 hours', value: 'good' },
      { id: 'excellent', label: 'More than 8 hours', value: 'excellent' },
    ],
  },
  {
    id: 'stress-level',
    type: 'slider',
    title: 'How would you rate your stress level?',
    subtitle: 'Drag the slider to indicate your typical stress level',
    min: 1,
    max: 10,
    step: 1,
    required: true,
  },
  {
    id: 'energy-level',
    type: 'single-choice',
    title: 'How would you describe your typical energy levels?',
    required: true,
    options: [
      { id: 'low', label: 'Often tired', value: 'low' },
      { id: 'moderate', label: 'Ups and downs', value: 'moderate' },
      { id: 'good', label: 'Generally good', value: 'good' },
      { id: 'high', label: 'High energy', value: 'high' },
    ],
  },

  // Section 6: Timeline & Commitment (Questions 27-29)
  {
    id: 'target-date',
    type: 'single-choice',
    title: 'When do you want to reach your goal?',
    required: true,
    options: [
      { id: '1month', label: 'In 1 month', value: '1month' },
      { id: '3months', label: 'In 3 months', value: '3months' },
      { id: '6months', label: 'In 6 months', value: '6months' },
      { id: '1year', label: 'In 1 year', value: '1year' },
      { id: 'nodate', label: 'No specific date', value: 'nodate' },
    ],
  },
  {
    id: 'commitment',
    type: 'single-choice',
    title: 'How committed are you to making a change?',
    required: true,
    options: [
      { id: 'exploring', label: 'Just exploring options', value: 'exploring' },
      { id: 'ready', label: 'Ready to start soon', value: 'ready' },
      { id: 'committed', label: 'Fully committed', value: 'committed' },
      { id: 'urgent', label: 'This is my top priority', value: 'urgent' },
    ],
  },
  {
    id: 'coach-support',
    type: 'single-choice',
    title: 'Would you like personalized coaching support?',
    required: true,
    options: [
      { id: 'self', label: 'I prefer to work independently', value: 'self' },
      { id: 'some', label: 'Some guidance would help', value: 'some' },
      { id: 'coach', label: 'I want a dedicated coach', value: 'coach' },
    ],
  },

  // Section 7: Contact (Question 30)
  {
    id: 'email',
    type: 'email',
    title: 'Where should we send your personalized plan?',
    subtitle: 'Enter your email to receive your customized fitness program',
    placeholder: 'your@email.com',
    required: true,
    validation: {
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      message: 'Please enter a valid email address',
    },
  },
];

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function shouldShowQuestion(
  question: Question,
  answers: Record<string, { value: string | string[] | number }>
): boolean {
  if (!question.conditionalDisplay) return true;

  const { questionId, values } = question.conditionalDisplay;
  const answer = answers[questionId];

  if (!answer) return false;

  if (Array.isArray(answer.value)) {
    return answer.value.some((v) => values.includes(v));
  }

  return values.includes(String(answer.value));
}
