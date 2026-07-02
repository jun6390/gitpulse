// 다국어 관리

export const translations = {
  ko: {
    common: {
      title: "GitPulse",
    },

    nav: {
      overview: "개요",
      profile: "프로필",
      repositories: "저장소",
      languages: "언어 분석",
      activity: "활동 분석",
    },

    home: {
      heroBadge: "개발자 데이터를 더 똑똑하게",
      heroTitle: "개발자의 모든 것\n깃펄스에서 쉽고 간편하게",
      heroDescription:
        "GitHub 프로필, 저장소, 사용 언어, 스타, 커밋 흐름까지\n깔끔한 대시보드로 확인해보세요.",
      heroButton: "지금 시작하기",

      introText:
        "GitHub 활동을 한눈에 조회하고 더 쉽게 분석하세요.\n프로필, 저장소, 기여 내역까지\n개발자의 성장 흐름을 한 곳에서 확인하세요.",

      featureLabel: "기능",
      featureTitle:
        "GitHub 분석의 첫 걸음,\n프로필과 저장소를\n한 곳에서 확인하세요",

      features: [
        {
          title: "프로필 조회",
          description:
            "GitHub username을 검색해 프로필, 팔로워, 팔로잉,\n공개 저장소 수를 한눈에 확인할 수 있어요.",
        },
        {
          title: "저장소 분석",
          description:
            "공개 저장소의 언어, 스타, 포크 정보를 기반으로\n개발자의 프로젝트 흐름을 분석해요.",
        },
        {
          title: "활동 요약",
          description:
            "GitHub 활동 데이터를 보기 쉽게 정리해 개발자의 성장\n흐름을 파악할 수 있어요.",
        },
        {
          title: "개선 인사이트",
          description:
            "프로필과 저장소 데이터를 바탕으로 포트폴리오 개선\n방향을 확인할 수 있어요.",
        },
      ],

      ctaTitle: "GitHub 분석, 깃펄스와 함께",
      ctaDescription:
        "개발을 시작하셨나요?\n개발자의 시작부터 성장까지\n이제 깃펄스와 함께하세요.",

      ctaCards: [
        {
          title: "프로필 분석",
          description:
            "GitHub username만 입력하면 프로필,\n팔로워, 팔로잉, 저장소 수를 한눈에\n확인할 수 있어요.",
          button: "프로필 조회하기",
        },
        {
          title: "저장소 인사이트",
          description:
            "공개 저장소의 언어, 스타, 포크 정보를\n기반으로 프로젝트 흐름을 분석해요.",
          button: "저장소 보기",
        },
        {
          title: "언어 분석",
          description:
            "사용 중인 프로그래밍 언어를 시각적으로 정리해\n개발자의 기술 스택을 확인해요.",
          button: "언어 분석하기",
        },
        {
          title: "활동 분석",
          description:
            "GitHub 활동 데이터를 바탕으로 개발자의 성장 흐름과\n활동 패턴을 확인해요.",
          button: "활동 확인하기",
        },
      ],

      description: "GitHub 사용자의 프로필과 저장소를 분석해보세요.",
      searchPlaceholder: "GitHub 아이디를 입력하세요",
      searchButton: "검색",
    },

    footer: {
      description:
        "GitPulse는 GitHub 사용자 데이터를 기반으로 프로필, 저장소, 언어, 활동 흐름을 한눈에 분석할 수 있는 개발자 인사이트 대시보드입니다.",

      columns: [
        {
          title: "메뉴",
          links: [
            { label: "개요", href: "/" },
            { label: "프로필", href: "/profile" },
            { label: "저장소", href: "/repositories" },
            { label: "언어 분석", href: "/languages" },
            { label: "활동 분석", href: "/activity" },
          ],
        },
        {
          title: "기능",
          links: [
            { label: "GitHub 프로필 조회", href: "/profile" },
            { label: "저장소 인사이트", href: "/repositories" },
            { label: "언어 사용량 분석", href: "/languages" },
            { label: "활동 흐름 분석", href: "/activity" },
          ],
        },
        {
          title: "기술 스택",
          links: [
            { label: "Next.js", href: "https://nextjs.org" },
            { label: "TypeScript", href: "https://www.typescriptlang.org" },
            { label: "Tailwind CSS", href: "https://tailwindcss.com" },
            { label: "GitHub API", href: "https://docs.github.com/en/rest" },
          ],
        },
        {
          title: "프로젝트",
          links: [
            {
              label: "GitHub Repository",
              href: "https://github.com/joon6390",
            },
            {
              label: "Developer Portfolio",
              href: "https://github.com/joon6390",
            },
            {
              label: "Contact",
              href: "mailto:example@example.com",
            },
          ],
        },
      ],

      copyright: "© 2026 GitPulse. All rights reserved.",
    },

    theme: {
      lightMode: "라이트 모드",
      darkMode: "다크 모드",
    },

    language: {
      korean: "한국어",
      english: "영어",
    },
  },

  en: {
    common: {
      title: "GitPulse",
    },

    nav: {
      overview: "Overview",
      profile: "Profile",
      repositories: "Repositories",
      languages: "Languages",
      activity: "Activity",
    },

    home: {
      heroBadge: "Smarter developer insights",
      heroTitle: "Everything about developers\nmade simple with GitPulse",
      heroDescription:
        "Explore GitHub profiles, repositories, languages, stars,\nand commit trends in a clean dashboard.",
      heroButton: "Get Started",

      introText:
        "Explore your GitHub activity at a glance.\nFrom profiles and repositories to contributions,\nunderstand your growth in one place.",

      featureLabel: "Features",
      featureTitle:
        "Start your GitHub analysis,\nexplore profiles and repositories\nin one place",

      features: [
        {
          title: "Profile Search",
          description:
            "Search a GitHub username and check profile details,\nfollowers, following, and public repositories at a glance.",
        },
        {
          title: "Repository Insights",
          description:
            "Analyze project trends based on public repositories,\nlanguages, stars, and forks.",
        },
        {
          title: "Activity Overview",
          description:
            "Organize GitHub activity data clearly and understand\na developer’s growth flow.",
        },
        {
          title: "Improvement Insights",
          description:
            "Find portfolio improvement points based on profile\nand repository data.",
        },
      ],

      ctaTitle: "GitHub analysis with GitPulse",
      ctaDescription:
        "Have you started developing?\nFrom your first project to long-term growth,\nnow move forward with GitPulse.",

      ctaCards: [
        {
          title: "Profile Analysis",
          description:
            "Enter a GitHub username and view profile details,\nfollowers, following, and repositories at a glance.",
          button: "View Profile",
        },
        {
          title: "Repository Insights",
          description:
            "Analyze project trends based on public repositories,\nlanguages, stars, and forks.",
          button: "View Repositories",
        },
        {
          title: "Language Analysis",
          description:
            "Visualize programming languages and understand\na developer’s tech stack more clearly.",
          button: "Analyze Languages",
        },
        {
          title: "Activity Analysis",
          description:
            "Check developer growth trends and activity patterns\nbased on GitHub activity data.",
          button: "View Activity",
        },
      ],

      description: "Analyze GitHub profiles and repositories.",
      searchPlaceholder: "Enter a GitHub username",
      searchButton: "Search",
    },

    footer: {
      description:
        "GitPulse is a developer insight dashboard that helps you analyze GitHub profiles, repositories, languages, and activity trends in one place.",

      columns: [
        {
          title: "Menu",
          links: [
            { label: "Overview", href: "/" },
            { label: "Profile", href: "/profile" },
            { label: "Repositories", href: "/repositories" },
            { label: "Languages", href: "/languages" },
            { label: "Activity", href: "/activity" },
          ],
        },
        {
          title: "Features",
          links: [
            { label: "GitHub Profile Search", href: "/profile" },
            { label: "Repository Insights", href: "/repositories" },
            { label: "Language Analysis", href: "/languages" },
            { label: "Activity Overview", href: "/activity" },
          ],
        },
        {
          title: "Tech Stack",
          links: [
            { label: "Next.js", href: "https://nextjs.org" },
            { label: "TypeScript", href: "https://www.typescriptlang.org" },
            { label: "Tailwind CSS", href: "https://tailwindcss.com" },
            { label: "GitHub API", href: "https://docs.github.com/en/rest" },
          ],
        },
        {
          title: "Project",
          links: [
            {
              label: "GitHub Repository",
              href: "https://github.com/joon6390",
            },
            {
              label: "Developer Portfolio",
              href: "https://github.com/joon6390",
            },
            {
              label: "Contact",
              href: "mailto:example@example.com",
            },
          ],
        },
      ],

      copyright: "© 2026 GitPulse. All rights reserved.",
    },

    theme: {
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    },

    language: {
      korean: "Korean",
      english: "English",
    },
  },
};

export type Language = keyof typeof translations;
export type Translation = typeof translations.ko;
