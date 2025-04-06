import { useEffect, useState } from 'react';
import { fetchUserRepositories } from '../../services/github.service';
import { GithubRepository } from '../../types/github.types';

function GithubRepos() {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserRepositories('eiztrips');
        setRepos(data);
        setError(null);
      } catch (err) {
        setError('Failed to load repositories');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, []);

  if (isLoading) return <div className="github-repos loading">Loading repositories...</div>;
  if (error) return <div className="github-repos error">{error}</div>;

  return (
    <div className="github-repos">
      <h2><i className="fi fi-brands-github"></i> Мои репозитории на GitHub</h2>
      <ul className="repo-list">
        {repos.map(repo => (
          <li key={repo.id} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title={repo.name}>
              <i className="fi fi-rr-code-branch repo-icon"></i>
              <span className="repo-name">{repo.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GithubRepos;
