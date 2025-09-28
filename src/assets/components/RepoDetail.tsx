import React, { useEffect, useState } from 'react';
import { getReadme } from '../../services/github';
import ReactMarkdown from 'react-markdown';

type Props = { owner: string; repo: string; onClose: () => void };

export default function RepoDetail({ owner, repo, onClose }: Props) {
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getReadme(owner, repo)
      .then(data => setReadme(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [owner, repo]);

  if (loading) return <p>Carregando README...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card repo-detail">
      <button className="close-btn" onClick={onClose}>Fechar</button>
      <h3>{repo}</h3>
      {readme && <ReactMarkdown>{readme}</ReactMarkdown>}
      <a href={`https://github.com/${owner}/${repo}`} target="_blank" rel="noreferrer">
        Abrir no GitHub
      </a>
    </div>
  );
}
