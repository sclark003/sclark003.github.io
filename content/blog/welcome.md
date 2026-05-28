---
title: Welcome to my blog
date: 2026-05-28
excerpt: How this blog works and what you can expect to find here.
---

This is your first blog post. You can edit this file or delete it and add your own.

## Writing a new post

1. Create a new `.md` file in the `content/blog` folder (use a short name like `my-trip-to-norway.md`).
2. Add the header at the top, then write your post in Markdown below it.

```yaml
---
title: Your post title
date: 2026-05-28
excerpt: A one-line summary shown on the blog list page.
draft: false
---
```

3. Run `npm run build:pages` and push to GitHub to publish.

## Markdown tips

- Use `##` for section headings
- Use `**bold**` and `*italic*` for emphasis
- Add links with `[text](https://example.com)`
- Add images with `![description](/images/your-photo.jpg)` (put images in `public/images`)

Posts are picked up automatically — you never need to edit the React code to add a new article.
