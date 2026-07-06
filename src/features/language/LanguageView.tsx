"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PrimaryButtonLink } from "@/components/PrimaryButton";
import { translations } from "@/constants/translations";
import { getGitHubRepos } from "@/features/github/api";
import GitHubCardSkeleton from "@/features/github/components/GitHubCardSkeleton";
import GitHubEmptyGuide from "@/features/github/components/GitHubEmptyGuide";
import GitHubPageHeader from "@/features/github/components/GitHubPageHeader";
import GitHubSearchForm from "@/features/github/components/GitHubSearchForm";
import { useLanguageStore } from "@/stores/languageStore";
import type { GitHubRepo } from "@/types/github";
import LanguageDoughnutChart from "./components/LanguageDoughnutChart";
import LanguageRankingList from "./components/LanguageRankingList";
import LanguageSummaryCards from "./components/LanguageSummaryCard";
import { getLanguageStats } from "./utils/getLanguageStats";

const LanguageView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { language } = useLanguageStore();

  const t = translations[language].languages;
  const commonT = translations[language].common;

  const username = searchParams.get("username")?.trim() ?? "";

  const {
    data: repos = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", username],
    queryFn: () => getGitHubRepos(username),
    enabled: Boolean(username),
  });
  const errorMessage = isError ? commonT.githubUserNotFound : "";
  const hasSearched = Boolean(username) && isSuccess;

  const languageStats = useMemo(() => {
    return getLanguageStats(repos);
  }, [repos]);

  const mainLanguage = languageStats[0]?.name ?? t.noMainLanguage;

  const activityHref = username
    ? `/activity?username=${encodeURIComponent(username)}`
    : "/activity";

  const handleClear = () => {
    router.push(pathname, {
      scroll: true,
    });
  };

  const handleSearch = (nextUsername: string) => {
    const trimmedUsername = nextUsername.trim();

    if (!trimmedUsername) {
      handleClear();
      return;
    }

    router.push(`${pathname}?username=${encodeURIComponent(trimmedUsername)}`, {
      scroll: true,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900 transition-colors dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <GitHubPageHeader
          badge={t.badge}
          title={t.title}
          description={t.description}
        />

        <div className="flex flex-col gap-4">
          <GitHubSearchForm
            placeholder={t.searchPlaceholder}
            buttonText={t.searchButton}
            loadingText={t.loading}
            isLoading={isLoading}
            initialUsername={username}
            onSearch={handleSearch}
            onClear={handleClear}
          />

          {errorMessage && (
            <p className="text-center text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}
        </div>

        {isLoading && (
          <GitHubCardSkeleton
            label={t.loading}
            count={3}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          />
        )}

        {!username && !isLoading && !errorMessage && (
          <GitHubEmptyGuide
            title={t.emptyGuideTitle}
            description={t.emptyGuideDescription}
          />
        )}

        {hasSearched && !isLoading && !errorMessage && repos.length > 0 && (
          <>
            <LanguageSummaryCards
              totalRepos={repos.length}
              languageCount={languageStats.length}
              mainLanguage={mainLanguage}
              totalReposLabel={t.totalRepos}
              languageTypesLabel={t.languageTypes}
              mainLanguageLabel={t.mainLanguage}
            />

            {languageStats.length > 0 ? (
              <div className="flex flex-col gap-6">
                <LanguageDoughnutChart
                  languageStats={languageStats}
                  title={t.languageChart}
                />

                <LanguageRankingList
                  languageStats={languageStats}
                  title={t.languageRanking}
                  repoCountLabel={t.repoCount}
                />
              </div>
            ) : (
              <GitHubEmptyGuide
                title={t.noLanguageData}
                description={t.noLanguageData}
              />
            )}
          </>
        )}

        {hasSearched && !isLoading && !errorMessage && repos.length === 0 && (
          <GitHubEmptyGuide title={t.noRepos} description={t.noRepos} />
        )}

        {hasSearched && !isLoading && !errorMessage && (
          <div className="flex justify-center">
            <PrimaryButtonLink
              href={activityHref}
              className="mx-auto inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
            >
              {t.viewActivityAnalysis}
            </PrimaryButtonLink>
          </div>
        )}
      </div>
    </main>
  );
};

export default LanguageView;
