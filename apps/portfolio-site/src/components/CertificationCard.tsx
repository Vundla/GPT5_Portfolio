import { Component } from "solid-js";

interface CertificationCardProps {
  title: string;
  provider: string;
  dateAchieved?: string;
  verificationLink?: string;
  skillTags?: string;
  onAnalyze?: () => void;
}

const CertificationCard: Component<CertificationCardProps> = (props) => {
  const providerLogos: Record<string, string> = {
    google: "🔵",
    aws: "🟠",
    microsoft: "🔷",
    meta: "🔵",
    coursera: "🟦",
    capaciti: "🟢",
    udemy: "🟣",
    linkedin: "🔵"
  };

  const getProviderIcon = () => {
    const provider = props.provider.toLowerCase();
    for (const [key, icon] of Object.entries(providerLogos)) {
      if (provider.includes(key)) return icon;
    }
    return "📜";
  };

  return (
    <div class="certification-card card hover-lift">
      <div class="cert-header">
        <span class="cert-icon">{getProviderIcon()}</span>
        <div class="cert-info">
          <h3 class="cert-title">{props.title}</h3>
          <p class="cert-provider">{props.provider}</p>
        </div>
      </div>

      {props.dateAchieved && (
        <p class="cert-date">
          <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {props.dateAchieved}
        </p>
      )}

      {props.skillTags && (
        <div class="cert-skills">
          {props.skillTags.split(',').map((skill) => (
            <span class="skill-badge">{skill.trim()}</span>
          ))}
        </div>
      )}

      <div class="cert-actions">
        {props.verificationLink && (
          <a href={props.verificationLink} target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-small">
            <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Verify
          </a>
        )}
        {props.onAnalyze && (
          <button class="btn btn-ai btn-small" onClick={props.onAnalyze}>
            <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            AI Breakdown
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;
