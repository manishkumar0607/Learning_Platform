// ── Resources page logic ─────────────────────────────────────

// Fallback demo data shown when backend isn't connected yet
const DEMO_RESOURCES = [
  {
    title: 'The Odin Project',
    link: 'https://www.theodinproject.com',
    description: 'A free full-stack curriculum covering HTML, CSS, JavaScript, NodeJS, and more. Completely self-paced and community-driven.',
    category: 'Programming'
  },
  {
    title: 'freeCodeCamp',
    link: 'https://www.freecodecamp.org',
    description: 'Learn to code for free with thousands of tutorials, projects, and certifications in web dev, data science, and machine learning.',
    category: 'Programming'
  },
  {
    title: 'MongoDB Documentation',
    link: 'https://docs.mongodb.com',
    description: 'Official MongoDB docs — covers CRUD operations, aggregation, indexing, schema design, and Atlas cloud setup.',
    category: 'Database'
  },
  {
    title: 'MDN Web Docs',
    link: 'https://developer.mozilla.org',
    description: 'The definitive reference for HTML, CSS, and JavaScript. Maintained by Mozilla — trusted by every web developer.',
    category: 'Programming'
  },
  {
    title: 'Figma Community',
    link: 'https://www.figma.com/community',
    description: 'Free UI kits, design templates, and open-source Figma files shared by designers worldwide.',
    category: 'Design'
  },
  {
    title: 'Docker Docs',
    link: 'https://docs.docker.com',
    description: 'Official Docker documentation — learn containerization, Docker Compose, and deploying apps in isolated environments.',
    category: 'DevOps'
  },
  {
    title: 'fast.ai',
    link: 'https://www.fast.ai',
    description: 'Free practical deep learning courses — top-down approach that gets you building neural networks from day one.',
    category: 'AI/ML'
  },
  {
    title: 'Git - The Simple Guide',
    link: 'https://rogerdudler.github.io/git-guide',
    description: 'A no-nonsense beginner guide to Git. Learn branching, merging, and version control in under 10 minutes.',
    category: 'General'
  },
  {
    title: 'CSS Tricks',
    link: 'https://css-tricks.com',
    description: 'In-depth articles, guides and references on CSS, flexbox, grid, animations, and modern front-end techniques.',
    category: 'Design'
  },
];

const CATEGORY_COLORS = {
  'Programming': '',
  'Design': 'blue',
  'Database': '',
  'DevOps': 'blue',
  'AI/ML': '',
  'General': 'blue',
};

let allResources = [];
let activeCategory = 'All';
let searchQuery = '';

async function loadResources() {
  try {
    const res = await fetch('https://learnos-api.onrender.com/api/resources');
    if (res.ok) {
      const data = await res.json();
      allResources = data.length ? data : DEMO_RESOURCES;
    } else {
      allResources = DEMO_RESOURCES;
    }
  } catch {
    // Server not running — use demo data
    allResources = DEMO_RESOURCES;
  }
  renderResources();
}

function renderResources() {
  const grid = document.getElementById('resources-grid');
  const badge = document.getElementById('count-badge');
  if (!grid) return;

  let filtered = allResources;

  // Filter by category
  if (activeCategory !== 'All') {
    filtered = filtered.filter(r => r.category === activeCategory);
  }

  // Filter by search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
  }

  badge.textContent = filtered.length + ' link' + (filtered.length !== 1 ? 's' : '');

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">◈</div>
        <p>No resources found for "<strong>${searchQuery || activeCategory}</strong>"</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((r, i) => {
    const colorClass = CATEGORY_COLORS[r.category] || '';
    const hostname = (() => {
      try { return new URL(r.link).hostname; } catch { return r.link; }
    })();

    return `
    <a class="card" href="${r.link}" target="_blank" rel="noopener noreferrer"
       style="animation-delay:${i * 0.05}s">
      <div class="card-top">
        <span class="card-category ${colorClass}">${r.category}</span>
        <span class="card-arrow">↗</span>
      </div>
      <h3>${r.title}</h3>
      <p>${r.description}</p>
      <div class="card-footer">
        <span class="card-link">${hostname}</span>
        <span class="card-type">free</span>
      </div>
    </a>`;
  }).join('');
}

// ── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadResources();

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.trim();
      renderResources();
    });
  }

  // Filter tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      renderResources();
    });
  });
});
