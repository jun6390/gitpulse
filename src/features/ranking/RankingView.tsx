"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { translations } from "@/constants/translations";
import { getGitHubRankingUsers } from "@/features/github/api";
import GitHubCard from "@/features/github/components/GitHubCard";
import GitHubCardSkeleton from "@/features/github/components/GitHubCardSkeleton";
import GitHubPageHeader from "@/features/github/components/GitHubPageHeader";
import GitHubPagination from "@/features/github/components/GitHubPagination";
import { useLanguageStore } from "@/stores/languageStore";
import RankingFilter from "./components/RankingFilter";
import RankingList from "./components/RankingList";

const PAGE_SIZE = 10;
const MAX_PAGE = 10;

const getValidPage = (value: string | null) => {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return Math.min(page, MAX_PAGE);
};

const RankingView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { language: currentLanguage } = useLanguageStore();

  const t = translations[currentLanguage].ranking;

  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get("language") ?? "all",
  );

  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") ?? "all",
  );
  const currentPage = getValidPage(searchParams.get("page"));

  const {
    data: rankingData,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [
      "github-ranking",
      selectedLanguage,
      selectedLocation,
      currentPage,
    ],
    queryFn: () =>
      getGitHubRankingUsers({
        language: selectedLanguage,
        location: selectedLocation,
        page: currentPage,
      }),
  });

  const rankingUsers = rankingData?.users ?? [];
  const totalPages = rankingData?.totalPages ?? 0;

  const updateSearchParams = useCallback(
    (nextLanguage: string, nextLocation: string, nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextLanguage === "all") {
        params.delete("language");
      } else {
        params.set("language", nextLanguage);
      }

      if (nextLocation === "all") {
        params.delete("location");
      } else {
        params.set("location", nextLocation);
      }

      if (nextPage <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(nextPage));
      }

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: true,
      });
    },
    [pathname, router, searchParams],
  );

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    updateSearchParams(value, selectedLocation, 1);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    updateSearchParams(selectedLanguage, value, 1);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams(selectedLanguage, selectedLocation, page);
  };

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      updateSearchParams(selectedLanguage, selectedLocation, totalPages);
    }
  }, [
    currentPage,
    selectedLanguage,
    selectedLocation,
    totalPages,
    updateSearchParams,
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <GitHubPageHeader
        badge={t.badge}
        title={t.title}
        description={t.description}
      />

      <RankingFilter
        currentLanguage={currentLanguage}
        selectedLanguage={selectedLanguage}
        selectedLocation={selectedLocation}
        onLanguageChange={handleLanguageChange}
        onLocationChange={handleLocationChange}
      />

      <section className="mt-10">
        {isLoading || isFetching ? (
          <GitHubCardSkeleton label={t.loading} count={3} />
        ) : isError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
            {t.errorMessage}
          </div>
        ) : rankingUsers.length === 0 ? (
          <GitHubCard className="p-10 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t.emptyTitle}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t.emptyDescription}
            </p>
          </GitHubCard>
        ) : (
          <div className="flex flex-col gap-8">
            <RankingList
              users={rankingUsers}
              startRank={(currentPage - 1) * PAGE_SIZE + 1}
              t={t}
            />

            <GitHubPagination
              currentPage={currentPage}
              totalPages={totalPages}
              previousLabel={t.previous}
              nextLabel={t.next}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default RankingView;
