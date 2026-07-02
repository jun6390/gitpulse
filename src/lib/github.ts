// GitHub API 연결

import axios from "axios";

const gitHubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export default gitHubApi;
