// ── Seed script — run once to populate MongoDB ───────────────
// Usage: node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('./models/Resource');

const SEED_DATA = [
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
    title: 'MDN Web Docs',
    link: 'https://developer.mozilla.org',
    description: 'The definitive reference for HTML, CSS, and JavaScript. Maintained by Mozilla — trusted by every web developer.',
    category: 'Programming'
  },
  {
    title: 'MongoDB Documentation',
    link: 'https://docs.mongodb.com',
    description: 'Official MongoDB docs — covers CRUD operations, aggregation, indexing, schema design, and Atlas cloud setup.',
    category: 'Database'
  },
  {
    title: 'Figma Community',
    link: 'https://www.figma.com/community',
    description: 'Free UI kits, design templates, and open-source Figma files shared by designers worldwide.',
    category: 'Design'
  },
  {
    title: 'CSS Tricks',
    link: 'https://css-tricks.com',
    description: 'In-depth articles, guides, and references on CSS, flexbox, grid, animations, and modern front-end techniques.',
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
    title: 'Roadmap.sh',
    link: 'https://roadmap.sh',
    description: 'Visual roadmaps for becoming a developer — frontend, backend, DevOps, full-stack and more. Community maintained.',
    category: 'General'
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    await Resource.deleteMany({});
    console.log('✓ Cleared existing resources');

    await Resource.insertMany(SEED_DATA);
    console.log(`✓ Inserted ${SEED_DATA.length} resources`);

    console.log('\nDone! You can now start your server with: node server.js\n');
    process.exit(0);
  } catch (err) {
    console.error('✗ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();