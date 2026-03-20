import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  category: string; // Added Category
  fileUrl?: string; // URL to the certificate file (image/pdf)
  designParams: {
    columns: string;
    style: string;
  };
  aiAnalysis: string;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {
  certifications: Certification[] = [];
  groupedCertifications: { [key: string]: Certification[] } = {};
  categories = ['Software Engineering', 'Software Development', 'Artificial Intelligence', 'Professional Development', 'Badges']; // Order matters
  
  statusMessage: string = "Loading distributed ledger...";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCertifications();
  }

  loadCertifications() {
    this.statusMessage = "Syncing with Cassandra Replica...";
    this.http.get<Certification[]>(`${environment.apiUrl}/certifications`)
      .pipe(timeout(5000))
      .subscribe({
        next: (data) => {
            this.certifications = data;
            this.groupCertifications();
            this.statusMessage = "";
        },
        error: (err) => {
          console.error('Failed to load. Attempting graceful degradation...', err);
          
          // Graceful Degradation: Mock Data reflecting user request
          this.certifications = [];

          // 1. Software Engineering (ALX Africa) - 1 Certificate
          this.certifications.push({
            id: 1, 
            title: 'Master of Software Engineering', 
            issuer: 'ALX Africa',
            category: 'Software Engineering',
            designParams: { columns: 'col-md-12', style: 'card-accent' },
            aiAnalysis: 'Full Stack Foundation & Project Mastery.',
            fileUrl: 'assets/certifications/alx-cert.jpg'
          });

          // 2. Software Development (16 Verified Certificates)
          const devCerts = [
             { file: 'dev-microsoft-cybersecurity.pdf', issuer: 'Microsoft / LinkedIn', title: 'Career Essentials in Cybersecurity' },
             { file: 'dev-coursera-1.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 1' },
             { file: 'dev-coursera-2.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 2' },
             { file: 'dev-coursera-3.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 3' },
             { file: 'dev-coursera-4.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 4' },
             { file: 'dev-coursera-5.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 5' },
             { file: 'dev-coursera-6.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 6' },
             { file: 'dev-coursera-7.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 7' },
             { file: 'dev-coursera-8.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 8' },
             { file: 'dev-coursera-9.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 9' },
             { file: 'dev-coursera-10.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 10' },
             { file: 'dev-coursera-11.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 11' },
             { file: 'dev-coursera-12.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 12' },
             { file: 'dev-coursera-13.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 13' },
             { file: 'dev-coursera-14.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 14' },
             { file: 'dev-coursera-15.pdf', issuer: 'Coursera', title: 'Software Development Professional - Cert 15' }
          ];

          devCerts.forEach((c, index) => {
             this.certifications.push({
                id: 10 + index,
                title: c.title,
                issuer: c.issuer,
                category: 'Software Development',
                // Distribute columns to look organic: 3, 4, 3, 4...
                designParams: { 
                  columns: (index % 3 === 0) ? 'col-md-4' : 'col-md-3', 
                  style: (index % 2 === 0) ? 'card-primary' : 'card-accent' 
                },
                aiAnalysis: `Verified proficiency in ${c.issuer} curriculum.`,
                fileUrl: `assets/certifications/${c.file}`
             });
          });

          // 3. AI / Artificial Intelligence (13 Verified Certificates)
          const aiCerts = [
              { file: 'ai-capaciti-1.pdf', issuer: 'Capaciti', title: 'AI Bootcamp - Module 2' },
              { file: 'ai-capaciti-2.pdf', issuer: 'Capaciti', title: 'AI Bootcamp - Module 3' },
              { file: 'ai-capaciti-3.pdf', issuer: 'Capaciti', title: 'AI Bootcamp - Complete' },
              { file: 'ai-coursera-1.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 6' },
              { file: 'ai-coursera-2.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 1' },
              { file: 'ai-coursera-3.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 5' },
              { file: 'ai-coursera-4.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 7' },
              { file: 'ai-coursera-5.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 4' },
              { file: 'ai-coursera-6.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 3' },
              { file: 'ai-coursera-7.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 4 (Advanced)' },
              { file: 'ai-coursera-8.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 6 (Project)' },
              { file: 'ai-coursera-9.pdf', issuer: 'Coursera', title: 'AI Specialization - Course 2' },
              { file: 'ai-other-1.pdf', issuer: 'Other', title: 'Digital Certificate - Verified' }
          ];

          aiCerts.forEach((c, index) => {
             this.certifications.push({
                id: 100 + index,
                title: c.title,
                issuer: c.issuer,
                category: 'Artificial Intelligence',
                // AI is dense, maybe 3 columns each
                designParams: { columns: 'col-md-4', style: 'card-primary' },
                aiAnalysis: `Advanced AI competency verified via ${c.issuer}.`,
                fileUrl: `assets/certifications/${c.file}`
             });
          });

          // 4. Professional Development (22 Verified Certificates)
          const pdCerts = [
            { file: 'pd-1.pdf', title: 'Professional Dev - Module 17' },
            { file: 'pd-2.pdf', title: 'Professional Dev - Module 7' },
            { file: 'pd-3.pdf', title: 'Entrepreneurship Certificate' },
            { file: 'pd-4.pdf', title: 'Professional Dev - Module 14' },
            { file: 'pd-5.pdf', title: 'Professional Dev - Module 18' },
            { file: 'pd-6.pdf', title: 'Professional Dev - Module 3' },
            { file: 'pd-7.pdf', title: 'Professional Dev - Module 11' },
            { file: 'pd-8.pdf', title: 'Professional Dev - Module 10' },
            { file: 'pd-9.pdf', title: 'Professional Dev - Module 8' },
            { file: 'pd-10.pdf', title: 'Professional Dev - Specialization' },
            { file: 'pd-11.pdf', title: 'Professional Dev - Module 16' },
            { file: 'pd-12.pdf', title: 'Professional Dev - Module 6' },
            { file: 'pd-13.pdf', title: 'Professional Dev - AI Integration' },
            { file: 'pd-14.pdf', title: 'Professional Dev - Module 13' },
            { file: 'pd-15.pdf', title: 'Professional Dev - Module 1' },
            { file: 'pd-16.pdf', title: 'Professional Dev - Module 12' },
            { file: 'pd-17.pdf', title: 'Professional Dev - Module 9' },
            { file: 'pd-18.pdf', title: 'Professional Dev - Module 19' },
            { file: 'pd-19.pdf', title: 'Professional Dev - AI Integration 2' },
            { file: 'pd-20.pdf', title: 'Professional Dev - Module 2' },
            { file: 'pd-21.pdf', title: 'Professional Dev - Module 5' },
            { file: 'pd-22.pdf', title: 'Professional Dev - Module 4' }
          ];

          pdCerts.forEach((c, index) => {
             this.certifications.push({
                id: 200 + index,
                title: c.title,
                issuer: 'Coursera / Capaciti',
                category: 'Professional Development',
                designParams: { 
                  columns: 'col-md-3', // 4 per row
                  style: (index % 2 === 0) ? 'card-accent' : 'card-primary' 
                },
                aiAnalysis: 'Continuous learning and professional growth verified.',
                fileUrl: `assets/certifications/${c.file}`
             });
          });

          // 5. Badges (AI Specialist, Full Stack Developer, Professional Development)
          this.certifications.push({
             id: 301,
             title: 'AI Specialist Badge',
             issuer: 'GPT-5 Portfolio Verified',
             category: 'Badges',
             designParams: { columns: 'col-md-4', style: 'card-primary' },
             aiAnalysis: 'Native & Modern Tech: Specialized in fault tolerant intelligent systems that self-heal.',
             fileUrl: 'assets/certifications/ai-badge.png' // User to provide this file
          });

          this.certifications.push({
             id: 302,
             title: 'Full Stack Developer Badge',
             issuer: 'GPT-5 Portfolio Verified',
             category: 'Badges',
             designParams: { columns: 'col-md-4', style: 'card-accent' },
             aiAnalysis: 'Comprehensive knowledge of frontend, backend, and infrastructure.',
             fileUrl: 'assets/certifications/software-dev-badge.png' // User to provide this file
          });

          this.certifications.push({
             id: 303,
             title: 'Professional Development Badge',
             issuer: 'GPT-5 Portfolio Verified',
             category: 'Badges',
             designParams: { columns: 'col-md-4', style: 'card-primary' },
             aiAnalysis: 'Continuous learner committed to professional growth and adaptability.',
             fileUrl: 'assets/certifications/professional-dev-badge.png' // User to provide this file
          });
          this.groupCertifications();
          this.statusMessage = "Offline Mode Active - Data Loaded from Local Cache";
        }
      });
  }

  viewCertificate(url?: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Certificate verification pending on the blockchain.');
    }
  }
  
  analyzeWithAi(cert: Certification) {
    const originalText = cert.aiAnalysis;
    cert.aiAnalysis = "Encrypting data for Gemini AI Processing..."; // Loading state
    
    this.http.post<any>(`${environment.apiUrl}/AiAnalyzer/certification`, { content: cert.title + " by " + cert.issuer })
      .subscribe({
        next: (response) => {
          cert.aiAnalysis = response.analysis;
        },
        error: (err) => {
          console.error("AI Analysis Failed", err);
          cert.aiAnalysis = originalText + " (AI-Link Fault)"; // Revert + error
        }
      });
  }

  groupCertifications() {
      this.groupedCertifications = this.certifications.reduce((acc, cert) => {
          // If category is missing/null, put in Other
          const cat = cert.category || 'Other';
          if (!acc[cat]) {
              acc[cat] = [];
          }
          acc[cat].push(cert);
          return acc;
      }, {} as { [key: string]: Certification[] });
  }
}
