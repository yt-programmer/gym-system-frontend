import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedPage } from "../components/AnimatedPage";
import api from "../utils/api";

import { SkeletonLoader } from "../components/SkeletonLoader";

import Stats from "../components/Dashboard/Stats";
import Charts from "../components/Dashboard/Charts";
import PlansTable from "../components/Dashboard/PlansTable";
import AddAdmin from "../components/Dashboard/AddAdmin";
import AdminsTable from "../components/Dashboard/AdminsTable";
import toast from "react-hot-toast";

export const DashboardPage = ({ Visitor }) => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchStats = async () => {
    try {
      const res = await api.get("/analysis");
      setStats(res.data.data.analysisData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes] = await Promise.all([api.get("/auth/all")]);

        fetchStats();

        setUsers(usersRes.data.data.users);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMorePlans = async () => {
      try {
        const res = await api.get(`/plans?limit=10&page=${page}`);

        setPlans(res.data.data.plans);
        setHasMore(res.data.data.plans.length > 0);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchMorePlans();
  }, [page]);

  const admins = users.filter((u) => u.role === "admin");
  if (loading) {
    return (
      <AnimatedPage className="py-12">
        {" "}
        <div className="max-w-7xl mx-auto px-6">
          {" "}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {" "}
            {[...Array(4)].map((_, i) => (
              <SkeletonLoader key={i} className="h-24" />
            ))}{" "}
          </div>{" "}
          <SkeletonLoader className="h-80 mb-8" />{" "}
          <SkeletonLoader className="h-64" />{" "}
        </div>{" "}
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="mb-8">
          <h1 className="text-3xl font-bold">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
        </motion.div>

        <Stats stats={stats} Visitor={Visitor} />
        <Charts stats={stats} users={users} />

        <PlansTable
          page={page}
          setPage={setPage}
          fetchStats={fetchStats}
          plans={plans}
          setPlans={setPlans}
          hasMore={hasMore}
        />

        <AddAdmin setUsers={setUsers} />

        <AdminsTable admins={admins} setUsers={setUsers} />
      </div>
    </AnimatedPage>
  );
};
