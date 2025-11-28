# GPT5 Portfolio Monorepo

🐆 **Enterprise-Grade Portfolio with AI-Powered Analysis**

A production-ready portfolio application featuring a stunning leopard print theme, AI content analysis, and a robust multi-service architecture.

## 🏗️ Architecture

```
gpt5-portfolio-monorepo/
├── apps/
│   ├── portfolio-site/     # Solid.js frontend with enterprise UI
│   ├── api-gateway/        # ASP.NET Core 8 API Gateway
│   ├── ai-playground/      # FastAPI AI Engine
│   └── php-columns/        # PHP Column Service
├── scripts/
│   ├── bootstrap.ps1       # Setup script
│   ├── dev.ps1            # Development runner
│   └── init-db.sql        # Database initialization
├── docker-compose.yml      # Full service orchestration
└── pnpm-workspace.yaml     # Monorepo configuration
```

## 🎯 Features

### Portfolio Columns
- **Projects** - Showcase your work with GitHub links, demos, and tech stacks
- **Certifications** - Display credentials with verification links
- **About Me** - Your story, skills, and values
- **Contact** - Form with PHP backend processing
- **AI Analyzer** - AI-powered content analysis and career insights

### AI Analyzer Capabilities
- 📝 Project/Certification summarization
- 💪 Strengths identification
- 💡 Improvement suggestions
- 👔 Job role matching
- 📄 CV bullet point generation
- 💼 LinkedIn headline suggestions

### Enterprise UI Features
- 🐆 Global leopard print theme with dark mode support
- 🌓 Theme toggle (light/dark)
- 📱 Fully responsive design
- ✨ Hover animations and transitions
- 🎨 Angular Material-inspired components

## 🛠️ Tech Stack

| Service | Technology | Purpose |
|---------|-----------|---------|
| Frontend | Solid.js + TypeScript | Portfolio UI with enterprise components |
| API Gateway | ASP.NET Core 8 | Request routing and orchestration |
| AI Engine | FastAPI (Python) | AI analysis and content generation |
| Column Service | PHP 8.2 | CRUD operations for portfolio data |
| Database | PostgreSQL 16 | Data persistence |
| Container | Docker | Service orchestration |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop
- pnpm (or npm)

### Quick Start

1. **Clone and setup:**
   ```bash
   git clone https://github.com/Vundla/GPT5_Portfolio.git
   cd GPT5_Portfolio
   pnpm install
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8000
   - AI Playground: http://localhost:7000
   - PHP Columns: http://localhost:9000

### Development Mode

```bash
# Windows PowerShell
.\scripts\dev.ps1

# Or manually
cd apps/portfolio-site && pnpm dev
```

## 📁 Service Details

### Portfolio Site (Solid.js)
- Enterprise UI components (ProjectCard, CertificationCard, etc.)
- Navigation tabs with hover effects
- AI Analyzer integration
- Theme toggle with persistence

### API Gateway (.NET 8)
- Health check endpoints
- AI proxy service
- CORS configuration
- Swagger documentation

### AI Playground (FastAPI)
- `/ai/generate` - Content generation
- `/ai/analyze` - Project/certification analysis
- `/ai/cv-bullets` - CV bullet point generation
- `/ai/linkedin-headline` - LinkedIn headline suggestions

### PHP Column Service
- `/projects` - CRUD for projects
- `/certifications` - CRUD for certifications
- `/contact` - Contact form handling
- `/health` - Service health check

## 🎨 Theme Customization

The leopard print theme uses CSS custom properties:

```css
:root {
  --leopard-base: #D4A574;
  --leopard-spot-dark: #2C1810;
  --leopard-spot-center: #8B6914;
}
```

## 📝 License

MIT License - Built with ❤️ by Vundla
