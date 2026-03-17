import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    this.snackBar.open('Initializing AI Analysis submodule...', 'OK', { duration: 2000 });

    this.http.post<any>('https://localhost:7001/api/certifications/analyze', { description })
      .subscribe({
        next: (result) => {
          this.aiReview = result.Review;
          this.isAnalyzing = false;
        },
        error: (err) => {
          console.error(err);
          this.aiReview = "Error: AI Service Unavailable. Please try again later.";
          this.isAnalyzing = false;
        }
      });
  }
}
