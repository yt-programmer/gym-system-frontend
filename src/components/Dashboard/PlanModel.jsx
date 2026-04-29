import React, { useEffect, useState } from "react";
import { GlassCard } from "../GlassCard";

const PlanModel = ({ mode, onClose, onSubmit, plan }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    description: "",
    datesWomen: "",
    datesMen: "",
  });

  // fill form when editing
  useEffect(() => {
    if (plan && mode === "edit") {
      setForm({
        title: plan.title || "",
        price: plan.price || "",
        duration: plan.duration || "",
        description: plan.description || "",
        datesWomen: plan.datesWomen || "",
        datesMen: plan.datesMen || "",
      });
    }

    if (mode === "create") {
      setForm({
        title: "",
        price: "",
        duration: "",
        description: "",
        datesWomen: "",
        datesMen: "",
      });
    }
  }, [plan, mode]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.({
      ...form,
      price: Number(form.price),
      duration: Number(form.duration),
    });
  };

  const handleClose = () => {
    setForm({
      title: "",
      price: "",
      duration: "",
      description: "",
      datesMen: "",
      datesWomen: "",
    });

    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-lg mx-4">
        <GlassCard className="p-6 rounded-2xl shadow-2xl border border-white/10">
          {/* header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white capitalize">
              {mode} Plan
            </h2>

            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Title"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="price"
              type="number"
              required
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <input
              name="duration"
              value={form.duration}
              required
              type="number"
              onChange={handleChange}
              placeholder="Duration"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <textarea
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 resize-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/60">Women Date</label>
                <input
                  required
                  type="text"
                  name="datesWomen"
                  value={form.datesWomen}
                  onChange={handleChange}
                  placeholder="Week Days / Hours"
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/60">Men Date</label>
                <input
                  type="text"
                  name="datesMen"
                  required
                  value={form.datesMen}
                  onChange={handleChange}
                  placeholder="Week Days / Hours"
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition"
            >
              {mode}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default PlanModel;
