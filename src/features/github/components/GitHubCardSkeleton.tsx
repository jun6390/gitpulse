import GitHubCard from "./GitHubCard";

interface GitHubCardSkeletonProps {
  label: string;
  count?: number;
  className?: string;
}

const GitHubCardSkeleton = ({
  label,
  count = 1,
  className = "grid grid-cols-1 gap-5",
}: GitHubCardSkeletonProps) => {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>

      <div className={className} aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <GitHubCard
            key={index}
            className="animate-pulse p-6 motion-reduce:animate-none"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="h-5 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-900" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-900" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-900" />
            </div>
          </GitHubCard>
        ))}
      </div>
    </div>
  );
};

export default GitHubCardSkeleton;
