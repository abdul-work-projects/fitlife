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
  Dumbbell,
  Apple,
  TrendingDown,
  Target,
  Clock,
  Users,
  Award,
  Sparkles,
  Play,
  Heart,
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
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-teal-500/20 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-gray-950/80">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FitLife</span>
            </div>
            <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>
                Offer expires in {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-12 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Your personalized plan is ready
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Transform Your Body in{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {healthMetrics?.estimatedWeeks || 12} Weeks
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
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
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">50K+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">95% Success Rate</span>
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
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold text-center mb-8">Your Transformation Journey</h2>

              <div className="grid md:grid-cols-3 gap-6 items-center">
                {/* Current State */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700/50 border-2 border-gray-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-400">Now</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Current Weight</p>
                  <p className="text-2xl font-bold">{formatWeight(userProfile.weightKg)}</p>
                </div>

                {/* Arrow Progress */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-gray-600 to-emerald-500" />
                    <TrendingDown className="w-8 h-8 text-emerald-400" />
                    <div className="h-0.5 w-12 bg-gradient-to-r from-emerald-500 to-gray-600" />
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">
                    -{formatWeight(healthMetrics ? Math.abs(healthMetrics.weightToLose) : 0)}
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    in {healthMetrics?.estimatedWeeks || '--'} weeks
                  </p>
                </div>

                {/* Goal State */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-2 border-emerald-500 flex items-center justify-center">
                    <Target className="w-10 h-10 text-emerald-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Goal Weight</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {formatWeight(userProfile.goalWeightKg)}
                  </p>
                </div>
              </div>

              {/* Mobile Progress */}
              <div className="md:hidden flex justify-center mt-6">
                <div className="bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-semibold">
                  Lose {formatWeight(healthMetrics ? Math.abs(healthMetrics.weightToLose) : 0)} in{' '}
                  {healthMetrics?.estimatedWeeks || '--'} weeks
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What You Get */}
        <section className="px-4 py-12 bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Dumbbell,
                  title: 'Custom Workouts',
                  desc: 'Tailored to your level and equipment',
                  color: 'from-emerald-500 to-teal-500',
                },
                {
                  icon: Apple,
                  title: 'Meal Plans',
                  desc: 'Delicious recipes for your diet',
                  color: 'from-orange-500 to-amber-500',
                },
                {
                  icon: TrendingDown,
                  title: 'Progress Tracking',
                  desc: 'Watch your transformation unfold',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Heart,
                  title: 'Coach Support',
                  desc: 'Expert guidance when you need it',
                  color: 'from-pink-500 to-rose-500',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-gray-400">Start your transformation today. Cancel anytime.</p>
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
                      ? 'border-emerald-500 bg-emerald-500/10 scale-[1.02]'
                      : 'border-white/10 bg-gray-900/50 hover:border-white/20'
                  } ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/25">
                        BEST VALUE
                      </span>
                    </div>
                  )}

                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>

                  {plan.savings && (
                    <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full mb-4">
                      SAVE {plan.savings}
                    </span>
                  )}

                  <div className="mb-4 mt-2">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  {plan.totalPrice && (
                    <p className="text-gray-500 text-sm mb-4">
                      ${plan.totalPrice} billed {plan.id === 'quarterly' ? 'quarterly' : 'annually'}
                    </p>
                  )}

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`w-full py-3 rounded-xl font-semibold text-center ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'bg-white/10 text-white'
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
        <section className="px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-5 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:from-emerald-400 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
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

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                256-bit SSL
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                30-day guarantee
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-16 bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-4"
            >
              Real Results from Real People
            </motion.h2>
            <p className="text-gray-400 text-center mb-12">
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
                  color: 'from-pink-500 to-rose-500',
                },
                {
                  name: 'Mike T.',
                  age: 28,
                  result: 'Gained 15 lbs of muscle',
                  quote:
                    'Clear, effective workouts that actually work. The meal plans are easy to follow and the results speak for themselves.',
                  avatar: 'M',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  name: 'Jennifer L.',
                  age: 42,
                  result: 'Dropped 4 dress sizes',
                  quote:
                    "I was skeptical at first, but within 8 weeks I could see real changes. Best investment I've ever made in my health.",
                  avatar: 'J',
                  color: 'from-purple-500 to-violet-500',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center font-bold text-lg`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {testimonial.name}, {testimonial.age}
                      </p>
                      <p className="text-emerald-400 text-sm font-medium">{testimonial.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
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
                  className="bg-gray-900/50 backdrop-blur rounded-2xl border border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-medium text-lg">{faq.question}</span>
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
                      <p className="text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Life?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of members who have already started their fitness journey with
                FitLife.
              </p>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2 group"
              >
                {isProcessing ? 'Processing...' : 'Get Started Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/60 text-sm mt-4">No credit card required to start</p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">FitLife</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span>30-day money-back guarantee</span>
              <span>•</span>
              <span>Cancel anytime</span>
              <span>•</span>
              <span>Secure payment</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 FitLife. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
