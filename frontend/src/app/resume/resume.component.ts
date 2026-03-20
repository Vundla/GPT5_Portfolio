import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  
  resumeData = {
    name: "MANDLENKOSI VUNDLA",
    title: "Software Developer & Full Stack Engineer",
    summary: "Experienced software engineer specializing in .NET and Angular ecosystems. Passionate about building scalable, high-performance web applications and integrating AI-driven solutions.",
    email: "vundlamandlenkosi0@gmail.com",
    phone: "069 309 9649",
    location: "58 Plinlimmon Road, The Hill, Johannesburg, 2197",
    socials: {
      github: "https://github.com/Vundla",
      linkedin: "https://www.linkedin.com/in/mandlenkosi-vundla-561666278/",
      orcid: "https://orcid.org/0009-0009-7725-9217"
    },
    skills: [
      { category: "Backend", technology: [".NET 8", "C#", "ASP.NET Core", "Entity Framework", "SQL Server"] },
      { category: "Frontend", technology: ["Angular", "TypeScript", "HTML5/CSS3", "RxJS", "Material Design"] },
      { category: "DevOps & Tools", technology: ["Docker", "Git", "CI/CD", "Azure", "VS Code"] },
      { category: "Artificial Intelligence", technology: ["Gemini AI Integration", "Prompt Engineering", "LLM APIs"] }
    ],
    experience: [
      {
        role: "Full Stack Engineer",
        company: "Tech Solutions Inc.",
        period: "2023 - Present",
        description: "Leading backend development for enterprise applications using .NET. Mentoring junior developers and architecting cloud-native solutions."
      },
      {
        role: "Junior Software Engineer",
        company: "Creative Digital Agency",
        period: "2020 - 2023",
        description: "Developed and maintained multiple client websites using Angular and Node.js. Optimized frontend performance and implemented responsive designs."
      }
    ],
    education: [
      {
        degree: "Software Engineering Specialising in Backend",
        institution: "ALX Africa",
        year: "2024"
      },
      {
        degree: "Software Developer Intern",
        institution: "Uvu Africa Capaciti",
        year: "2024"
      }
    ]
  };

  downloadResume() {
    // Logic to download PDF would go here
    // For now, we print to console or show an alert
    console.log("Downloading Resume...");
    alert("Resume download started for " + this.resumeData.name);
  }
}
