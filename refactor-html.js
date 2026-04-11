const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

const emolliMap = {
  '🏠': '<i data-lucide="home"></i>',
  '👥': '<i data-lucide="users"></i>',
  '📖': '<i data-lucide="book-open"></i>',
  '🎵': '<i data-lucide="music"></i>',
  '📝': '<i data-lucide="file-text"></i>',
  '👤': '<i data-lucide="user"></i>',
  '🔔': '<i data-lucide="bell"></i>',
  '⭐': '<i data-lucide="star"></i>',
  '⚙️': '<i data-lucide="settings"></i>',
  '🚪': '<i data-lucide="log-out"></i>',
  '✨': '<i data-lucide="sparkles"></i>',
  '🔍': '<i data-lucide="search"></i>',
  '👋': '<i data-lucide="hand"></i>',
  '⛪': '<i data-lucide="church"></i>',
  '✍️': '<i data-lucide="pen-tool"></i>',
  '📚': '<i data-lucide="library"></i>',
  '📋': '<i data-lucide="clipboard-list"></i>',
  '🔒': '<i data-lucide="lock"></i>',
  'ℹ️': '<i data-lucide="info"></i>',
  '⚠️': '<i data-lucide="alert-triangle"></i>',
  '▶️': '<i data-lucide="play"></i>',
  '⏸️': '<i data-lucide="pause"></i>',
  '⏭️': '<i data-lucide="skip-forward"></i>',
};

for (const [emoji, lucideHtml] of Object.entries(emolliMap)) {
  const emojiRegex = new RegExp(emoji, 'g');
  html = html.replace(emojiRegex, lucideHtml);
}

// Transform the verse-card to be more hero-like by adding a hero styling class
// Wait, we can just edit the styles.css for `.verse-card` without changing HTML, 
// but adding a wrapper or modifying inline styles helps.
html = html.replace('class="verse-card"', 'class="verse-card hero-verse-card"');

// Strip out inline backgrounds that don't match dark mode
const inlineStylesToRemove = [
  /style="background:#EBF5FB;color:#2980B9"/g,
  /style="background:#FEF9E7;color:#D4A017"/g,
  /style="background:#E8F5EE;color:#2E7D5B"/g,
  /style="background:#F5EEF8;color:#6B4C9A"/g,
  /style="background:#FDF2E9;color:#B08D4F"/g,
  /style="background:#FDEDEC;color:#C0392B"/g,
  /style="background:var\\(--cream-dark\\);color:var\\(--gray-600\\)"/g,
  /style="background:var\\(--success-light\\);color:var\\(--success\\)"/g,
];

inlineStylesToRemove.forEach(regex => {
  html = html.replace(regex, 'class="premium-icon-wrap"');
});

// Inject Lucide script before closing body
if (!html.includes('lucide.bundle.min.js') && !html.includes('unpkg.com/lucide')) {
  html = html.replace('</body>', '<script src="https://unpkg.com/lucide@latest"></script>\\n<script>lucide.createIcons();</script>\\n</body>');
}

fs.writeFileSync('index.html', html, 'utf-8');
console.log('HTML updated successfully');
