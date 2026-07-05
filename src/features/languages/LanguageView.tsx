"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { translations } from "@/constants/translations";
import { getGitHubRepos } from "@/features/github/api";
import GitHubEmptyGuide from "@/features/github/components/GitHubEmptyGuide";
import GitHubSearchForm from "@/features/github/components/GitHubSearchForm";
import { useLanguageStore } from "@/stores/languageStore";
import type { GitHubRepo } from "@/types/github";
import LanguageDoughnutChart from "./components/LanguageDoughnutChart";
import LanguageRankingList from "./components/LanguageRankingList";
import LanguageSummaryCards from "./components/LanguageSummaryCard";
import { getLanguageStats } from "./utils/getLanguageStats";
import GitHubPageHeader from "../github/components/GitHubPageHeader";

const LanguageView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { language } = useLanguageStore();

  const t = translations[language].languages;

  const username = searchParams.get("username")?.trim() ?? "";

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!username) {
      setRepos([]);
      setErrorMessage("");
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    let ignore = false;

    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        setHasSearched(false);
        setRepos([]);

        const repoData = await getGitHubRepos(username);

        if (ignore) return;

        setRepos(repoData);
        setHasSearched(true);
      } catch (error) {
        if (ignore) return;

        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(t.errorMessage);
        }

        setRepos([]);
        setHasSearched(false);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchRepos();

    return () => {
      ignore = true;
    };
  }, [username, t.errorMessage]);

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
              <p className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm font-medium text-gray-500 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                {t.noLanguageData}
              </p>
            )}
          </>
        )}

        {hasSearched && !isLoading && !errorMessage && repos.length === 0 && (
          <p className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm font-medium text-gray-500 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
            {t.noRepos}
          </p>
        )}

        {hasSearched && !isLoading && !errorMessage && (
          <div className="flex justify-center">
            <Link
              href={activityHref}
              className="mx-auto rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t.viewActivityAnalysis}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default LanguageView;
