import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedPage } from "../components/AnimatedPage";
import { GlassCard } from "../components/GlassCard";
import { SkeletonLoader } from "../components/SkeletonLoader";
import api from "../utils/api";
import { QrCode, User, Calendar, Shield, Download } from "lucide-react";

export const CardPage = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    api
      .get("/card")
      .then((res) => {
        setCard(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isActive = card?.cardDetails?.status === "active";
  const expiry = card?.cardDetails?.expiryDate
    ? new Date(card.cardDetails.expiryDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  if (loading) {
    return (
      <AnimatedPage className="py-12">
        <div className="max-w-lg mx-auto px-6">
          <SkeletonLoader className="h-[480px]" />
        </div>
      </AnimatedPage>
    );
  }

  if (!card) {
    return (
      <AnimatedPage className="py-24 text-center px-6">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          No Active Card
        </h2>
        <p className="text-text-secondary">
          Subscribe to a plan to get your digital membership card.
        </p>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="py-12">
      <div className="max-w-lg mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Digital <span className="text-gradient">Membership</span>
          </h1>
          <p className="text-text-secondary text-sm">
            Tap the card to flip. Show the QR code at the entrance.
          </p>
        </motion.div>

        <div
          className="perspective-1000 cursor-pointer"
          onClick={() => setFlipped(!flipped)}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full aspect-[1.586] preserve-3d"
          >
            {/* FRONT */}
            <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
              <div
                className={`w-full h-full p-6 md:p-8 flex flex-col justify-between relative ${
                  isActive
                    ? "bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/20"
                    : "bg-gradient-to-br from-neon-red/10 to-orange-500/10 border border-neon-red/20"
                }`}
                style={{
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                {/* Glow effects */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl" />

                {/* Scan line animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent animate-scan"
                    style={{ boxShadow: "0 0 20px rgba(0,240,255,0.4)" }}
                  />
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-text-muted uppercase">
                        FitFlow
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        isActive
                          ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                          : "bg-neon-red/10 text-neon-red border border-neon-red/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive
                            ? "bg-neon-green animate-pulse"
                            : "bg-neon-red"
                        }`}
                      />
                      {isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>
                  <QrCode className="w-6 h-6 text-text-muted" />
                </div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <p className="text-xs text-text-muted mb-1">MEMBER NAME</p>
                    <p className="text-lg md:text-xl font-bold text-text-primary tracking-wide">
                      {card.cardDetails.cardHolderName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-text-muted mb-1">EXPIRES</p>
                      <p className="text-sm font-medium text-text-primary flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {expiry}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-muted mb-1">TYPE</p>
                      <p className="text-sm font-medium text-text-primary">
                        PREMIUM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
              <div
                className="w-full h-full p-6 md:p-8 flex flex-col items-center justify-center relative bg-gradient-to-br from-bg-secondary to-bg-primary border border-white/10"
                style={{
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl" />

                <p className="text-xs text-text-muted mb-4 uppercase tracking-widest">
                  Scan for Entry
                </p>

                {card.url ? (
                  <img
                    src={card.url}
                    alt="Membership QR"
                    className="w-40 h-40 md:w-48 md:h-48 rounded-xl"
                  />
                ) : (
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl bg-white/5 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-text-muted" />
                  </div>
                )}

                <p className="text-xs text-text-muted mt-4 text-center max-w-[200px]">
                  Present this code at the reception for instant verification
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <User className="w-5 h-5 text-neon-cyan" />
            <div>
              <p className="text-xs text-text-muted">Member</p>
              <p className="text-sm font-medium text-text-primary">
                {card.cardDetails.cardHolderName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <Calendar className="w-5 h-5 text-neon-purple" />
            <div>
              <p className="text-xs text-text-muted">Valid Until</p>
              <p className="text-sm font-medium text-text-primary">{expiry}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <Shield className="w-5 h-5 text-neon-green" />
            <div>
              <p className="text-xs text-text-muted">Status</p>
              <p
                className={`text-sm font-medium ${
                  isActive ? "text-neon-green" : "text-neon-red"
                }`}
              >
                {card.cardDetails.status.toUpperCase()}
              </p>
            </div>
          </div>

          {card.url && (
            <a
              href={card.url}
              download="fitflow-membership-qr.png"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </a>
          )}
        </motion.div>
      </div>
    </AnimatedPage>
  );
};
