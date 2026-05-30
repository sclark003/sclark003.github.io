const postFiles = import.meta.glob('../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

import topicsConfig from '../../content/notes-topics.json';

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
    else if (/^\d+$/.test(value)) value = Number(value);
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

function getTopicMeta(topicId) {
  return topicsConfig.find((topic) => topic.id === topicId) ?? null;
}

function compareNotes(a, b) {
  const topicOrderA = getTopicMeta(a.topic)?.order ?? 999;
  const topicOrderB = getTopicMeta(b.topic)?.order ?? 999;
  if (topicOrderA !== topicOrderB) return topicOrderA - topicOrderB;
  return (a.order ?? 999) - (b.order ?? 999);
}

function parsePost(filePath, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = filePath.split('/').pop().replace(/\.md$/, '');

  return {
    slug,
    title: data.title || slug,
    topic: data.topic || '',
    order: typeof data.order === 'number' ? data.order : null,
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
  .sort(compareNotes);

export function getAllPosts() {
  return allPosts;
}

export function getNotesByTopic() {
  const sections = topicsConfig
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((topic) => ({
      ...topic,
      posts: allPosts
        .filter((post) => post.topic === topic.id)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    }))
    .filter((section) => section.posts.length > 0);

  const knownTopicIds = new Set(topicsConfig.map((topic) => topic.id));
  const uncategorized = allPosts.filter((post) => !knownTopicIds.has(post.topic));

  if (uncategorized.length > 0) {
    sections.push({
      id: 'other',
      title: 'Other',
      order: 999,
      posts: uncategorized.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    });
  }

  return sections;
}

export function getPostBySlug(slug) {
  return allPosts.find((post) => post.slug === slug) ?? null;
}

export function getTopicTitle(topicId) {
  return getTopicMeta(topicId)?.title ?? topicId;
}

export function formatPostDate(dateString) {
  if (!dateString || parseDateTimestamp(dateString) === 0) return '';
  return new Date(`${dateString.trim()}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
