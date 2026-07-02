import gitHubApi from "@/lib/github";
import { GitHubRepo, GitHubUser } from "@/types/github";

// 유저 가져오기
export const getUser = async (username: string): Promise<GitHubUser> => {
  const { data } = await gitHubApi.get(`/users/${username}`);
  return data;
};

// 레포 가져오기
export const getRepos = async (username: string): Promise<GitHubRepo[]> => {
  const { data } = await gitHubApi.get(`/users/${username}/repos?sort=updated`);
  return data;
};
