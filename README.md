# Evero HR dashboard

A responsive HTML5 HR dashboard built with Tailwind utility classes, local SVG icons, and a small global CSS layer for design tokens, custom chart styling, and responsive behavior.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static web server. Tailwind is the only external UI utility and is loaded from its browser bundle in `index.html`; icons and dashboard behavior are local, so no component library is required.

The page uses CSS variables, flexbox/grid, semantic HTML5, responsive breakpoints, and an overflow-contained directory table for smaller screens. The Manrope font is bundled locally in `fonts/Manrope-wght.ttf`, while remote font and icon requests are avoided to reduce startup work.

## Design tokens

Colors, spacing-related values, and shared surfaces are declared as CSS variables at the top of `styles.css`. The Tailwind configuration maps the core color variables to utility names such as `bg-surface`, `text-ink`, and `text-muted`.
