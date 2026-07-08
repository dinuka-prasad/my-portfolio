# Database Setup & Free Hosting Guide

This guide explains how to connect your portfolio's contact form to a live, free **PostgreSQL Cloud Database** (Supabase) and host your website for free in under 5 minutes.

---

## Part 1: Setting up the PostgreSQL Cloud Database (Supabase)

Supabase provides a complete, production-ready **PostgreSQL database** for free.

### Step 1: Create a Supabase Account
1. Go to [supabase.com](https://supabase.com) and click **Start your project**.
2. Sign in using your **GitHub account**.

### Step 2: Create a New Project
1. Click **New Project** and select your organization.
2. Fill in the project details:
   - **Name**: `dinuka-portfolio`
   - **Database Password**: *Create a strong password and save it somewhere secure!*
   - **Region**: Select Singapore (`ap-southeast-1`) or Mumbai (`ap-south-1`) for best latency from Sri Lanka.
3. Click **Create new project** and wait 1-2 minutes for the database to spin up.

### Step 3: Create the database table
1. Once your project is ready, click **SQL Editor** (terminal icon) in the left-hand sidebar.
2. Click **New Query**.
3. Copy and paste the contents of [schema.sql](schema.sql):
   ```sql
   CREATE TABLE contact_messages (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(150) NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. Click the green **Run** button at the top right. You should see a message saying "Success".

### Step 4: Configure Security (Row Level Security - RLS)
By default, Supabase secures your tables. We need to create a policy that allows anonymous users (people visiting your portfolio) to **Insert** messages, while blocking them from reading or deleting messages.

1. Go to **Table Editor** (grid icon) in the left sidebar and select the `contact_messages` table.
2. Click **RLS disabled** (or **RLS enabled** depending on settings) -> Ensure Row Level Security (RLS) is **Enabled**.
3. Click **Add RLS Policy** (or **New Policy**).
4. Select **Create a policy from scratch** or use templates:
   - **Policy Name**: `Allow public anonymous inserts`
   - **Allowed Operations**: Select **INSERT** only.
   - **Target Roles**: Select `anon` (anonymous public).
   - **Expression (WITH CHECK)**: Type `true`.
5. Click **Save Policy** (or **Review** -> **Save**).
*Now visitors can submit messages securely, but only you can view those submissions in the Supabase Dashboard!*

### Step 5: Connect your Keys to the website
1. In the Supabase Dashboard, click the **Settings** (gear icon) in the left sidebar, then click **API**.
2. Copy the **Project URL** (e.g., `https://xyzabc.supabase.co`).
3. Copy the **anon public API Key** (e.g., `eyJhbGciOiJ...`).
4. Open [script.js](script.js) in your text editor.
5. At the very top, replace the placeholders with your credentials:
   ```javascript
   const SUPABASE_URL = "https://your-project-id.supabase.co"; // Paste URL here
   const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Paste anon key here
   ```
6. Save the file. Open [contact.html](contact.html) in your browser and submit a test message. Refresh your Supabase **Table Editor** -> `contact_messages` to see your submissions instantly!

---

## Part 2: Hosting Your Website for Free

Since your website is built on static HTML, CSS, and JS files, hosting it is entirely free.

### Option A: Netlify (Easiest - 10 seconds)
1. Go to [netlify.com](https://www.netlify.com/) and log in (or create a free account with GitHub).
2. Go to your Netlify dashboard and click **Add new site** -> **Deploy manually**.
3. Drag and drop your entire `my portfolio` folder into the upload box on your browser.
4. Your site will deploy instantly! You can go to **Site settings** to change the subdomain to `dinukaprasad.netlify.app`.

### Option B: GitHub Pages (Recommended for developers)
1. Create a new public repository on GitHub named `my-portfolio` or `dinuka-prasad.github.io`.
2. Push your code files (`index.html`, `about.html`, `skills.html`, `projects.html`, `experience.html`, `contact.html`, `styles.css`, `script.js`, `schema.sql`) to the repository.
3. In your GitHub repository page, go to **Settings** -> **Pages** (under Code and automation).
4. Under **Build and deployment** -> **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
5. After a few minutes, your site will be live at `https://dinuka-prasad.github.io/`!

---

## Part 3: Deploying the Node.js API Server (Optional)

If you prefer to run a custom Node.js server rather than using Supabase direct inserts:
1. Push the `server` folder to a separate GitHub repository.
2. Sign up on [Render.com](https://render.com/) or [Railway.app](https://railway.app/).
3. Connect your GitHub repository and deploy it as a **Web Service**.
4. Spin up a PostgreSQL database on the same platform.
5. Add the `DATABASE_URL` environment variable pointing to the PostgreSQL database in Render's dashboard.
6. Update your `script.js` submit URL from the Supabase direct client to your new Render URL (`https://your-server.onrender.com/api/contact`).
