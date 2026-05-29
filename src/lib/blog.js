const postFiles = import.meta.glob('../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const data = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    data[key] = value;
  }

  return { data, content: match[2].trim() };
}

function parseDateTimestamp(dateString) {
  if (!dateString || typeof dateString !== 'string') return 0;
  const trimmed = dateString.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return 0;
  const time = Date.parse(`${trimmed}T12:00:00`);
  return Number.isNaN(time) ? 0 : time;
}

function parsePost(filePath, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = filePath.split('/').pop().replace(/\.md$/, '');

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    dateTimestamp: parseDateTimestamp(data.date),
    excerpt: data.excerpt || '',
    draft: Boolean(data.draft),
    content,
  };
}

const allPosts = Object.entries(postFiles)
  .map(([path, raw]) => parsePost(path, raw))
  .filter((post) => !post.draft && !post.slug.startsWith('_'))
  .sort((a, b) => {
    if (b.dateTimestamp !== a.dateTimestamp) {
      return b.dateTimestamp - a.dateTimestamp;
    }
    return a.title.localeCompare(b.title);
  });

export function getAllPosts() {
  return allPosts;
}

export function getPostBySlug(slug) {
  return allPosts.find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(dateString) {
  if (!dateString || parseDateTimestamp(dateString) === 0) return '';
  return new Date(`${dateString.trim()}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
