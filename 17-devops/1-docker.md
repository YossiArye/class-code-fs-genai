# Part 1: Docker 🐳

> Goal: by the end of this part, `docker compose up` starts our **API + MySQL + frontend** on any computer, with nothing installed except Docker.

**Where to run the commands:**
- Sections **1.2 and 1.3** (nginx, MySQL): any folder. They don't use our project files.
- Sections **1.4 to 1.7**: inside the project. Each section says exactly which folder (`tasks-app/` or `tasks-app/server/`).

> 💡 **Two kinds of prompt.** In this tutorial you'll type into two different places:
> - Your computer's **terminal**: the prompt looks like `yossi@MacBook ~ %` or `$`. Docker commands go here.
> - A program **inside a container**, like the MySQL shell: the prompt looks like `mysql>`. SQL goes here.
>
> Typing SQL into the terminal gives `bash: USE: command not found`. Typing `docker ...` at `mysql>` gives a SQL syntax error. **Always check the prompt before you type.**

---

## 1.1 Why Docker? (20 min)

### The problem: "It works on my machine" 🤷

You built an Express + MySQL app. Now a classmate wants to run it. They need:
- the **same Node version** (you have 22, they have 16 → errors)
- **MySQL installed**, with the right version, user, password and database
- the same OS behavior (Mac vs Windows vs Linux)

Multiply by 13 students, a teammate, and a production server. Pain.

### The solution: ship the app **together with its environment**

Docker packs your code **plus** everything it needs (OS files, Node, npm packages) into one box called an **image**. Anyone with Docker can run that box and get exactly the same result: on a Mac, on Windows, or on a Linux server in the cloud.

### The 4 words you need

| Word | What it is | Analogy (you know OOP!) |
|---|---|---|
| **Image** | A read-only package: OS files + runtime + your code + dependencies | A **class** (or a recipe) |
| **Container** | A running instance of an image | An **object** (`new`) (or a cooked dish) |
| **Dockerfile** | A text file with instructions for building an image | The **source code** of the class |
| **Registry** (Docker Hub) | An online store of images (`node`, `mysql`, `nginx`...) | **npm** for images |

```
Dockerfile ──docker build──► Image ──docker run──► Container (running!)
                              ▲  │
                docker pull ──┘  └── docker push ──► Docker Hub
```

How to read the diagram:
- You **write** a Dockerfile.
- `docker build` turns it into an **image** (on your computer).
- `docker run` starts a **container** from the image.
- `docker pull` downloads an image someone else built (like `mysql`). `docker push` uploads yours.

### Container vs Virtual Machine

| | Virtual Machine (VM) | Container |
|---|---|---|
| What's inside | A **whole operating system** (Windows/Linux) + your app | Only your app + the files it needs |
| Size | Gigabytes | Megabytes |
| Start time | Minutes (it boots an OS) | Seconds |
| How | Pretends to be a full separate computer | Shares the host's **kernel** (the core of the operating system that talks to the hardware) |

That's why we can run 3 containers on a laptop without it melting.

> 💡 On Mac and Windows, Docker Desktop quietly runs **one small Linux VM**, and all your containers run inside it. That's why containers are always Linux, even on a Mac.

> 🧑‍🏫 **Teacher tip:** draw the class/object analogy on the board. Then ask: "If I run the same image twice, how many containers do I have?" (Two. Like two objects from one class.)

---

## 1.2 First commands (25 min)

### Check that Docker works

Make sure **Docker Desktop is open** (the 🐳 whale icon is in the menu bar / system tray), then in the terminal:

```bash
docker --version
docker run hello-world
```

What happened, step by step:
1. Docker looked for an image called `hello-world` **on your computer**. It wasn't there.
2. It **pulled** (downloaded) it from Docker Hub. You see `Unable to find image... Pulling from library/hello-world`.
3. It **created a container** from that image and **ran** it.
4. The program inside printed "Hello from Docker!" and **finished**, so the container **stopped**.

Run `docker run hello-world` again: this time there's no download, because the image is already on your computer.

> 💡 **A container lives only as long as its main program runs.** `hello-world` prints a message and ends, so its container stops immediately. A web server never "ends", so its container keeps running.

### Run a real web server (nginx)

**nginx** is a popular web server. Someone already put it in an image, so we don't install anything:

```bash
docker run -d -p 8080:80 --name web nginx
```

| Part | Meaning |
|---|---|
| `docker run` | Create a **new** container from an image and start it |
| `-d` | **Detached**: run in the background and give me my terminal back. Without `-d`, the terminal shows the container's logs and stays busy until you press Ctrl+C |
| `-p 8080:80` | **Port mapping**: `YOUR_COMPUTER_PORT:CONTAINER_PORT` (explained below) |
| `--name web` | A friendly name, so you can refer to it later (`docker stop web`). Without it, Docker invents one like `angry_turing` |
| `nginx` | The image name. Always **last**, after all the flags |

Open **http://localhost:8080**. You see "Welcome to nginx!" 🎉

#### Why do we need `-p`?

A container is **isolated**: it has its own private network, like a separate little computer. nginx listens on port 80 **inside** the container, but your browser can't see inside. `-p 8080:80` opens a door: "whatever arrives at port 8080 on my computer, send it to port 80 in the container".

```
Browser ──► localhost:8080 ──(port mapping)──► container "web" :80 ──► nginx
             your computer                       inside the container
```

Without `-p`, nginx still runs, but nobody outside the container can reach it.

### The everyday commands

```bash
docker ps                 # list RUNNING containers
docker ps -a              # list ALL containers, including stopped ones
docker logs web           # show what the container printed
docker logs -f web        # follow the logs live (Ctrl+C to exit). Refresh the browser and watch!
docker exec -it web sh    # open a shell INSIDE the container (see below)
docker stop web           # stop it (the container still exists, just not running)
docker start web          # start the same container again
docker rm -f web          # remove (delete) it. -f = force: stop it first if it's running
docker images             # list the images downloaded to your computer
```

**Reading `docker ps`:**

```
CONTAINER ID   IMAGE   COMMAND                  CREATED         STATUS         PORTS                  NAMES
a1b2c3d4e5f6   nginx   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080->80/tcp   web
```

| Column | Meaning |
|---|---|
| `CONTAINER ID` | A unique ID. You can use it instead of the name |
| `IMAGE` | Which image this container was created from |
| `STATUS` | `Up ...` = running. In `docker ps -a` you may also see `Exited (0)` = stopped |
| `PORTS` | The port mapping: `8080->80` means "your port 8080 → container port 80" |
| `NAMES` | The name from `--name` |

**Stop vs remove:**

| | `docker stop web` | `docker rm -f web` |
|---|---|---|
| Container still exists? | ✅ Yes (shows in `docker ps -a`) | ❌ No, it's deleted |
| Can I bring it back? | ✅ `docker start web` | ❌ You need a new `docker run` |
| Like... | Turning off a laptop | Throwing the laptop away |

#### `docker exec`: go inside a running container

```bash
docker exec -it web sh
```

| Part | Meaning |
|---|---|
| `docker exec` | Run a command **inside a container that's already running** (it doesn't create a new one) |
| `-i` | **Interactive**: keep the input open so you can type |
| `-t` | **Terminal**: give you a proper prompt. You almost always use `-i` and `-t` together: `-it` |
| `web` | **Which** container to go into |
| `sh` | **Which command** to run inside it. `sh` is a Linux shell (like the terminal, but inside the container) |

Your prompt changes to `#`. You're now **inside** the container. Try:

```bash
ls /usr/share/nginx/html     # the folder nginx serves the website from
cat /etc/os-release          # which Linux is this? (Debian, not macOS!)
exit                         # leave the container and go back to your terminal
```

> 💡 `exit` only closes your shell. The container (and nginx) **keeps running**.

#### `docker run` vs `docker exec`: the difference

```
docker run   ──►  🆕 creates + starts a NEW container       (once)
                        │
                        ▼
                 [ web  running ]
                        ▲
docker exec  ──►  🚪 goes INTO it and runs a command    (as many times as you want)
```

| | `docker run` | `docker exec` |
|---|---|---|
| Creates a container? | ✅ Yes | ❌ No |
| Needs the container to exist? | ❌ No (the name must be **free**) | ✅ Yes, and **running** |
| Starts from | an **image** (`nginx`) | a **container name** (`web`) |
| Analogy | Buying a new laptop and turning it on | Sitting down at a laptop that's on and opening an app |

### ✅ Checkpoint

Each student runs **two** nginx containers at the same time, one on port 8081 and one on 8082. Both pages open.

```bash
docker run -d -p 8081:80 --name web1 nginx
docker run -d -p 8082:80 --name web2 nginx
docker ps                          # two containers, same image
docker rm -f web1 web2 web         # cleanup (remove all three)
```

> 💡 One image, two containers. Class and objects!

> ❓ **Why can both use port 80?** Each container has its **own** private network, so each has its own port 80. Only the **left** side of `-p` (on your computer) must be different: 8081 and 8082. Try `-p 8081:80` twice and you'll get `port is already allocated`.

---

## 1.3 Run MySQL in a container: env vars and volumes (25 min)

Remember installing MySQL (installer, Workbench, root password, services)? Watch this:

```bash
docker run -d --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=school \
  -p 3307:3306 \
  mysql:8.4
```

> 💡 **What's the `\` at the end of the lines?** It means "the command continues on the next line". It's still **one** command, split so it's easy to read. You can also write it all on one line.
> ⚠️ **Windows PowerShell** uses a backtick `` ` `` instead of `\`. Easiest: write the whole command on **one line**.

| Part | Meaning |
|---|---|
| `--name mysql-test` | We'll use this name in every following command |
| `-e MYSQL_ROOT_PASSWORD=secret` | `-e KEY=value` sets an **environment variable** inside the container. The official MySQL image reads this one to set the root password |
| `-e MYSQL_DATABASE=school` | ...and this one to create a database called `school` |
| `-p 3307:3306` | MySQL listens on 3306 inside the container. We use **3307** on our computer, in case you already have a MySQL installed that uses 3306 |
| `mysql:8.4` | Image `mysql`, **tag** (version) `8.4`. Without a tag Docker uses `latest`, which can change under your feet. Always pin a version in real projects |

> 💡 How do we know which `-e` variables MySQL understands? They're documented on the image's page on Docker Hub: https://hub.docker.com/_/mysql. Every official image has such a page.

### Wait until MySQL is ready

MySQL needs about **20 seconds** to start the first time (it creates its system files). Watch it:

```bash
docker logs -f mysql-test
```

Wait for a line with **`ready for connections`** and **`port: 3306`**, then press **Ctrl+C** (this only stops *watching* the logs, not MySQL).

> If you connect too early you'll get `ERROR 2002: Can't connect to local MySQL server`. Just wait a few seconds and try again.

### Open a MySQL shell inside the container

In your **terminal**:

```bash
docker exec -it mysql-test mysql -uroot -psecret
```

| Part | Meaning |
|---|---|
| `docker exec -it mysql-test` | Go into the running container `mysql-test`, interactively (see 1.2) |
| `mysql` | The command to run inside: the MySQL command-line client (it's included in the image) |
| `-uroot` | User `root` |
| `-psecret` | Password `secret`. **No space** after `-p`! (`-p secret` would ask for a password and treat `secret` as a database name) |

You'll see a warning (`Using a password on the command line interface can be insecure`), which is fine for learning, and then the prompt changes to **`mysql>`**. Only **now** type SQL:

```sql
USE school;
CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50));
INSERT INTO students VALUES (1, 'Dana');
SELECT * FROM students;
exit
```

> ⚠️ These lines go at the **`mysql>`** prompt, **not** in your terminal. If you see `bash: USE: command not found`, you typed SQL into the terminal. Run the `docker exec` command first.

> 💡 You can also connect from **MySQL Workbench**: host `127.0.0.1`, port `3307`, user `root`, password `secret`. (That's what the `-p 3307:3306` is for.)

### 💥 Experiment: delete the container

**1. Delete the container:**

```bash
docker rm -f mysql-test
```

**2. Create it again** with the **exact same** command as before (copy it from the top of 1.3):

```bash
docker run -d --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=school \
  -p 3307:3306 \
  mysql:8.4
```

**3. Wait about 20 seconds** (until `ready for connections`), then look for Dana:

```bash
docker exec -it mysql-test mysql -uroot -psecret -e "SELECT * FROM school.students"
```

> 💡 **`-e "SQL"`** (after `mysql`) runs **one** SQL statement and returns straight away, without opening the `mysql>` prompt. Don't mix it up with Docker's `-e KEY=value` (environment variable). Same letter, different program.

Result:

```
ERROR 1146 (42S02) at line 1: Table 'school.students' doesn't exist
```

**The table is gone!** Containers are **disposable**: a new container starts from the clean image, without anything you wrote into the old one.

> 🔍 **Where did the data actually go?** (for the curious) The MySQL image always stores its data in a volume. If you don't give one a name, Docker creates one with a **random name** (like `6db66f3c…`). `docker rm` deletes the container but leaves that volume behind, with **nothing pointing to it**. Run `docker volume ls` and you'll see these long random names. The data is technically still on your disk, but no new container will find it. So, for us: lost. Clean them with `docker volume prune` (careful: it deletes **every** volume no container uses).

### The fix: a **volume** with a name

A volume is storage that lives **outside** the container, managed by Docker.
To use one, we add **one flag** to `docker run`:

```bash
-v mysql-data:/var/lib/mysql
```

`-v mysql-data:/var/lib/mysql` means: store the folder where MySQL keeps its files (`/var/lib/mysql`) in a volume named `mysql-data`.

```
-v   mysql-data   :   /var/lib/mysql
     ▲                ▲
     │                └── a folder INSIDE the container
     │                    (this is where MySQL saves every database, table and row)
     └── a volume OUTSIDE the container, on your computer, managed by Docker
         (created automatically the first time you use this name)
```

> 💡 How do we know the folder is `/var/lib/mysql`? It's MySQL's standard data folder, and it's written on the image's Docker Hub page. Each database has its own: Postgres uses `/var/lib/postgresql/data`, MongoDB uses `/data/db`.

#### What's happening behind the scenes

**Without a named volume**, the data has no name you can come back to. Delete the container → for us, the data is gone:

```
┌─ container mysql-test ─────────┐
│  /var/lib/mysql  ← data HERE   │   docker rm  →  🗑️ container gone, data unreachable
└────────────────────────────────┘
```

**With `-v`**, the folder `/var/lib/mysql` is just a "window" to the volume. The data is really stored **outside**:

```
┌─ container mysql-test ─────────┐        ┌─ volume mysql-data ─┐
│  /var/lib/mysql  ─────────────────────► │  the real data 💾    │
└────────────────────────────────┘        └──────────────────────┘
        docker rm → 🗑️ only the container       still here ✅
```

A new container that mounts the **same volume name** sees the **same files**, so MySQL finds the old data and continues as if nothing happened.

> 💡 Analogy: the container is a **laptop**, the volume is a **USB drive**. Throw away the laptop, plug the USB drive into a new laptop, and your files are still there.

### ✅ Checkpoint: prove the data survives

**Step 0: Start fresh**, so no old container or volume confuses us:

```bash
docker rm -f mysql-test          # delete the container from the experiment above (if it exists)
docker volume rm mysql-data      # delete the volume if it exists ("No such volume" is fine)
```

**Step 1: Start MySQL WITH a volume.** This is where the volume is born ✨

```bash
docker run -d --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=school \
  -p 3307:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.4
```

There is no separate "create volume" command. When `-v` uses a name that doesn't exist yet, **Docker creates the volume automatically**. (You *can* create one by hand with `docker volume create mysql-data`, but you don't need to.) Check:

```bash
docker volume ls        # "mysql-data" is in the list
```

**Step 2: Create a table and insert a row** into this container (and so into the volume).
Wait about 20 seconds for MySQL to start (`docker logs mysql-test` → `ready for connections`), then:

```bash
docker exec -it mysql-test mysql -uroot -psecret school \
  -e "CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50)); INSERT INTO students VALUES (1, 'Dana');"
```

(Here `school` after `-psecret` means "use the `school` database", like `USE school;`.)

Check it's there:

```bash
docker exec -it mysql-test mysql -uroot -psecret -e "SELECT * FROM school.students"
```

```
+----+------+
| id | name |
+----+------+
|  1 | Dana |
+----+------+
```

**Step 3: Delete the container**

```bash
docker rm -f mysql-test
docker ps -a            # mysql-test is gone, there's no container at all
docker volume ls        # ...but the volume "mysql-data" is still listed! 👀
```

> ⚠️ Don't try `docker exec` now: you'll get `No such container: mysql-test`. `exec` needs a running container, and we just deleted it.

**Step 4: Create a brand-new container with the same volume.** Copy the **exact same** `docker run` command from Step 1, including `-v mysql-data:/var/lib/mysql`:

```bash
docker run -d --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=school \
  -p 3307:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.4
```

This is a **new** container (new ID, nothing inside it), but it's connected to the **old** volume. The same `-v` did two different things:

| | Step 1 | Step 4 |
|---|---|---|
| Does `mysql-data` exist? | ❌ No | ✅ Yes (it survived `docker rm`) |
| What Docker does | **Creates** the volume, empty | **Reuses** the volume, with Dana in it |
| What MySQL sees | An empty folder → sets everything up from scratch | Existing files → carries on with the old data |

**Step 5: Check the data.** Wait about 10 seconds, then run the same `SELECT`:

```bash
docker exec -it mysql-test mysql -uroot -psecret -e "SELECT * FROM school.students"
```

```
+----+------+
| id | name |
+----+------+
|  1 | Dana |
+----+------+
```

**Dana is still there!** 🎉 We never inserted her into this container. She came from the volume.

#### 🤔 Questions to ask the class

| Question | Answer |
|---|---|
| What if in step 4 we **forget** the `-v`? | MySQL starts with an empty folder → the table is missing. The data isn't lost, though: it's still in the volume, waiting for a container that mounts it. |
| What if in step 4 we use a **different** name, like `-v other-data:/var/lib/mysql`? | Docker creates a new, empty volume → no table. The name is what connects a container to its data. |
| In step 4, does `MYSQL_ROOT_PASSWORD` matter? | No! These variables are used **only the first time**, when the volume is empty. If the volume already has data, MySQL keeps the old password and databases. (You'll meet this again in "Common errors".) |
| What if in **step 1** we forget the `-v`, and only add it in step 4? | Dana was saved in a random unnamed volume, and step 4 creates a new **empty** `mysql-data` → table missing. **The container you insert into must already have the `-v`.** |
| So when is the data really deleted? | Only when you delete the **volume**: `docker volume rm mysql-data`. |

#### Cleanup

```bash
docker volume ls                 # see your volumes
docker rm -f mysql-test          # delete the container (data is safe)
docker volume rm mysql-data      # delete the volume (NOW the data is gone)
```

> ⚠️ Docker won't delete a volume that a container is still using (`volume is in use`). Remove the container first, then the volume.

> 🔗 **Coming up:** in Docker Compose (1.6), the line `db-data:/var/lib/mysql` does exactly the same thing. That's why your tasks survive `docker compose down`, and why `down -v` (which deletes volumes) erases them.

---

## 1.4 Write a Dockerfile for our API (40 min)

So far we used images other people built (`nginx`, `mysql`). Now let's put **our own code** in an image. Look at the app first:

```
tasks-app/
├── docker-compose.yml
├── frontend/index.html
└── server/
    ├── Dockerfile        ◄── we're here
    ├── .dockerignore
    ├── package.json
    ├── package-lock.json
    ├── index.js          (Express routes: /health, /api/tasks)
    └── db.js             (MySQL connection, reads process.env)
```

The API has 5 routes: `GET /health` (is the server alive and connected to the DB?), and `GET / POST / PATCH / DELETE /api/tasks` for the tasks. On startup it creates the `tasks` table if it doesn't exist.

> 🔑 Open `server/db.js` and point out: **no hard-coded host or password.** Everything comes from `process.env`:
> ```js
> host: process.env.DB_HOST || 'localhost',
> password: process.env.DB_PASSWORD || '',
> ```
> `process.env.DB_HOST` reads an **environment variable**, the same thing we set with `-e` in 1.3. That's what lets **one image** run anywhere: on your laptop, in Compose, and on AWS, each time with different variables.

### The Dockerfile, line by line

A `Dockerfile` is a text file (no extension, capital D) with instructions. Docker runs them top to bottom:

```dockerfile
FROM node:22-alpine          # 1. Base image: Linux (Alpine, tiny) + Node 22
WORKDIR /app                 # 2. "cd /app" inside the image (creates it)
COPY package*.json ./        # 3. Copy package.json + package-lock.json first
RUN npm ci --omit=dev        # 4. Install dependencies (runs at BUILD time)
COPY . .                     # 5. Copy the rest of the code
EXPOSE 3000                  # 6. Documentation: the app listens on 3000
CMD ["node", "index.js"]     # 7. What to run when a CONTAINER starts
```

Each line in more detail:

| # | Line | Explanation |
|---|---|---|
| 1 | `FROM node:22-alpine` | Every image starts **from another image**. We don't install Linux and Node ourselves; we take the official `node` image, version `22`. **`alpine`** is a very small Linux (about 5 MB), so our image stays small (our finished image is about 65 MB; the non-alpine `node:22` alone is several hundred MB) |
| 2 | `WORKDIR /app` | Like `mkdir /app` + `cd /app` **inside the image**. Every following line (`COPY`, `RUN`, `CMD`) works relative to `/app` |
| 3 | `COPY package*.json ./` | Copy from **your folder** into the image. `package*.json` is a pattern (`*` = anything) that matches **both** `package.json` and `package-lock.json`. `./` = the current folder in the image, which is `/app` |
| 4 | `RUN npm ci --omit=dev` | **Run a command** while building. **`npm ci`** is like `npm install`, but it installs **exactly** the versions in `package-lock.json` and never changes it: perfect for reproducible builds. **`--omit=dev`** skips `devDependencies` (like `nodemon`), which production doesn't need |
| 5 | `COPY . .` | Copy **everything else** (`index.js`, `db.js`...) into `/app` (explained in detail below) |
| 6 | `EXPOSE 3000` | A note: "the app listens on 3000". It does **not** open the port (explained below) |
| 7 | `CMD ["node", "index.js"]` | The command that starts the app. It's written as a list: `["program", "argument"]`, so this is just `node index.js`. Only **one** `CMD` per Dockerfile |

| Instruction | When does it run? |
|---|---|
| `FROM`, `WORKDIR`, `COPY`, `RUN` | During **`docker build`**, once |
| `CMD` | Every time a **container starts** (`docker run`) |

#### Two separate moments: build time vs run time

The Dockerfile is used at **two different times**:

```
 BUILD TIME                                RUN TIME
 (once, to make the image)                 (every time you start a container)

 Dockerfile ──docker build──► Image ──docker run──► Container
 FROM, WORKDIR, COPY, RUN                           CMD
```

**`docker build`** reads the Dockerfile top to bottom and prepares the image. **Nothing is running yet.** For our Dockerfile:

| Instruction | What happens during the build |
|---|---|
| `FROM node:22-alpine` | Start from an image that already has Linux + Node |
| `WORKDIR /app` | Create the folder `/app` inside the image |
| `COPY package*.json ./` | Copy `package.json` and `package-lock.json` into the image |
| `RUN npm ci --omit=dev` | **Actually run** `npm ci`, so the packages are installed **inside the image** |
| `COPY . .` | Copy your code into the image |

The result is an **image**: a sealed package with Node, the packages and your code. You build once, and again only when your code or Dockerfile changes.

**"When a container starts"** means the moment you run `docker run` (or `docker start`, or Compose's `up`). Docker creates a live container from the image and runs the `CMD`. Only now does your server start and listen on port 3000. You can do this as many times as you want from the same image.

> 💡 Analogy: **build = cooking the meal and freezing it** (once). **Run = taking it out and heating it up** (every time you're hungry).

| | `RUN npm ci` | `CMD ["node", "index.js"]` |
|---|---|---|
| Runs when? | At build time | When the container starts |
| How many times? | Once (the result is saved in the image) | Every time you start a container |
| Purpose | Prepare the image (install things) | Start your app |

You'll see this for yourself in a moment: after `docker build`, `docker ps` is **empty**, because building starts nothing. Only `docker run` starts the `CMD`.

> ❓ **Quiz:** Why not `RUN node index.js`?
> Because `RUN` runs during the build. A server never finishes, so the build would hang forever waiting for that step to end. And even if it finished, nothing would start when you run the container. We want the server to start when the **container** starts → `CMD`.

### `.dockerignore`

Like `.gitignore`, but for `COPY . .`: files listed here are **never** copied into the image.

```
node_modules     # we install fresh INSIDE the image
.env             # never bake secrets into an image
.git             # history isn't needed to run the app
```

Why exclude `node_modules`?
1. **It might not work in Linux.** Some packages contain compiled code that's built for **your** OS (macOS/Windows). The container is Linux, so `npm ci` inside the image installs the right versions.
2. **It would overwrite** the clean `node_modules` that `npm ci` just installed (step 5 `COPY . .` comes after step 4).
3. **Speed**: it can be hundreds of MB that Docker would have to copy on every build.

Why exclude `.env`? Anyone who gets your image can read every file inside it. Passwords go in at **run time** (with `-e` or `--env-file`), never into the image.

### Build the image

Go to the `server` folder (from the root of the tutorial: `cd tasks-app/server`), then:

```bash
docker build -t tasks-api .
docker images              # tasks-api is there!
docker ps                  # empty: building started NOTHING
```

- `-t tasks-api` gives the image a **tag** (name). You can add a version: `tasks-api:1.0`. Without a version, Docker adds `:latest` automatically.
- `.` is the **build context**, the folder Docker can `COPY` from.

While it builds, you'll see a line for each step, like `[2/5] WORKDIR /app`, `[4/5] RUN npm ci --omit=dev`. The first build takes a while (it downloads `node:22-alpine` and installs the packages).

#### What is the `.` at the end?

```bash
docker build -t tasks-api .
#            ▲  ▲         ▲
#            │  │         └── the BUILD CONTEXT: which folder to build from
#            │  └── the image name
#            └── "tag": give the image a name
```

`.` means "the current folder". Docker can only see and copy files **from this folder**. That's also what the first `.` in the Dockerfile means:

```dockerfile
COPY . .
#    ▲ ▲
#    │ └── destination: the WORKDIR inside the image (/app)
#    └──── source: the build context (the folder you passed to docker build)
```

So you must run the command from the folder that contains the `Dockerfile`:

```bash
cd tasks-app/server
docker build -t tasks-api .     # ✅ has Dockerfile, package.json, index.js
```

```bash
cd tasks-app
docker build -t tasks-api .     # ❌ wrong folder: no Dockerfile, no package.json
```

You can also build from outside by passing the path instead of `.`: `docker build -t tasks-api ./tasks-app/server`. The `.dockerignore` file is read from the context folder too.

#### What does `EXPOSE 3000` do?

**It's documentation only.** It says "this app listens on port 3000 inside the container". It does **not** make the app reachable from your browser. That's the job of `-p` (or `ports:` in Compose):

```bash
docker run -p 3000:3000 tasks-api
#             ▲    ▲
#             │    └── port INSIDE the container (where the app listens)
#             └─────── port on YOUR computer (what you type in the browser)
```

| | Reachable from your browser? |
|---|---|
| `EXPOSE 3000` only | ❌ No |
| `-p 3000:3000` (even without `EXPOSE`) | ✅ Yes |

> 💡 `EXPOSE` is a label on the box saying "plug in here". `-p` is the cable that actually connects it.

#### And the port in the code? Does Docker take it into account?

**No. Docker never reads your code.** It doesn't know which port `index.js` listens on. Your app decides that on its own:

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, ...);
```

Docker only connects ports, so **three things must agree**:

```
 browser ──► -p 8080:3000 ──► container port 3000 ──► app.listen(3000)
                  ▲                    ▲                      ▲
         your computer's port    must match...          ...what the CODE listens on
```

| Setting | Who reads it | What happens if it's wrong |
|---|---|---|
| `app.listen(PORT)` in the code (or `PORT` env var) | Your app | This is the **real** port |
| `-p HOST:CONTAINER` | Docker | If `CONTAINER` ≠ the real port → the page doesn't load ("connection reset / empty reply") |
| `EXPOSE` | Nobody important | Nothing breaks. It's only a note |

**Try it** (after section 1.6, when you have Compose; the API needs the database to start). In `docker-compose.yml`, in the `server` service:

1. Change `PORT: 3000` to `PORT: 4000`, leave `ports: "3000:3000"`, then `docker compose up --build -d`.
   Open http://localhost:3000/health → ❌ **can't connect**. The app listens on 4000, but Docker is sending traffic to 3000.
2. Change the mapping to `ports: "3000:4000"`, then `docker compose up -d`.
   Open http://localhost:3000/health → ✅ **works**, even though the Dockerfile still says `EXPOSE 3000`.

Change both back to 3000 afterwards. This is why `PORT: 3000` and `ports: "3000:3000"` are written together in our file. *(We ran this experiment: step 1 fails to connect, step 2 returns `{"status":"ok"...}`.)*

### 🚀 Layer caching (why we copy `package.json` first)

**What's a layer?** Each instruction in the Dockerfile (`COPY`, `RUN`...) saves its result as a **layer**: a snapshot of "what changed in the files". The image is these layers stacked on top of each other:

```
┌──────────────────────────────┐
│ COPY . .          (your code) │  ← changes often
├──────────────────────────────┤
│ RUN npm ci   (node_modules)   │  ← slow to build, changes rarely
├──────────────────────────────┤
│ COPY package*.json            │
├──────────────────────────────┤
│ FROM node:22-alpine           │  ← downloaded once
└──────────────────────────────┘
```

On the next build, Docker checks each step: **did anything this step depends on change?** If not, it reuses the saved layer (**CACHED**) instead of running the step again. As soon as one step changed, **that step and every step after it** are rebuilt.

**Try it:**

1. Change a line in `index.js` (for example the log message `🚀 API listening`).
2. Run `docker build -t tasks-api .` again.
3. Look at the output. You'll see lines like:

```
=> CACHED [2/5] WORKDIR /app
=> CACHED [3/5] COPY package*.json ./
=> CACHED [4/5] RUN npm ci --omit=dev      ← the slow step is skipped!
=> [5/5] COPY . .                          ← index.js changed → rebuilt
```

The rebuild takes about 1 second instead of 30+.

| Step | Changed? | Result |
|---|---|---|
| `COPY package*.json ./` | No (we didn't touch package.json) | CACHED ✅ |
| `RUN npm ci` | Its input (package.json) didn't change | CACHED ✅ |
| `COPY . .` | Yes, `index.js` changed | Rebuilt |

If we had written `COPY . .` **before** `npm ci`, any change to **any** file would break the cache at that step, and every tiny code change would reinstall all packages.

> 💡 Rule of thumb: put the things that **change rarely** at the **top** of the Dockerfile, and the things that **change often** (your code) at the **bottom**.

### Run it

Still in `tasks-app/server`:

```bash
docker run -p 3000:3000 --name api tasks-api
```

(No `-d` this time, so you see the output directly in your terminal.)

💥 It crashes:

```
❌ Could not connect to the database: connect ECONNREFUSED 127.0.0.1:3306
```

Good! The `CMD` **did** run (that message comes from our `index.js`). The app just couldn't find a database. That's the next lesson.

The container stopped, but it still exists (check with `docker ps -a`, status `Exited (1)`). Remove it, otherwise the name `api` stays taken and the next `docker run --name api` fails with `Conflict. The container name "/api" is already in use`:

```bash
docker rm -f api
cd ..                    # back to tasks-app/
```

---

## 1.5 "Why can't my API find the database?" (10 min)

Look at the error again: `ECONNREFUSED 127.0.0.1:3306`. We didn't set `DB_HOST`, so `db.js` used its default: `localhost` (= `127.0.0.1`). But **inside a container, `localhost` means the container itself**, not your laptop and not the MySQL container.

```
┌─ api container ──────┐        ┌─ mysql container ─┐
│ localhost = ME 🙋     │   ✗    │ :3306             │
└──────────────────────┘        └───────────────────┘
```

The API knocked on its own door, found no MySQL there, and the connection was **refused**.

> 💡 Remember: each container is like a separate little computer. On your laptop, `localhost` is your laptop. Inside a container, `localhost` is that container.

Containers need to be on the **same Docker network**, and they reach each other **by name**. You *could* do it by hand:

```bash
docker network create tasks-net
docker run -d --name db  --network tasks-net -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=tasksdb mysql:8.4
docker run -d --name api --network tasks-net -p 3000:3000 \
  -e DB_HOST=db -e DB_PASSWORD=secret tasks-api
```

| Command / flag | Meaning |
|---|---|
| `docker network create tasks-net` | Create a private network called `tasks-net` (like a small office network) |
| `--network tasks-net` | Connect this container to that network |
| `--name db` | On a network you create, **the container name works as a hostname**. Docker has a built-in "phone book" (DNS): asking for `db` returns the MySQL container's address |
| `-e DB_HOST=db` | Tell our API: "the database is at `db`" instead of `localhost` |

...but that's 3 long commands to remember, in the right order, with the right flags. Every time. For every developer.

**There must be a better way →** Docker Compose.

> 🧑‍🏫 **Teacher tip:** you don't have to run these. Just show them and let students feel the pain. (If you do run them: the API may crash once because MySQL isn't ready yet. Docker Compose solves that too. Clean up after with `docker rm -f api db` and `docker network rm tasks-net`.)

---

## 1.6 Docker Compose: the whole environment in one command (30 min)

**Docker Compose** = describe all your containers in **one YAML file**, start them with **one command**. It's included with Docker Desktop (check with `docker compose version`).

### 30 seconds of YAML

YAML is a format for configuration, like JSON but without the brackets:

```yaml
key: value              # a key and a value (like "key": "value" in JSON)
parent:                 # an object: its children are INDENTED under it
  child: value
list:                   # a list: every item starts with "- "
  - first
  - second
# lines starting with # are comments
```

> ⚠️ **Indentation is the structure.** Use **spaces**, never tabs, and keep children aligned. Most "Compose errors" are just a wrong indent.

### Our Compose file

Open `tasks-app/docker-compose.yml`:

```yaml
services:
  db:                                # service name = hostname on the network
    image: mysql:8.4
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: tasksdb
    ports:
      - "3307:3306"
    volumes:
      - db-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-psecret"]
      interval: 5s
      timeout: 5s
      retries: 20

  server:
    build: ./server                  # build from our Dockerfile
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      DB_HOST: db                    # 👈 the service name!
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: secret
      DB_NAME: tasksdb
    depends_on:
      db:
        condition: service_healthy   # don't start until MySQL is READY
    restart: unless-stopped

  frontend:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./frontend:/usr/share/nginx/html:ro

volumes:
  db-data:
```

#### Every key, explained

| Key | Meaning |
|---|---|
| `services:` | The list of containers to run. Each child (`db`, `server`, `frontend`) is one **service** = one container |
| `db:` / `server:` / `frontend:` | The **service name**. You choose it. It's also the **hostname** other services use to reach it |
| `image: mysql:8.4` | Use a **ready-made** image from Docker Hub (like `docker run mysql:8.4`) |
| `build: ./server` | **Build** an image from the `Dockerfile` in `./server` (like `docker build ./server`). Use `image:` **or** `build:` |
| `environment:` | Environment variables, like `-e`. Written as `KEY: value` |
| `ports:` | Port mapping, like `-p`. `"HOST:CONTAINER"`. Quote it so YAML doesn't misread the `:` |
| `volumes:` (inside a service) | Like `-v`. Connect a volume or a folder into the container |
| `healthcheck:` | A command Docker runs **every few seconds** to check the service is really working (details below) |
| `depends_on:` | Start order: "start `server` only after `db`..." |
| `condition: service_healthy` | "...and only after `db`'s healthcheck **passes**", not just after it started |
| `restart: unless-stopped` | If the container crashes, Docker restarts it automatically (unless *you* stopped it) |
| `:ro` (end of the frontend volume) | **Read-only**: the container can read your files but can't change them |
| `volumes:` (bottom, top level) | **Declares** the named volumes the file uses. Every named volume (`db-data`) must be listed here |

#### Why the healthcheck?

MySQL needs ~20 seconds to be ready (remember `ready for connections` in 1.3?). If the API starts first, it crashes with `ECONNREFUSED`. The healthcheck tells Compose **when** MySQL is truly ready:

| Field | Meaning |
|---|---|
| `test: ["CMD", "mysqladmin", "ping", ...]` | Run `mysqladmin ping` inside the `db` container. It answers "mysqld is alive" when MySQL accepts connections |
| `interval: 5s` | Check every 5 seconds |
| `timeout: 5s` | If the check takes more than 5 seconds, count it as failed |
| `retries: 20` | Only after 20 failures in a row, mark it **unhealthy** (20 × 5s = enough time to start) |

Together with `depends_on: condition: service_healthy`, the order is guaranteed: **db starts → becomes healthy → only then server starts.**

### Compare with the manual way

| Manual `docker run` | Compose |
|---|---|
| `-e KEY=value` | `environment:` |
| `-p 3000:3000` | `ports:` |
| `-v data:/var/lib/mysql` | `volumes:` |
| `docker network create` + `--network` | **automatic**: all services in the file share one network |
| `--name db` | the service name (`db`) |
| "start MySQL first, wait, then the API" | `depends_on` + `healthcheck` |
| `docker build -t ... ./server` | `build: ./server` |

### 🔑 Two kinds of volumes

| Syntax | Type | Use for |
|---|---|---|
| `db-data:/var/lib/mysql` | **Named volume**: starts with a **name**. Docker manages where it's stored | Database data |
| `./frontend:/usr/share/nginx/html` | **Bind mount**: starts with a **path** (`./` or `/`). A real folder on your laptop, shown inside the container | Code/files you edit. Changes show up instantly |

The frontend uses a bind mount: nginx serves the files straight from your `frontend/` folder. Edit `index.html`, refresh the browser, and you see the change. No rebuild needed.

### Run it! 🚀

From the `tasks-app/` folder (where `docker-compose.yml` is):

```bash
docker compose up --build
```

- `up` = create the network, the volume, and all the containers, then start them.
- `--build` = build the images that have `build:` first (our `server`). Use it whenever you changed the code.

You'll see the logs of **all** services mixed together, each line prefixed with the service name (`db-1 |`, `server-1 |`). Wait for `server-1  | 🚀 API listening on port 3000`, then open:

- **http://localhost:3000/health** → `{"status":"ok","db":"connected", ...}`
- **http://localhost:3000/api/tasks** → `[]`
- **http://localhost:8080** → the Tasks app. Add a few tasks! ✅

> 💡 The `host` value in `/health` is the **container ID**. Run `docker ps` (in another terminal) and compare.

**Ctrl+C** stops all the containers. Next time, run `docker compose up -d --build` (with **`-d`**) to start everything in the background and keep your terminal.

> 💡 **Container names:** Compose names containers `<folder>-<service>-<number>`, for example `tasks-app-server-1`. That's what you'll see in `docker ps`. But in Compose commands you just use the **service name** (`server`, `db`).

### Compose commands

Run them from the `tasks-app/` folder. Compose looks for `docker-compose.yml` in the current folder, and **if it doesn't find one, in the parent folders**, so running it from the wrong place can start a different project without any error:

```bash
docker compose up -d --build     # start everything in the background (rebuild if code changed)
docker compose ps                # status of all services (look for "healthy" on db)
docker compose logs -f server    # logs of one service (Ctrl+C to stop watching)
docker compose exec db mysql -uroot -psecret tasksdb -e "SELECT * FROM tasks"
docker compose restart server    # restart one service
docker compose stop              # stop all containers (they still exist)
docker compose down              # stop + remove containers and the network (volume = data KEPT)
docker compose down -v           # also delete volumes (data GONE)
```

> 💡 `docker compose exec db ...` = `docker exec -it <db container> ...`. Compose finds the container by the **service name**, and adds `-it` for you.

> ⚠️ **The `SELECT` printed nothing?** That means the table is **empty**, not that something broke. With `-e`, MySQL prints **nothing** for zero rows (the "Empty set" message only appears at the interactive `mysql>` prompt). Add a task in the browser and run it again, or use `SELECT COUNT(*) FROM tasks`, which always prints a number.

### ✅ Checkpoint: prove the data survives

1. Add 3 tasks in the browser (http://localhost:8080).
2. `docker compose down` → all containers are deleted (`docker ps -a` shows nothing from tasks-app).
3. `docker compose up -d` → brand-new containers.
4. Refresh: the tasks are still there, thanks to the `db-data` volume (exactly like Dana in 1.3).
5. `docker compose down -v` → `docker compose up -d` → refresh → empty. `-v` deleted the volume. 🧹

### 🔑 Ports: inside vs outside

`server` connects to `db:3306`, **not** 3307:

```
Your laptop (Workbench) ──► localhost:3307 ──┐
                                             ▼
                        ┌─ Docker network ───────────────────┐
                        │  server ──► db:3306 ──► MySQL       │
                        └────────────────────────────────────┘
```

- `3307` exists only on **your laptop** (the left side of `"3307:3306"`), so you can use Workbench.
- **Inside** the Docker network, services talk directly to each other on their **internal** ports. `ports:` doesn't affect that at all.
- In fact, `db` doesn't even **need** `ports:` for the API to work. It's only there for you.

### Bonus: live reload while developing (optional)

Today the code is **copied** into the image, so every change needs `--build`. For development you can mount your code (a bind mount, like the frontend) and use nodemon, which restarts Node when a file changes. Add to the `server` service:

```yaml
    command: npx nodemon index.js
    volumes:
      - ./server:/app          # your code folder, live, replaces the copied code
      - /app/node_modules      # but keep the container's own node_modules
```

| Line | Why |
|---|---|
| `command:` | **Overrides** the `CMD` from the Dockerfile. Run nodemon instead of `node` |
| `./server:/app` | Show your **real** `server` folder at `/app`, so edits appear instantly in the container |
| `/app/node_modules` | Your laptop's `server` folder has no (Linux) `node_modules`. Without this line, the bind mount would **hide** the `node_modules` that `npm ci` installed in the image. This line keeps them visible |

Also change `npm ci --omit=dev` to `npm ci` in the Dockerfile, so nodemon (a devDependency) is installed. Run `docker compose up --build`. Now saving `index.js` restarts the server instantly.

---

## 1.7 Bonus: push your image to Docker Hub (10 min, optional)

Like `git push`, but for images. Create a free account at https://hub.docker.com, then, from `tasks-app/server`:

```bash
docker login
docker tag tasks-api YOUR_USERNAME/tasks-api:1.0
docker push YOUR_USERNAME/tasks-api:1.0
```

| Command | Meaning |
|---|---|
| `docker login` | Sign in to Docker Hub (once) |
| `docker tag tasks-api YOUR_USERNAME/tasks-api:1.0` | Give the image an **extra name**. On Docker Hub, image names must start with your username (like GitHub repos: `user/repo`). `:1.0` is the version. Nothing is copied: it's the same image with two names |
| `docker push ...` | Upload it |

Now **any** computer can run it with `docker run YOUR_USERNAME/tasks-api:1.0`. Docker will pull it automatically, like it pulled `nginx`.

> ⚠️ **Apple Silicon (M1/M2/M3/M4) users:** your Mac builds **ARM** images (ARM is the type of processor), but most cloud servers are **x86 (amd64)**, a different processor type. An ARM image won't run there (`exec format error`). To build for the server:
> `docker build --platform linux/amd64 -t YOUR_USERNAME/tasks-api:1.0 .`
> (In Part 2 we build **on** the EC2 server itself, so this problem doesn't come up.)

---

## 🆘 Common errors

| Error | Cause | Fix |
|---|---|---|
| `Cannot connect to the Docker daemon` | Docker Desktop isn't running | Open Docker Desktop and wait for the whale 🐳 |
| `bash: USE: command not found` / `zsh: command not found: SELECT` | You typed SQL into your **terminal** | Open the MySQL shell first: `docker exec -it mysql-test mysql -uroot -psecret`, then type SQL at `mysql>` |
| `No such container: mysql-test` | The container was removed (or never created), so `exec` has nothing to go into | `docker run ...` first, then `docker exec` |
| `Conflict. The container name "/mysql-test" is already in use` | A container with that name already exists (maybe stopped) | `docker rm -f mysql-test`, then `docker run` again |
| `port is already allocated` / `address already in use` | Something else uses that port (a local MySQL? another container?) | Change the left port (`3001:3000`) or `docker ps` and stop the other one |
| `ERROR 2002: Can't connect to local MySQL server` | MySQL is still starting | Wait 10 to 20 seconds (`docker logs` → `ready for connections`) |
| `Table 'school.students' doesn't exist` after recreating the container | The data was written to a container **without** `-v` (or with a different volume name) | Make sure the container you **insert into** was started with `-v mysql-data:/var/lib/mysql` (see 1.3) |
| `ECONNREFUSED 127.0.0.1:3306` | API uses `localhost` inside a container | `DB_HOST` must be the service name (`db`) |
| `Access denied for user 'root'` after changing the password in YAML | MySQL sets the password **only on first start**; the old one is saved in the volume | `docker compose down -v` (deletes the data!) and `up` again |
| My code change doesn't appear | The image still has the old code | `docker compose up --build` |
| `npm ci` fails: "missing package-lock.json" | No lock file | Run `npm install` locally once to create it |
| `no configuration file provided: not found`, **or** Compose starts a *different* project | You ran `docker compose` in the wrong folder. If there's no file in the current folder, Compose **also searches the parent folders** and may find someone else's `docker-compose.yml` | `cd tasks-app` (where `docker-compose.yml` is). `docker compose config` shows which file and project it's using |
| `failed to read dockerfile: open Dockerfile: no such file` | You ran `docker build .` in the wrong folder | `cd tasks-app/server` (see "What is the `.`") |
| `exec format error` (on a server) | Image built on an ARM Mac, server is x86 | Build with `--platform linux/amd64` (see 1.7) |

---

## 📋 Cheat sheet

```bash
# Images
docker build -t NAME .          docker images          docker rmi NAME
docker pull IMAGE               docker push USER/NAME:TAG

# Containers
docker run -d -p HOST:CONT --name N -e KEY=VAL -v VOL:/path IMAGE
docker ps [-a]     docker logs -f N     docker exec -it N sh
docker stop N      docker start N       docker rm -f N

# Volumes
docker volume ls                docker volume rm VOL

# Compose (run in the folder with docker-compose.yml)
docker compose up -d --build    docker compose ps    docker compose logs -f SERVICE
docker compose exec SERVICE sh  docker compose down [-v]

# Cleanup (careful!)
docker system prune             # remove stopped containers, unused networks, dangling images
```

| Flag | Meaning | Where |
|---|---|---|
| `-d` | Detached (background) | `run`, `compose up` |
| `-p HOST:CONTAINER` | Port mapping | `run` |
| `-e KEY=value` | Environment variable | `run` |
| `-v NAME:/path` | Volume | `run` |
| `--name N` | Container name | `run` |
| `-it` | Interactive terminal | `exec`, `run` |
| `-f` | Force (`rm`) / follow (`logs`) | `rm`, `logs` |
| `-t NAME` | Tag (name) the image | `build` |

---

## 🏋️ Exercises

1. **Add Adminer**: add a 4th service to `docker-compose.yml` using the image `adminer` on port `8081:8080`. Log in with server `db`, user `root`, password `secret`. (Hint: what's the hostname of MySQL inside the network?)
2. **Version tags:** build `tasks-api:1.0`, change the `/health` response to include `"version": "2.0"`, build `tasks-api:2.0`. While `docker compose up` is running, run **both** versions at the same time on ports 3001 and 3002, attached to Compose's network so they can reach the DB:
   `docker run -d -p 3001:3000 --network tasks-app_default -e DB_HOST=db -e DB_PASSWORD=secret tasks-api:1.0`
   Open both `/health` URLs. Same database, two versions, two containers. (Run `docker network ls` to see where the name `tasks-app_default` comes from: Compose names its network `<folder>_default`.)
3. **Dockerize a previous project**: take your Express project from the Node.js module and write a `Dockerfile` + `docker-compose.yml` for it (with MySQL or MongoDB, using image `mongo:7`; its data folder is `/data/db`).
4. **Explain to a friend** (write 3 to 4 sentences): what is the difference between an image and a container, and why does the MySQL data survive `docker compose down` but not `down -v`?
