"use client";

import GitHubSelectBox from "@/features/github/components/GitHubSelectBox";

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
  const languageSelectOptions = [
    { label: allLanguageLabel, value: "all" },
    ...languageOptions.map((language) => ({
      label: language,
      value: language,
    })),
  ];

  const sortSelectOptions = [
    { label: updatedSortLabel, value: "updated" },
    { label: starsSortLabel, value: "stars" },
    { label: forksSortLabel, value: "forks" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950 sm:flex-row">
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <GitHubSelectBox
          value={selectedLanguage}
          options={languageSelectOptions}
          onChange={onLanguageChange}
        />
      </label>

      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <GitHubSelectBox
          value={sortOption}
          options={sortSelectOptions}
          onChange={(value) => onSortChange(value as RepositorySortOption)}
        />
      </label>
    </div>
  );
};

export default RepositoryFilter;
