export interface GithubRepository {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  language?: string;
  stargazers_count?: number;
  updated_at?: string;
}

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  public_repos?: number;
}
