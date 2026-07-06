import GitHubCard from "@/features/github/components/GitHubCard";

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
    <section className="mx-auto w-full max-w-2xl grid gap-4 md:grid-cols-3 ">
      <GitHubCard radius="2xl" className="p-6 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {totalReposLabel}
        </p>
        <p className="mt-2 text-2xl font-bold">{totalRepos}</p>
      </GitHubCard>

      <GitHubCard radius="2xl" className="p-6 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {languageTypesLabel}
        </p>
        <p className="mt-2 text-2xl font-bold">{languageCount}</p>
      </GitHubCard>

      <GitHubCard radius="2xl" className="p-6 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {mainLanguageLabel}
        </p>
        <p className="mt-2 text-2xl font-bold">{mainLanguage}</p>
      </GitHubCard>
    </section>
  );
};

export default LanguageSummaryCard;
