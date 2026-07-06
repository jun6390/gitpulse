import "server-only";

import { NextResponse } from "next/server";

export const GITHUB_API_URL = "https://api.github.com";

export const getGitHubHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

export const proxyGitHubResponse = async (
  path: string,
  fallbackMessage: string,
) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}${path}`, {
      headers: getGitHubHeaders(),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message ?? fallbackMessage },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: fallbackMessage },
      { status: 500 },
    );
  }
};
