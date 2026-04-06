# Baladhithya T — Terminal Portfolio

A minimalist, terminal-styled personal portfolio website built with React, TypeScript, and Express. Features a neofetch-style splash screen, live GitHub stats, accent color theming, light/dark mode, and a consistent command-line aesthetic throughout.

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18 or higher | https://nodejs.org |
| npm | comes with Node.js | — |
| Git | any recent version | https://git-scm.com |

> **Tip:** To check your versions, run `node -v` and `npm -v` in your terminal.

---

## Running in VS Code

### 1. Clone the repository

```bash
git clone https://github.com/Baladhithya/<your-repo-name>.git
cd <your-repo-name>
```

Or if you downloaded the zip file, extract it and open the folder.

### 2. Open in VS Code

```bash
code .
```

Or open VS Code manually → **File → Open Folder** → select the project folder.

### 3. Install dependencies

Open the integrated terminal in VS Code (`Ctrl + `` ` `` ` on Windows/Linux, `Cmd + `` ` `` ` on Mac) and run:

```bash
npm install
```

This installs all frontend and backend packages. It may take a minute.

### 4. Start the development server

```bash
npm run dev
```

This starts both the Express backend and the Vite frontend on the same port.

### 5. Open the site

Once you see this in the terminal:

```
[express] serving on port 5000
```

Open your browser and go to:

```
http://localhost:5000
```

The site will hot-reload automatically whenever you save a file.

---

## Project Structure

```
portfolio/
├── client/                  # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── navbar.tsx
│   │   │   ├── splash-screen.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── education-section.tsx
│   │   │   ├── skills-section.tsx
│   │   │   ├── experience-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── awards-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   └── footer.tsx
│   │   ├── data/            # Your personal content (edit these)
│   │   │   ├── personal-info.ts
│   │   │   ├── skills.ts
│   │   │   ├── experience.ts
│   │   │   ├── projects.ts
│   │   │   ├── education.ts
│   │   │   └── awards.ts
│   │   ├── App.tsx          # Root component + theme management
│   │   └── index.css        # Global styles + theme variables
│   └── index.html
├── server/                  # Backend (Express)
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   └── storage.ts           # In-memory storage
├── shared/                  # Shared types between client and server
│   └── schema.ts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Customising the Content

All personal data lives in `client/src/data/`. You only need to edit these files:

### Personal info, email, links
```
client/src/data/personal-info.ts
```

### Skills and proficiency levels
```
client/src/data/skills.ts
```
Each skill has a `level` from `1` to `5`.

### Work experience
```
client/src/data/experience.ts
```

### Projects
```
client/src/data/projects.ts
```

### Education
```
client/src/data/education.ts
```

### Awards & achievements
```
client/src/data/awards.ts
```

---

## Splash Screen — Live GitHub Stats

The splash screen fetches your GitHub stats in real time using the public GitHub API (no API key needed). To point it at your own GitHub account, update the username in:

```
client/src/components/splash-screen.tsx
```

Change this line:

```ts
const username = 'Baladhithya';
```

---

## Features at a Glance

| Feature | Details |
|---------|---------|
| Splash screen | Neofetch-style terminal boot with live GitHub stats and a real-time clock |
| Accent color picker | Click a color block on the splash screen to theme the entire site |
| Dark / Light mode | Toggle via the sun/moon icon in the navbar; preference is saved |
| Scroll-aware navbar | Hides on scroll down, reappears on scroll up; shows a progress bar |
| Skills visualization | Levels driven by real data, shown as filled blocks |
| Scroll-to-top button | Appears after scrolling 400 px down |

---

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server (port 5000) |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run check` | TypeScript type checking |

---

## Recommended VS Code Extensions

These make development easier:

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **TypeScript Importer** — `pmneo.tsimporter`

---

## Troubleshooting

**Port already in use**
```bash
# Kill the process using port 5000
npx kill-port 5000
npm run dev
```

**npm install fails**
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

**TypeScript errors on startup**
```bash
npm run check
```
This shows all type errors. The dev server will still run even with type errors.

---

## License

MIT — free to use, modify, and distribute.
