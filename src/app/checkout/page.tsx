'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Check,
  Shield,
  ArrowRight,
  Star,
  Lock,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Apple,
  TrendingDown,
  Target,
  Clock,
  Users,
  Award,
  Sparkles,
  Heart,
  Play,
  Flame,
} from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';
import { kgToLbs } from '@/utils/healthCalculations';

export default function CheckoutPage() {
  const router = useRouter();
  const { userProfile, healthMetrics, unitSystem, isCompleted } = useQuizStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      features: ['Personalized workout plan', 'Custom meal planning', 'Progress tracking', 'Exercise library'],
    },
    {
      id: 'quarterly' as const,
      name: '3 Months',
      price: 19.99,
      period: '/month',
      totalPrice: 59.97,
      savings: '33%',
      popular: true,
      features: [
        'Everything in Monthly',
        '1-on-1 coaching call',
        'Recipe database access',
        'Community support',
        'Weekly check-ins',
      ],
    },
    {
      id: 'annual' as const,
      name: '12 Months',
      price: 12.49,
      period: '/month',
      totalPrice: 149.88,
      savings: '58%',
      features: [
        'Everything in Quarterly',
        'Monthly coaching calls',
        'Priority support',
        'Exclusive content',
        'Lifetime updates',
        'Bonus workout packs',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What happens after I sign up?',
      answer:
        "You'll get immediate access to your personalized workout and nutrition plan. Our app will guide you through every step of your transformation journey.",
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        "Yes! You can cancel your subscription at any time with no hidden fees. We believe in earning your loyalty, not locking you in.",
    },
    {
      question: 'Is this plan really personalized?',
      answer:
        'Absolutely. Your plan is built based on your quiz answers, including your goals, preferences, schedule, and any health considerations you mentioned.',
    },
    {
      question: "What if the plan doesn't work for me?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not seeing results or satisfied for any reason, we'll refund your purchase - no questions asked.",
    },
  ];

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Demo: Stripe checkout would open here. In production, this redirects to Stripe.');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FitLife
              </span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold border border-red-100">
              <Clock className="w-4 h-4" />
              <span>
                {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline">left for this offer</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-12 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Your personalized plan is ready
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Transform Your Body in{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {healthMetrics?.estimatedWeeks || 12} Weeks
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Join 50,000+ members who have transformed their lives with our science-backed,
              personalized fitness programs.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold">50K+ Members</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold">95% Success Rate</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transformation Summary */}
        <section className="px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Your Transformation Journey
              </h2>

              <div className="grid md:grid-cols-3 gap-6 items-center">
                {/* Current State */}
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Now</p>
                      <p className="text-xl font-bold text-gray-700">
                        {formatWeight(userProfile.weightKg)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Current Weight</p>
                </div>

                {/* Arrow Progress */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-16 bg-gradient-to-r from-gray-200 to-emerald-500 rounded-full" />
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <TrendingDown className="w-6 h-6 text-white" />
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-gray-200 rounded-full" />
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20">
                    -{formatWeight(healthMetrics ? Math.abs(healthMetrics.weightToLose) : 0)}
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    in {healthMetrics?.estimatedWeeks || '--'} weeks
                  </p>
                </div>

                {/* Goal State */}
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <div className="text-center">
                      <Target className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <p className="text-xl font-bold text-emerald-600">
                        {formatWeight(userProfile.goalWeightKg)}
                      </p>
                    </div>
                  </div>
                  <p className="text-emerald-600 text-sm font-medium">Goal Weight</p>
                </div>
              </div>

              {/* Mobile Progress */}
              <div className="md:hidden flex justify-center mt-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg shadow-emerald-500/30">
                  Lose {formatWeight(healthMetrics ? Math.abs(healthMetrics.weightToLose) : 0)} in{' '}
                  {healthMetrics?.estimatedWeeks || '--'} weeks
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What You Get */}
        <section className="px-4 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-4"
            >
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Succeed
              </span>
            </motion.h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Get access to professional-grade fitness tools and personalized guidance
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Dumbbell,
                  title: 'Custom Workouts',
                  desc: 'Tailored to your level and equipment',
                  color: 'bg-emerald-500',
                  lightColor: 'bg-emerald-50',
                },
                {
                  icon: Apple,
                  title: 'Meal Plans',
                  desc: 'Delicious recipes for your diet',
                  color: 'bg-orange-500',
                  lightColor: 'bg-orange-50',
                },
                {
                  icon: Flame,
                  title: 'Progress Tracking',
                  desc: 'Watch your transformation unfold',
                  color: 'bg-blue-500',
                  lightColor: 'bg-blue-50',
                },
                {
                  icon: Heart,
                  title: 'Coach Support',
                  desc: 'Expert guidance when you need it',
                  color: 'bg-pink-500',
                  lightColor: 'bg-pink-50',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${feature.lightColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all group`}
                >
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
              <p className="text-gray-500">Start your transformation today. Cancel anytime.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.button
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left p-6 rounded-3xl border-2 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-xl shadow-emerald-500/10 scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                  } ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30">
                        BEST VALUE
                      </span>
                    </div>
                  )}

                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>

                  {plan.savings && (
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full mb-4">
                      SAVE {plan.savings}
                    </span>
                  )}

                  <div className="mb-4 mt-2">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>

                  {plan.totalPrice && (
                    <p className="text-gray-400 text-sm mb-4">
                      ${plan.totalPrice} billed {plan.id === 'quarterly' ? 'quarterly' : 'annually'}
                    </p>
                  )}

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`w-full py-3 rounded-xl font-semibold text-center transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-8 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-5 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  Start My Transformation
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                256-bit SSL
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                30-day guarantee
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-4"
            >
              Real Results from Real People
            </motion.h2>
            <p className="text-gray-500 text-center mb-12">
              Join thousands who have transformed their lives
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Sarah M.',
                  age: 34,
                  result: 'Lost 32 lbs in 4 months',
                  quote:
                    'The personalized approach made all the difference. I finally found a program that fits my busy lifestyle as a working mom.',
                  avatar: 'S',
                  color: 'from-pink-400 to-rose-500',
                },
                {
                  name: 'Mike T.',
                  age: 28,
                  result: 'Gained 15 lbs of muscle',
                  quote:
                    'Clear, effective workouts that actually work. The meal plans are easy to follow and the results speak for themselves.',
                  avatar: 'M',
                  color: 'from-blue-400 to-cyan-500',
                },
                {
                  name: 'Jennifer L.',
                  age: 42,
                  result: 'Dropped 4 dress sizes',
                  quote:
                    "I was skeptical at first, but within 8 weeks I could see real changes. Best investment I've ever made in my health.",
                  avatar: 'J',
                  color: 'from-purple-400 to-violet-500',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center font-bold text-lg text-white shadow-lg`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}, {testimonial.age}
                      </p>
                      <p className="text-emerald-600 text-sm font-medium">{testimonial.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {showFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {showFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-5 pb-5"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-16 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/30"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Life?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of members who have already started their fitness journey with
                FitLife.
              </p>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl inline-flex items-center gap-2 group"
              >
                {isProcessing ? 'Processing...' : 'Get Started Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/60 text-sm mt-4">30-day money-back guarantee</p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">FitLife</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span>30-day money-back guarantee</span>
              <span className="hidden sm:inline">•</span>
              <span>Cancel anytime</span>
              <span className="hidden sm:inline">•</span>
              <span>Secure payment</span>
            </div>
            <p className="text-gray-400 text-sm">© 2024 FitLife</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
