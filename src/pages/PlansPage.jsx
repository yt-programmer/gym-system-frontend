import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPage } from "../components/AnimatedPage";
import { SkeletonLoader } from "../components/SkeletonLoader";
import api from "../utils/api";
import { ArrowRight, Sparkles } from "lucide-react";
import PlanCard from "../components/PlansPage/PlanCard";

export const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/plans?limit=10&page=${page}`)
      .then((res) => {
        const fetchedPlans = res.data.data.plans;

        setPlans(fetchedPlans);
        setHasMore(fetchedPlans.length > 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const filteredPlans = plans.filter((p) => {
    if (filter === "short") return p.duration <= 30;
    if (filter === "long") return p.duration > 30;
    return true;
  });

  const filters = [
    { key: "all", label: "All Plans" },
    { key: "short", label: "Short Term" },
    { key: "long", label: "Long Term" },
  ];

  return (
    <AnimatedPage className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Subscription <span className="text-gradient">Plans</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose the perfect plan that fits your fitness goals and schedule.
          </p>
        </motion.div>

        {/* filters */}
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all ${
                filter === f.key
                  ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
                  : "bg-transparent border-white/10 text-text-secondary hover:border-white/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* content */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} className="h-96" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan, i) => (
                  <PlanCard key={plan._id} plan={plan} index={i} />
                ))
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-full flex flex-col items-center justify-center gap-4"
                >
                  <Sparkles className="w-12 h-12 text-neon-cyan" />
                  <h2 className="text-2xl font-semibold text-text-primary">
                    No Plans Found
                  </h2>
                </motion.div>
              )}

              {/* pagination */}
              <motion.div
                layout
                className="col-span-full flex items-center justify-center gap-4 mt-6"
              >
                {/* prev */}
                <button
                  onClick={() => setPage((prev) => (prev === 1 ? 1 : prev - 1))}
                  disabled={page === 1}
                  className="text-text-secondary disabled:text-text-secondary hover:text-text-primary"
                >
                  <ArrowRight className="w-6 h-6 rotate-180" />
                </button>

                <span className="text-text-secondary">{page}</span>

                {/* next */}
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!hasMore}
                  className="text-text-secondary disabled:text-text-secondary hover:text-text-primary"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};
