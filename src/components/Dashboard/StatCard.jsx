import { GlassCard } from "../GlassCard";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <GlassCard className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          color === "cyan"
            ? "bg-neon-cyan/10 border border-neon-cyan/20"
            : color === "purple"
              ? "bg-neon-purple/10 border border-neon-purple/20"
              : color === "green"
                ? "bg-neon-green/10 border border-neon-green/20"
                : "bg-neon-yellow/10 border border-neon-yellow/20"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            color === "cyan"
              ? "text-neon-cyan"
              : color === "purple"
                ? "text-neon-purple"
                : color === "green"
                  ? "text-neon-green"
                  : "text-neon-yellow"
          }`}
        />
      </div>
      <div>
        <p className="text-xs text-text-muted uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
    </GlassCard>
  </motion.div>
);

export default StatCard;
