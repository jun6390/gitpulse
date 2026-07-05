// 깃허브 유저 타입
export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

// 깃허브 레포 타입
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

// 깃허브 활동 타입
export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login?: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    size?: number;
    ref?: string;
    ref_type?: string;
    commits?: {
      sha: string;
      message: string;
      url: string;
    }[];
    pull_request?: {
      html_url: string;
      title: string;
      merged?: boolean;
    };
    issue?: {
      html_url: string;
      title: string;
    };
  };
  public: boolean;
  created_at: string;
}
