import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";

const githubHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "GitHub username is required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${encodeURIComponent(
        username,
      )}/repos?sort=updated&per_page=100`,
      {
        headers: githubHeaders,
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to fetch GitHub repositories.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch GitHub repositories." },
      { status: 500 },
    );
  }
}
