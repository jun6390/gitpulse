"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PrimaryButtonLink } from "@/components/PrimaryButton";
import { translations } from "@/constants/translations";
import { getGitHubRepos, getGitHubUser } from "@/features/github/api";
import GitHubCard from "@/features/github/components/GitHubCard";
import GitHubCardSkeleton from "@/features/github/components/GitHubCardSkeleton";
import GitHubPageHeader from "@/features/github/components/GitHubPageHeader";
import GitHubRepoList from "@/features/github/components/GitHubRepoList";
import GitHubSearchForm from "@/features/github/components/GitHubSearchForm";
import { useLanguageStore } from "@/stores/languageStore";
import type { GitHubRepo, GitHubUser } from "@/types/github";
import ProfileCard from "./components/ProfileCard";
import { profileMockData } from "./constants/profileMockData";

const RECENT_REPOS_LIMIT = 6;

const ProfileView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { language } = useLanguageStore();

  const t = translations[language].profile;
  const repoT = translations[language].repo;
  const commonT = translations[language].common;

  const username = searchParams.get("username")?.trim() ?? "";

  const [user, setUser] = useState<GitHubUser>(profileMockData);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!username) {
      setUser(profileMockData);
      setRepos([]);
      setErrorMessage("");
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    let ignore = false;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        setHasSearched(false);
        setUser(profileMockData);
        setRepos([]);

        const [userData, repoData] = await Promise.all([
          getGitHubUser(username),
          getGitHubRepos(username),
        ]);

        if (ignore) return;

        setUser(userData);
        setRepos(repoData);
        setHasSearched(true);
      } catch {
        if (ignore) return;

        setErrorMessage(commonT.githubUserNotFound);
        setUser(profileMockData);
        setRepos([]);
        setHasSearched(false);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      ignore = true;
    };
  }, [username, commonT.githubUserNotFound]);

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

  const recentRepos = repos.slice(0, RECENT_REPOS_LIMIT);

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

        {isLoading ? (
          <GitHubCardSkeleton label={t.loading} />
        ) : (
          <ProfileCard
            user={user}
            description={t.noBioText}
            visitGithubText={t.visitGithub}
            reposLabel={t.repos}
            followersLabel={t.followers}
            followingLabel={t.following}
          />
        )}

        {hasSearched && !isLoading && !errorMessage && repos.length === 0 && (
          <GitHubCard
            as="p"
            radius="2xl"
            className="mx-auto w-full max-w-2xl p-6 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {repoT.noRepos}
          </GitHubCard>
        )}

        {recentRepos.length > 0 && (
          <div className="flex flex-col gap-4">
            <GitHubRepoList
              repos={recentRepos}
              title={t.recentRepos}
              noDescriptionText={repoT.noDescription}
              noLanguageText={repoT.noLanguage}
              starsLabel={repoT.stars}
              forksLabel={repoT.forks}
              updatedAtLabel={repoT.updatedAt}
            />

            <PrimaryButtonLink
              href={`/repository?username=${encodeURIComponent(username)}`}
              className="mx-auto mt-8 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
            >
              {t.viewAllRepos}
            </PrimaryButtonLink>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileView;
