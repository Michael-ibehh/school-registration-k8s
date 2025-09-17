# 📚 Student Registration System on Kubernetes

# 📌 Overview
This project is a **3-tier Student Registration System** deployed on **Kubernetes (Minikube)**.  
It demonstrates how to containerize applications, orchestrate them with Kubernetes, and ensure resilience using **liveness** and **readiness probes**.

The system allows users to register their details through a frontend interface. These details are processed by a backend API and stored in a **MySQL database with persistent storage**.

---

# 🛠️ Tech Stack
- **Frontend:** HTML, CSS, served with **Nginx**
- **Backend:** Node.js (Express.js API)
- **Database:** MySQL with **Persistent Volume Claim (PVC)**
- **Containerization:** Docker (Minikube local registry)
- **Orchestration:** Kubernetes (Deployments, Services, PVCs, Probes)

---

# ⚙️ Features
✅ **Frontend Pod** (3 replicas) → Serves HTML form for student registration  
✅ **Backend Pod** (2 replicas) → Handles API logic, validates input, stores data in DB  
✅ **Database Pod** (1 replica) → MySQL with PVC for data durability  
✅ **Self-Healing** → Liveness & Readiness probes restart unhealthy pods  
✅ **Persistence** → Data remains intact even if DB pod restarts  
✅ **Scalability** → Multiple replicas for frontend & backend ensure load balancing  

---

# 🖼️ Architecture Diagram
```mermaid
flowchart TD
  Browser[User's Browser] --> Frontend[Frontend Pod: Nginx x3]
  Frontend --> FrontendSvc[frontend-svc NodePort]
  FrontendSvc --> Backend[Backend Pod: Node.js x2]
  Backend --> BackendSvc[backend-svc ClusterIP]
  BackendSvc --> MySQL[MySQL Pod x1]
  MySQL --> PVC[Persistent Volume Claim]
```

# 📂 Project Structure
student-registration-k8s/
│── frontend/
│   ├── index.html
│   ├── Dockerfile
│── backend/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│── k8s-manifests/
│   ├── frontend.yaml
│   ├── backend.yaml
│   ├── mysql.yaml
│   ├── pvc.yaml
│── .gitignore
│── README.md


# 🚀 Deployment Guide
1️⃣ Start Minikube
minikube start

2️⃣ Build Images Locally
 # Build frontend image
minikube image build -t frontend:v1 ./frontend
 # Build backend image
minikube image build -t backend:v1 ./backend

3️⃣ Apply Kubernetes Manifests
kubectl apply -f k8s-manifests/

4️⃣ Check Pods & Services
kubectl get pods
kubectl get svc

5️⃣ Access Application
minikube service frontend-svc

# 📢 Key Takeaways

-Learned how to deploy a multi-tier application on Kubernetes

-Implemented self-healing with liveness & readiness probes

-Understood service exposure (NodePort & ClusterIP)

-Ensured data persistence using PVCs

👨‍💻 Author: Michael Ibeh
🔗 Connect with me on LinkedIn: https://linkedin.com/in/michael-ibeh-ify