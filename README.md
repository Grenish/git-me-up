# Git Me Up

**git-me-up** is a specialized tool designed to help developers create an engaging and professional GitHub profile README quickly and efficiently. It combines the power of modern AI and dynamic data visualization to generate compelling bios and elegant, real-time GitHub statistics cards.

## ✨ What It Is & What It Does

**git-me-up** solves the challenge of crafting the perfect GitHub README. It is a full-stack application built with **Next.js**, focused on **developer productivity** and **profile polish**.

### Key Features

  * **AI-Powered Bio Generation:** Leverage the Gemini API to instantly generate a professional and engaging personal biography based on your GitHub profile and provided context.
  * **Dynamic GitHub Stats Cards:** Generate clean, customizable SVG images displaying your key GitHub metrics (stars, repositories, contribution streaks) in real-time.
  * **Tech Stack Icons Library:** Access a massive collection of high-quality, normalized SVG icons for virtually every technology to display in your README.
  * **Customization:** Choose between dark and light themes, and different font styles for your stats cards to perfectly match your README's aesthetic.
  * **API-First Design:** Easily integrate the bio generation, dynamic stats, and tech icons into your existing workflow or website using the dedicated API endpoints.

## 💻 Tech Stack

  * **Framework:** Next.js (App Router)
  * **Language:** TypeScript
  * **AI Model:** Google Gemini Flash (via `@ai-sdk/google`)
  * **Dynamic SVG Generation:** [Satori](https://github.com/vercel/satori)
  * **Data Source:** GitHub API

-----

# 🚀 Comprehensive API Documentation

**git-me-up** exposes three primary API interfaces for integrating its core functionality.

## 1\. AI Bio Generation API

This endpoint utilizes the **Gemini** model to generate a professional biography based on a provided GitHub URL.

| Method | URL | Description |
| :--- | :--- | :--- |
| **`POST`** | `/api/generate` | Generates a professional bio from a GitHub profile. |

### Request Body (JSON)

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **`githubUrl`** | `string` | **Yes** | The full URL of the GitHub profile to analyze. |

-----

## 2\. Dynamic GitHub Stats Card API

This endpoint generates a customized, dynamic **SVG image** displaying key GitHub statistics or contribution streaks.

| Method | URL | Description |
| :--- | :--- | :--- |
| **`GET`** | `/api/github/stats` | Generates a dynamic GitHub stats or streak SVG card. |

### Query Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`username`** | `string` | **Yes** | The GitHub username to display stats for. |
| **`type`** | `string` | No | `stats` | The type of card to generate: **`stats`** (Total Stars, Public Repos) or **`streak`** (Current/Longest Streak, Total Contributions). |
| **`theme`** | `string` | No | `dark` | The visual theme: **`dark`** or **`light`**. |
| **`font`** | `string` | No | `montserrat` | The font to use for text: **`montserrat`** or **`doto`**. |

-----

## 3\. Tech Stack Icons API

This interface provides direct public access to the repository's collection of over 100 technology icons, which can be easily embedded in any Markdown file.

| Method | URL | Description |
| :--- | :--- | :--- |
| **`GET`** | `/<icon-name>.svg` (Proxied via `/svg/`) | Directly serves the raw **SVG image** for the requested technology icon. |

### Usage

Since the icons are stored as public assets under the `public/svg` directory, they are accessible at the root of your domain under the `/svg/` path.

To use an icon, simply construct an image URL pointing to the asset:

```markdown
<img src="https://<your-domain>/svg/React.svg" alt="React" width="40" height="40"/>

<img src="https://<your-domain>/svg/Tailwind-CSS.svg" alt="Tailwind CSS" width="40" height="40"/>

<img src="https://<your-domain>/svg/Next.js.svg" alt="Next.js" width="40" height="40"/>
```

### Available Icons (Examples)

The collection includes a wide range of technologies, such as:

  * **Languages:** `JavaScript.svg`, `TypeScript.svg`, `Python.svg`, `CPlusPlus.svg`, `Go.svg`, `Rust.svg`
  * **Frameworks/Libraries:** `React.svg`, `Next.js.svg`, `Vue.js.svg`, `Angular.svg`, `Express.svg`
  * **Databases:** `MongoDB.svg`, `PostgresSQL.svg`, `MySQL.svg`
  * **Tools & Platforms:** `Docker.svg`, `Kubernetes.svg`, `Vercel.svg`, `Figma.svg`
  * **Styling:** `Tailwind-CSS.svg`, `Sass.svg`

-----
