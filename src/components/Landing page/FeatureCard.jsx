import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    <GlassCard glow="cyan" className="h-full" tilt>
      <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-neon-cyan" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
    </GlassCard>
  </motion.div>
);

export default FeatureCard;
