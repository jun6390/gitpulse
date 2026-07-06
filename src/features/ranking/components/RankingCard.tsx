import type { GitHubRankingUser } from "@/types/github";
import Image from "next/image";
import GitHubCard from "@/features/github/components/GitHubCard";
import { PrimaryButtonAnchor } from "@/components/PrimaryButton";

interface RankingCardProps {
  rank: number;
  user: GitHubRankingUser;
  t: {
    followers: string;
    following: string;
    repos: string;
    noBio: string;
    noLocation: string;
    profileLink: string;
  };
}

const RankingCard = ({ rank, user, t }: RankingCardProps) => {
  return (
    <GitHubCard
      as="article"
      interactive
      className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-lg font-extrabold text-white dark:bg-white dark:text-gray-950">
        {rank}
      </div>

      <Image
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded-3xl object-cover"
      />

      <div className="min-w-0 flex-1 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold text-gray-950 dark:text-white">
            {user.name ?? user.login}
          </h2>

          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            @{user.login}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {user.bio ?? t.noBio}
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          {user.location ?? t.noLocation}
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {t.followers}: {user.followers.toLocaleString()}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {t.following}: {user.following.toLocaleString()}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {t.repos}: {user.public_repos.toLocaleString()}
          </span>
        </div>
      </div>

      <PrimaryButtonAnchor
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center px-5 py-3 text-center text-sm font-bold"
      >
        {t.profileLink}
      </PrimaryButtonAnchor>
    </GitHubCard>
  );
};

export default RankingCard;
