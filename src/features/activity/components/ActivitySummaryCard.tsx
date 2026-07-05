interface ActivitySummaryCardProps {
  totalActivities: number;
  pushCount: number;
  collaborationCount: number;
  latestActivityDate: string;
  totalActivitiesLabel: string;
  pushActivitiesLabel: string;
  collaborationActivitiesLabel: string;
  latestActivityLabel: string;
  noLatestActivityText: string;
}

const formatDate = (date: string, fallbackText: string) => {
  if (!date) return fallbackText;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

const ActivitySummaryCard = ({
  totalActivities,
  pushCount,
  collaborationCount,
  latestActivityDate,
  totalActivitiesLabel,
  pushActivitiesLabel,
  collaborationActivitiesLabel,
  latestActivityLabel,
  noLatestActivityText,
}: ActivitySummaryCardProps) => {
  const cards = [
    {
      label: totalActivitiesLabel,
      value: totalActivities,
    },
    {
      label: pushActivitiesLabel,
      value: pushCount,
    },
    {
      label: collaborationActivitiesLabel,
      value: collaborationCount,
    },
    {
      label: latestActivityLabel,
      value: formatDate(latestActivityDate, noLatestActivityText),
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {card.label}
          </p>
          <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
};

export default ActivitySummaryCard;
