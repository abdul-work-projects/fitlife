'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Check,
  Zap,
  Trophy,
  Calendar,
  Shield,
  ArrowRight,
  Star,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';
import { kgToLbs } from '@/utils/healthCalculations';

export default function CheckoutPage() {
  const router = useRouter();
  const { userProfile, healthMetrics, unitSystem, isCompleted } = useQuizStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  // Redirect if quiz not completed
  useEffect(() => {
    if (!isCompleted && !userProfile.email) {
      router.push('/');
    }
  }, [isCompleted, userProfile, router]);

  const formatWeight = (kg: number | undefined) => {
    if (!kg) return '--';
    return unitSystem === 'imperial' ? `${Math.round(kgToLbs(kg))} lbs` : `${kg} kg`;
  };

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Monthly',
      price: 29.99,
      period: '/month',
      features: ['Full workout program', 'Meal planning', 'Progress tracking'],
    },
    {
      id: 'quarterly' as const,
      name: 'Quarterly',
      price: 19.99,
      period: '/month',
      totalPrice: 59.97,
      savings: '33%',
      popular: true,
      features: ['Full workout program', 'Meal planning', 'Progress tracking', '1-on-1 coaching call'],
    },
    {
      id: 'annual' as const,
      name: 'Annual',
      price: 12.49,
      period: '/month',
      totalPrice: 149.88,
      savings: '58%',
      features: [
        'Full workout program',
        'Meal planning',
        'Progress tracking',
        'Monthly coaching calls',
        'Priority support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What happens after I sign up?',
      answer:
        'You\'ll get immediate access to your personalized workout and nutrition plan. Our app will guide you through every step of your transformation.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes! You can cancel your subscription at any time with no hidden fees. We believe in earning your loyalty, not locking you in.',
    },
    {
      question: 'Is this plan really personalized?',
      answer:
        'Absolutely. Your plan is built based on your quiz answers, including your goals, preferences, schedule, and any health considerations you mentioned.',
    },
    {
      question: 'What if the plan doesn\'t work for me?',
      answer:
        'We offer a 30-day money-back guarantee. If you\'re not seeing results or satisfied for any reason, we\'ll refund your purchase - no questions asked.',
    },
  ];

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Simulate Stripe checkout
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, this would create a Stripe checkout session
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     plan: selectedPlan,
    //     email: userProfile.email,
    //     quizData: { userProfile, healthMetrics },
    //   }),
    // });
    // const { sessionUrl } = await response.json();
    // window.location.href = sessionUrl;

    alert('Demo: Stripe checkout would open here. In production, this redirects to Stripe.');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FitLife
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Results Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Personalized Plan is Ready!
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your answers, we&apos;ve created a custom fitness and nutrition program designed
              to help you reach your goals.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Current Weight</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatWeight(userProfile.weightKg)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Goal Weight</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatWeight(userProfile.goalWeightKg)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">To Lose</p>
              <p className="text-2xl font-bold text-gray-900">
                {healthMetrics
                  ? formatWeight(Math.abs(healthMetrics.weightToLose))
                  : '--'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Timeline</p>
              <p className="text-2xl font-bold text-gray-900">
                {healthMetrics ? `${healthMetrics.estimatedWeeks} weeks` : '--'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Plan Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Choose Your Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.button
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                  selectedPlan === plan.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {selectedPlan === plan.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>

                {plan.savings && (
                  <p className="text-emerald-600 text-sm font-semibold mt-1">
                    Save {plan.savings}
                  </p>
                )}

                {plan.totalPrice && (
                  <p className="text-gray-500 text-sm mt-1">
                    ${plan.totalPrice} billed{' '}
                    {plan.id === 'quarterly' ? 'every 3 months' : 'annually'}
                  </p>
                )}

                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Personalized Workouts</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Tailored to your fitness level, goals, and available equipment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Nutrition Guidance</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Meal plans that respect your dietary preferences and restrictions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Monitor your transformation with detailed analytics and insights
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Button */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mb-12"
        >
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              'Processing...'
            ) : (
              <>
                Start Your Transformation
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              Secure checkout
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              30-day guarantee
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Success Stories
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Sarah M.',
                result: 'Lost 32 lbs in 4 months',
                quote:
                  'The personalized approach made all the difference. I finally found a program that fits my busy lifestyle.',
              },
              {
                name: 'Mike T.',
                result: 'Gained 15 lbs of muscle',
                quote:
                  'Clear, effective workouts that actually work. The meal plans are easy to follow and delicious.',
              },
              {
                name: 'Jennifer L.',
                result: 'Dropped 4 dress sizes',
                quote:
                  'I was skeptical at first, but the results speak for themselves. Best investment in my health.',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-emerald-600 text-sm font-medium">{testimonial.result}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {showFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {showFAQ === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>30-day money-back guarantee • Cancel anytime • Secure payment</p>
          <p className="mt-2">© 2024 FitLife. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
