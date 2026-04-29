import { Trash } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { toast } from "react-hot-toast";
import api from "../../utils/api";

const AdminsTable = ({ admins, setUsers }) => {
  const deleteAdmin = (email) => {
    api
      .patch(`/auth/edit-role`, { email: email, role: "user" })
      .then((res) => {
        setUsers(res.data.data.users);
        toast.success("User changed successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <GlassCard className="mt-6 sm:mt-8 p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-sm sm:text-base font-semibold text-text-primary">
            Admins
          </h3>
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="border-b border-white/5">
              <tr>
                <th className="pb-3 pr-3 text-xs font-medium text-text-muted uppercase text-left">
                  name
                </th>
                <th className="pb-3 pr-3 text-xs font-medium text-text-muted uppercase text-left">
                  email
                </th>
                <th className="pb-3 pr-3 text-end text-xs font-medium text-text-muted uppercase">
                  delete
                </th>
              </tr>
            </thead>

            <tbody>
              {admins?.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 text-text-primary flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white text-xs font-bold">
                      {admin.name[0]}
                    </div>
                    {admin.name}
                  </td>

                  <td className="py-3 text-text-secondary">{admin.email}</td>

                  <td className="py-3 pr-3 flex justify-end">
                    <button
                      onClick={() => deleteAdmin(admin.email)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-red-500 text-white"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 sm:hidden">
          {admins?.map((admin) => (
            <div
              key={admin._id}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white text-sm font-bold">
                  {admin.name[0]}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-text-primary">
                    {admin.name}
                  </span>
                  <span className="text-xs text-text-secondary break-all">
                    {admin.email}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteAdmin(admin.email)}
                className="p-2 rounded-md bg-red-500 text-white"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default AdminsTable;
