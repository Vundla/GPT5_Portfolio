# GPT-5 Portfolio: .NET Ecosystem + Pony Concepts

This project is a high-performance, fault-tolerant portfolio application designed with a microservice-ready architecture.

## 🚀 Architecture Overview

1.  **Backend (.NET Core 8)**: 
    - Implements **Fault Tolerance** using Polly (Retry, Circuit Breaker).
    - Uses **Actor Model concepts** (inspired by Pony) for concurrency.
    - **AI Integration**: Built-in AI enviroment to analyze project descriptions and certifications.
    
2.  **Frontend (Angular + Material)**:
    - Lightweight, fast interface.
    - **Dynamic Grid System**: Borrowed column features for flexible layouts.
    - **AI Feedback UI**: Real-time analysis of your skills for potential employers.

3.  **Data & Infrastructure**:
    - **Primary DB**: PostgreSQL (Relational data).
    - **Replicas**: Cassandra (High availability & fault tolerance).
    - **Security**: HashiCorp Vault (Secrets), Fail2Ban (Intrusion prevention).
    - **Chaos Engineering**: Ready for simulated failures to test resilience.

## 🛠 Prerequisites

Since the environment currently lacks the necessary tools, please install:
1.  [.NET 8 SDK](https://dotnet.microsoft.com/download)
2.  [Node.js & npm](https://nodejs.org/)
3.  [Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🏃‍♂️ How to Run

### 1. Infrastructure
Start the databases and security services:
```bash
cd infra
docker-compose up -d
```

### 2. Backend
Restore and run the .NET API:
```bash
cd backend/Portfolio.API
dotnet restore
dotnet run
```

### 3. Frontend
Install Angular CLI and dependencies, then serve:
```bash
cd frontend
npm install -g @angular/cli
ng new portfolio-client --directory . --force
# (Copy the provided src/app files into the new structure)
ng serve
```

## 🔐 Security Features
- **Graceful Degradation**: If the backend fails, the frontend switches to offline mode.
- **Observability**: Health checks enabled at `/health`.
- **Encryption**: All database connections are configured for SSL.
