# Blog Structure

This document explains how to create and manage blog posts for the website.

## File Structure

The blog uses a component-based approach:

1. **Blog Posts** - Each blog post is its own component at `app/blog/[postname]/page.tsx`
2. **Data Registry** - Metadata for all blog posts is stored in `app/data/blogPosts.ts` to power the blog index page
3. **Blog Index** - The blog listing page at `app/blog/page.tsx` displays and filters posts

## Understanding the Structure

- **Individual Blog Posts**: Each blog post is a completely independent React component. The content and styling are self-contained within each post file.

- **The Data Registry (`blogPosts.ts`)**: This file serves as a central registry that:
  - Keeps track of all blog posts in one place
  - Powers the blog index/listing page
  - Enables filtering and sorting capabilities
  - Does NOT affect the actual content of individual blog posts

- **Consistent Metadata**: For proper listing, ensure that the metadata in each blog post component matches what's in the `blogPosts.ts` registry.

## Creating a New Blog Post

### Step 1: Add metadata to the registry

Add a new entry to the `blogPosts` array in `app/data/blogPosts.ts`:

```typescript
{
  title: "Your Post Title",
  date: "MM-DD-YYYY", // Use this format for consistency
  tags: ["#Category"], // Always include the # symbol
  author: "Your Name",
  readtime: "X Min Read",
  slug: "your-post-slug"
}
```

### Step 2: Create the blog post component

1. Create a new directory in `app/blog/` with the slug you specified in the registry
2. Copy the template from `app/templates/BlogPostTemplate.tsx` to `app/blog/[your-slug]/page.tsx`
3. Update the `data` object in the file to EXACTLY match what you added to the registry
4. Replace the example content with your actual blog post content

> **Important**: The data in your component MUST match what's in `blogPosts.ts` for proper filtering and organization in the blog index.

## Available Tags

These tags are available with their corresponding colors:

- #Essay (Red)
- #Food (Orange)
- #Journal (Yellow)
- #Media/Film (Green)
- #Politics (Blue)
- #Sports (Cyan)
- #Tech (Purple)
- #Travel (Brown)

## Blog Post Content Tips

1. Use standard HTML elements within the `<article>` section:
   - `<h1>`, `<h2>`, `<h3>` for headings
   - `<p>` for paragraphs
   - `<img>` for images, with optional inline styling
   - `<mark>` for highlighted text
   - `<ul>` and `<li>` for unordered lists
   - `<ol>` and `<li>` for ordered lists

2. For images, place them in the `public/blog/` directory and reference them like:
   ```html
   <img src="/blog/your-image.jpg" alt="Description" style={{ width: 400 }} />
   ```

3. To link to other pages or external sites:
   ```html
   <a href="/path/to/page">Link text</a>
   ```

## The Template

Use the template at `app/templates/BlogPostTemplate.tsx` as a starting point for new blog posts. It includes:

1. The main structure of a blog post
2. Sample content elements
3. Metadata fields
4. Styling that matches the site design

## Troubleshooting

**Blog post not showing up in index?**
- Ensure the entry exists in `blogPosts.ts`
- Verify that date formats match (MM-DD-YYYY)
- Check that tags include the # prefix in both places
- Make sure the slug in `blogPosts.ts` matches your directory name 