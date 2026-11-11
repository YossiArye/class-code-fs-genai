# 🐳☁️ Docker & AWS Fundamentals: From Your Laptop to the Cloud

A hands-on tutorial. By the end, every student will have:

1. **Packed** a Node.js API into a Docker image (Dockerfile)
2. **Started** a full local environment (API + MySQL + frontend) with **one command** (Docker Compose)
3. **Deployed** the same API to **AWS EC2**, connected to a managed **RDS** MySQL database
4. **Hosted** the frontend as a static website on **S3**

All parts use **one small app** (a Tasks API), so students see how the pieces connect instead of learning separate demos.

```
                LOCAL (Part 1)                              AWS (Part 2)
┌───────────────────────────────────────┐   ┌────────────────────────────────────────────┐
│ docker compose up                     │   │                                            │
│                                       │   │  S3 bucket ──────► index.html (frontend)   │
│  frontend (nginx) :8080               │   │                                            │
│  server   (node)  :3000 ──┐           │   │  EC2 ──► docker run tasks-api   :80        │
│  db       (mysql) :3306 ◄─┘           │   │             │                              │
│                                       │   │             ▼                              │
└───────────────────────────────────────┘   │  RDS MySQL (private, port 3306)            │
                                            └────────────────────────────────────────────┘
```

---

## 📁 What's in this folder

| Path | What it is |
|---|---|
| [`1-docker.md`](1-docker.md) | **Part 1:** Docker step by step (concepts, commands, Dockerfile, Compose) |
| [`2-aws.md`](2-aws.md) | **Part 2:** AWS step by step (EC2, RDS, S3, cleanup) |
| `tasks-app/server/` | Express + MySQL API, its `Dockerfile` and `.dockerignore` |
| `tasks-app/frontend/index.html` | A one-file frontend (vanilla JS) that calls the API |
| `tasks-app/docker-compose.yml` | Starts db + server + frontend together |
| [`k8s-demo/hello.yaml`](k8s-demo/hello.yaml) | Kubernetes hands-on (2.9): a Deployment (3 copies) + a Service |

> ✅ The app and the Compose file were tested end to end: create/toggle/list tasks, healthcheck, and data surviving `docker compose down` / `up`.

---

## ⏱️ Lesson plan (about 5 hours, can be cut to 3 or stretched to 6)

### Part 1: Docker (about 2h 40m)

| # | Section | Time | Must / Optional |
|---|---|---|---|
| 1.1 | Why Docker? Image, container, registry | 20m | Must |
| 1.2 | First commands: `run`, `ps`, `logs`, `exec`, `stop`, `rm` | 25m | Must |
| 1.3 | Run MySQL in a container: env vars and **volumes** | 25m | Must |
| 1.4 | Write a **Dockerfile** for our API: build, run, layer cache | 40m | Must |
| 1.5 | "Why can't my API find the DB?" (networking) | 10m | Must |
| 1.6 | **Docker Compose**: the whole environment with one command | 30m | Must |
| 1.7 | Bonus: push your image to Docker Hub | 10m | Optional |
| | ☕ Break | 15m | |

### Part 2: AWS (about 2h 30m)

| # | Section | Time | Must / Optional |
|---|---|---|---|
| 2.0 | Cloud concepts and **account safety** (budget alert!) | 20m | Must |
| 2.1 | Put the code on GitHub | 5m | Must |
| 2.2 | Security Groups (the firewall) | 15m | Must |
| 2.3 | Create the **RDS** database (start early, it takes 5 to 10 minutes) | 20m | Must |
| 2.4 | Launch an **EC2** server and SSH into it | 25m | Must |
| 2.5 | Install Docker on EC2 and run the API, connected to RDS | 30m | Must |
| 2.6 | Host the frontend on **S3** | 25m | Must |
| 2.7 | Deploying a new version | 5m | Must |
| 2.8 | 🧹 **Cleanup** (so nobody gets a bill) | 10m | **Must!** |
| 2.9 | ☸️ Kubernetes basics: concept + hands-on on the laptop (Docker Desktop) | 30m | Bonus |

**Need it shorter (about 3 hours)?** Skip 1.3 (MySQL by hand; Compose covers it), 1.7, and do 2.6 (S3) as homework.

---

## ✅ Before the lesson (send to students 2 to 3 days ahead)

- [ ] Install **Docker Desktop**: https://www.docker.com/products/docker-desktop/ and open it once
- [ ] Run `docker run hello-world` in a terminal and make sure it prints "Hello from Docker!"
- [ ] Have a **GitHub** account and know `git push`
- [ ] Open an **AWS account**: https://aws.amazon.com/free (needs a credit card; we stay in the free tier)
- [ ] Windows users: Docker Desktop with WSL 2 enabled (the installer offers it)

> 🧑‍🏫 **Teacher tip:** AWS sign-up and card verification sometimes take hours. Make it homework **before** the lesson, or Part 2 will stall for half the class.

---

## 🧠 The 5 ideas students must leave with

1. **Image = recipe (class), container = a running dish (object).** One image can run as many containers.
2. **Configuration comes from environment variables**, never hard-coded. That's why the same image runs on a laptop and on AWS.
3. **Inside a container, `localhost` means the container itself.** Containers talk to each other by **service name** (`db`).
4. **Containers are disposable; volumes (and RDS) keep the data.**
5. **In the cloud, the firewall (Security Group) is the #1 reason things "don't work"**, and you **always clean up** what you created.
