export interface User {
  login: string;
  avatar_url: string;
  name?: string | null;
  bio?: string | null;
  public_repos: number;
  followers: number;
  following: number;
  company?: string | null;
  location?: string | null;
  blog?: string | null;
}

export interface RepoOwner {
  login: string;
  avatar_url: string;
}

export interface Repo {
  id: number;
  name: string;
  description?: string | null;
  stargazers_count: number;
  forks_count: number;
  language?: string | null;
  updated_at: string;
  html_url: string;
  owner: RepoOwner;
}

const BASE = 'https://api.github.com';

export async function getUser(username: string): Promise<User> {
  const res = await fetch(`${BASE}/users/${username}`);
  if (!res.ok) throw new Error('Usuário não encontrado');
  return res.json();
}

export async function getRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`${BASE}/users/${username}/repos?per_page=100&sort=updated`);
  if (!res.ok) throw new Error('Repositórios não encontrados');
  return res.json();
}

export async function getReadme(owner: string, repo: string): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github.raw+json' }
  });
  if (!res.ok) throw new Error('README não encontrado');
  return res.text();
}
