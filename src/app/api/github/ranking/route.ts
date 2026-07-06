import { NextRequest, NextResponse } from "next/server";
import type {
  GitHubRankingResponse,
  GitHubRankingUser,
} from "@/types/github";

interface GitHubSearchUserItem {
  id: number;
  login: string;
  type: string;
}

interface GitHubSearchUsersResponse {
  total_count: number;
  items: GitHubSearchUserItem[];
}

interface GitHubUserDetailResponse {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

const GITHUB_API_URL = "https://api.github.com";
const PAGE_SIZE = 10;
const MAX_RANKING_USERS = 100;
const MAX_PAGE = MAX_RANKING_USERS / PAGE_SIZE;

const getValidPage = (value: string | null) => {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return Math.min(page, MAX_PAGE);
};

const getGitHubHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const language = searchParams.get("language")?.trim() ?? "";
    const location = searchParams.get("location")?.trim() ?? "";
    const page = getValidPage(searchParams.get("page"));

    const queryParts = ["followers:>0", "type:user"];

    if (language) {
      queryParts.push(`language:${language}`);
    }

    if (location) {
      queryParts.push(`location:${location}`);
    }

    const searchUrl = new URL(`${GITHUB_API_URL}/search/users`);

    searchUrl.searchParams.set("q", queryParts.join(" "));
    searchUrl.searchParams.set("sort", "followers");
    searchUrl.searchParams.set("order", "desc");
    searchUrl.searchParams.set("per_page", String(PAGE_SIZE));
    searchUrl.searchParams.set("page", String(page));

    const searchResponse = await fetch(searchUrl, {
      headers: getGitHubHeaders(),
      next: { revalidate: 60 * 30 },
    });

    if (!searchResponse.ok) {
      return NextResponse.json(
        { message: "GitHub 사용자 검색에 실패했습니다." },
        { status: searchResponse.status },
      );
    }

    const searchData =
      (await searchResponse.json()) as GitHubSearchUsersResponse;

    const searchUsers = searchData.items.filter(
      (user) => user.type === "User",
    );

    const rankingUsers = await Promise.all(
      searchUsers.map(async (user) => {
        const userResponse = await fetch(
          `${GITHUB_API_URL}/users/${user.login}`,
          {
            headers: getGitHubHeaders(),
            next: { revalidate: 60 * 30 },
          },
        );

        if (!userResponse.ok) return null;

        const userDetail =
          (await userResponse.json()) as GitHubUserDetailResponse;

        const rankingUser: GitHubRankingUser = {
          id: userDetail.id,
          login: userDetail.login,
          name: userDetail.name,
          avatar_url: userDetail.avatar_url,
          html_url: userDetail.html_url,
          bio: userDetail.bio,
          location: userDetail.location,
          followers: userDetail.followers,
          following: userDetail.following,
          public_repos: userDetail.public_repos,
        };

        return rankingUser;
      }),
    );

    const resolvedUsers = rankingUsers.filter(
      (user): user is GitHubRankingUser => user !== null,
    );
    const totalCount = Math.min(
      searchData.total_count,
      MAX_RANKING_USERS,
    );
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const response: GitHubRankingResponse = {
      users: resolvedUsers,
      totalCount,
      totalPages,
      page,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch GitHub ranking users:", error);

    return NextResponse.json(
      { message: "랭킹 정보를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
