interface GitHubPageHeaderProps {
  badge: string;
  title: string;
  description: string;
}

const GitHubPageHeader = ({
  badge,
  title,
  description,
}: GitHubPageHeaderProps) => {
  return (
    <section className="text-center">
      <p className="mb-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
        {badge}
      </p>

      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </section>
  );
};

export default GitHubPageHeader;
