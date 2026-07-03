import type { GitHubRepo, GitHubUser } from "@/types/github";

export const getGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(
    `/api/github/user?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    throw new Error("GitHub 사용자 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

export const getGitHubRepos = async (
  username: string,
): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `/api/github/repos?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    throw new Error("GitHub 저장소 정보를 불러오지 못했습니다.");
  }

  return response.json();
};
