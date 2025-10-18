# Git Me Up

**Git Me Up** is a modern, minimal, and professional GitHub profile `README` generator. It’s designed to make your profile stand out without unnecessary clutter—updated, aesthetic, and tailored for developers who value simplicity and functionality.

---

## Why Git Me Up

Unlike other generic GitHub README generators, **Git Me Up** emphasizes:

* **Modern and Minimal Design:** Clean, professional output without unnecessary fluff.
* **AI-Powered Bio Generation:** Create personalized, engaging bios effortlessly.
* **Dynamic GitHub Stats:** Real-time, visually appealing metrics for your profile.
* **Extensive Tech Icons Library:** Showcase your tech stack with high-quality SVG icons.
* **Customizable Themes:** Dark/light mode and multiple fonts for a cohesive look.
* **API-First Approach:** Integrate directly into your workflow or projects.

---

## Key Features

* **AI Bio Generation:** Uses Google Gemini to generate professional bios from your GitHub profile.
* **Dynamic GitHub Stats Cards:** Generate live SVG cards displaying stars, repos, contributions, and streaks.
* **Tech Stack Icons:** Access over 300 normalized SVG icons for popular languages, frameworks, and tools.
* **Customization:** Easily adjust themes, fonts, and card types to match your profile aesthetic.
* **API-Ready:** Fully accessible API for embedding all features in your projects or applications.

---

## Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **AI Model:** Google Gemini Flash (`@ai-sdk/google`)
* **Dynamic SVG Generation:** [Satori](https://github.com/vercel/satori)
* **Data Source:** GitHub API

---

## API Documentation

### 1. AI Bio Generation API

Generate a professional bio from a GitHub profile.

**Endpoint:**

```
POST /api/generate
```

**Request Body (JSON):**

| Parameter   | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| `githubUrl` | string | Yes      | Full URL of the GitHub profile. |

---

### 2. Dynamic GitHub Stats Card API

Generate a customizable, real-time SVG card for your GitHub stats or streaks.

**Endpoint:**

```
GET /api/github/stats
```

**Query Parameters:**

| Parameter  | Type   | Required | Default      | Description                                                 |
| ---------- | ------ | -------- | ------------ | ----------------------------------------------------------- |
| `username` | string | Yes      | —            | GitHub username to display stats for.                       |
| `type`     | string | No       | `stats`      | Card type: `stats` (Total Stars, Public Repos) or `streak`. |
| `theme`    | string | No       | `dark`       | Visual theme: `dark` or `light`.                            |
| `font`     | string | No       | `montserrat` | Font style: `montserrat` or `doto`.                         |

---

### 3. Tech Stack Icons API

Direct access to SVG icons for over 300 technologies.

**Endpoint:**

```
GET /<icon-name>.svg  (Proxied via /svg/)
```

**Usage Example:**

```markdown
<img src="https://git-me-up.vercel.app/svg/React.svg" alt="React" width="40" height="40"/>
<img src="https://git-me-up.vercel.app/svg/Tailwind-CSS.svg" alt="Tailwind CSS" width="40" height="40"/>
<img src="https://git-me-up.vercel.app/svg/Next.js.svg" alt="Next.js" width="40" height="40"/>
```

**Available Icons (Examples):**

* **Languages:** JavaScript, TypeScript, Python, C++, Go, Rust
* **Frameworks/Libraries:** React, Next.js, Vue.js, Angular, Express
* **Databases:** MongoDB, PostgreSQL, MySQL
* **Tools & Platforms:** Docker, Kubernetes, Vercel, Figma
* **Styling:** Tailwind CSS, Sass

---

## Roadmap

* Expand GitHub stats SVG variations.
* Redesign and enhance existing cards for better aesthetics.
