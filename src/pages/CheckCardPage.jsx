import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import { Shield, AlertTriangle, User, Calendar, ScanLine } from "lucide-react";

export const CheckCardPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("scanning"); // scanning | verified | failed
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/card/check/${token}`);
        setData(res.data.data);
        setStatus(res.data.data.status === "active" ? "verified" : "failed");
      } catch (err) {
        setError(err.message || "Invalid card");
        setStatus("failed");
      }
    };

    const timer = setTimeout(verify, 2500);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <div className="min-h-svh bg-bg-primary flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {status === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="relative w-64 h-64 mx-auto mb-8">
                {/* Outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-neon-cyan/20"
                />
                {/* Inner ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-neon-purple/20"
                />
                {/* Center scanner frame */}
                <div className="absolute inset-8 rounded-2xl border-2 border-neon-cyan/40 flex items-center justify-center overflow-hidden">
                  <ScanLine className="w-12 h-12 text-neon-cyan/60" />
                  {/* Animated scan line */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                    style={{ boxShadow: "0 0 20px rgba(0,240,255,0.5)" }}
                  />
                </div>
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-cyan" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-cyan" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-cyan" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Verifying Card
              </h2>
              <p className="text-text-secondary">
                Please hold while we validate the membership...
              </p>
            </motion.div>
          )}

          {status === "verified" && data && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="glass rounded-2xl p-8 border-neon-green/30 shadow-[0_0_60px_rgba(0,255,157,0.15)] text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/10 border-2 border-neon-green/40 flex items-center justify-center"
                >
                  <Shield className="w-10 h-10 text-neon-green" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-neon-green mb-2 neon-text-green">
                    Access Granted
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Membership is active and valid.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3 text-left"
                >
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neon-green/5 border border-neon-green/10">
                    <User className="w-5 h-5 text-neon-green" />
                    <div>
                      <p className="text-xs text-text-muted">Member</p>
                      <p className="text-sm font-medium text-text-primary">
                        {data.cardHolderName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neon-green/5 border border-neon-green/10">
                    <Calendar className="w-5 h-5 text-neon-green" />
                    <div>
                      <p className="text-xs text-text-muted">Expires</p>
                      <p className="text-sm font-medium text-text-primary">
                        {data.expiryDate
                          ? new Date(data.expiryDate).toLocaleDateString(
                              "en-GB",
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neon-green/5 border border-neon-green/10">
                    <Shield className="w-5 h-5 text-neon-green" />
                    <div>
                      <p className="text-xs text-text-muted">Status</p>
                      <p className="text-sm font-medium text-neon-green">
                        ACTIVE
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {status === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="glass rounded-2xl p-8 border-neon-red/30 shadow-[0_0_60px_rgba(255,45,85,0.15)] text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-red/10 border-2 border-neon-red/40 flex items-center justify-center"
                >
                  <AlertTriangle className="w-10 h-10 text-neon-red" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-neon-red mb-2">
                    Access Denied
                  </h2>
                  <p className="text-text-secondary mb-2">
                    {error || "This membership is invalid or has expired."}
                  </p>
                </motion.div>

                {data && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 p-3 rounded-xl bg-neon-red/5 border border-neon-red/10 text-left"
                  >
                    <p className="text-xs text-text-muted">Member</p>
                    <p className="text-sm font-medium text-text-primary">
                      {data.cardHolderName}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
