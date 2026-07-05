"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
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
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="mt-6 h-72">
        <Doughnut data={data} options={options} />
      </div>
    </section>
  );
};

export default ActivityDoughnutChart;
