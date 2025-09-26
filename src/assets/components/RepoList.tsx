type RepoListProps = {
  repos: any[];
};

export default function RepoList({ repos }: RepoListProps) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Repositórios:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {repos.map((repo) => (
          <li key={repo.id} style={{ borderBottom: "1px solid #ddd", marginBottom: "1rem", paddingBottom: "0.5rem" }}>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
            <p>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>
            <p>Linguagem: {repo.language}</p>
            <p>Última atualização: {new Date(repo.updated_at).toLocaleDateString("pt-BR")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}