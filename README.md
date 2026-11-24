# Adbhut Pandey — Software Engineer Portfolio

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Live_Site-adbhut1234.github.io%2FPortfolio-111111?style=for-the-badge&logo=googlechrome&logoColor=white)](https://adbhut1234.github.io/Portfolio/)
  [![GitHub Profile](https://img.shields.io/badge/GitHub-@Adbhut1234-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Adbhut1234)
  [![License: MIT](https://img.shields.io/badge/License-MIT-e11d48?style=for-the-badge)](LICENSE)
  [![Performance](https://img.shields.io/badge/Performance-60_to_120_FPS-emerald?style=for-the-badge&logo=speedtest&logoColor=white)](#performance--engineering)

  <br />

  <img src="preview.png" alt="Adbhut Pandey Portfolio Hero Preview" width="850" style="border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.12);" />

  <br /><br />

  **An editorial, typography-first software engineering portfolio inspired by modern print design and interactive 3D physics.**  
  *Built with semantic HTML5, custom modular CSS, vanilla JavaScript (ES6+), and zero heavy frameworks.*

  <br />

  [Explore Live Portfolio ↗](https://adbhut1234.github.io/Portfolio/) • [View GitHub Projects ↗](https://github.com/Adbhut1234) • [Contact Direct ↗](mailto:adbhutpandey93@gmail.com)

</div>

---

## ✦ Table of Contents

- [Overview & Design Philosophy](#-overview--design-philosophy)
- [Key Features](#-key-features)
- [Performance & Engineering Highlights](#-performance--engineering-highlights)
- [Repository Architecture](#-repository-architecture)
- [Featured Projects](#-featured-projects)
- [Local Development Setup](#-local-development-setup)
- [Deployment (GitHub Pages)](#-deployment-github-pages)
- [Contact & Connect](#-contact--connect)
- [License](#-license)

---

## 🎨 Overview & Design Philosophy

This portfolio embodies an **editorial aesthetic** that departs from standard generic templates. It fuses:

- **Monocle & Stripe Press-inspired typography**: Warm cream background (`#FBFBF9`), razor-sharp onyx headings (`#111111`), and refined Italian serif italics for accent words.
- **Frameless 3D Holographic Stage**: Interactive retro-anime character cutout with real-time cursor physics, specular light sheen, ambient red Gaussian aura, and multi-plane depth particles.
- **Pure Native Web Performance**: No bulky UI frameworks, no external bundle bloat, and no render blocking. Runs butter-smooth at 60–120 FPS on all devices.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **3D Holographic Hero** | Real-time perspective tilt (`perspective: 1200px`) with physical damping (lerp), dynamic cursor-following specular lighting, and floating ember particles at multiple Z-depths. |
| **Interactive Ash Particle Dispersion** | Custom particle dispersion engine where project cards dissolve into drifting ash flakes and reassemble on demand. |
| **Live GitHub Repository Sync** | Dynamically queries the GitHub REST API (`@Adbhut1234`) on load, with instant category filtering (All, TypeScript, Python, JavaScript) and cached fallback. |
| **Instant Email Copy & Toast** | One-click clipboard copy (`adbhutpandey93@gmail.com`) with an elegant notification toast. |
| **Fully Responsive 2-Column Grid** | Perfectly proportioned side-by-side desktop/laptop balance down to 768px, gracefully shifting to a unified mobile layout. |
| **Zero Layout Shift (CLS 0)** | Strict CSS containment (`contain: layout paint`) and pre-allocated stage dimensions prevent jarring reflows. |

---

## 🚀 Performance & Engineering Highlights

To deliver a **consistent 60–120 FPS** experience with ultra-low battery and CPU impact:

1. **Hardware-Accelerated 3D Transforms**:
   Cursor tracking operates strictly on `transform: translate3d(...) rotateX(...) rotateY(...)`, completely bypassing CPU layout recalculations and repaints.
2. **Dual-Layer Canvas Particle System**:
   Multi-plane color-mixing particles (crimson, rose, amber, coral) render onto lightweight 1× DPR HTML5 canvases with direct `ctx.arc()` draw calls.
3. **Offscreen Animation Hibernation**:
   An `IntersectionObserver` detects when the hero is scrolled out of view and halts the `requestAnimationFrame` loop, dropping hero CPU/GPU consumption to **0.0%** while reading projects and skills.
4. **Optimized Particle Dispersion**:
   The particle dispersion effect uses lightweight rectangular ash flakes without expensive matrix rotations or multi-pass blur shaders, ensuring zero scroll stutter.

---

## 📂 Repository Architecture

```text
Portfolio/
├── index.html            # Semantic HTML5 structure (Nav, Hero, About, Skills, Projects, Contact, Footer)
├── style.css             # Modular editorial styling, CSS variables, typography, and 3D animations
├── script.js             # Vanilla JS: 3D cursor physics, particle engine, GitHub fetcher, particle dispersion
├── character_2x.png      # High-resolution (Retina 2x) transparent character avatar with scanlines
├── avatar.jpg            # Original avatar photo
├── preview.png           # High-resolution screenshot preview for GitHub & social cards
├── .gitignore            # Clean git hygiene excluding OS and editor temp files
└── README.md             # Repository documentation & guide
```

---

## 🛠️ Featured Projects Highlighted

- **[Codeverse](https://github.com/Adbhut1234/Codeverse)** — Cloud-based collaborative IDE with Monaco Editor, Next.js App Router, Prisma ORM, and PostgreSQL workspaces.
- **[Zenith](https://github.com/Adbhut1234/Zenith)** — Autonomous multimodal desktop agent powered by LiveKit WebRTC, Gemini Live API, and on-device SQLite vector memory.
- **[SIH-2026](https://github.com/Adbhut1234/SIH-2026)** — Intelligent land record digitization and validation platform built for Smart India Hackathon.
- **[Smart-Attendance-System](https://github.com/Adbhut1234/Smart-Attendance-System)** — Biometric attendance tracking with real-time face detection, 128-d vector embeddings, and cloud synchronization.

---

## 💻 Local Development Setup

No build tools, Node modules, or package managers required. Simply clone and run any lightweight static server:

```bash
# 1. Clone the repository
git clone https://github.com/Adbhut1234/Portfolio.git

# 2. Navigate to project root
cd Portfolio

# 3. Start a local server (Python 3)
python -m http.server 8000

# Or with Node.js
npx serve .
```

Open your browser to `http://localhost:8000/`.

---

## 🌐 Deployment (GitHub Pages)

This site is statically hosted via **GitHub Pages**:

1. Go to **Settings** > **Pages** in the `Portfolio` repository.
2. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
3. Click **Save**.
4. The site goes live at:  
   👉 **[https://adbhut1234.github.io/Portfolio/](https://adbhut1234.github.io/Portfolio/)**

---

## 📬 Contact & Connect

- **Engineer:** Adbhut Pandey
- **Email:** [adbhutpandey93@gmail.com](mailto:adbhutpandey93@gmail.com)
- **GitHub:** [@Adbhut1234](https://github.com/Adbhut1234)
- **Education:** B.Tech in Computer Science & Engineering (DS & AI Specialization) • SRMU (2026–2029)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use it for personal inspiration or development.
