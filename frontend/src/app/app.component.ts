import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // RxJS for "fault tolerance" on frontend via retry

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
    this.http.get<Certification[]>('https://localhost:7001/api/certifications')
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
    this.http.post<any>('https://localhost:7001/api/certifications/analyze', { description })
      .subscribe(result => {
        this.aiReview = result.Review;
      });
  }
}
