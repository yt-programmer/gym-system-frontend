import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Pencil, Trash } from "lucide-react";
import { GlassCard } from "../GlassCard";
import PlanModel from "./PlanModel";
import api from "../../utils/api";
import toast from "react-hot-toast";

const PlansTable = ({
  plans,
  page,
  setPage,
  hasMore,
  setPlans,
  fetchStats,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);

  const handleSubmit = async (data) => {
    try {
      if (selectedPlan) {
        const res = await api.patch(`/plans/${selectedPlan._id}`, data);

        const updated = res.data.data.plans;

        setPlans(updated);
        toast.success("Plan updated successfully");
      } else {
        // CREATE
        const res = await api.post("/plans", data);

        const newPlans = res.data.data.plans;

        setPlans(newPlans);
        toast.success("Plan created successfully");
      }

      setOpen(false);
      setSelectedPlan(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      fetchStats();
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/plans/${id}`);

      setPlans((prev) => prev.filter((p) => p._id !== id));

      toast.success("Plan deleted successfully");
      fetchStats();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard className="mt-8">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Available Plans
            </h3>

            <button
              onClick={() => {
                setSelectedPlan(null);
                setOpen(true);
              }}
              className="bg-neon-cyan/10 transition-all duration-500
              rounded-lg text-neon-cyan border-neon-cyan/30
              hover:bg-neon-cyan/20 px-4 py-2 text-sm font-semibold"
            >
              Add Plan
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-xs text-text-muted uppercase">
                      Title
                    </th>
                    <th className="pb-3 pr-3  pl-3 text-xs text-text-muted uppercase">
                      Price
                    </th>
                    <th className="pb-3 text-xs text-text-muted uppercase">
                      duration
                    </th>
                    <th className="pb-3 pr-3 text-end text-xs text-text-muted uppercase">
                      edit & deletes
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {Array.isArray(plans) &&
                    plans.map((plan) => (
                      <tr
                        key={plan._id}
                        className="border-b border-white/5 hover:bg-white/[0.02]"
                      >
                        <td className="py-3 text-text-primary flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white text-xs font-bold">
                            {plan.title?.[0]}
                          </div>
                          {plan.title}
                        </td>

                        <td className="py-3 pl-3 pr-3 text-text-secondary">
                          {plan.price}
                        </td>

                        <td className="py-3 text-text-secondary">
                          {plan.duration || "—"}
                        </td>

                        <td className="py-3 pr-3 flex gap-3 justify-end">
                          <button
                            onClick={() => {
                              setSelectedPlan(plan);
                              setOpen(true);
                            }}
                            className="bg-neon-cyan text-bg-primary px-2 py-1 rounded"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(plan._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <motion.div
              layout
              className="flex items-center justify-center gap-4 mt-6"
            >
              <button
                onClick={() => setPage((prev) => (prev === 1 ? 1 : prev - 1))}
                disabled={page === 1}
                className="text-text-secondary disabled:text-text-secondary hover:text-text-primary"
              >
                <ArrowRight className="w-6 h-6 rotate-180" />
              </button>

              <span className="text-text-secondary">{page}</span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore}
                className="text-text-secondary disabled:text-text-secondary hover:text-text-primary"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {open && (
        <PlanModel
          mode={selectedPlan ? "edit" : "create"}
          plan={selectedPlan}
          onClose={() => {
            setOpen(false);
            setSelectedPlan(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default PlansTable;
