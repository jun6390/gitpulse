import type { GitHubEvent } from "@/types/github";

export interface ActivityStat {
  type: string;
  count: number;
  percentage: number;
}

export interface ActivityStats {
  totalActivities: number;
  pushCount: number;
  collaborationCount: number;
  latestActivityDate: string;
  ranking: ActivityStat[];
}

const COLLABORATION_EVENT_TYPES = [
  "PullRequestEvent",
  "IssuesEvent",
  "IssueCommentEvent",
  "PullRequestReviewEvent",
  "PullRequestReviewCommentEvent",
];

export const getActivityStats = (events: GitHubEvent[]): ActivityStats => {
  const totalActivities = events.length;

  const typeCountMap = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.type] = (acc[event.type] ?? 0) + 1;
    return acc;
  }, {});

  const ranking = Object.entries(typeCountMap)
    .map(([type, count]) => ({
      type,
      count,
      percentage:
        totalActivities > 0 ? Math.round((count / totalActivities) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  const pushCount = typeCountMap.PushEvent ?? 0;

  const collaborationCount = COLLABORATION_EVENT_TYPES.reduce(
    (sum, type) => sum + (typeCountMap[type] ?? 0),
    0,
  );

  const latestActivityDate = events[0]?.created_at ?? "";

  return {
    totalActivities,
    pushCount,
    collaborationCount,
    latestActivityDate,
    ranking,
  };
};
