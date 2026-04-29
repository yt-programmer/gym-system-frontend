import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { NeonButton } from "../NeonButton";
import { ChevronRight } from "lucide-react";

const PricingCard = ({ plan, popular = false }) => (
  <motion.div
    whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`relative rounded-2xl p-6 border transition-all duration-300 ${
      popular
        ? "bg-neon-cyan/5 border-neon-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]"
        : "glass border-white/8"
    }`}
    style={{ transformStyle: "preserve-3d" }}
  >
    {popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neon-cyan text-bg-primary text-xs font-bold">
        Most Popular
      </div>
    )}
    <h3 className="text-lg font-semibold text-text-primary mb-2">
      {plan.title}
    </h3>
    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
      {plan.description}
    </p>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-3xl font-bold text-gradient">{plan.price}</span>
      <span className="text-text-muted text-sm">EGP</span>
      <span className="text-text-muted text-sm">/ {plan.duration} days</span>
    </div>
    <Link to={`/plans/${plan._id}`}>
      <NeonButton
        variant={popular ? "cyan" : "ghost"}
        size="sm"
        className="w-full"
      >
        View Details <ChevronRight className="w-4 h-4" />
      </NeonButton>
    </Link>
  </motion.div>
);

export default PricingCard;
