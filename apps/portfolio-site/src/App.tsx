import { Component, createSignal } from 'solid-js';
import ThemeToggle from './components/ThemeToggle';
import NavigationTabs from './components/NavigationTabs';
import ProjectCard from './components/ProjectCard';
import CertificationCard from './components/CertificationCard';
import ContactForm from './components/ContactForm';
import AiAnalyzer from './components/AiAnalyzer';

const App: Component = () => {
  const [activeSection, setActiveSection] = createSignal('home');

  // Sample projects data
  const projects = [
    {
      title: "AI Resume Builder",
      description: "An intelligent resume builder that uses AI to optimize content and formatting for ATS systems.",
      githubLink: "https://github.com/vundla/ai-resume-builder",
      demoLink: "https://vundla.github.io/ai-resume-builder/",
      stack: "React, TypeScript, OpenAI, TailwindCSS",
      screenshotUrl: ""
    },
    {
      title: "GPT5 Portfolio",
      description: "Enterprise-grade portfolio with AI analysis, PHP backend, and .NET API Gateway.",
      githubLink: "https://github.com/vundla/GPT5_Portfolio",
      stack: "Solid.js, .NET, FastAPI, PHP, PostgreSQL",
      screenshotUrl: ""
    },
    {
      title: "Data Pipeline Manager",
      description: "Scalable data processing pipeline with real-time analytics dashboard.",
      githubLink: "https://github.com/vundla/data-pipeline",
      stack: "Python, Apache Kafka, Redis, Docker",
      screenshotUrl: ""
    }
  ];

  // Sample certifications data
  const certifications = [
    {
      title: "Google Cloud Professional Developer",
      provider: "Google Cloud",
      dateAchieved: "2024-06-15",
      verificationLink: "https://google.com/verify",
      skillTags: "Cloud, Kubernetes, GCP, DevOps"
    },
    {
      title: "AWS Solutions Architect",
      provider: "Amazon Web Services",
      dateAchieved: "2024-03-20",
      verificationLink: "https://aws.amazon.com/verify",
      skillTags: "AWS, Architecture, Cloud Security"
    },
    {
      title: "Meta Front-End Developer",
      provider: "Meta / Coursera",
      dateAchieved: "2023-12-01",
      verificationLink: "https://coursera.org/verify",
      skillTags: "React, JavaScript, UI/UX, Testing"
    }
  ];

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
      content: (
        <section class="home-section">
          <div class="hero">
            <h2 class="hero-title">Welcome to GPT5 Portfolio</h2>
            <p class="hero-subtitle">
              An enterprise-grade portfolio featuring AI-powered analysis, 
              stunning leopard print theme, and production-ready architecture.
            </p>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-value">10+</span>
                <span class="stat-label">Projects</span>
              </div>
              <div class="stat">
                <span class="stat-value">5+</span>
                <span class="stat-label">Certifications</span>
              </div>
              <div class="stat">
                <span class="stat-value">3</span>
                <span class="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
          
          <div class="featured-section">
            <h3>Featured Project</h3>
            <ProjectCard {...projects[0]} onAnalyze={() => setActiveSection('ai')} />
          </div>
        </section>
      )
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
      content: (
        <section class="projects-section">
          <h2 class="section-title">My Projects</h2>
          <p class="section-subtitle">A showcase of my work - from AI tools to full-stack applications</p>
          <div class="projects-grid">
            {projects.map((project) => (
              <ProjectCard {...project} onAnalyze={() => setActiveSection('ai')} />
            ))}
          </div>
        </section>
      )
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>,
      content: (
        <section class="certifications-section">
          <h2 class="section-title">Certifications</h2>
          <p class="section-subtitle">Professional credentials and continuous learning achievements</p>
          <div class="certifications-grid">
            {certifications.map((cert) => (
              <CertificationCard {...cert} onAnalyze={() => setActiveSection('ai')} />
            ))}
          </div>
        </section>
      )
    },
    {
      id: 'about',
      label: 'About Me',
      icon: <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      content: (
        <section class="about-section">
          <h2 class="section-title">About Me</h2>
          <div class="about-content card">
            <div class="about-intro">
              <h3>🌟 My Story</h3>
              <p>
                I'm a passionate software developer with a vision to build 
                technology that makes a difference. My journey in tech started 
                with curiosity and has evolved into a career dedicated to 
                creating enterprise-level solutions.
              </p>
            </div>
            
            <div class="about-mission">
              <h3>🎯 Mission</h3>
              <p>
                To leverage technology for positive impact, creating solutions 
                that are not just functional but transformative.
              </p>
            </div>
            
            <div class="about-values">
              <h3>💎 Core Values</h3>
              <ul>
                <li>Excellence in every line of code</li>
                <li>Continuous learning and growth</li>
                <li>Collaboration and knowledge sharing</li>
                <li>Innovation with purpose</li>
              </ul>
            </div>
            
            <div class="about-skills">
              <h3>🛠️ Technical Skills</h3>
              <div class="skills-grid">
                <div class="skill-item">
                  <span class="skill-name">Frontend</span>
                  <div class="skill-bar"><div class="skill-progress" style="width: 90%"/></div>
                </div>
                <div class="skill-item">
                  <span class="skill-name">Backend</span>
                  <div class="skill-bar"><div class="skill-progress" style="width: 85%"/></div>
                </div>
                <div class="skill-item">
                  <span class="skill-name">AI/ML</span>
                  <div class="skill-bar"><div class="skill-progress" style="width: 75%"/></div>
                </div>
                <div class="skill-item">
                  <span class="skill-name">DevOps</span>
                  <div class="skill-bar"><div class="skill-progress" style="width: 80%"/></div>
                </div>
              </div>
            </div>
            
            <div class="about-fun">
              <h3>🎮 Fun Facts</h3>
              <p>When I'm not coding, you'll find me exploring new technologies, 
              contributing to open source, or sharing knowledge with the community.</p>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      content: (
        <section class="contact-section">
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-subtitle">Have a project in mind? Let's create something amazing together.</p>
          <div class="contact-wrapper">
            <ContactForm />
            <div class="contact-info card">
              <h3>📍 Quick Connect</h3>
              <p>Ready to collaborate? Reach out through the form or connect with me on social media.</p>
              <div class="contact-details">
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <span>hello@gpt5portfolio.com</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>South Africa</span>
                </div>
              </div>
              <a href="/cv.pdf" class="btn btn-primary btn-full" download>
                📄 Download CV
              </a>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'ai',
      label: 'AI Analyzer',
      icon: <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
      content: (
        <section class="ai-section">
          <h2 class="section-title">AI Analyzer</h2>
          <p class="section-subtitle">Leverage AI to analyze your projects, generate CV bullet points, and get career insights</p>
          <AiAnalyzer type="project" />
        </section>
      )
    }
  ];

  return (
    <>
      <header class="app-header">
        <nav class="navbar">
          <div class="nav-brand">
            <span class="brand-icon">🐆</span>
            <h1>GPT5 Portfolio</h1>
          </div>
          <ThemeToggle />
        </nav>
      </header>

      <main class="main-content">
        <NavigationTabs
          tabs={tabs}
          defaultTab="home"
          onTabChange={(id) => setActiveSection(id)}
        />
      </main>

      <footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2024 GPT5 Portfolio. Enterprise Edition.</p>
          <div class="footer-tech">
            <span>Solid.js</span>
            <span>•</span>
            <span>.NET</span>
            <span>•</span>
            <span>FastAPI</span>
            <span>•</span>
            <span>PHP</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
