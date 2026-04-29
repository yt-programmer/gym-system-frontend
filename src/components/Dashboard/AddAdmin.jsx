import React from "react";
import { GlassCard } from "../GlassCard";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../../utils/api";

const AddAdmin = ({ setUsers }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    api
      .patch("/auth/edit-role", { email, role: "admin" })
      .then((res) => {
        setUsers(res.data.data.users);
        toast.success("User updated successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <GlassCard className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white text-xs font-bold shrink-0">
            +
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-1">
              Add Admin
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-snug">
              Add a new admin to the platform (He needs to have an account on
              the application.)
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 sm:items-center"
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full sm:w-auto flex-1 px-3 sm:px-4 py-2 rounded-lg transition-all duration-500 outline-0 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20 focus:bg-neon-cyan/20"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 transition-all duration-500 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
          >
            Add Admin
          </button>
        </form>
      </GlassCard>
    </motion.div>
  );
};

export default AddAdmin;
