import type {
  GitHubEvent,
  GitHubRankingResponse,
  GitHubRepo,
  GitHubUser,
} from "@/types/github";

// 깃허브 유저
export const getGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(
    `/api/github/user?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    throw new Error("GITHUB_USER_FETCH_ERROR");
  }

  return response.json();
};

// 깃허브 레포
export const getGitHubRepos = async (
  username: string,
): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `/api/github/repos?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    throw new Error("GITHUB_REPOS_FETCH_ERROR");
  }

  return response.json();
};

// 깃허브 활동
export const getGitHubEvents = async (
  username: string,
): Promise<GitHubEvent[]> => {
  const response = await fetch(
    `/api/github/activity?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    throw new Error("GITHUB_EVENTS_FETCH_ERROR");
  }

  return response.json();
};

// 깃허브 랭킹
interface GetGitHubRankingUsersParams {
  language?: string;
  location?: string;
  page?: number;
}

export const getGitHubRankingUsers = async ({
  language = "all",
  location = "all",
  page = 1,
}: GetGitHubRankingUsersParams): Promise<GitHubRankingResponse> => {
  const searchParams = new URLSearchParams();

  if (language !== "all") {
    searchParams.set("language", language);
  }

  if (location !== "all") {
    searchParams.set("location", location);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();

  const response = await fetch(
    queryString ? `/api/github/ranking?${queryString}` : "/api/github/ranking",
  );

  if (!response.ok) {
    throw new Error("GITHUB_RANKING_FETCH_ERROR");
  }

  return response.json();
};
