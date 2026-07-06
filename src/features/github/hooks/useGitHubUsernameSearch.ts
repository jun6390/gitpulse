"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useGitHubUsernameSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const username = searchParams.get("username")?.trim() ?? "";

  const clearUsername = useCallback(() => {
    router.push(pathname, {
      scroll: true,
    });
  }, [pathname, router]);

  const searchUsername = useCallback(
    (nextUsername: string) => {
      const trimmedUsername = nextUsername.trim();

      if (!trimmedUsername) {
        clearUsername();
        return;
      }

      router.push(
        `${pathname}?username=${encodeURIComponent(trimmedUsername)}`,
        {
          scroll: true,
        },
      );
    },
    [clearUsername, pathname, router],
  );

  return {
    username,
    clearUsername,
    searchUsername,
  };
};
