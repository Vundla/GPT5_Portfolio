import { Component } from "solid-js";

interface ProjectCardProps {
  title: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
  stack?: string;
  screenshotUrl?: string;
  onAnalyze?: () => void;
}

const ProjectCard: Component<ProjectCardProps> = (props) => {
  return (
    <div class="project-card card hover-lift">
      {props.screenshotUrl && (
        <div class="project-screenshot">
          <img src={props.screenshotUrl} alt={props.title} loading="lazy" />
        </div>
      )}
      <div class="project-content">
        <h3 class="project-title">{props.title}</h3>
        <p class="project-description">{props.description}</p>
        
        {props.stack && (
          <div class="project-stack">
            {props.stack.split(',').map((tech) => (
              <span class="tech-badge">{tech.trim()}</span>
            ))}
          </div>
        )}
        
        <div class="project-actions">
          {props.githubLink && (
            <a href={props.githubLink} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {props.demoLink && (
            <a href={props.demoLink} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
          {props.onAnalyze && (
            <button class="btn btn-ai" onClick={props.onAnalyze}>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              AI Analyze
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
