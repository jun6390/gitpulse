"use client";

export type RepositorySortOption = "stars" | "forks" | "updated";

interface RepositoryFilterProps {
  languageOptions: string[];
  selectedLanguage: string;
  sortOption: RepositorySortOption;
  allLanguageLabel: string;
  starsSortLabel: string;
  forksSortLabel: string;
  updatedSortLabel: string;
  onLanguageChange: (language: string) => void;
  onSortChange: (sortOption: RepositorySortOption) => void;
}

const RepositoryFilter = ({
  languageOptions,
  selectedLanguage,
  sortOption,
  allLanguageLabel,

  starsSortLabel,
  forksSortLabel,
  updatedSortLabel,
  onLanguageChange,
  onSortChange,
}: RepositoryFilterProps) => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950 sm:flex-row">
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-gray-600"
        >
          <option value="all">{allLanguageLabel}</option>

          {languageOptions.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as RepositorySortOption)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-gray-600"
        >
          <option value="updated">{updatedSortLabel}</option>
          <option value="stars">{starsSortLabel}</option>
          <option value="forks">{forksSortLabel}</option>
        </select>
      </label>
    </div>
  );
};

export default RepositoryFilter;
