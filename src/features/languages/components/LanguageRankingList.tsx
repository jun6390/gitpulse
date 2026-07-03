import type { LanguageStat } from "../utils/getLanguageStats";

interface LanguageRankingListProps {
  languageStats: LanguageStat[];
  title: string;
  repoCountLabel: string;
}

const LanguageRankingList = ({
  languageStats,
  title,
  repoCountLabel,
}: LanguageRankingListProps) => {
  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="mt-5 flex flex-col gap-4">
        {languageStats.map((item, index) => (
          <div
            key={item.name}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-colors dark:border-gray-800 dark:bg-black"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {index + 1}. {item.name}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.count}
                  {repoCountLabel}
                </p>
              </div>

              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {item.percentage}%
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-blue-600 dark:bg-blue-400"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LanguageRankingList;
