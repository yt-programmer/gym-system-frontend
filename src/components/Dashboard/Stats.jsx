import React from "react";
import StatCard from "./StatCard";
import { Users, UserCheck, Dumbbell, TrendingUp, Shield } from "lucide-react";

const Stats = ({ stats, Visitor }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <StatCard
        title="Total Members"
        value={stats?.totalMembers || 0}
        icon={Users}
        color="cyan"
        delay={0}
      />
      <StatCard
        title="Active Subs"
        value={stats?.activeMembers || 0}
        icon={UserCheck}
        color="green"
        delay={0.1}
      />
      <StatCard
        title="Total Plans"
        value={stats?.Plans.length || 0}
        icon={Dumbbell}
        color="purple"
        delay={0.2}
      />
      <StatCard
        title="Revenue"
        value={`${stats?.revenue || 0} EGP`}
        icon={TrendingUp}
        color="yellow"
        delay={0.3}
      />
      <StatCard
        title="Visitors"
        value={Visitor || 0}
        icon={Shield}
        color="cyan"
        delay={0.4}
      />
    </div>
  );
};

export default Stats;
