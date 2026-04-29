import { motion } from "framer-motion";

import { Star } from "lucide-react";
import { GlassCard } from "../GlassCard";

const TestimonialCard = ({ name, role, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <GlassCard className="h-full">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-neon-yellow text-neon-yellow" />
        ))}
      </div>
      <p className="text-text-secondary text-sm mb-6 leading-relaxed">
        "{text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{name}</p>
          <p className="text-xs text-text-muted">{role}</p>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

export default TestimonialCard;
