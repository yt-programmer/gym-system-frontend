import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedPage } from "../components/AnimatedPage";
import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";
import {
  Clock,
  Calendar,
  CheckCircle,
  ArrowRight,
  Dumbbell,
  Shield,
  Zap,
  Users,
  CreditCard,
} from "lucide-react";
import AnimatedPrice from "../components/AnimatedPrice";

export const PlanDetailsPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user, isSubscribed } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/plans/${planId}`)
      .then((res) => {
        setPlan(res.data.data.plan);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [planId]);

  const benefits = [
    { icon: Dumbbell, text: "Full gym equipment access" },
    { icon: Clock, text: `${plan?.duration || 0} days unlimited entry` },
    { icon: Shield, text: "Digital membership card" },
    { icon: Zap, text: "Instant activation after payment" },
    { icon: Users, text: "Separate schedules for men & women" },
    { icon: CreditCard, text: "Secure online payment" },
  ];

  const handleSubscribe = () => {
    if (!user) {
      navigate("/login", {
        state: { from: { pathname: `/checkout?planId=${planId}` } },
      });
    } else if (isSubscribed) {
      navigate("/card");
    } else {
      navigate(`/checkout?planId=${planId}`);
    }
  };

  if (loading) {
    return (
      <AnimatedPage className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <SkeletonLoader className="h-96 mb-6" />
          <SkeletonLoader className="h-48" />
        </div>
      </AnimatedPage>
    );
  }

  if (!plan) {
    return (
      <AnimatedPage className="py-24 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Plan Not Found
        </h2>
        <NeonButton variant="cyan" onClick={() => navigate("/plans")}>
          Back to Plans
        </NeonButton>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard glow="cyan" className="mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-purple/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-medium mb-4">
                {plan.duration} Days Plan
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {plan.title}
              </h1>
              <p className="text-text-secondary mb-8 max-w-xl">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <AnimatedPrice price={plan.price} />
                <span className="text-xl text-text-muted">EGP</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-5 h-5 text-neon-cyan" />
                  <div>
                    <p className="text-xs text-text-muted">Men Schedule</p>
                    <p className="text-sm font-medium text-text-primary">
                      {plan.datesMen}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="text-xs text-text-muted">Women Schedule</p>
                    <p className="text-sm font-medium text-text-primary">
                      {plan.datesWomen}
                    </p>
                  </div>
                </div>
              </div>

              <NeonButton
                variant="cyan"
                size="lg"
                onClick={handleSubscribe}
                className="w-full sm:w-auto"
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-2">
                    View My Card <ArrowRight className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe Now <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </NeonButton>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard>
            <h2 className="text-xl font-bold text-text-primary mb-6">
              What's Included
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 text-neon-green" />
                  </div>
                  <span className="text-sm text-text-secondary">{b.text}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};
