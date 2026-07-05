import type { ActivityStat } from "../utils/getActivityStats";

interface ActivityRankingListProps {
  stats: ActivityStat[];
  title: string;
  activityCountLabel: string;
  noActivityDataText: string;
  activityTypeLabels: Record<string, string>;
}

const ActivityRankingList = ({
  stats,
  title,
  activityCountLabel,
  noActivityDataText,
  activityTypeLabels,
}: ActivityRankingListProps) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      {stats.length === 0 ? (
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          {noActivityDataText}
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {stats.map((stat, index) => (
            <li
              key={stat.type}
              className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 transition-colors dark:bg-gray-900"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {index + 1}. {activityTypeLabels[stat.type] ?? stat.type}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.percentage}%
                </p>
              </div>

              <p className="font-bold text-gray-900 dark:text-white">
                {stat.count}
                {activityCountLabel}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ActivityRankingList;
