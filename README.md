# SacredMiles India Co. 🙏

> *Where Every Mile Becomes a Prayer*

Official website for **SacredMiles India Co.** — a sacred pilgrimage travel agency founded by **Amogh Patil** and **Jhanvi Chepyala**.

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it: `sacredmiles` (or `sacredmilesindia.com` for a custom domain).
4. Set it to **Public**.
5. Click **Create repository**.

### Step 2 — Upload the Files

**Option A — via GitHub web interface (easiest):**
1. Click **Add file → Upload files**.
2. Drag and drop all 4 files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `CNAME`
3. Click **Commit changes**.

**Option B — via Git (command line):**
```bash
git init
git add .
git commit -m "Launch SacredMiles India Co. website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sacredmiles.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository **Settings**.
2. Click **Pages** in the left sidebar.
3. Under **Source**, select **Deploy from a branch**.
4. Choose **main** branch → **/ (root)** folder.
5. Click **Save**.
6. GitHub will show your URL: `https://YOUR_USERNAME.github.io/sacredmiles`

---

## 🌐 Connect Your Custom Domain

### Step 1 — Update the CNAME File

Edit `CNAME` and replace the content with **your actual domain**:
```
www.sacredmilesindia.com
```
(or whatever your domain is — e.g. `sacredmiles.in`)

### Step 2 — Configure Your Domain's DNS

Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) and add these DNS records:

**For `www` subdomain:**
| Type  | Host | Value                    |
|-------|------|--------------------------|
| CNAME | www  | YOUR_USERNAME.github.io  |

**For root/apex domain (e.g. sacredmilesindia.com):**
| Type | Host | Value          |
|------|------|----------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

### Step 3 — Add Domain in GitHub Pages Settings

1. Go to repository **Settings → Pages**.
2. Under **Custom domain**, enter: `www.sacredmilesindia.com`
3. Click **Save**.
4. Check **Enforce HTTPS** (after DNS propagates — may take up to 48 hours).

---

## 📧 Connect the Booking Form (Optional)

The form currently simulates submission. To receive real emails:

1. Sign up at [formspree.io](https://formspree.io) (free tier available).
2. Create a form and get your endpoint ID.
3. In `script.js`, uncomment and update the fetch block:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
```

---

## 🗂 File Structure

```
sacredmiles/
├── index.html    ← Main website
├── style.css     ← All styles (ethnic/traditional theme)
├── script.js     ← Interactivity (navbar, animations, form)
├── CNAME         ← Custom domain config
└── README.md     ← This file
```

---

## ✦ Contact

- **Amogh Patil** (Bookings): +91 7387160790
- **Jhanvi Chepyala** (Queries)

---

*Founded with 🙏 by Amogh Patil & Jhanvi Chepyala — SacredMiles India Co., 2025*
