import { NextRequest, NextResponse } from "next/server";
import { proxyGitHubResponse } from "../_lib/github";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();

  if (!username) {
    return NextResponse.json(
      { message: "GitHub username is required." },
      { status: 400 },
    );
  }

  return proxyGitHubResponse(
    `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
    "Failed to fetch GitHub repositories.",
  );
}
