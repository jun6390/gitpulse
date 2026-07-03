import { isAxiosError } from "axios";
import gitHubApi from "@/lib/gitHubApi";
import type { GitHubRepo, GitHubUser } from "@/types/github";

export const getGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await gitHubApi.get<GitHubUser>(`/users/${username}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("GitHub API 요청 제한에 걸렸습니다.");
      }

      if (error.response?.status === 404) {
        throw new Error("GitHub 사용자를 찾을 수 없습니다.");
      }
    }

    throw new Error("GitHub 사용자 정보를 불러오지 못했습니다.");
  }
};

interface GetGitHubReposOptions {
  perPage?: number;
  page?: number;
}

export const getGitHubRepos = async (
  username: string,
  options?: GetGitHubReposOptions,
): Promise<GitHubRepo[]> => {
  try {
    const response = await gitHubApi.get<GitHubRepo[]>(
      `/users/${username}/repos`,
      {
        params: {
          sort: "updated",
          direction: "desc",
          per_page: options?.perPage ?? 6,
          page: options?.page ?? 1,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("GitHub API 요청 제한에 걸렸습니다.");
      }

      if (error.response?.status === 404) {
        throw new Error("GitHub 사용자를 찾을 수 없습니다.");
      }
    }

    throw new Error("저장소를 불러오지 못했습니다.");
  }
};
