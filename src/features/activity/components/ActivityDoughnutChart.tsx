"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import GitHubCard from "@/features/github/components/GitHubCard";
import type { ActivityStat } from "../utils/getActivityStats";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ActivityDoughnutChartProps {
  stats: ActivityStat[];
  title: string;
  activityTypeLabels: Record<string, string>;
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#9333ea",
  "#dc2626",
  "#0891b2",
  "#ca8a04",
  "#4f46e5",
];

const ActivityDoughnutChart = ({
  stats,
  title,
  activityTypeLabels,
}: ActivityDoughnutChartProps) => {
  const data = {
    labels: stats.map((stat) => activityTypeLabels[stat.type] ?? stat.type),
    datasets: [
      {
        data: stats.map((stat) => stat.count),
        backgroundColor: COLORS,
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <GitHubCard as="section" className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="mt-6 h-72">
        <Doughnut data={data} options={options} />
      </div>
    </GitHubCard>
  );
};

export default ActivityDoughnutChart;
