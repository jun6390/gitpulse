// GitHub API axios 인스턴스

import axios from "axios";

const gitHubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export default gitHubApi;
