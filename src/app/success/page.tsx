'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useQuizStore } from '@/store/quizStore';

export default function SuccessPage() {
  const { userProfile, resetQuiz } = useQuizStore();

  useEffect(() => {
    // Clear quiz data after showing success
    // In production, you might want to keep it for analytics
    const timer = setTimeout(() => {
      resetQuiz();
    }, 30000); // Reset after 30 seconds

    return () => clearTimeout(timer);
  }, [resetQuiz]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Welcome to FitLife!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Your personalized fitness plan is being prepared. We&apos;ve sent the details to{' '}
          <span className="font-semibold text-gray-900">
            {userProfile.email || 'your email'}
          </span>
          .
        </motion.p>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
        >
          <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Check your inbox</p>
                <p className="text-sm text-gray-500">
                  We&apos;ve sent your login credentials and getting started guide
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Download the app</p>
                <p className="text-sm text-gray-500">
                  Get our mobile app for workout tracking and meal logging
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Start your first workout</p>
                <p className="text-sm text-gray-500">
                  Your personalized plan is ready to go!
                </p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Back to home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
