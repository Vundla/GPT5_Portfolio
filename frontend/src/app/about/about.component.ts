import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  
  // Profile Data
  profileData = {
    name: 'Architect of Resilience',
    role: 'Fault-Tolerant Systems Engineer',
    imageUrl: 'assets/profile.jpg', // Placeholder
    bio: `Trained at ALX Africa in Software Engineering, specialized in backend systems. Later joined Uvu Africa, expanding to Full Stack development. Completed an intense AI & Machine Learning bootcamp to merge traditional engineering with intelligent systems.
    
    My philosophy is simple: Systems fail. Great engineers build systems that embrace failure and recover automatically. I specialize in the "Let it Crash" philosophy of Erlang/Elixir and the robust Actor Models of Pony and Orleans.`
  };

  // Skill Categories for the Grid
  skillCategories = [
    {
      title: 'Backend Resilience',
      icon: 'dns',
      skills: ['Erlang/OTP', 'Elixir', 'Rust', 'Ada/SPARK', 'Orleans', 'Pony', '.NET 8+', 'Go', 'Node.js', 'Python', 'Ruby on Rails', 'PHP', 'Java', 'Kotlin']
    },
    {
      title: 'Frontend & Languages',
      icon: 'code',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Angular', 'React', 'Next.js', 'Solid.js', 'Svelte']
    },
    {
      title: 'Design Architecture',
      icon: 'brush', // or 'palette'
      skills: ['Tailwind CSS', 'Native Patterns', 'Modern UI/UX', 'Fault Tolerant Design', 'Responsive Layouts', 'Glassmorphism', 'Angular Material']
    },
    {
      title: 'Beam Core & Infrastructure',
      icon: 'hub',
      skills: ['Docker', 'Kubernetes', 'Minikube', 'Apache Beam', 'Apache Kafka', 'Apache Pulsar', 'Zookeeper', 'Microservices', 'Event-Driven Architecture']
    },
    {
      title: 'Security & Encryption',
      icon: 'security',
      skills: ['OpenSSL', 'HashiCorp Vault', 'Fail2Ban', 'Wireshark', 'OAuth2/OIDC']
    },
    {
      title: 'Caching & Data',
      icon: 'storage',
      skills: ['Redis', 'Memcached', 'PostgreSQL', 'Cassandra', 'ScyllaDB']
    }
  ];
}
