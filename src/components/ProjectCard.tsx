import { useState } from 'react';
import type { Project } from '../App';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatStars = (stars: number) => {
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars.toString();
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Go: '#00ADD8',
      Ruby: '#CC342D',
      PHP: '#777BB4',
      JavaScript: '#f1e05a',
    };
    return colors[lang] || '#8b949e';
  };

  const copyToClipboard = () => {
    const template = `🔧 ${project.name} - ${project.description}

Perfect for: ${project.perfectFor}

✨ Features:
${project.features.map(f => `• ${f}`).join('\n')}

📦 ${project.repoUrl}
🚀 Live demo: ${project.demoUrl}

#GitHub`;

    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        <div className="card-title-row">
          <span className="card-icon">🔧</span>
          <h2 className="card-title">{project.name}</h2>
        </div>
        <div className="card-meta">
          <span className="card-stars">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            {formatStars(project.stars)}
          </span>
          <span className="card-language">
            <span className="lang-dot" style={{ backgroundColor: getLanguageColor(project.language) }} />
            {project.language}
          </span>
        </div>
      </div>

      <p className="card-description">{project.description}</p>

      <div className="card-perfect-for">
        <span className="perfect-label">Perfect for:</span>
        <span className="perfect-text">{project.perfectFor}</span>
      </div>

      <div className="card-features">
        <span className="features-label">✨ Features:</span>
        <ul className="features-list">
          {project.features.map((feature, i) => (
            <li key={i}>• {feature}</li>
          ))}
        </ul>
      </div>

      <div className="card-links">
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="card-link repo-link">
          <span className="link-icon">📦</span>
          <span>Repository</span>
        </a>
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="card-link demo-link">
          <span className="link-icon">🚀</span>
          <span>Live Demo</span>
        </a>
      </div>

      <button
        className={`copy-btn ${copied ? 'copied' : ''}`}
        onClick={copyToClipboard}
        title="Copy as Twitter thread"
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5,15H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H13a2,2,0,0,1,2,2V5" />
            </svg>
            Copy for Twitter
          </>
        )}
      </button>

      <div className="card-glow" />
    </article>
  );
}
