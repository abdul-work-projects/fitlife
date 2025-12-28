import type { HealthMetrics, HealthWarning } from '@/types/quiz';

export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): HealthMetrics['bmiCategory'] {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export function getHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: Math.round(18.5 * heightM * heightM),
    max: Math.round(24.9 * heightM * heightM),
  };
}

export function calculateHealthMetrics(
  heightCm: number,
  weightKg: number,
  goalWeightKg?: number,
  age?: number,
  gender?: 'male' | 'female' | 'other'
): HealthMetrics {
  const bmi = calculateBMI(heightCm, weightKg);
  const bmiCategory = getBMICategory(bmi);
  const healthyRange = getHealthyWeightRange(heightCm);
  const warnings: HealthWarning[] = [];

  // Calculate weight to lose
  const targetWeight = goalWeightKg || healthyRange.max;
  const weightToLose = weightKg - targetWeight;

  // Calculate safe weekly weight loss (0.5-1 kg per week is safe)
  const safeWeeklyLoss = 0.75; // kg per week
  const estimatedWeeks = Math.ceil(Math.abs(weightToLose) / safeWeeklyLoss);

  // Determine if goal is realistic
  let isGoalRealistic = true;

  // Generate warnings based on health metrics
  if (bmi < 16) {
    warnings.push({
      type: 'error',
      title: 'Severely Underweight',
      message:
        'Your current BMI indicates you may be severely underweight. We strongly recommend consulting a healthcare professional before starting any fitness program.',
    });
    isGoalRealistic = false;
  } else if (bmi < 18.5) {
    warnings.push({
      type: 'warning',
      title: 'Underweight Notice',
      message:
        'Your BMI suggests you may be underweight. Focus on building muscle and maintaining a healthy calorie intake.',
    });
  }

  if (bmi > 40) {
    warnings.push({
      type: 'warning',
      title: 'Health Consideration',
      message:
        'Based on your BMI, we recommend consulting with a healthcare provider to create a safe weight loss plan tailored to your needs.',
    });
  }

  // Goal weight validation
  if (goalWeightKg) {
    const goalBMI = calculateBMI(heightCm, goalWeightKg);

    if (goalBMI < 17) {
      warnings.push({
        type: 'error',
        title: 'Goal Weight Too Low',
        message: `A goal weight of ${goalWeightKg}kg would put your BMI at ${goalBMI.toFixed(1)}, which is dangerously low. The minimum healthy weight for your height is ${healthyRange.min}kg.`,
      });
      isGoalRealistic = false;
    } else if (goalBMI < 18.5) {
      warnings.push({
        type: 'warning',
        title: 'Low Goal Weight Alert',
        message: `Your goal weight would result in a BMI of ${goalBMI.toFixed(1)}, which is below the healthy range. Consider a goal weight of at least ${healthyRange.min}kg.`,
      });
    }

    // Check if trying to lose too much too fast
    const percentageLoss = ((weightKg - goalWeightKg) / weightKg) * 100;
    if (percentageLoss > 20) {
      warnings.push({
        type: 'info',
        title: 'Ambitious Goal',
        message:
          'Losing more than 20% of body weight requires sustained commitment. Consider setting intermediate milestones.',
      });
    }

    // Check if goal is too aggressive (more than 1kg/week needed)
    const weeksToGoal = estimatedWeeks;
    const requiredWeeklyLoss = Math.abs(weightToLose) / 12; // Assuming 12-week program
    if (requiredWeeklyLoss > 1) {
      warnings.push({
        type: 'warning',
        title: 'Pace Advisory',
        message: `Reaching your goal in 12 weeks would require losing ${requiredWeeklyLoss.toFixed(1)}kg/week. Safe weight loss is 0.5-1kg per week. We recommend ${weeksToGoal} weeks for sustainable results.`,
      });
    }
  }

  // Age-specific warnings
  if (age) {
    if (age < 18) {
      warnings.push({
        type: 'info',
        title: 'Youth Fitness',
        message:
          'For individuals under 18, we recommend focusing on overall fitness rather than weight loss. Parental guidance is advised.',
      });
    } else if (age > 65) {
      warnings.push({
        type: 'info',
        title: 'Senior Wellness',
        message:
          'For individuals over 65, we emphasize strength training and mobility alongside any weight management goals.',
      });
    }
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    healthyWeightMin: healthyRange.min,
    healthyWeightMax: healthyRange.max,
    weightToLose: Math.round(weightToLose * 10) / 10,
    weeklyWeightLoss: safeWeeklyLoss,
    estimatedWeeks,
    isGoalRealistic,
    warnings,
  };
}

// Unit conversion utilities
export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function kgToLbs(kg: number): number {
  return kg / 0.453592;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

// Validation utilities
export function isValidWeight(weightKg: number): { valid: boolean; message?: string } {
  if (weightKg < 30) {
    return { valid: false, message: 'Weight seems too low. Please check your input.' };
  }
  if (weightKg > 300) {
    return { valid: false, message: 'Weight seems unusually high. Please verify.' };
  }
  return { valid: true };
}

export function isValidHeight(heightCm: number): { valid: boolean; message?: string } {
  if (heightCm < 100) {
    return { valid: false, message: 'Height seems too low. Please check your input.' };
  }
  if (heightCm > 250) {
    return { valid: false, message: 'Height seems unusually high. Please verify.' };
  }
  return { valid: true };
}

export function isValidAge(age: number): { valid: boolean; message?: string } {
  if (age < 13) {
    return { valid: false, message: 'You must be at least 13 years old to use this program.' };
  }
  if (age > 100) {
    return { valid: false, message: 'Please enter a valid age.' };
  }
  return { valid: true };
}
