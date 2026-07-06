import type { ReactNode } from "react";
import type { GitHubRepo } from "@/types/github";
import RepositoryCard from "@/features/github/components/GiHubRepoCard";
import GitHubCard from "@/features/github/components/GitHubCard";

interface GitHubRepoListProps {
  repos: GitHubRepo[];
  title: string;
  noDescriptionText: string;
  noLanguageText: string;
  starsLabel: string;
  forksLabel: string;
  updatedAtLabel: string;
  action?: ReactNode;
}

const GitHubRepoList = ({
  repos,
  title,
  noDescriptionText,
  noLanguageText,
  starsLabel,
  forksLabel,
  updatedAtLabel,
  action,
}: GitHubRepoListProps) => {
  return (
    <GitHubCard as="section" className="mx-auto w-full max-w-2xl p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {action}
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {repos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
            noDescriptionText={noDescriptionText}
            noLanguageText={noLanguageText}
            starsLabel={starsLabel}
            forksLabel={forksLabel}
            updatedAtLabel={updatedAtLabel}
          />
        ))}
      </div>
    </GitHubCard>
  );
};

export default GitHubRepoList;
