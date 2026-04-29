import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { NeonButton } from "../NeonButton";

const PlanCard = ({ plan, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative rounded-2xl border p-6 h-full flex flex-col transition-shadow duration-300 
        
       border-neon-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]"
          
   `}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {plan.title}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-2">
            {plan.description}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-gradient"
            >
              {plan.price}
            </motion.span>
            <span className="text-text-muted">EGP</span>
          </div>
          <span className="text-sm text-text-secondary">
            for {plan.duration} days
          </span>
        </div>

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="w-4 h-4 text-neon-cyan" />
            <span>{plan.duration} days access</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="w-4 h-4 text-neon-purple" />
            <span>Men: {plan.datesMen}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="w-4 h-4 text-neon-green" />
            <span>Women: {plan.datesWomen}</span>
          </div>
        </div>

        <Link to={`/plans/${plan._id}`} className="mt-auto">
          <NeonButton variant={"ghost"} size="md" className="w-full">
            Subscribe <ArrowRight className="w-4 h-4" />
          </NeonButton>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PlanCard;
