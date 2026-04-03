---
title: 'Advanced Hugo Sections'
date: 2024-01-20T14:30:00+00:00
draft: false
tags: 
  - hugo
  - advanced
  - sections
---

This is the second article, demonstrating how multiple articles appear in the same section.

## Advanced Section Features

Hugo sections provide powerful features for content organization:

### Custom Section Templates

You can create custom templates for each section by placing them in `layouts/SECTION/`:

- `layouts/articles/list.html` - for `/articles/` page
- `layouts/articles/single.html` - for individual articles

### Section Variables

In templates, you can access section-specific data:

```go
{{ .Section }}        // "articles"
{{ .Type }}           // content type
{{ .Pages }}          // all pages in section
{{ .RegularPages }}   // only regular pages
```

### Taxonomies per Section

Each section can have its own taxonomies (tags, categories) with independent organization.
