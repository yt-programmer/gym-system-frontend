import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPage } from "../components/AnimatedPage";
import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import { SkeletonLoader } from "../components/SkeletonLoader";
import api from "../utils/api";
import {
  CheckCircle,
  CreditCard,
  User,
  ShoppingCart,
  Loader2,
  Sparkles,
} from "lucide-react";

const steps = [
  { label: "Select Plan", icon: ShoppingCart },
  { label: "Fill Details", icon: User },
  { label: "Payment", icon: CreditCard },
];

export const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("planId");

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!planId) {
      navigate("/plans");
      return;
    }
    api
      .get(`/plans/${planId}`)
      .then((res) => {
        setPlan(res.data.data.plan);
        setLoading(false);
      })
      .catch(() => navigate("/plans"));
  }, [planId, navigate]);

  const handleProceedToPayment = async () => {
    setProcessing(true);
    setError("");
    try {
      const res = await api.post("/pay", { planId });
      setPaymentUrl(res.data.data.paymentUrl);
      setStep(3);
    } catch (err) {
      setError(err.message || "Failed to initiate payment");
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <AnimatedPage className="py-24 flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <GlassCard glow="green" className="p-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-neon-green" />
            </motion.div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Payment Successful!
            </h2>
            <p className="text-text-secondary mb-6">
              Your subscription is now active. You can view your digital
              membership card.
            </p>
            <NeonButton
              variant="green"
              size="md"
              onClick={() => navigate("/card")}
            >
              View My Card
            </NeonButton>
          </GlassCard>
        </motion.div>
      </AnimatedPage>
    );
  }

  if (loading) {
    return (
      <AnimatedPage className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <SkeletonLoader className="h-12 mb-6" />
          <SkeletonLoader className="h-80" />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => {
            const isActive = i + 1 === step;
            const isDone = i + 1 < step;
            return (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(0, 240, 255, 0.15)"
                        : isDone
                          ? "rgba(0, 255, 157, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: isActive
                        ? "rgba(0, 240, 255, 0.4)"
                        : isDone
                          ? "rgba(0, 255, 157, 0.4)"
                          : "rgba(255, 255, 255, 0.1)",
                    }}
                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                  >
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-neon-green" />
                    ) : (
                      <s.icon
                        className={`w-5 h-5 ${
                          isActive ? "text-neon-cyan" : "text-text-muted"
                        }`}
                      />
                    )}
                  </motion.div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      isActive ? "text-neon-cyan" : "text-text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-16 h-px bg-white/10 mx-2 mb-5" />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard glow="cyan">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Order Summary
                </h2>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {plan.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-neon-green" />
                        {plan.duration} days
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gradient">
                      {plan.price}
                    </span>
                    <span className="text-text-muted text-sm"> EGP</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10 mb-6">
                  <span className="text-text-secondary">Total</span>
                  <span className="text-2xl font-bold text-gradient">
                    {plan.price} EGP
                  </span>
                </div>
                <NeonButton
                  variant="cyan"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  Continue to Details
                </NeonButton>
              </GlassCard>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard glow="purple">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Confirm & Pay
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-text-muted mb-1">Plan</p>
                    <p className="font-medium text-text-primary">
                      {plan.title}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-text-muted mb-1">Amount</p>
                    <p className="font-medium text-text-primary">
                      {plan.price} EGP
                    </p>
                  </div>
                </div>
                {error && (
                  <p className="text-neon-red text-sm text-center mb-4">
                    {error}
                  </p>
                )}
                <div className="flex gap-3">
                  <NeonButton
                    variant="ghost"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </NeonButton>
                  <NeonButton
                    variant="purple"
                    size="lg"
                    className="flex-1"
                    onClick={handleProceedToPayment}
                    disabled={processing}
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Pay with Paymob
                      </span>
                    )}
                  </NeonButton>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === 3 && paymentUrl && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard glow="cyan" className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-text-primary">
                    Secure Payment
                  </h2>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Waiting for payment...
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <iframe
                    src={paymentUrl}
                    className="w-full h-[600px]"
                    title="Paymob Payment"
                  />
                </div>
                <p className="text-xs text-text-muted text-center mt-4">
                  Complete the payment in the iframe above. You'll be redirected
                  automatically.
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
};
