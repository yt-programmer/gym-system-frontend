import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedPrice = ({ price }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = price;
    const duration = 1200;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [price]);

  return (
    <motion.span
      key={price}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-5xl md:text-6xl font-bold text-gradient"
    >
      {count}
    </motion.span>
  );
};

export default AnimatedPrice;
