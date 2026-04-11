const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf-8');

// 1. Replace hardcoded typography globally if not already replaced
// (already replaced :root in earlier step, but I'll ensure we change Plus Jakarta Sans)
// Note: We already updated :root, let's fix hardcoded backgrounds

const replacements = [
  // Typography global overrides
  [/Plus Jakarta Sans/g, "Inter"],
  
  // Headers & Sub-headers background & border
  [/rgba\\(250,247,242,0\\.94\\)/g, "rgba(15, 23, 42, 0.75)"],
  [/border-bottom:1px solid rgba\\(27,42,74,0\\.05\\)/g, "border-bottom:1px solid rgba(255,255,255,0.08)"],
  [/box-shadow:0 2px 8px rgba\\(27,42,74,0\\.15\\)/g, "box-shadow:0 4px 16px rgba(139,92,246,0.2)"],
  
  // Bottom Nav
  [/background:rgba\\(255,255,255,0\\.97\\)/g, "background:rgba(30, 41, 59, 0.6)"],
  [/border-top:1px solid rgba\\(27,42,74,0\\.05\\)/g, "border-top:1px solid rgba(255,255,255,0.08)"],
  
  // Cards
  [/background:#fff/gi, "background:rgba(30, 41, 59, 0.5); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);"],
  [/background: #fff/gi, "background:rgba(30, 41, 59, 0.5); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);"],
  [/border:1px solid rgba\\(27,42,74,0\\.03\\)/gi, "border:1px solid rgba(255,255,255,0.06)"],
  [/border:1px solid rgba\\(27,42,74,0\\.08\\)/gi, "border:1px solid rgba(255,255,255,0.08)"],
  
  // Inputs & Modals & Forms
  [/background:var\\(--cream\\)/g, "background:transparent"],
  [/background:var\\(--white\\)/g, "background:rgba(30, 41, 59, 0.5)"],
  [/border: 1px solid var\\(--gray-200\\)/g, "border: 1px solid rgba(255,255,255,0.15)"],
  [/background:var\\(--gray-50\\)/g, "background:rgba(0,0,0,0.25)"],
  [/background: var\\(--gray-50\\)/g, "background: rgba(0,0,0,0.25)"],
  
  // Quick Cards backgrounds (hardcoded colors in React patterns usually)
  // Let's replace the inline styling that might be in HTML later, but if any is here:
  
  // Remove shadows that don't fit dark mode properly
  [/var\\(--shadow-sm\\)/g, "0 4px 6px -1px rgba(0, 0, 0, 0.4)"],
  [/var\\(--shadow-md\\)/g, "0 10px 15px -3px rgba(0, 0, 0, 0.5)"],
  [/var\\(--shadow-lg\\)/g, "0 20px 25px -5px rgba(0, 0, 0, 0.6)"],
  
  // Overlays
  [/background:rgba\\(17,29,53,0\\.4\\)/g, "background:rgba(2, 6, 23, 0.7); backdrop-filter:blur(4px)"],
  
  // Animations updating Buttons to have scale down
  // Searching for active states
  [/\\.btn-primary:active\\s*\\{[^}]*\\}/g, ".btn-primary:active{transform:scale(0.97)}"],
  [/\\.btn-secondary:active\\s*\\{[^}]*\\}/g, ".btn-secondary:active{transform:scale(0.97)}"],
  
  // Glassmorphism for specific elements
  [/\\.modal-sheet\\s*\\{/g, ".modal-sheet { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.1); "],
];

replacements.forEach(([pattern, replace]) => {
  css = css.replace(pattern, replace);
});

// Write it back
fs.writeFileSync('styles.css', css, 'utf-8');
console.log('CSS updated successfully via Node.js');
