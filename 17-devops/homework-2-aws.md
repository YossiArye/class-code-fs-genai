# Homework — AWS Deployment & Kubernetes Basics

> Based on: 17-devops/2-aws.md and 17-devops/k8s-demo

---

## Exercise 1 — Security groups for a Notes app
**Type:** Fill

You deploy a **Notes app**: an API on EC2 and a MySQL database on RDS. Fill in every `???` in the two security group tables.

| Security group `notes-api-sg` (EC2) | | | |
|---|---|---|---|
| Type | Port | Source | Why |
| SSH | ??? | ??? | Only you can log into the server |
| HTTP | ??? | ??? | Everyone can call the API |

| Security group `notes-db-sg` (RDS) | | | |
|---|---|---|---|
| Type | Port | Source | Why |
| MYSQL/Aurora | ??? | ??? | Only the API server can reach the database |

Then answer:
1. Why is the source of the database rule **not** an IP address?
2. A hacker steals the database password. Can they connect from their own laptop? Why / why not?
3. Your SSH suddenly ends with `Operation timed out`, and nothing was changed on the server. What is the most likely cause, and how do you fix it?

---

## Exercise 2 — Debug the failing deployment
**Type:** Fix

A student deployed the Notes API on EC2. This is their `.env` file, followed by the output of `docker logs --tail 5 api`:

```env
PORT = 3000
DB_HOST=notes-db
DB_PORT=3306
DB_USER=admin
DB_PASSWORD="my-password"
DB_NAME=notes-db
```

```
❌ Could not connect to the database: getaddrinfo ENOTFOUND notes-db
```

1. Find **4 mistakes** in the `.env` file (look at the `.env` rules from the lesson, and at what `DB_HOST` and `DB_NAME` should contain).
2. Write the fixed `.env`.
3. The student fixes the file and runs `docker restart api`, but the app still uses the old values. Why? Which two commands should they run instead?
4. After the fix, the logs say `Connections using insecure transport are prohibited`. Which line is missing from `.env`?

---

## Exercise 3 — Read the bucket policy
**Type:** Predict

A student hosts a **Portfolio** website on S3 and attaches this bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PortfolioRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::portfolio-dana-2026/*"
    }
  ]
}
```

Answer:
1. In one plain-English sentence, what does this policy allow?
2. Can a visitor who is not logged in to AWS open `index.html`? Can they **upload** a new file? Can they **delete** a file? Why?
3. The student opens the site and gets `403 Forbidden`. Name **two** things to check.
4. The student clicks the file in the console and opens the **Object URL** (`https://...s3.amazonaws.com/index.html`) instead of the website endpoint. The page loads, but says "Cannot reach the API". Why does this happen?

---

## Exercise 4 — Deploy a new version
**Type:** Write

You added a new route `GET /version` to the Notes API on your laptop. Write the full list of commands to deploy it, and say **where** each one runs (**laptop** or **EC2 server**).

1. Send the change to GitHub.
2. Download the change on the server.
3. Build a new image called `notes-api`.
4. Remove the old container named `api`.
5. Start the new container in the background, on server port 80 (the app listens on 3000), loading `.env`, and restarting automatically.

```bash
# 1. (where?)
# 2. (where?)
# 3. (where?)
# 4. (where?)
# 5. (where?)
```

Then answer:
- Why do we need `docker rm -f api` before the new `docker run`?
- Why is `.env` not changed by `git pull`?
- After you **stop and start** the EC2 instance (not reboot), `http://OLD_IP/health` stops working. Why, and what two things must you update or use to fix it for good?

---

## Exercise 5 — Your first Kubernetes file
**Type:** Fill

Complete this Kubernetes file for a **Bakery** demo. We want **4** copies of the image `traefik/whoami` always running, and one stable address (`localhost:8082`) that spreads requests between them. Replace every `# ???`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bakery
spec:
  replicas: # ???
  selector:
    matchLabels:
      app: # ???
  template:
    metadata:
      labels:
        app: bakery
    spec:
      containers:
        - name: whoami
          image: # ???
          ports:
            - containerPort: 80

---
apiVersion: v1
kind: Service
metadata:
  name: bakery
spec:
  type: # ???                 (open it outside the cluster)
  selector:
    app: # ???                (which pods get the traffic?)
  ports:
    - port: # ???             (the port you call from your laptop)
      targetPort: # ???       (the container's port)
```

Then answer:
1. Write the command that sends this file to the cluster, and the command that lists the pods.
2. You run `kubectl delete pod <one-pod-name>` and then `kubectl get pods`. How many pods do you see, and **why**?
3. You change `replicas: 4` to `replicas: 2` in the file. What must you do for it to take effect, and what happens to the pods?
4. In one sentence each: what is the difference between `docker run ...` and `kubectl apply -f file.yaml`? What is the difference between a **Pod** and a **Deployment**?
