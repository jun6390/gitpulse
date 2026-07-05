import type { GitHubEvent } from "@/types/github";

interface ActivityRecentListProps {
  events: GitHubEvent[];
  title: string;
  noActivityDataText: string;
  activityTypeLabels: Record<string, string>;
  commitsLabel: string;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

const getActivityDetail = (event: GitHubEvent, commitsLabel: string) => {
  if (event.type === "PushEvent") {
    const commitCount =
      event.payload.size ?? event.payload.commits?.length ?? 0;
    return `${commitCount}${commitsLabel}`;
  }

  if (event.payload.action) {
    return event.payload.action;
  }

  if (event.payload.ref_type) {
    return event.payload.ref_type;
  }

  return event.repo.name;
};

const ActivityRecentList = ({
  events,
  title,
  noActivityDataText,
  activityTypeLabels,
  commitsLabel,
}: ActivityRecentListProps) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      {events.length === 0 ? (
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          {noActivityDataText}
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-2xl bg-gray-50 p-4 transition-colors dark:bg-gray-900"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {activityTypeLabels[event.type] ?? event.type}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {event.repo.name}
                  </p>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(event.created_at)}
                </p>
              </div>

              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {getActivityDetail(event, commitsLabel)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ActivityRecentList;
