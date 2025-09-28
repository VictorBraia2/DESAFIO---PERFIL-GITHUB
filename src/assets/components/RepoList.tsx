import React, { useState } from 'react';
import type { Repo } from '../../services/github';
import RepoDetail from './RepoDetail';

function relativeTime(dateString: string) {
  const d = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  const days = Math.floor(diff / 86400);
  if (days === 0) return 'há menos de 1 dia';
  if (days === 1) return 'há 1 dia';
  return `há ${days} dias`;
}

type Props = { repos: Repo[] };

export default function RepoList({ repos }: Props) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  if (!repos.length) return <p>Nenhum repositório público.</p>;

  return (
    <>
      {selectedRepo && selectedRepo.owner && (
        <RepoDetail
          owner={selectedRepo.owner.login}
          repo={selectedRepo.name}
          onClose={() => setSelectedRepo(null)}
        />
      )}

      <div className="repo-list">
        {repos.map(r => (
          <div
            key={r.id}
            className="repo-item"
            onClick={() => setSelectedRepo(r)}
            style={{ cursor: 'pointer' }}
          >
            <div className="repo-left">
              <h4>{r.name}</h4>
              {r.description && <p className="muted">{r.description}</p>}
              <div className="repo-meta">
                {r.language && <span className="chip">{r.language}</span>}
                <span>★ {r.stargazers_count}</span>
                <span>🍴 {r.forks_count}</span>
                <span className="muted">{relativeTime(r.updated_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
