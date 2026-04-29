import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedPage } from "../components/AnimatedPage";
import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import { SkeletonLoader } from "../components/SkeletonLoader";
import api from "../utils/api";
import {
  Dumbbell,
  CreditCard,
  QrCode,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Star,
  ChevronRight,
  Palette,
  Sparkles,
} from "lucide-react";

import TestimonialCard from "../components/Landing page/TestimonialCard";
import FloatingDumbbell from "../components/Landing page/FloatingDumbbell";
import PricingCard from "../components/Landing page/PricingCard";
import FeatureCard from "../components/Landing page/FeatureCard";

export const LandingPage = () => {
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  useEffect(() => {
    api
      .get("/plans?limit=3")
      .then((res) => {
        setPlans(res.data.data.plans.slice(0, 3));
        setPlansLoading(false);
      })
      .catch(() => setPlansLoading(false));
  }, []);

  const features = [
    {
      icon: CreditCard,
      title: "Online Payments",
      desc: "Secure checkout with Paymob integration. Pay instantly and start your journey without delays.",
    },
    {
      icon: QrCode,
      title: "Digital Membership",
      desc: "Get your virtual gym card with a unique QR code. No physical cards needed ever again.",
    },
    {
      icon: Shield,
      title: "QR Verification",
      desc: "Staff scan your code for instant access verification. Fast, secure, and contactless entry.",
    },
    {
      icon: Zap,
      title: "Instant Activation",
      desc: "Your membership activates immediately after payment. Start training the same day.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      desc: "Monitor your subscription status, renewal dates, and payment history in one place.",
    },
    {
      icon: Dumbbell,
      title: "Flexible Plans",
      desc: "Choose from multiple durations and schedules tailored for men and women.",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed K.",
      role: "Member since 2024",
      text: "The digital card is a game changer. I just show my phone at the entrance and I'm in. The whole process took less than 5 minutes.",
    },
    {
      name: "Sara M.",
      role: "Premium Member",
      text: "I love how seamless the payment was. The Paymob integration works flawlessly, and the dark UI looks absolutely stunning.",
    },
    {
      name: "Omar H.",
      role: "Monthly Subscriber",
      text: "Finally a gym that understands modern tech. The QR verification is fast and the membership management is crystal clear.",
    },
  ];

  return (
    <AnimatedPage>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[calc(100svh-4rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div style={{ y: heroY }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-medium mb-6">
                <Zap className="w-3 h-3" />
                Next-Gen Gym Experience
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Transform Your <span className="text-gradient">Body.</span>
                <br />
                Track Your <span className="text-gradient">Progress.</span>
                <br />
                Go{" "}
                <span className="text-neon-cyan neon-text-cyan">Digital.</span>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                The premium fitness platform with online payments, digital
                membership cards, and instant QR verification.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/plans">
                  <NeonButton variant="cyan" size="lg">
                    Join Now <ArrowRight className="w-5 h-5" />
                  </NeonButton>
                </Link>
                <Link to="/plans">
                  <NeonButton variant="ghost" size="lg">
                    View Plans
                  </NeonButton>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <FloatingDumbbell />
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose <span className="text-gradient">FitFlow</span>?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Everything you need for a modern fitness experience, built with
              cutting-edge technology and premium design.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING PREVIEW ─── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Choose Your <span className="text-gradient">Plan</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Flexible subscription options designed to fit your schedule and
              goals.
            </p>
          </motion.div>

          {plansLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonLoader key={i} className="h-64" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 perspective-1000">
              {plans && plans.length > 0 ? (
                plans.map((plan, i) => (
                  <PricingCard key={plan._id} plan={plan} />
                ))
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-full flex flex-col items-center justify-center gap-4"
                >
                  <Sparkles className="w-12 h-12 text-neon-cyan" />
                  <h2 className="text-2xl font-semibold text-text-primary">
                    No Plans Found
                  </h2>
                </motion.div>
              )}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/plans">
              <NeonButton variant="ghost" size="md">
                View All Plans <ArrowRight className="w-4 h-4" />
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Loved by <span className="text-gradient">Athletes</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Hear from our community of members who transformed their fitness
              journey with FitFlow.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard
              glow="purple"
              className="text-center p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl -z-10" />
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Join thousands of members who have already gone digital. Your
                transformation begins with a single click.
              </p>
              <Link to="/plans">
                <NeonButton variant="cyan" size="lg">
                  Get Started Now <ArrowRight className="w-5 h-5" />
                </NeonButton>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
};
