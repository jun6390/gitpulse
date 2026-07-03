interface LanguageSummaryCardProps {
  totalRepos: number;
  languageCount: number;
  mainLanguage: string;
  totalReposLabel: string;
  languageTypesLabel: string;
  mainLanguageLabel: string;
}

const LanguageSummaryCard = ({
  totalRepos,
  languageCount,
  mainLanguage,
  totalReposLabel,
  languageTypesLabel,
  mainLanguageLabel,
}: LanguageSummaryCardProps) => {
  return (
    <section className="mx-auto w-2xl grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {totalReposLabel}
        </p>
        <p className="mt-2 text-2xl font-bold">{totalRepos}</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {languageTypesLabel}
        </p>
        <p className="mt-2 text-2xl font-bold">{languageCount}</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {mainLanguageLabel}
        </p>
        <p className="mt-2 text-2xl font-bold">{mainLanguage}</p>
      </div>
    </section>
  );
};

export default LanguageSummaryCard;
