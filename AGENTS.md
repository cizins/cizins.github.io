# AGENTS.md — compact repo notes

- ESM (`"type": "module"`). Import with `.jsx` extensions (e.g., `import App from './App.jsx'`).
- Linter is `oxlint`, not ESLint: `npm run lint`. Config: `.oxlintrc.json` (`plugins: ["react","oxc"]`; `react/rules-of-hooks` error; `only-export-components` warn + `allowConstantExport`).
- No TypeScript / tests / CI configured. Build: `npm run build`; dev: `npm run dev`; preview: `npm run preview`.
- React 19 + `createRoot` (`src/main.jsx`). React Compiler NOT enabled (README notes impact).
- Vite 8 + `@vitejs/plugin-react`. Entry: `index.html` → `/src/main.jsx`. Static assets in `public/`; imported assets in `src/assets/`.
- If adding pages/components, keep `.jsx`, preserve ESM imports, and respect `.oxlintrc.json` rules.
