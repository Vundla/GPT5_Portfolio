import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // RxJS for "fault tolerance" on frontend via retry
import { timeout } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  designParams: {
    columns: string;
    style: string;
  };
  aiAnalysis: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gpt-5-portfolio';
  
  // Profile & Intelligent Systems Branding
  profileData = {
    name: 'Architet of Intelligence',
    role: 'Intelligent Systems Engineer',
    imageUrl: 'assets/profile-placeholder.jpg', // Placeholder for 21st century AI look
    bio: 'Building fault-tolerant, self-healing systems powered by the .NET ecosystem and Pony actor models. Specializing in redundant, high-availability architectures.'
  };

  certifications: Certification[] = [];
  aiReview: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCertifications();
  }

  loadCertifications() {
    // Calling backend API
    this.http.get<Certification[]>(`${environment.apiUrl}/certifications`)
      .pipe(timeout(5000))
      .subscribe({
        next: (data) => this.certifications = data,
        error: (err) => {
          console.error('Failed to load. Attempting graceful degradation...', err);
          // Graceful degradation: Load cached or static data
          this.certifications = [{
            id: 0, title: 'Offline Mode', issuer: 'System', 
            designParams: { columns: 'col-12', style: 'warn' }, 
            aiAnalysis: 'System is currently offline but recovered gracefully.'
          }];
        }
      });
  }

  analyzeProject(description: string) {
    this.http.post<any>(`${environment.apiUrl}/AiAnalyzer/project`, { content: description })
      .subscribe({
        next: (result) => {
          this.aiReview = result.analysis || 'Analysis completed.';
        },
        error: (err) => {
          console.error('AI Service Error:', err);
          this.aiReview = '⚠️ Capability degraded: AI Services unavailable. (Fault Tolerance: Circuit Breaker Open)';
        }
      });
  }
}
