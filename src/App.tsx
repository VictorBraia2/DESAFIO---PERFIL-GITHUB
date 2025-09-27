import React, { useState } from 'react';
import './index.css';
import { getUser, getRepos, type User, type Repo } from './services/github';
import Profile from './assets/components/Profile';
import RepoList from './assets/components/RepoList';

export default function App() {
  const [username, setUsername] = useState('octocat');
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!username) return;
    setError(null);
    setLoading(true);
    try {
      const u = await getUser(username);
      const r = await getRepos(username);
      setUser(u);
      setRepos(r);
    } catch (err: any) {
      setUser(null);
      setRepos([]);
      setError(err.message || 'Erro ao buscar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>GitHub Profile</h1>
        <form onSubmit={handleSearch} className="search">
          <input
            value={username}
            onChange={e => setUsername(e.target.value.trim())}
            placeholder="Digite o username (ex: octocat)"
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        {loading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {user && <Profile user={user} />}
        {user && (
          <>
            <h3>Repositórios</h3>
            <RepoList repos={repos} />
          </>
        )}
      </main>

      <footer className="muted">
        Teste com username: <strong>octocat</strong>
      </footer>
    </div>
  );
}