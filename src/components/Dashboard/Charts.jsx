import React from "react";
import { motion } from "framer-motion";
import { PieChart, BarChart, pieClasses } from "@mui/x-charts";
import { GlassCard } from "../GlassCard";
import { useTheme, useMediaQuery } from "@mui/material";

const Charts = ({ stats, users }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalMembers = stats?.totalMembers || 0;
  const activeMembers = stats?.activeMembers || 0;

  const getArcLabel = (params) => {
    if (totalMembers === 0) return "0%";
    return `${((params.value / totalMembers) * 100).toFixed(0)}%`;
  };

  const xLabels = stats?.Plans?.map((plan) => plan.title) || [];

  const values =
    stats?.Plans?.map((plan) => {
      return users.filter((user) => {
        const sub = user.subscription;
        if (!sub?.plan) return false;
        const isActive = sub.endDate && new Date(sub.endDate) > new Date();
        if (!isActive) return false;
        return sub.plan.toString() === plan._id.toString();
      }).length;
    }) || [];

  const data = [
    { label: "Active Members", value: activeMembers, color: "#0088FE" },
    {
      label: "Inactive Members",
      value: totalMembers - activeMembers,
      color: "#FF8042",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="h-72 relative sm:h-80 flex flex-col">
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Member Growth
          </h3>
          <div className="flex-1 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 ">
            <PieChart
              series={[
                {
                  outerRadius: isMobile ? 70 : 100,
                  data,
                  arcLabel: getArcLabel,
                },
              ]}
              width={isMobile ? 200 : 300}
              height={isMobile ? 200 : 300}
              sx={{
                [`& .${pieClasses.arcLabel}`]: {
                  fill: "white",
                  fontSize: 12,
                },
              }}
            />
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="h-72 sm:h-80 flex flex-col overflow-hidden">
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Plans Distribution
          </h3>

          <div className="flex-1  pt-4 w-full overflow-x-auto">
            <div className="min-w-[300px] h-full flex items-center justify-center">
              <BarChart
                series={[
                  {
                    data: values,
                    label: "Users per Plan",
                  },
                ]}
                xAxis={[
                  {
                    data: xLabels,
                    scaleType: "band",
                  },
                ]}
                yAxis={[{ width: 30 }]}
                height={isMobile ? 200 : 300}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Charts;
