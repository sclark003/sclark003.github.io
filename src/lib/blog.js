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

function parsePost(filePath, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = filePath.split('/').pop().replace(/\.md$/, '');

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    excerpt: data.excerpt || '',
    draft: Boolean(data.draft),
    content,
  };
}

const allPosts = Object.entries(postFiles)
  .map(([path, raw]) => parsePost(path, raw))
  .filter((post) => !post.draft && !post.slug.startsWith('_'))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllPosts() {
  return allPosts;
}

export function getPostBySlug(slug) {
  return allPosts.find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
