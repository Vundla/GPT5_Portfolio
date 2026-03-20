import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  aiReview: string = '';
  isAnalyzing: boolean = false;

  // New Projects List from previous portfolio
  projects = [
    { 
      title: 'Cinverse', 
      description: 'A platform for immersive cinematic experiences.', 
      tags: ['Web App', 'Multimedia'], 
      link: 'https://cineverse-client.onrender.com/', 
      backendLink: 'https://cineverse-p4b1.onrender.com/',
      cols: 'col-md-4' 
    },
    { 
      title: 'Zitholele', 
      description: 'A locator application to find traditional healers.', 
      tags: ['Web App', 'Geolocation'], 
      link: 'https://vundla.github.io/sangoma-locator-app/', 
      cols: 'col-md-4' 
    }
  ];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  openProject(link: string | undefined) {
    if (!link || link === '#') {
      this.snackBar.open('Project link coming soon!', 'Dismiss', { duration: 3000 });
    } else {
      window.open(link, '_blank');
    }
  }

  analyzeProject(description: string) {
    if (!description) return;
    
    this.isAnalyzing = true;
    this.snackBar.open('Consulting AI Architect on System Resilience...', 'OK', { duration: 3000 });

    // Request specifically targets the "Project Resilience" analysis
    this.http.post<any>(`${environment.apiUrl}/AiAnalyzer/project`, { content: description })
      .subscribe({
        next: (result) => {
          // The new backend returns { analysis: "..." }
          this.aiReview = result.analysis || "Analysis completed.";
          this.isAnalyzing = false;
        },
        error: (err) => {
          console.error('AI Service Error:', err);
          this.aiReview = "⚠️ Capability degraded: AI Services unavailable. (Fault Tolerance: Circuit Breaker Open)";
          this.isAnalyzing = false;
        }
      });
  }
}
