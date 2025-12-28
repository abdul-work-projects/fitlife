import { NextRequest, NextResponse } from 'next/server';

// This would use the Stripe SDK in production
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS = {
  monthly: 'price_monthly_example', // Replace with actual Stripe price IDs
  quarterly: 'price_quarterly_example',
  annual: 'price_annual_example',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, quizData } = body;

    // Validate input
    if (!plan || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production, create a Stripe checkout session:
    /*
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICE_IDS[plan as keyof typeof PRICE_IDS],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      customer_email: email,
      metadata: {
        // Store quiz data for post-purchase personalization
        fitnessGoal: quizData.userProfile.fitnessGoal,
        targetWeightKg: quizData.userProfile.goalWeightKg,
        currentWeightKg: quizData.userProfile.weightKg,
      },
      subscription_data: {
        trial_period_days: 7, // Optional trial period
      },
    });

    return NextResponse.json({ sessionUrl: session.url });
    */

    // Demo response
    return NextResponse.json({
      message: 'Demo mode - Stripe integration ready',
      sessionUrl: '/success',
      plan,
      email,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
