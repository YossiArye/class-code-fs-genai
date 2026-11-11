# Part 2: AWS Deployment Fundamentals ☁️

> Goal: put the **same Docker image** from Part 1 on a real server in the cloud, connect it to a real managed database, and host the frontend so anyone in the world can open it.

```
  Anyone's browser
     │                        │
     │ 1. loads index.html    │ 2. fetch() API calls
     ▼                        ▼
┌──────────┐          ┌────────────────────────┐          ┌──────────────────┐
│   S3     │          │  EC2 (Linux server)    │  3306    │   RDS MySQL      │
│  bucket  │          │  docker: tasks-api     │ ───────► │  (no public      │
│ (static) │          │  port 80 → 3000        │          │   access)        │
└──────────┘          └────────────────────────┘          └──────────────────┘
                         🔥 tasks-api-sg                     🔥 tasks-db-sg
                      (allow 22 from me, 80 from all)     (allow 3306 ONLY from tasks-api-sg)
```

**How to read the diagram:**
1. A visitor opens our website. The browser downloads `index.html` from **S3**.
2. The JavaScript in that page calls our API (`fetch`) on the **EC2** server, port 80.
3. Docker on EC2 passes the request to our container (port 3000), and the API reads/writes **RDS** on port 3306.
4. The 🔥 are **Security Groups** (firewalls). The database is hidden: only the EC2 server may talk to it.

| Local (Part 1) | AWS (Part 2) |
|---|---|
| `server` container on your laptop | `server` container on an **EC2** machine |
| `db` container (mysql:8.4) | **RDS** (MySQL managed by Amazon: backups, updates, disks) |
| `frontend` container (nginx) | **S3** static website hosting |
| Docker network | **VPC** + **Security Groups** |

### 🤔 Why is the frontend on S3 and not on EC2?

The two parts of our app are **different kinds of work**:
- The **frontend is just files** (here, one `index.html`). The server only has to send them as-is; all the logic runs in the visitor's browser. S3 is built to do exactly that, with no code.
- The **API is a program** that runs code and talks to the database. It needs a real machine with Docker, so it goes on EC2.

| | **S3** (frontend) | **EC2** (if we served the frontend there) |
|---|---|---|
| **Servers to manage** | None. AWS runs it | You install and update a web server (nginx/Docker), patch the OS, fix it when it crashes |
| **Cost** | Pennies per month for a small site | A server running 24/7, even with zero visitors |
| **Traffic spikes** | Scales automatically: 10 or 10 million visitors | One small machine slows down or falls over |
| **Reliability** | Files stored across multiple data centers | One machine. If it dies, the site is gone |
| **Setup** | Upload the file, turn on website hosting, add a policy | SSH, install a web server, open ports, deploy |

Keeping them separate also means you can deploy one without touching the other: a frontend change is just uploading a new file, and the API isn't restarted.

> 💡 **When would the frontend go on EC2?** When it's not static, for example server-side rendering (like Next.js), or when you want one machine for everything. In Part 1, nginx served the frontend locally just for convenience.
>
> **S3's limitation:** S3 website hosting is HTTP only. Real products put **CloudFront** (AWS's CDN) in front of S3 for HTTPS, a custom domain and fast loading worldwide. That's a next step after this lesson.

> 💡 **Three places to type in Part 2.** Always check where you are before typing:
>
> | Where | How it looks | What you do there |
> |---|---|---|
> | **AWS Console** (browser) | the website https://console.aws.amazon.com | Click to create servers, databases, buckets |
> | **Your laptop's terminal** | `yossi@MacBook tasks-app %` | `git push`, `ssh`, `curl` tests |
> | **The EC2 server's terminal** (after `ssh`) | `[ec2-user@ip-172-31-5-10 ~]$` | Install Docker, build, run the container |
>
> The most common mistake: running server commands (`sudo dnf ...`) on your **laptop**, or `git push` on the **server**.

---

## 2.0 Cloud concepts and account safety (20 min)

### What is "the cloud"?

Renting someone else's computers by the hour. Instead of buying a server, you click a button and get one in about 1 minute, and you pay only while it exists.

| Service | Plain English | Like... |
|---|---|---|
| **EC2** (Elastic Compute Cloud) | A Linux computer you rent | A laptop in Amazon's data center |
| **RDS** (Relational Database Service) | A MySQL/Postgres that Amazon installs, backs up and patches for you | The `db` container, but managed |
| **S3** (Simple Storage Service) | Unlimited file storage in "buckets". Can also serve a static website | Google Drive for apps |
| **Security Group** | A firewall: which ports are open, and to whom | The bouncer at the door |
| **VPC** (Virtual Private Cloud) | Your private network inside AWS. Every account gets a **default VPC** in each region, and we'll just use it | The Docker network from Part 1 |
| **Region** | A physical location (Frankfurt, Virginia, Tel Aviv...) | Choose one and **stay** in it |

**Why regions matter:**
- Each region is a separate set of data centers. A server in Frankfurt and a database in Virginia **can't see each other** through our setup.
- The console shows **only the current region**. If "my server disappeared", 9 times out of 10 the console is just showing another region.
- A region closer to your users = faster responses.

### Network basics we'll need

| Term | Meaning |
|---|---|
| **IP address** | A computer's address on the network, like `3.120.45.67` |
| **Public IP** | An address the whole internet can reach. Our EC2 gets one |
| **Private IP** | An address only inside the VPC (starts with `172.31.` in the default VPC). RDS will have only private access |
| **Port** | A "door number" on a computer: 22 = SSH, 80 = HTTP (websites), 3306 = MySQL |
| **`0.0.0.0/0`** | "Any IP address in the world" |
| **`85.64.10.20/32`** | "Exactly this one IP address" (that's what "My IP" creates) |

### 🔐 First time: create your AWS account and log in

Already have an account? Skip to "Account safety" below.

**A. Sign up** (about 10 minutes, one time only)

1. Go to https://aws.amazon.com → **Create an AWS Account**.
2. Enter your **email**, an **account name** (any name, e.g. `yossi-learning`), and verify the email with the code AWS sends you.
3. Choose a **root user password** (long and unique; use a password manager).
4. Account type: **Personal**. Fill in your name, phone and address.
5. **Payment card:** required even for the free tier. AWS may charge a tiny amount (about $1) to verify the card, and refunds it. Use a card you control. A card with a low limit or a virtual card is a good idea for students.
6. **Verify your phone** (SMS or voice call, enter the code).
7. **Plan:** if AWS offers a choice, pick the **Free plan** (free credits for the first months; AWS blocks you from spending beyond them). The paid plan has no such safety net. If it only offers support plans, choose **Basic support (free)**.
8. Wait a few minutes (sometimes up to 24 hours) until AWS emails you "Your account is ready".

> 💡 **Shortcut:** on the sign-up page you can choose **"Continue with Google"** instead of typing an email and password. Then your Google account is the key to AWS, so make sure **2-Step Verification** is on in Google (myaccount.google.com → Security).

**B. Log in for the first time: step by step**

**Step 1: Sign in.**
Go to https://console.aws.amazon.com and sign in the same way you signed up:
- Signed up with Google → click **"Continue with Google"** and pick your Google account.
- Signed up with email → choose **Root user** → type the email → *Next* → type the password.

**Step 2: The welcome wizard (first login only).**
A dark window opens with **"What do you want to create?"** and **STEP 3 OF 3** at the top. It offers tiles like *Build with AI*, *Run a server*, *Set up a database*, *Host a website*.
- ❌ **Don't** click any tile, and don't type in the "Describe what you want to create" box. They start AWS's own guided setups, not ours.
- ✅ Click the orange button at the bottom: **"Done: go to the AWS Management Console →"**.

**Step 3: You're on the Console Home.** 🎉
The title says **`Console Home | <your account name>`** (the account name you chose at sign-up). Your name is in the top-right corner. Look at the top bar, from left to right:

| What | Where | What it's for |
|---|---|---|
| **9 dots** (⋮⋮⋮) | Top left | The full list of AWS services |
| **Search** box `[Option+S]` | Top center | The fastest way to move around: type `EC2`, `RDS`, `S3`, `Budgets` and press Enter. We'll use it all day |
| **Account name ▾** | Top right | Click it to see your **12-digit account ID**, *Security credentials* (for MFA), and *Sign out* |

> 📝 **Write down your account ID now** (click the account name ▾, or look at the start of the address bar: `123456789012-xxxx.eu-north-1.console.aws.amazon.com`). Save it in your password manager together with how you log in ("Google, my@gmail.com"). Next time, you won't have to guess.

**Step 4: Read the boxes on the Console Home** (scroll down):

| Box | What you see on a new account | What it means |
|---|---|---|
| **AWS assistant** | "What would you like to build?" | An AI chat helper. We don't need it today |
| **Recently visited** | "No recently visited services" | Empty = a brand-new account, nothing running ✅ |
| **Cost and usage** | **Credits remaining: $100.00 USD**, **Days remaining: 182 days** (a date ~6 months from now), **Current month: $0.00** | You're on the **Free plan**. AWS pays from the credits. When the credits or the days run out, AWS **stops** your services (it doesn't charge your card) unless you click *Upgrade plan*. Don't upgrade for this course |
| **Explore AWS → Earn AWS credits** | **Activities completed: 0 of 5**, **Total credits earned: $0 of $100** | 5 small tasks, **$20 of extra credits each** (see below) |

> 💰 **Free money, and we do 3 of the 5 tasks anyway!** The "Earn AWS credits" list:
>
> | Activity | Reward | In this lesson? |
> |---|---|---|
> | Set up a cost budget using AWS Budgets | $20 | ✅ "Account safety", step 2 below |
> | Create an Aurora or RDS database | $20 | ✅ Section 2.3 |
> | Launch an instance using EC2 | $20 | ✅ Section 2.4 |
> | Use a foundation model in the Amazon Bedrock playground | $20 | Optional (GenAI, 5 minutes) |
> | Create a web app using AWS Lambda | $20 | Optional |
>
> Do our 3 tasks and come back to this box: it should show **3 of 5** and **$60** more credits. (Total: up to $200.)

> 💡 **Root user vs IAM user:** the first login is always as **root**: the all-powerful owner of the account. That's fine for this lesson (with MFA, next step). In real companies, you create limited **IAM users** for daily work and almost never use root. (That's the bonus in the homework.)

> ⚠️ **Two things we do NOT do now:** we do **not** create "access keys" for the root user (a leaked root key = the whole account is exposed), and we do **not** share the account password with anyone.

> 🆘 **Can't log in?**
> - *"Your authentication information is incorrect"* → you chose **IAM user** instead of **Root user** on the sign-in page. Go back and choose Root.
> - *Account not ready* → wait for the confirmation email. New accounts can take a while to activate.
> - *Forgot password* → on the sign-in page, *Forgot password?* sends a reset link to your email.

### ⚠️ Account safety: do this FIRST (before creating anything)

After logging in to https://console.aws.amazon.com (the **AWS Console**: the website where you manage everything):

1. **Pick one region** (top-right corner of the console), for example **Europe (Frankfurt) eu-central-1**. Everything we create today must be in the **same region**. A new account may open in another region (for example `eu-north-1`, Stockholm: you can see it in the address bar, `...console/home?region=eu-north-1`). That's OK too, but then use it everywhere, and read `eu-central-1` in the examples below as your region.
2. **Create a budget alert**: in the search bar at the top, type **"Budgets"** → *Create budget* → *Use a template* → **Zero spend budget** (or a monthly budget of $5) → enter your email → *Create budget*. Now AWS emails you the moment anything costs money.
3. **Root user MFA** (two-factor login): click your account name (top right) → *Security credentials* → *Assign MFA device* → follow the steps with an authenticator app. A stolen AWS account can be used to run expensive servers on **your** card.

> 💡 **Root user** = the email you signed up with. It can do *everything*, including closing the account. In a real company you'd create separate **IAM users** with limited permissions and lock the root away. For this lesson, root + MFA is OK.

> 💰 **About cost:** we'll only use **free-tier-eligible** options (they're labeled in the console). New AWS accounts get free credits / a free plan; older accounts get 12 months of free tier. Free-tier rules change from time to time, so **trust the "Free tier eligible" labels and your budget alert, not memory.** And **always do the cleanup in 2.8.**

---

## 2.1 Put the code on GitHub (5 min)

**Why?** The EC2 server is a different computer. It needs a way to get our code. The simplest: we push to GitHub, and the server does `git clone`.

1. On github.com, create a **new repository** called `tasks-app`. Make it **Public** (a private repo would need a GitHub login on the server, which is extra work). Don't add a README.
2. On **your laptop**, copy the `tasks-app` folder somewhere **outside** other git repositories (for example your Desktop). If it's inside the course repo, `git init` would create a repo inside a repo.
3. In the **laptop terminal**:

```bash
cd tasks-app
git init
git add .
git commit -m "Tasks app with Docker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tasks-app.git
git push -u origin main
```

> ✅ Check on GitHub:
> - `.env` and `node_modules` are **not** there (thanks to `.gitignore`). Passwords never go to GitHub.
> - `server/package-lock.json` **is** there. The Dockerfile runs `npm ci`, which fails without it.

---

## 2.2 Security Groups: the firewall (15 min)

A **Security Group (SG)** is a list of rules: "who may connect to this machine, on which port". Everything not allowed is **blocked**.

- **Inbound rules** = who can connect **to** the machine. That's what we set.
- **Outbound rules** = where the machine can connect **to**. By default everything is allowed (so the server can download Docker, packages, etc.). We leave it.

We create the SGs **before** the servers, so we can just pick them during creation.

Console → search **EC2** → left menu **Network & Security → Security Groups** → **Create security group**.

### Security Group 1: `tasks-api-sg` (for the EC2 server)

| Field | Value |
|---|---|
| Name | `tasks-api-sg` |
| Description | `API server` |
| VPC | leave the default |

**Inbound rules** → *Add rule* (twice):

| Type | Port | Source | Why |
|---|---|---|---|
| SSH | 22 | **My IP** | So **only you** can log into the server. AWS fills in your current IP (like `85.64.10.20/32`) |
| HTTP | 80 | **Anywhere-IPv4** (`0.0.0.0/0`) | So **everyone** can call the API |

> 💡 When you choose a **Type** (SSH, HTTP), AWS fills the port for you.

→ **Create security group**.

### Security Group 2: `tasks-db-sg` (for RDS)

| Field | Value |
|---|---|
| Name | `tasks-db-sg` |
| Description | `Database - only the API can connect` |

**Inbound rules**:

| Type | Port | Source |
|---|---|---|
| MYSQL/Aurora | 3306 | **Custom** → in the search box next to it, start typing `sg-` or `tasks` → choose **`tasks-api-sg`** |

→ **Create security group**.

> 🔑 **The key idea:** the source isn't an IP. It's **another security group**. That means: "allow port 3306 only from machines that **wear** the `tasks-api-sg` badge". Our EC2 server will wear it. Nobody else in the world does, so even if someone steals the DB password, they can't reach the database. It's the same idea as the private Docker network in Part 1.

```
Internet ──✗──► RDS (port 3306)      blocked: not wearing tasks-api-sg
EC2 (tasks-api-sg) ──✓──► RDS        allowed
```

---

## 2.3 Create the RDS database (20 min) ⏳ start early!

RDS takes **5 to 10 minutes** to create. We'll start it now and launch EC2 while it's being created.

Console → search **RDS** → **Create database**.

> ⚠️ The AWS console changes its screens from time to time. If a field below has a slightly different name, look for the closest match. The **meaning** stays the same.

| Section | Choose | Why / what it means |
|---|---|---|
| Creation method | **Standard create** (may be called *Full configuration*) | Shows all the settings. "Easy create" hides the ones we need |
| Engine | **MySQL** | Same database we used locally |
| Templates | **Free tier** (or "Sandbox", if that's what your console shows) ⚠️ | Picks the small, free settings for us |
| DB instance identifier | `tasks-db` | The name of the **server** in the AWS console. Not the database inside it (see the warning below) |
| Master username | `admin` | Like `root` in Part 1 |
| Credentials management | **Self managed** → type a password and **write it down** 📝 | At least 8 characters, and **no** `/`, `'`, `"` or `@` (RDS rejects them) |
| Instance class | the free-tier one (e.g. `db.t4g.micro` or `db.t3.micro`) | The size of the machine running MySQL. "micro" = 2 CPUs, 1 GB RAM: enough for us |
| Storage | 20 GB. Open *Additional storage configuration* → **uncheck** "Enable storage autoscaling" | Autoscaling could grow the disk (and the bill) by itself |
| Compute resource | **Don't connect to an EC2 compute resource** | This option would create security groups automatically. We already made ours in 2.2 |
| **Public access** | **No** 🔒 | No public IP. The database is reachable only from **inside** the VPC (our EC2) |
| VPC security group | **Choose existing** → remove `default` (click the ✕) → select **`tasks-db-sg`** | Attach our firewall rules |
| **Additional configuration → Initial database name** | **`tasksdb`** ⚠️ | Creates the database our API uses. Easy to miss! Without it, no database is created |
| Additional configuration | You can uncheck *Enable automated backups* and *Enable encryption* | Saves resources. Fine for a lab, **never** in a real product |

→ **Create database**. Status: *Creating*... Let's go launch EC2 meanwhile.

> ⚠️ **Two similar names, two different things:**
> - **`tasks-db`** (with a dash) = the **RDS instance**: the managed MySQL **server**. You see it in the console list.
> - **`tasksdb`** (no dash) = a **database inside** that server, where our `tasks` table lives. It goes in `.env` as `DB_NAME`.
>
> Like in Part 1: the container `mysql-test` (server) vs the database `school` inside it.

> 🧑‍🏫 **Teacher tip:** the **Initial database name** is the #1 mistake. Ask everyone to say "tasksdb" out loud before clicking Create. 😄

> 💡 Compare with Part 1: `MYSQL_DATABASE: tasksdb` in Compose = **Initial database name** in RDS. `MYSQL_ROOT_PASSWORD` = the master password. Same ideas, different screen.

---

## 2.4 Launch an EC2 server (25 min)

An **instance** = one virtual server in EC2. Let's create one.

Console → **EC2** → **Launch instance**.

| Field | Choose | Why / what it means |
|---|---|---|
| Name | `tasks-api-server` | Just a label for you |
| AMI (Amazon Machine Image) | **Amazon Linux 2023** (Free tier eligible) | The **operating system** to install. Like `FROM` in a Dockerfile: the starting point of the machine |
| Instance type | the **Free tier eligible** one (`t3.micro` or `t2.micro`) | The size: 2 CPUs, 1 GB RAM. Enough to run one Docker container |
| Key pair | **Create new key pair** → name `tasks-key`, type RSA, format **.pem** | Your **login key** (explained below). It downloads `tasks-key.pem` |
| Network settings | **Edit** → Auto-assign public IP: **Enable** → Firewall: **Select existing security group** → **`tasks-api-sg`** | A public IP so we can reach it, and our firewall from 2.2 |
| Storage | 8 GB default is fine | The server's disk |

→ **Launch instance** → *View all instances*. Wait for **Instance state: Running** (about 1 minute). Click the instance and copy its **Public IPv4 address** (for example `3.120.45.67`).

### What is the key pair?

Servers in the cloud don't use passwords for login; they use a **key pair**:
- AWS puts the **public key** (the "lock") on the server.
- You download the **private key** (the "key"): the `tasks-key.pem` file. Only the matching key opens the lock.

🔑 **Keep `tasks-key.pem` safe.** AWS doesn't keep a copy, so it **can't be downloaded again**. If you lose it, you can't log into that server. And **never** push it to GitHub: anyone with the file can log into your server (our `.gitignore` already blocks `*.pem`).

Move it somewhere you'll find it, for example a folder `~/aws-keys/`.

### Connect with SSH

**SSH** (Secure Shell) = open a terminal on a remote computer. Everything you type then runs **on the server**.

**Mac / Linux** (in the **laptop terminal**, in the folder where the key is):

```bash
chmod 400 tasks-key.pem
ssh -i tasks-key.pem ec2-user@YOUR_PUBLIC_IP
```

| Part | Meaning |
|---|---|
| `chmod 400 tasks-key.pem` | Make the key readable **only by you**. SSH refuses keys that other users could read (`UNPROTECTED PRIVATE KEY FILE!`). Needed once |
| `ssh` | Connect to a remote computer |
| `-i tasks-key.pem` | **Identity**: which private key to use |
| `ec2-user` | The username. On Amazon Linux it's always `ec2-user` (on Ubuntu servers it's `ubuntu`) |
| `@YOUR_PUBLIC_IP` | Which server (the Public IPv4 address you copied) |

**Windows** (PowerShell; SSH is built in):

```powershell
ssh -i .\tasks-key.pem ec2-user@YOUR_PUBLIC_IP
```

The first time, SSH asks:

```
The authenticity of host '3.120.45.67' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

This is SSH saying "I've never seen this server before". Type **`yes`** (the whole word). It remembers the server from now on.

You should see the Amazon Linux logo, and the prompt changes to something like **`[ec2-user@ip-172-31-5-10 ~]$`**. **You're inside a computer in Frankfurt.** 🎉 (The `172.31...` in the prompt is the server's **private** IP.)

To leave the server and return to your laptop: type `exit`.

> 🆘 **Can't SSH?**
> - **Timeout** (nothing happens, then `Operation timed out`) → the firewall blocked you. The SSH rule in `tasks-api-sg` says "My IP", and your IP changed (common on phones/hotspots/campus Wi-Fi). Edit the inbound rule → Source: *My IP* again → Save.
> - **`Permission denied (publickey)`** → wrong user (must be `ec2-user`) or wrong key file.
> - **Windows `bad permissions` / `UNPROTECTED PRIVATE KEY FILE`** → Windows' version of `chmod 400`. In PowerShell, in the key's folder:
>   ```powershell
>   icacls.exe .\tasks-key.pem /reset
>   icacls.exe .\tasks-key.pem /grant:r "$($env:USERNAME):(R)"
>   icacls.exe .\tasks-key.pem /inheritance:r
>   ```
> - **Still stuck?** In the console: select the instance → **Connect** → **EC2 Instance Connect** → *Connect*. It opens a terminal **in the browser**, no key needed. For this to work, the SSH rule's source must be **Anywhere-IPv4** (OK for a lab; the server still requires a key or Instance Connect).

---

## 2.5 Install Docker on EC2 and run the API (30 min)

Everything here runs **on the EC2 server**. Check your prompt: it should be `[ec2-user@ip-... ~]$`.

### 1. Install Docker and Git

```bash
sudo dnf update -y
sudo dnf install -y docker git nano
sudo systemctl enable --now docker
sudo usermod -aG docker ec2-user
exit
```

| Command | Meaning |
|---|---|
| `sudo` | "Run as administrator" (**s**uper**u**ser **do**). Installing software needs it |
| `dnf update -y` | `dnf` is Amazon Linux's **package manager** (like `npm` or Homebrew, but for the whole system). `update` = update everything already installed. `-y` = answer "yes" to every question |
| `dnf install -y docker git nano` | Install Docker, Git and `nano` (a simple text editor we'll use for `.env`) |
| `systemctl enable --now docker` | `systemctl` controls background services. `--now` = **start** Docker now. `enable` = also start it **automatically after every reboot** |
| `usermod -aG docker ec2-user` | Add (`-a`) our user `ec2-user` to the `docker` **group** (`-G`). Members of this group may use Docker **without `sudo`** |
| `exit` | Log out. Group changes only apply to **new** logins |

Now **SSH in again** (from your laptop, the same `ssh -i ...` command), then:

```bash
docker --version
docker ps                                # empty table = it works ✅
```

> If `docker ps` says `permission denied while trying to connect to the Docker daemon socket`, you didn't log out and in again after `usermod`. Type `exit` and SSH in again.

> 💡 That's the whole "server setup". We don't install Node or MySQL. **Docker is the only thing the server needs**, and the image brings the rest. That's the payoff of Part 1.

### 2. Get the code and build the image

```bash
git clone https://github.com/YOUR_USERNAME/tasks-app.git
cd tasks-app/server
docker build -t tasks-api .
```

| Command | Meaning |
|---|---|
| `git clone <url>` | Download the repository from GitHub into a new folder `tasks-app` (in the home folder of `ec2-user`) |
| `cd tasks-app/server` | Go to the folder with the `Dockerfile`. Remember the build context `.` from Part 1! |
| `docker build -t tasks-api .` | Build the image. Same Dockerfile, same command as on your laptop. Takes 1 to 2 minutes the first time |

> 💡 **Why not `docker compose up` here?** Compose started **three** containers locally: db, server and frontend. In AWS, the database is RDS and the frontend is S3. Only **one** container is left (the API), so a single `docker run` is enough.

### 3. Tell the API where the database is (`.env`)

Back in the **browser**: **RDS → Databases → tasks-db**. Wait until status is **Available** (the endpoint doesn't exist before that). Under **Connectivity & security**, copy the **Endpoint**. It looks like `tasks-db.abc123xyz.eu-central-1.rds.amazonaws.com`.

> 💡 The **endpoint** is the database server's **address** (hostname). Locally it was `db` (the Compose service name). On AWS, it's this long name.

On the **server**, in `~/tasks-app/server`, create the `.env` file:

```bash
nano .env
```

`nano` opens an empty file in the terminal. Type (or paste) this, with **your** values:

```env
PORT=3000
DB_HOST=tasks-db.abc123xyz.eu-central-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=the-password-you-wrote-down
DB_NAME=tasksdb
DB_SSL=true
```

Save and exit nano: **`Ctrl+O`** (write out = save) → **`Enter`** (confirm the file name) → **`Ctrl+X`** (exit). On a Mac, it's really `Ctrl`, not `Cmd`.

Check the file: `cat .env`.

**`.env` rules:**
- One `KEY=value` per line.
- **No spaces** around `=` and **no quotes**: `DB_USER=admin`, not `DB_USER = "admin"`.
- This file lives **only on the server**. It's not on GitHub (`.gitignore`), and not in the image (`.dockerignore`).

| Variable | Value | Why |
|---|---|---|
| `DB_HOST` | the RDS endpoint | Where the database is |
| `DB_USER` / `DB_PASSWORD` | `admin` / your password | The master user from 2.3 |
| `DB_NAME` | `tasksdb` | The **database** (no dash!), not the instance name |
| `DB_SSL` | `true` | Encrypt the connection to RDS. `db.js` turns this into mysql2's built-in Amazon RDS certificate settings |

> 🔑 Compare with Compose: there, `DB_HOST: db`. Here, `DB_HOST` is the RDS endpoint. **Same image, different environment variables.**

### 4. Run the container

Still in `~/tasks-app/server` (where `.env` is):

```bash
docker run -d \
  --name api \
  -p 80:3000 \
  --env-file .env \
  --restart unless-stopped \
  tasks-api
```

| Flag | Why |
|---|---|
| `-d` | Run in the background, so it keeps running after you close SSH |
| `--name api` | So we can write `docker logs api`, `docker rm -f api` |
| `-p 80:3000` | The app listens on **3000** inside the container. We publish it on port **80** of the server, the default HTTP port, so users type `http://IP` instead of `http://IP:3000`. (Port 80 is also the one we opened in `tasks-api-sg`) |
| `--env-file .env` | Load **all** the variables from the file. Same as writing `-e PORT=3000 -e DB_HOST=... -e ...` |
| `--restart unless-stopped` | If the app crashes or the server reboots, Docker starts it again |

Check it from **inside the server**:

```bash
docker ps                  # STATUS should be "Up ..." (not "Restarting")
docker logs api            # expect: 🚀 API listening on port 3000
curl localhost/health      # expect: {"status":"ok","db":"connected",...}
```

(`curl` = a command-line HTTP client. `curl localhost/health` sends a GET request, like opening the URL in a browser.)

### ✅ Checkpoint: the API is on the internet!

From **your laptop's** browser (or your phone!):

- `http://YOUR_PUBLIC_IP/health` → `{"status":"ok","db":"connected",...}`
- `http://YOUR_PUBLIC_IP/api/tasks` → `[]`

Add a task from your **laptop's terminal** (Mac/Linux):

```bash
curl -X POST http://YOUR_PUBLIC_IP/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Deployed to AWS!"}'
```

| Part | Meaning |
|---|---|
| `-X POST` | Send a POST request (default is GET) |
| `-H "Content-Type: application/json"` | A header: "the body is JSON" (so `express.json()` parses it) |
| `-d '{...}'` | The request body (data) |

> 🪟 **Windows:** in PowerShell, `curl` is *not* the real curl, and JSON quoting is painful. Use **Postman** / Thunder Client instead, or just wait for 2.6 and add tasks from the website.

Refresh `http://YOUR_PUBLIC_IP/api/tasks`: your task is there, saved in **RDS**.

> ⚠️ Use **`http://`**, not `https://`. We haven't set up HTTPS (that needs a domain + certificate, which is beyond the fundamentals). Some browsers try `https://` automatically; type the `http://` explicitly.

> 💡 **Test `--restart`:** on the server, run `sudo reboot`. You'll be disconnected. Wait a minute, SSH in again, and run `docker ps`: the API is already up. Nobody started it; Docker did.

### Look inside RDS (optional)

In Part 1 we used `docker compose exec db mysql ...` to look inside the database. RDS isn't a container on our server, so we borrow the MySQL client from the `mysql` image instead, on the **server**:

```bash
docker run --rm -it mysql:8.4 \
  mysql -h YOUR_RDS_ENDPOINT -u admin -p tasksdb -e "SELECT * FROM tasks"
```

| Part | Meaning |
|---|---|
| `docker run --rm -it mysql:8.4` | Start a temporary container from the MySQL image. `--rm` = delete it when it finishes |
| `mysql -h ENDPOINT` | Run the MySQL **client** and connect to the host (`-h`) RDS, not to a MySQL inside the container |
| `-u admin -p` | User `admin`. `-p` without a value = **ask** for the password (safer, and nothing is saved in your history) |
| `tasksdb -e "..."` | Use database `tasksdb` and run one statement |

> This works only **from the EC2 server**: `tasks-db-sg` allows only `tasks-api-sg`. The same command on your laptop would time out. That's the firewall doing its job.

### 🆘 Troubleshooting

First step, always: **`docker logs --tail 5 api`** (the last 5 lines) and read the error. Plain `docker logs api` prints the **whole history**, so after a few crashes you'll see old errors that are already fixed.

| Symptom | Likely cause | Fix |
|---|---|---|
| Browser spins, then times out | Port 80 not open | `tasks-api-sg` → inbound HTTP 80 from `0.0.0.0/0` |
| `docker ps` shows `Restarting (1)` | The app crashes on start | `docker logs api` and look below |
| Logs: `ETIMEDOUT` / `connect ETIMEDOUT` | EC2 can't reach RDS (firewall) | `tasks-db-sg` must allow 3306 from **`tasks-api-sg`**, and RDS must use `tasks-db-sg` (RDS → Modify → Connectivity) |
| Logs: `getaddrinfo ENOTFOUND` | Typo in `DB_HOST` | Copy the endpoint again into `.env` |
| Logs: `Access denied for user 'admin'` | Wrong password in `.env` | Fix `.env`, then `docker rm -f api` and run again |
| Logs: `Unknown database 'tasksdb'` | Forgot "Initial database name" | Create it with a throw-away MySQL container (see below) 👇 |
| Logs: `Connections using insecure transport are prohibited` | `DB_SSL=true` is missing from `.env` | Add it, then `docker rm -f api` and run again |
| `docker: Conflict. The container name "/api" is already in use` | An old `api` container exists | `docker rm -f api`, then run again |
| You changed `.env` but nothing changed | `--env-file` is read only when the container is **created** | `docker rm -f api` and `docker run ...` again (`docker restart` is not enough) |

**Create the missing database using Docker as a tool:** we don't need to install a MySQL client. We borrow the one inside the `mysql` image (on the **server**):

```bash
docker run --rm -it mysql:8.4 \
  mysql -h YOUR_RDS_ENDPOINT -u admin -p -e "CREATE DATABASE tasksdb;"
```

> ⚠️ **Replace `YOUR_RDS_ENDPOINT` with your real endpoint** (the same value as `DB_HOST` in `.env`), or you'll get `Unknown MySQL server host 'YOUR_RDS_ENDPOINT'`.
> ⚠️ **Run the commands one at a time.** The command asks for the password (`Enter password:`). If you paste a second command together with it, the terminal feeds that line to the password prompt.

Type the master password when asked (nothing shows while you type). No output = the database was created. Then, as a **separate** command:

```bash
docker restart api
```

(Here `docker restart` is enough, because `.env` didn't change.)

---

## 2.6 Host the frontend on S3 (25 min)

The frontend is just one static HTML file: no Node, no server code. "Static" = the server only has to **send the file as-is**; all the logic runs in the visitor's browser. S3 can do that by itself, without any server of ours.

### 1. Point the frontend at your API

On **your laptop**, edit `tasks-app/frontend/index.html`:

```js
const API_URL = 'http://YOUR_PUBLIC_IP';   // was http://localhost:3000
```

**Why can't it stay `localhost`?** This JavaScript runs in the **visitor's browser**, on *their* computer. `localhost` there means *their* computer, where there's no API. It must be the EC2 server's **public** address. (No `:3000`, because we mapped port 80, and no `/` at the end, because the code adds `/api/tasks`.)

### 2. Create a bucket

A **bucket** = a top-level folder in S3. Each file inside it is called an **object**.

Console → **S3** → **Create bucket**:

| Field | Value | Why |
|---|---|---|
| Bucket name | `tasks-frontend-yourname-2026` | Must be **globally unique**: no other AWS account in the world may use it. Lowercase letters, numbers and `-` only |
| Region | the **same** region as before | Keep everything together |
| Object Ownership | ACLs disabled (default) | We'll use a bucket policy (step 5) instead of old-style per-file permissions |
| **Block Public Access** | **Uncheck** "Block *all* public access" → tick the acknowledgment ✅ | By default AWS blocks any public access to buckets, as a safety net. A website must be public, so we turn the net off for **this** bucket only |

→ **Create bucket**.

> ⚠️ Public buckets are fine **only** for public files like a website. Never put private data in a public bucket. (Many data leaks you read about in the news are exactly this.)

### 3. Upload

Open the bucket (click its name) → **Upload** → **Add files** → choose `tasks-app/frontend/index.html` from your laptop → **Upload**.

> 💡 Upload the **file**, not the `frontend` folder. `index.html` must be at the top level of the bucket.

### 4. Turn on static website hosting

Bucket → **Properties** tab → scroll to the bottom → **Static website hosting** → *Edit*:
- **Enable**
- Hosting type: *Host a static website*
- Index document: `index.html` (the file to show when someone opens the site's root URL, like `/`)
- → *Save changes*

### 5. Allow everyone to read (bucket policy)

Unchecking "Block public access" only **allowed** us to make things public. Now we actually make the files public, with a **bucket policy**: a JSON document with permission rules.

Bucket → **Permissions** tab → **Bucket policy** → *Edit* → paste (**replace the bucket name** with yours):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForWebsite",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tasks-frontend-yourname-2026/*"
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `"Version": "2012-10-17"` | The version of the **policy language**. Always exactly this date. **Don't** change it to today's date |
| `"Sid"` | Statement ID: any name you like, a label for humans |
| `"Effect": "Allow"` | This rule **allows** (it could also `Deny`) |
| `"Principal": "*"` | **Who**: `*` = everyone, including people who aren't logged in |
| `"Action": "s3:GetObject"` | **What**: read/download a file. Not upload, not delete |
| `"Resource": "arn:aws:s3:::BUCKET/*"` | **Which** files: every file (`/*`) in this bucket. An **ARN** (Amazon Resource Name) is AWS's unique "full address" of a resource |

→ *Save changes*. In plain English: "anyone may **read** any file in this bucket" (and nothing else).

### ✅ Checkpoint: the full app is live! 🎉

**Properties** tab → scroll to **Static website hosting** → copy the **Bucket website endpoint**
(`http://tasks-frontend-yourname-2026.s3-website.eu-central-1.amazonaws.com`).

Open it. The status line should say `API: ok · DB: connected`. Add tasks. Send the link to a friend: **your full-stack app is on the internet.**

```
Browser ──► S3 (index.html) ──fetch──► EC2 :80 ──► Docker container ──► RDS
```

> ⚠️ Use the **website endpoint** (`...s3-website...`, starts with `http://`). **Not** the "Object URL" you see when you click on `index.html` (`https://...s3.amazonaws.com/index.html`). That one is `https`, and browsers **block** an `https` page from calling an `http` API ("mixed content"), so the page would say "Cannot reach the API".

> 💡 **Why does the API need `cors()`?** The page comes from one address (the S3 website), but calls another (the EC2 IP). Browsers block such cross-site calls **unless** the API says "I allow it". That's what `app.use(cors())` in `index.js` does. Without it, the page would load but every `fetch` would fail with a CORS error in the browser console (F12).

| Problem | Fix |
|---|---|
| `403 Forbidden` | Bucket policy missing, or the bucket name in `Resource` is wrong, or Block Public Access is still on |
| `404 Not Found` | Static website hosting is off, the index document isn't `index.html`, or you uploaded a folder instead of the file |
| Page loads, says "❌ Cannot reach the API" | Wrong `API_URL` in the uploaded file (fix it on the laptop and **upload again**; same name overwrites), you opened the `https` Object URL, or the EC2 API is down (check `http://IP/health`) |
| You uploaded a fix but still see the old page | The browser cached it. Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+F5` (Windows) |

> 💡 **S3 is not only for websites.** In real apps, S3 is where user uploads go: profile pictures, PDFs, videos. Your Node server uploads to a **private** bucket with the AWS SDK (`@aws-sdk/client-s3`). That's a great next step after this lesson.

---

## 2.7 Deploying a new version (5 min)

You changed the code on your laptop. How does it get to production?

```bash
# 1. LAPTOP: send the change to GitHub
git add . && git commit -m "new feature" && git push

# 2. EC2 (after ssh): get the change, rebuild, replace the container
cd ~/tasks-app && git pull
cd server
docker build -t tasks-api .
docker rm -f api
docker run -d --name api -p 80:3000 --env-file .env --restart unless-stopped tasks-api
```

| Command | Why |
|---|---|
| `git pull` | Download the new commits from GitHub. `.env` isn't in git, so it's **not** touched |
| `docker build -t tasks-api .` | Build a new image with the new code. Same name, so `tasks-api` now points to the new one. Thanks to layer caching, it's fast if only the code changed |
| `docker rm -f api` | Remove the **old** container. A running container keeps using the **old** image, and it holds the name `api` and port 80 |
| `docker run ...` | Start a new container from the new image |

For a few seconds between `rm` and `run`, the API is down. Fine for us; big companies use tricks to avoid even that.

Five commands every time... In real companies, a **CI/CD pipeline** (for example GitHub Actions) runs these automatically on every push. That's the next level, after the fundamentals.

> 💡 Old images pile up on the server's small disk. Clean them from time to time: `docker image prune` (removes images no container uses).

> ⚠️ If you **stop and start** the EC2 instance, its **public IP changes**, and you must update `API_URL` and re-upload `index.html`. **Reboot** keeps the IP. The real-life fix is an **Elastic IP** (a fixed IP you rent and attach to the instance) or a domain name. An Elastic IP **costs money when it isn't attached to a running instance**, so release it in the cleanup if you create one.

---

## 2.8 🧹 Cleanup: do NOT skip this!

AWS charges for what **exists**, not for what you use. A forgotten server costs money every hour, even if nobody visits it. Delete in this order:

| # | What | Where | How |
|---|---|---|---|
| 1 | **EC2 instance** | EC2 → Instances | Select → *Instance state* → **Terminate** (not Stop!) |
| 2 | **RDS database** | RDS → Databases | Select → *Actions* → **Delete** → uncheck "Create final snapshot" → uncheck "Retain automated backups" → tick the acknowledgment → type `delete me` |
| 3 | **S3 bucket** | S3 | Select → **Empty** (type `permanently delete`) → then **Delete** (type the bucket name) |
| 4 | Security groups | EC2 → Security Groups | Delete `tasks-db-sg` first, then `tasks-api-sg` (only after EC2 and RDS are fully gone) |
| 5 | Key pair | EC2 → Key Pairs | Delete `tasks-key` (and delete the `.pem` file from your laptop) |
| 6 | Elastic IP (only if you created one) | EC2 → Elastic IPs | Select → *Actions* → **Release** |

**Why this order and these choices?**
- **Terminate vs Stop:** *Stop* = turned off, but the disk still exists and is still billed. *Terminate* = deleted forever (including its disk).
- **Final snapshot:** a backup copy of the database, which is **also billed**. We don't need one.
- **Empty before delete:** AWS refuses to delete a bucket that still has files in it.
- **Security groups last:** AWS refuses to delete an SG that's still attached to something (`has a dependent object`), and `tasks-db-sg` refers to `tasks-api-sg`. Terminating EC2 and deleting RDS take a few minutes; refresh until they're gone.

Then:
- Check **every resource list once more** with the **same region** selected (top right).
- Open **Billing and Cost Management → Bills** in a day or two and confirm it's $0.

> 🧑‍🏫 **Teacher tip:** do the cleanup **together on screen**, in the last 10 minutes of the lesson. Students who "will do it later" forget, and get a bill next month.
> (If you want students to keep the app for the homework, have them clean up right after submitting.)

---

## 2.9 ☸️ Bonus: Kubernetes basics (30 min)

> The goal: understand **what problem Kubernetes solves**, and see it with your own eyes on your laptop. Free, no AWS needed.

### The problem

Today we ran **1 container on 1 server**, and we did everything by hand: `ssh`, `docker run`, and if it crashes, `--restart` brings it back.

Now imagine a real company:
- **50 containers** (API, workers, frontend...), on **10 servers**.
- A server dies at 3 a.m. Who moves its containers to another server?
- Traffic grows 10× on Black Friday. Who starts 20 more copies of the API, and who splits the visitors between them?
- A new version comes out. Who replaces the containers **one by one**, with zero downtime?

Doing this with `ssh` + `docker run` is impossible. That's what **Kubernetes** (also called **K8s**: K + 8 letters + s) does.

### The idea in one sentence

**You tell Kubernetes what you want, and it makes it happen, and keeps it that way.**

```
You:         "I want 3 copies of tasks-api running, always."
Kubernetes:  starts 3 ✅ ... a server dies, 1 copy is gone ... starts a new one ✅ (still 3)
```

This is called **desired state**: you describe the goal, not the steps. Kubernetes checks all the time that reality = your goal, and fixes the difference by itself.

> 🎵 **Analogy:** Docker is a musician playing one instrument. Kubernetes is the **conductor** of an orchestra: it decides who plays, where, and replaces a musician who falls off the chair.

### The 5 words you need

| Kubernetes word | Plain English | What it was today |
|---|---|---|
| **Cluster** | A group of servers that Kubernetes manages as one big computer | Our single EC2 server |
| **Node** | One server in the cluster | The EC2 instance |
| **Pod** | The smallest unit: a wrapper around **one container** (usually) | Our `api` container |
| **Deployment** | "Keep N copies of this pod running, and update them safely" | `docker run` + `--restart unless-stopped`, but for many copies |
| **Service** | One stable address that spreads requests between all the copies | Port `80` on the EC2 public IP |

```
                        Service (one address)
                       ┌─────────┼─────────┐
                       ▼         ▼         ▼
                     Pod 1     Pod 2     Pod 3      ← Deployment: "replicas: 3"
                    (Node A)  (Node B)  (Node A)    ← Kubernetes picks the servers
```

### 🛠️ Hands-on: your first Kubernetes app (on your laptop)

We'll run a tiny demo web server, **3 copies** of it, and watch Kubernetes balance traffic, heal itself and scale. All commands run in **your laptop's terminal**.

> 💡 Why not our tasks API? It needs a database, which means more YAML. The demo image (`traefik/whoami`) needs nothing, and it answers with **its own pod name**, so we can see *which* copy answered.

#### Step 1: Turn on Kubernetes (one time, ~3 min)

Docker Desktop → ⚙️ **Settings** → **Kubernetes** → tick **Enable Kubernetes** (if asked for a cluster type, choose **kubeadm**) → **Apply & restart**. Wait until the Kubernetes icon at the bottom of Docker Desktop is **green**.

```bash
kubectl get nodes
```

```
NAME             STATUS   ROLES           AGE   VERSION
docker-desktop   Ready    control-plane   1m    v1.3x.x
```

`kubectl` (say "cube-control") is the Kubernetes command line, like `docker` is for Docker. One node = a cluster of one server: your laptop.

#### Step 2: Describe what you want (the YAML)

Open [`k8s-demo/hello.yaml`](k8s-demo/hello.yaml) (it's in this folder). It has two parts, separated by `---`:

| Part | Key line | Meaning |
|---|---|---|
| **Deployment** `hello` | `replicas: 3` | "Keep 3 copies running, always" |
| | `image: traefik/whoami` | Which image each pod runs (like `image:` in Compose) |
| | `labels: app: hello` | A **name tag** on each pod. That's how the Deployment and the Service find "their" pods |
| **Service** `hello` | `selector: app: hello` | "Send traffic to every pod with the tag `app: hello`" |
| | `type: LoadBalancer` | Open the Service **outside** the cluster. On Docker Desktop it appears on `localhost`; on AWS (EKS) this creates a real AWS load balancer |
| | `port: 8081` → `targetPort: 80` | You call port 8081, the pods listen on 80. Like `-p 8081:80` in Docker. (Not 8080: the Part 1 frontend already uses it) |

#### Step 3: Send it to the cluster

```bash
cd k8s-demo
kubectl apply -f hello.yaml
kubectl get pods
```

```
NAME                     READY   STATUS    RESTARTS   AGE
hello-6d4b8c9f7d-2xkqp   1/1     Running   0          10s
hello-6d4b8c9f7d-8mzrt   1/1     Running   0          10s
hello-6d4b8c9f7d-tq5vn   1/1     Running   0          10s
```

**3 pods**, and we never typed `docker run`. We only described the goal. (If `STATUS` says `ContainerCreating`, it's still downloading the image. Run `kubectl get pods` again in a few seconds.)

#### Step 4: See the load balancing

The Service gives the 3 pods **one** address: `localhost:8081`. Check it's ready:

```bash
kubectl get service hello
```

```
NAME    TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
hello   LoadBalancer   10.96.45.120   localhost     8081:31234/TCP   30s
```

`EXTERNAL-IP` = `localhost` means it's open to your laptop. Now call it several times from **your laptop's terminal** (run the line 4 to 5 times: ↑ + Enter):

```bash
curl -s localhost:8081 | grep Hostname
```

```
Hostname: hello-6d4b8c9f7d-8mzrt
Hostname: hello-6d4b8c9f7d-2xkqp
Hostname: hello-6d4b8c9f7d-8mzrt
Hostname: hello-6d4b8c9f7d-tq5vn
```

**Different pods answer!** Same address, and the Service spreads the requests between the copies.

> 🪟 **Windows:** PowerShell's `curl` is different. Use `curl.exe -s localhost:8081`, or just open http://localhost:8081 in the browser.
> 🌐 **In the browser** you may see the **same** pod name on every refresh: the browser keeps one connection open and reuses it. `curl` opens a new connection each time, so it shows the balancing.

> 💡 **Another way: from inside the cluster.** Inside the cluster, the Service also has a **name**: `hello` (Kubernetes has its own DNS, like `db` in Compose). Start a throw-away pod with tools in it and call it by name:
> ```bash
> kubectl run tester --rm -it --image=busybox -- sh
> wget -qO- http://hello:8081 | grep Hostname     # inside the pod (/ # prompt)
> exit                                             # the pod is deleted (--rm)
> ```
> That's how pods talk to each other in real apps: an API pod reaches a database by its Service name.

#### Step 5: Self-healing: kill a pod

```bash
kubectl get pods                       # copy one pod name
kubectl delete pod hello-6d4b8c9f7d-2xkqp
kubectl get pods
```

There are **still 3 pods**: one has a new name and `AGE` of a few seconds. You deleted one, the Deployment saw "2 ≠ 3" and **created a new one by itself**. That's desired state. (Today on EC2, if the server died, nobody would do that for us.)

#### Step 6: Scale up: change the goal

In `hello.yaml`, change `replicas: 3` to `replicas: 5`, save, and apply again:

```bash
kubectl apply -f hello.yaml
kubectl get pods                       # 5 pods ✅
```

Same command as before. We didn't say "start 2 more", we said "I want 5", and Kubernetes did the math. Try `replicas: 2` too: it removes the extra pods.

#### Step 7: Clean up

```bash
kubectl delete -f hello.yaml           # deletes the Deployment, its pods and the Service
kubectl get pods                       # No resources found ✅
```

Kubernetes uses a lot of RAM. When you're done, turn it off: Docker Desktop → Settings → Kubernetes → untick **Enable Kubernetes** → Apply & restart.

#### 🆘 If something doesn't work

| Symptom | Fix |
|---|---|
| `kubectl get nodes`: `connection refused` / `couldn't get current server API` | Kubernetes isn't running yet. Check Docker Desktop: the Kubernetes icon must be green |
| Pod `STATUS` = `ImagePullBackOff` / `ErrImagePull` | Kubernetes can't download the image: check the internet connection and the image name in the YAML |
| `EXTERNAL-IP` stays `<pending>` | Usually the port is **already taken** on your laptop (for example a container from Part 1). Check: `kubectl logs -n kube-system vpnkit-controller --tail 5`. If it says `Port 8081 ... is already opened by another service`, stop that app (`docker compose down` in `tasks-app`), or change `port: 8081` in `hello.yaml` to a free port (like `8082`), `kubectl apply` again, and call that port |
| Still `<pending>` / `curl` fails | Use a tunnel instead: `kubectl port-forward service/hello 8081:8081` (in a second terminal; it reaches only **one** pod, so you'll always see the same name) |
| You edited `hello.yaml` but nothing changed | Kubernetes doesn't watch the file. Run `kubectl apply -f hello.yaml` again after every change |
| `kubectl run tester ...` says `AlreadyExists` | An old tester pod is stuck: `kubectl delete pod tester`, then run again |

### Docker vs Kubernetes: what changed?

| Today (Docker) | Kubernetes |
|---|---|
| `docker run ...` (a command: "do this") | `kubectl apply -f file.yaml` (a goal: "I want this") |
| 1 container | `replicas: 3`, and it keeps that number |
| `--restart unless-stopped` (same server only) | A dead pod is recreated, even on **another** server |
| Port `80` on one EC2 IP (`-p 80:3000`) | A **Service** (`type: LoadBalancer`): one address for all the copies |
| 5 commands to deploy a new version (2.7) | Change the image tag in the YAML → `kubectl apply` → pods replaced **one by one**, zero downtime |

> 💡 In a real cluster with many servers, the image can't be built "on the server" like we did on EC2. It's pushed to a **registry** (Docker Hub, or **AWS ECR**), and every node downloads it from there.

### Do I need it?

- **For our tasks app: no.** One server and one container are perfectly fine. Kubernetes is powerful but complex, and it costs more.
- **Big apps with many services and lots of traffic: yes.** That's why it shows up in so many job ads.
- On AWS, the managed Kubernetes is called **EKS**. (Simpler AWS option for containers without Kubernetes: **ECS**.)

> 🔑 **The big lesson:** Docker made **one** container easy to run anywhere. Kubernetes makes **many** containers easy to run across **many** servers. You can't learn Kubernetes without Docker, and you already know Docker. 💪

---

## 📋 Summary: what we did

| Step | Local (Part 1) | AWS (Part 2) |
|---|---|---|
| Run the app | `docker compose up` | `docker run` on EC2 |
| Get the code there | It's already on your laptop | `git push` → `git clone` |
| Database | `mysql:8.4` container + volume | RDS |
| DB address (`DB_HOST`) | `db` (service name) | the RDS endpoint |
| Who can reach the DB | Docker network | Security Group referencing `tasks-api-sg` |
| Config | `environment:` in YAML | `.env` + `--env-file` |
| Frontend | nginx container | S3 static website |
| Look inside the DB | `docker compose exec db mysql ...` | `docker run --rm -it mysql:8.4 mysql -h ENDPOINT ...` |

**The big lesson:** we never changed a single line of the **server** code between the laptop and the cloud. Only **environment variables** (and the frontend's `API_URL`). That's what Docker gives you.

---

## 🏋️ Homework

1. **Deploy your own project:** take the project you dockerized in Part 1 (exercise 3) and deploy it to EC2 + RDS (or + MongoDB Atlas free tier if it's a MongoDB project). Submit the `/health` URL and a screenshot. Then clean up!
2. **Version endpoint:** add `GET /version` that returns `{ "version": "1.1" }`. Deploy it using the steps in 2.7. Submit the URL.
3. **Short answers:**
   - Why does `tasks-db-sg` use `tasks-api-sg` as the source instead of `0.0.0.0/0`?
   - What's the difference between `docker compose down` on your laptop and deleting the RDS database?
   - Your friend's S3 site shows `403 Forbidden`. Name two things to check.
   - Why must `API_URL` in `index.html` be the EC2 public IP and not `localhost`?
4. **Bonus (AWS CLI):** the AWS CLI lets you control AWS from the terminal instead of clicking. Install it, create an **IAM user** (a limited-permission user, not root) with S3 access and an access key, run `aws configure`, and upload the frontend with one command:
   `aws s3 sync ./frontend s3://tasks-frontend-yourname-2026`
