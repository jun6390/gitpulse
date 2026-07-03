import type { GitHubRepo } from "@/types/github";

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export const getLanguageStats = (repos: GitHubRepo[]): LanguageStat[] => {
  const languageCountMap = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) return acc;

    acc[repo.language] = (acc[repo.language] ?? 0) + 1;

    return acc;
  }, {});

  const totalLanguageRepos = Object.values(languageCountMap).reduce(
    (sum, count) => sum + count,
    0,
  );

  return Object.entries(languageCountMap)
    .map(([name, count]) => ({
      name,
      count,
      percentage:
        totalLanguageRepos > 0
          ? Math.round((count / totalLanguageRepos) * 100)
          : 0,
    }))
    .sort((a, b) => b.count - a.count);
};
