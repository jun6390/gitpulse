"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import GitHubCard from "@/features/github/components/GitHubCard";
import type { LanguageStat } from "../utils/getLanguageStats";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageDoughnutChartProps {
  languageStats: LanguageStat[];
  title: string;
}

const chartColors = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#9333ea",
  "#dc2626",
  "#0891b2",
  "#ca8a04",
  "#4f46e5",
];

const LanguageDoughnutChart = ({
  languageStats,
  title,
}: LanguageDoughnutChartProps) => {
  const data: ChartData<"doughnut", number[], string> = {
    labels: languageStats.map((item) => item.name),
    datasets: [
      {
        data: languageStats.map((item) => item.count),
        backgroundColor: languageStats.map(
          (_, index) => chartColors[index % chartColors.length],
        ),
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ?? "";
            const value = context.raw as number;
            const stat = languageStats.find((item) => item.name === label);

            return `${label}: ${value}개 (${stat?.percentage ?? 0}%)`;
          },
        },
      },
    },
  };

  return (
    <GitHubCard as="section" className="mx-auto w-full max-w-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="mt-6 h-80">
        <Doughnut data={data} options={options} />
      </div>
    </GitHubCard>
  );
};

export default LanguageDoughnutChart;
