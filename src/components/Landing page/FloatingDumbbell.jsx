import { motion } from "framer-motion";

import {
  Dumbbell,
  LayoutDashboard,
  CreditCard,
  QrCode,
  Menu,
  X,
  LogOut,
  User,
  LogIn,
} from "lucide-react";

const FloatingDumbbell = () => (
  <div className="relative w-72 h-72 md:w-96 md:h-96 perspective-1000">
    <motion.div
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-full h-full preserve-3d"
    >
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 200 140"
          className="w-full h-full drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]"
        >
          <defs>
            <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="50%" stopColor="#2d2d44" />
              <stop offset="100%" stopColor="#1a1a2e" />
            </linearGradient>
            <linearGradient id="neonBar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#b829dd" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Left weight */}
          <rect
            x="10"
            y="30"
            width="35"
            height="80"
            rx="6"
            fill="url(#metal)"
            stroke="rgba(0,240,255,0.3)"
            strokeWidth="1"
          />
          <rect
            x="18"
            y="38"
            width="19"
            height="64"
            rx="3"
            fill="none"
            stroke="rgba(0,240,255,0.15)"
            strokeWidth="1"
          />
          {/* Right weight */}
          <rect
            x="155"
            y="30"
            width="35"
            height="80"
            rx="6"
            fill="url(#metal)"
            stroke="rgba(184,41,221,0.3)"
            strokeWidth="1"
          />
          <rect
            x="163"
            y="38"
            width="19"
            height="64"
            rx="3"
            fill="none"
            stroke="rgba(184,41,221,0.15)"
            strokeWidth="1"
          />
          {/* Handle bar */}
          <rect
            x="42"
            y="58"
            width="116"
            height="24"
            rx="12"
            fill="url(#neonBar)"
          />
          <rect
            x="50"
            y="64"
            width="100"
            height="12"
            rx="6"
            fill="rgba(0,0,0,0.3)"
          />
        </svg>
      </motion.div>
    </motion.div>
    {/* Glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-neon-cyan/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-neon-purple/20 rounded-full blur-3xl" />
  </div>
);

export default FloatingDumbbell;
