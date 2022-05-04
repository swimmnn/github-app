export interface IUsers {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface IUser {
  avatar_url: string;
  name: string;
  email: string | null;
  location: string;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
}

export interface IRepos {
  name: string;
  forks: number;
  stargazers_count: number;
  svn_url: string;
}
