import GitHubCard from "@/features/github/components/GitHubCard";

interface GitHubEmptyGuideProps {
  title: string;
  description?: string;
}

const GitHubEmptyGuide = ({ title, description }: GitHubEmptyGuideProps) => {
  return (
    <GitHubCard
      radius="2xl"
      className="mx-auto w-full max-w-2xl p-6 text-center"
    >
      <p className="text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </p>

      {description && (
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </GitHubCard>
  );
};

export default GitHubEmptyGuide;
