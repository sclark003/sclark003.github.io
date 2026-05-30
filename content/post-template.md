---
title: Your Post Title Here
topic: nlp
order: 1
date: 2026-05-28
excerpt: One sentence summary shown on the study notes list page.
draft: true
---

Write your opening paragraph here. Introduce the topic and what the reader will learn.

## Section heading

Add the main body of your post in one or more sections. Use **bold** for emphasis and *italic* for subtle emphasis.

### Subsection (optional)

Use a smaller heading when you need to break up a longer section.

- Bullet point one
- Bullet point two
- Bullet point three

1. Numbered step one
2. Numbered step two
3. Numbered step three

> Optional quote or callout. Use this for an important note or highlight.

[Link text](https://example.com)

![Image description](/images/your-image.jpg)

---

## Before publishing

1. Update `title`, `topic`, `order`, and `excerpt` in the header above
2. Set `draft: false` when you are ready to publish
3. Save this file in `content/blog/` with a new name (e.g. `my-post-title.md`)
4. Add any images to `public/images/`
5. Run `npm run build:pages` and push to GitHub

### Topic and order fields

- **topic** — section id from `content/notes-topics.json` (e.g. `copilot`, `nlp`)
- **order** — position within that topic (1, 2, 3…). Notes are sorted by topic, then by this number.

To add a new topic section, edit `content/notes-topics.json`.
