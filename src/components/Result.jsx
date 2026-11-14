import { useState, useEffect, useCallback } from "react";
import { GitFork, CircleDot, Code2, Star } from "lucide-react";

function Result({ selectedLang }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchRepos = useCallback(
    async (signal) => {
      if (!selectedLang) return;

      setLoading(true);

      try {
        const language = encodeURIComponent(selectedLang);

        const response = await fetch(
          `https://api.github.com/search/repositories?q=language:${language}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();

        const randomRepo =
          data.items?.[Math.floor(Math.random() * data.items.length)];

        setRepos(randomRepo ? [randomRepo] : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [selectedLang],
  );

  useEffect(() => {
    if (!selectedLang) return;

    const controller = new AbortController();

    // Defer execution outside the synchronous effect body
    const timer = setTimeout(() => {
      fetchRepos(controller.signal);
    }, 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [selectedLang, refreshKey, fetchRepos]);

  return (
    <div>
      <div className="results-container">
        {loading && <p>Loading, please wait...</p>}

        {!loading && !selectedLang && <p>Please select a language</p>}

        {!loading && selectedLang && repos.length === 0 && (
          <p>No repositories found.</p>
        )}

        {!loading && repos.length > 0 && (
          <>
            <h2>{repos[0].name}</h2>
            <p>{repos[0].description}</p>

            <div className="repo-stats">
              <span>
                <Code2 size={14} /> {repos[0].language || "Unknown"}
              </span>
              <span>
                <Star size={14} /> {repos[0].stargazers_count}
              </span>
              <span>
                <GitFork size={14} /> {repos[0].forks_count}
              </span>
              <span>
                <CircleDot size={14} /> {repos[0].open_issues_count}
              </span>
            </div>

            <a href={repos[0].html_url} target="_blank" rel="noreferrer">
              View Repository &rarr;
            </a>
            <button onClick={() => setRefreshKey((prev) => prev + 1)}>
              Refresh
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Result;
