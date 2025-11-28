import { Component, createSignal } from "solid-js";

interface AiAnalyzerProps {
  initialContent?: string;
  type?: "project" | "certification" | "general";
}

interface AnalysisResult {
  summary: string;
  strengths: string[];
  improvements: string[];
  job_matches: string[];
  cv_bullet_points: string;
  linkedin_headline: string;
}

const AiAnalyzer: Component<AiAnalyzerProps> = (props) => {
  const [content, setContent] = createSignal(props.initialContent || "");
  const [isAnalyzing, setIsAnalyzing] = createSignal(false);
  const [result, setResult] = createSignal<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = createSignal<"summary" | "cv" | "linkedin" | "jobs">("summary");

  const analyze = async () => {
    if (!content().trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content(),
          type: props.type || "general"
        })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div class="ai-analyzer card">
      <div class="analyzer-header">
        <h3>
          <span class="ai-icon">🤖</span>
          AI Analyzer
        </h3>
        <span class="ai-badge">Powered by GPT5</span>
      </div>

      <div class="analyzer-input">
        <textarea
          value={content()}
          onInput={(e) => setContent(e.currentTarget.value)}
          placeholder="Paste your project description, certification details, or any content you want analyzed..."
          rows="4"
          class="analyzer-textarea"
        />
        <button
          class="btn btn-ai btn-full"
          onClick={analyze}
          disabled={isAnalyzing() || !content().trim()}
        >
          {isAnalyzing() ? (
            <>
              <span class="spinner" />
              Analyzing...
            </>
          ) : (
            <>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Analyze with AI
            </>
          )}
        </button>
      </div>

      {result() && (
        <div class="analyzer-results">
          <div class="result-tabs">
            <button
              class={`tab ${activeTab() === "summary" ? "active" : ""}`}
              onClick={() => setActiveTab("summary")}
            >
              Summary
            </button>
            <button
              class={`tab ${activeTab() === "cv" ? "active" : ""}`}
              onClick={() => setActiveTab("cv")}
            >
              CV Points
            </button>
            <button
              class={`tab ${activeTab() === "linkedin" ? "active" : ""}`}
              onClick={() => setActiveTab("linkedin")}
            >
              LinkedIn
            </button>
            <button
              class={`tab ${activeTab() === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              Job Matches
            </button>
          </div>

          <div class="result-content">
            {activeTab() === "summary" && (
              <div class="result-section">
                <h4>Summary</h4>
                <p>{result()!.summary}</p>
                
                <h4>Strengths</h4>
                <ul class="strength-list">
                  {result()!.strengths.map((s) => (
                    <li class="strength-item">✅ {s}</li>
                  ))}
                </ul>

                <h4>Areas for Improvement</h4>
                <ul class="improvement-list">
                  {result()!.improvements.map((i) => (
                    <li class="improvement-item">💡 {i}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab() === "cv" && (
              <div class="result-section">
                <h4>CV Bullet Points</h4>
                <pre class="cv-output">{result()!.cv_bullet_points}</pre>
                <button class="btn btn-outline btn-small" onClick={() => navigator.clipboard.writeText(result()!.cv_bullet_points)}>
                  📋 Copy to Clipboard
                </button>
              </div>
            )}

            {activeTab() === "linkedin" && (
              <div class="result-section">
                <h4>LinkedIn Headline</h4>
                <p class="linkedin-headline">{result()!.linkedin_headline}</p>
                <button class="btn btn-outline btn-small" onClick={() => navigator.clipboard.writeText(result()!.linkedin_headline)}>
                  📋 Copy to Clipboard
                </button>
              </div>
            )}

            {activeTab() === "jobs" && (
              <div class="result-section">
                <h4>Matching Job Roles</h4>
                <div class="job-matches">
                  {result()!.job_matches.map((job) => (
                    <span class="job-badge">{job}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAnalyzer;
