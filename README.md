# light-field-spatial-lab

A static React/Vite spatial UI experiment where navigation is modeled as light-field collapse between three runtime states:

- AI Lab: frontend development workbench.
- Craft Lab: DIY projects and finished works.
- Life Lab: daily life records.

## Stack

- React + Vite static SPA
- TypeScript
- Framer Motion
- Zustand
- TailwindCSS with custom CSS for the light-field physics and lab-specific layouts

## Scripts

```bash
pnpm install
pnpm run dev
pnpm run build
```

The Vite config uses `base: "./"` so the built site can be deployed under a GitHub Pages project path.
