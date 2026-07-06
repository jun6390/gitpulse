import Image from "next/image";
import GitHubCard from "@/features/github/components/GitHubCard";
import type { GitHubUser } from "@/types/github";

interface ProfileCardProps {
  user: GitHubUser;
  description: string;
  visitGithubText: string;
  reposLabel: string;
  followersLabel: string;
  followingLabel: string;
}

const ProfileCard = ({
  user,
  description,
  visitGithubText,
  reposLabel,
  followersLabel,
  followingLabel,
}: ProfileCardProps) => {
  const displayName = user.name || user.login;
  const displayBio = user.bio || description;

  return (
    <GitHubCard as="section" className="mx-auto w-full max-w-2xl p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-3xl font-bold text-white dark:bg-white dark:text-black">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              displayName.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {displayName}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{user.login}
            </p>

            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {displayBio}
            </p>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
        >
          {visitGithubText}
        </a>
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-xl grid-cols-3 gap-3">
        <div className="rounded-2xl bg-gray-50 p-4 text-center dark:bg-black">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {user.public_repos}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {reposLabel}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 text-center dark:bg-black">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {user.followers}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {followersLabel}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 text-center dark:bg-black">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {user.following}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {followingLabel}
          </p>
        </div>
      </div>
    </GitHubCard>
  );
};

export default ProfileCard;
