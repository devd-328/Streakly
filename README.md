<div align="center">

# 🔥 Streakly

### *Build habits. Track streaks. Achieve greatness.*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Project Structure](#-project-structure)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Task Management** | Create, organize, and track your daily habits and tasks |
| 📊 **Streak Tracking** | Visual streak counters to keep you motivated |
| 🗓️ **Heatmap Calendar** | GitHub-style contribution graph for your habits |
| 🌙 **Dark/Light Mode** | Beautiful themes that adapt to your preference |
| 💾 **Offline-First** | IndexedDB powered - works without internet |
| ⚡ **Natural Language** | Add tasks using natural date parsing |
| 🎉 **Celebrations** | Confetti animations when you hit milestones |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/devd-328/Streakly.git

# Navigate to project
cd Streakly

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the magic! ✨

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React 19
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
<br>Vite
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br>Tailwind
</td>
</tr>
</table>

### Core Dependencies

- **🐻 Zustand** - Lightweight state management
- **📦 Dexie.js** - IndexedDB wrapper for offline storage
- **🎭 Framer Motion** - Smooth animations
- **📅 date-fns** - Date manipulation utilities
- **🔍 chrono-node** - Natural language date parsing
- **✨ Lucide React** - Beautiful icons

---

## 📁 Project Structure

```
streakly/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 features/      # Core feature components
│   │   │   ├── Heatmap.tsx
│   │   │   ├── StreakStats.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskInput.tsx
│   │   ├── 📂 layout/        # Layout components
│   │   └── 📂 ui/            # Reusable UI components
│   ├── 📂 lib/               # Utilities & stores
│   │   ├── db.ts             # Database layer
│   │   ├── nlp.ts            # Natural language processing
│   │   ├── store.ts          # Zustand store
│   │   └── utils.ts          # Helper functions
│   ├── 📂 pages/             # Route pages
│   └── 📄 main.tsx           # App entry point
├── 📄 package.json
└── 📄 vite.config.ts
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 🔃 Open a Pull Request

---

<div align="center">

### 💜 Made with love and lots of ☕

**Keep your streaks alive! 🔥**

[![GitHub](https://img.shields.io/badge/GitHub-devd--328-181717?style=flat-square&logo=github)](https://github.com/devd-328)

</div>
