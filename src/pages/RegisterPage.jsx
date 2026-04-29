import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import { AnimatedPage } from "../components/AnimatedPage";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="min-h-[calc(100svh-4rem)] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassCard glow="purple" className="p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center">
              <UserPlus className="w-7 h-7 text-neon-purple" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Create Account
            </h1>
            <p className="text-text-secondary text-sm">
              Start your fitness journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-neon-red text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <NeonButton
              type="submit"
              variant="purple"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </NeonButton>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-neon-purple hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </AnimatedPage>
  );
};
