"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { translations } from "@/constants/translations";
import { getGitHubEvents } from "@/features/github/api";
import GitHubCardSkeleton from "@/features/github/components/GitHubCardSkeleton";
import GitHubEmptyGuide from "@/features/github/components/GitHubEmptyGuide";
import GitHubPageHeader from "@/features/github/components/GitHubPageHeader";
import GitHubSearchForm from "@/features/github/components/GitHubSearchForm";
import { useLanguageStore } from "@/stores/languageStore";
import type { GitHubEvent } from "@/types/github";
import ActivityDoughnutChart from "./components/ActivityDoughnutChart";
import ActivityRankingList from "./components/ActivityRankingList";
import ActivityRecentList from "./components/ActivityRecentList";
import ActivitySummaryCard from "./components/ActivitySummaryCard";
import { getActivityStats } from "./utils/getActivityStats";

const ActivityView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { language } = useLanguageStore();

  const t = translations[language].activity;
  const commonT = translations[language].common;

  const username = searchParams.get("username")?.trim() ?? "";

  const {
    data: events = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery<GitHubEvent[]>({
    queryKey: ["github-events", username],
    queryFn: () => getGitHubEvents(username),
    enabled: Boolean(username),
  });
  const errorMessage = isError ? commonT.githubUserNotFound : "";
  const hasSearched = Boolean(username) && isSuccess;

  const stats = useMemo(() => {
    return getActivityStats(events);
  }, [events]);

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
            count={4}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          />
        )}

        {!username && !isLoading && !errorMessage && (
          <GitHubEmptyGuide
            title={t.emptyGuideTitle}
            description={t.emptyGuideDescription}
          />
        )}

        {hasSearched && !isLoading && !errorMessage && events.length === 0 && (
          <GitHubEmptyGuide
            title={t.noActivityData}
            description={t.noActivityDataDescription}
          />
        )}

        {hasSearched && !isLoading && !errorMessage && events.length > 0 && (
          <>
            <ActivitySummaryCard
              totalActivities={stats.totalActivities}
              pushCount={stats.pushCount}
              collaborationCount={stats.collaborationCount}
              latestActivityDate={stats.latestActivityDate}
              totalActivitiesLabel={t.totalActivities}
              pushActivitiesLabel={t.pushActivities}
              collaborationActivitiesLabel={t.collaborationActivities}
              latestActivityLabel={t.latestActivity}
              noLatestActivityText={t.noLatestActivity}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ActivityDoughnutChart
                stats={stats.ranking}
                title={t.activityTypeRatio}
                activityTypeLabels={t.eventTypes}
              />

              <ActivityRankingList
                stats={stats.ranking}
                title={t.activityRanking}
                activityCountLabel={t.activityCount}
                noActivityDataText={t.noActivityData}
                activityTypeLabels={t.eventTypes}
              />
            </div>

            <ActivityRecentList
              events={events}
              title={t.recentActivities}
              noActivityDataText={t.noActivityData}
              activityTypeLabels={t.eventTypes}
              commitsLabel={t.commits}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default ActivityView;
