'use client';

import type { Question } from '@/types/quiz';
import {
  SingleChoice,
  MultipleChoice,
  ImageChoice,
  NumberInput,
  HeightInput,
  WeightInput,
  EmailInput,
  SliderInput,
} from './questions';

interface QuestionRendererProps {
  question: Question;
  value: string | string[] | number | undefined;
  onChange: (value: string | string[] | number) => void;
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  switch (question.type) {
    case 'single-choice':
      return (
        <SingleChoice
          question={question}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );

    case 'multiple-choice':
      return (
        <MultipleChoice
          question={question}
          value={value as string[]}
          onChange={onChange as (v: string[]) => void}
        />
      );

    case 'image-choice':
      return (
        <ImageChoice
          question={question}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );

    case 'number':
      return (
        <NumberInput
          question={question}
          value={value as number}
          onChange={onChange as (v: number) => void}
        />
      );

    case 'height':
      return (
        <HeightInput
          value={value as number}
          onChange={onChange as (v: number) => void}
        />
      );

    case 'weight':
      return (
        <WeightInput
          value={value as number}
          onChange={onChange as (v: number) => void}
          isGoalWeight={question.id === 'goal-weight'}
        />
      );

    case 'email':
      return (
        <EmailInput
          question={question}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );

    case 'slider':
      return (
        <SliderInput
          question={question}
          value={value as number}
          onChange={onChange as (v: number) => void}
        />
      );

    default:
      return <div>Unsupported question type: {question.type}</div>;
  }
}
