import type { GitHubRepo } from "@/types/github";

interface RepositoryCardProps {
  repo: GitHubRepo;
  noDescriptionText: string;
  noLanguageText: string;
  starsLabel: string;
  forksLabel: string;
  updatedAtLabel: string;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

const RepositoryCard = ({
  repo,
  noDescriptionText,
  noLanguageText,
  starsLabel,
  forksLabel,
  updatedAtLabel,
}: RepositoryCardProps) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-1 hover:bg-gray-100 dark:border-gray-800 dark:bg-black dark:hover:bg-gray-900"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {repo.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {repo.full_name}
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-950 dark:text-gray-400">
          {repo.language || noLanguageText}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
        {repo.description || noDescriptionText}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span>
          ⭐ {repo.stargazers_count} {starsLabel}
        </span>

        <span>
          🍴 {repo.forks_count} {forksLabel}
        </span>
      </div>

      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        {updatedAtLabel}: {formatDate(repo.updated_at)}
      </p>
    </a>
  );
};

export default RepositoryCard;
