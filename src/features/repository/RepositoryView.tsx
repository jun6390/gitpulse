"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PrimaryButtonLink } from "@/components/PrimaryButton";
import { translations } from "@/constants/translations";
import { getGitHubRepos } from "@/features/github/api";
import GitHubEmptyGuide from "@/features/github/components/GitHubEmptyGuide";
import GitHubPageHeader from "@/features/github/components/GitHubPageHeader";
import GitHubPagination from "@/features/github/components/GitHubPagination";
import GitHubCardSkeleton from "@/features/github/components/GitHubCardSkeleton";
import GitHubRepoList from "@/features/github/components/GitHubRepoList";
import GitHubSearchSection from "@/features/github/components/GitHubSearchSection";
import { useLanguageStore } from "@/stores/languageStore";
import type { GitHubRepo } from "@/types/github";
import RepositoryFilter, {
  type RepositorySortOption,
} from "./components/RepositoryFilter";

const PAGE_SIZE = 6;

const SORT_OPTIONS: RepositorySortOption[] = ["updated", "stars", "forks"];

const getValidSortOption = (value: string | null): RepositorySortOption => {
  if (SORT_OPTIONS.includes(value as RepositorySortOption)) {
    return value as RepositorySortOption;
  }

  return "updated";
};

const getValidPage = (value: string | null) => {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
};

const RepositoryView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { language } = useLanguageStore();

  const t = translations[language].repositories;
  const repoT = translations[language].repo;
  const commonT = translations[language].common;

  const username = searchParams.get("username")?.trim() ?? "";
  const selectedLanguage = searchParams.get("language") ?? "all";
  const sortOption = getValidSortOption(searchParams.get("sort"));
  const currentPage = getValidPage(searchParams.get("page"));

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

  const updateSearchParams = useCallback(
    (params: {
      username?: string;
      language?: string;
      sort?: RepositorySortOption;
      page?: number;
    }) => {
      const current = new URLSearchParams(searchParams.toString());

      if ("username" in params) {
        const nextUsername = params.username?.trim();

        if (nextUsername) {
          current.set("username", nextUsername);
        } else {
          current.delete("username");
        }
      }

      if ("language" in params) {
        if (!params.language || params.language === "all") {
          current.delete("language");
        } else {
          current.set("language", params.language);
        }
      }

      if ("sort" in params) {
        if (!params.sort || params.sort === "updated") {
          current.delete("sort");
        } else {
          current.set("sort", params.sort);
        }
      }

      if ("page" in params) {
        if (!params.page || params.page <= 1) {
          current.delete("page");
        } else {
          current.set("page", String(params.page));
        }
      }

      const queryString = current.toString();

      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: true,
      });
    },
    [pathname, router, searchParams],
  );

  const languages = useMemo(() => {
    return Array.from(
      new Set(
        repos
          .map((repo) => repo.language)
          .filter((language): language is string => Boolean(language)),
      ),
    ).sort();
  }, [repos]);

  useEffect(() => {
    if (
      repos.length > 0 &&
      selectedLanguage !== "all" &&
      !languages.includes(selectedLanguage)
    ) {
      updateSearchParams({
        language: "all",
        page: 1,
      });
    }
  }, [repos.length, selectedLanguage, languages, updateSearchParams]);

  const filteredRepos = useMemo(() => {
    const filtered =
      selectedLanguage === "all"
        ? repos
        : repos.filter((repo) => repo.language === selectedLanguage);

    return [...filtered].sort((a, b) => {
      if (sortOption === "stars") {
        return b.stargazers_count - a.stargazers_count;
      }

      if (sortOption === "forks") {
        return b.forks_count - a.forks_count;
      }

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
  }, [repos, selectedLanguage, sortOption]);

  const totalPages = Math.ceil(filteredRepos.length / PAGE_SIZE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      updateSearchParams({
        page: totalPages,
      });
    }
  }, [currentPage, totalPages, updateSearchParams]);

  const paginatedRepos = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return filteredRepos.slice(startIndex, endIndex);
  }, [filteredRepos, currentPage]);

  const handleSearch = (nextUsername: string) => {
    updateSearchParams({
      username: nextUsername,
      language: "all",
      sort: "updated",
      page: 1,
    });
  };

  const handleClear = () => {
    router.push(pathname, {
      scroll: true,
    });
  };

  const handleLanguageChange = (value: string) => {
    updateSearchParams({
      language: value,
      page: 1,
    });
  };

  const handleSortChange = (value: RepositorySortOption) => {
    updateSearchParams({
      sort: value,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({
      page,
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

        <GitHubSearchSection
          placeholder={t.searchPlaceholder}
          buttonText={t.searchButton}
          loadingText={t.loading}
          isLoading={isLoading}
          initialUsername={username}
          errorMessage={errorMessage}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {isLoading && <GitHubCardSkeleton label={t.loading} />}

        {!username && !isLoading && !errorMessage && (
          <GitHubEmptyGuide
            title={t.emptyGuideTitle}
            description={t.emptyGuideDescription}
          />
        )}

        {repos.length > 0 && (
          <div className="flex flex-col gap-3">
            <RepositoryFilter
              languageOptions={languages}
              selectedLanguage={selectedLanguage}
              sortOption={sortOption}
              allLanguageLabel={t.allLanguages}
              starsSortLabel={t.sortByStars}
              forksSortLabel={t.sortByForks}
              updatedSortLabel={t.sortByUpdated}
              onLanguageChange={handleLanguageChange}
              onSortChange={handleSortChange}
            />

            <p className="mx-auto w-full max-w-2xl text-right text-sm text-gray-500 dark:text-gray-400">
              {filteredRepos.length} / {repos.length}
            </p>
          </div>
        )}

        {hasSearched && !isLoading && !errorMessage && repos.length === 0 && (
          <GitHubEmptyGuide title={repoT.noRepos} />
        )}

        {repos.length > 0 && filteredRepos.length === 0 && (
          <GitHubEmptyGuide title={t.noFilteredRepos} />
        )}

        {paginatedRepos.length > 0 && (
          <>
            <GitHubRepoList
              repos={paginatedRepos}
              title={t.repoListTitle}
              noDescriptionText={repoT.noDescription}
              noLanguageText={repoT.noLanguage}
              starsLabel={repoT.stars}
              forksLabel={repoT.forks}
              updatedAtLabel={repoT.updatedAt}
              action={
                <PrimaryButtonLink
                  href={`/language?username=${encodeURIComponent(username)}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-center text-sm font-semibold"
                >
                  {t.viewLanguageAnalysis}
                </PrimaryButtonLink>
              }
            />

            <GitHubPagination
              currentPage={currentPage}
              totalPages={totalPages}
              firstLabel={t.first}
              previousLabel={t.previous}
              nextLabel={t.next}
              lastLabel={t.last}
              pageLabel={t.page}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default RepositoryView;
