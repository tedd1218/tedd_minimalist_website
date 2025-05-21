# Social Media Sharing Guide

This document explains how to customize the images and metadata that appear when your website is shared on social media platforms or messaging apps.

## How Social Media Previews Work

When you share a URL on platforms like Twitter, Facebook, LinkedIn, or messaging apps like WhatsApp, they fetch metadata from your website to create a preview card. This metadata includes:

- Title
- Description
- Preview image
- URL

These are controlled by meta tags in your website's HTML, particularly "Open Graph" (OG) tags and Twitter Card tags.

## Default Website Preview

The default preview for your entire website is configured in `app/layout.tsx`. When someone shares your homepage or a page without specific metadata, this default preview will be used.

### Default Image Location

Create your default social sharing image and place it at:
```
public/meta/og-image.jpg
```

**Recommended image specifications:**
- Size: 1200 × 630 pixels
- Format: JPG or PNG
- Max file size: Ideally under 1MB

## Blog Post Previews

Each blog post can have its own custom preview image. These are configured dynamically based on the blog post slug.

### Blog Post Image Location

For a blog post with slug "example-post", create an image at:
```
public/blog/example-post.JPG
```

The image should match the same specifications as the default image.

## Creating Effective Preview Images

For the best results across platforms:

1. **Include your name/logo** - Brand recognition is important
2. **Add the post title** - Make it clear what the content is about
3. **Use consistent design language** - Maintain your brand identity
4. **Keep text minimal** - Too much text may be cut off on some platforms
5. **Test on different platforms** - Preview cards render differently across services

## Testing Your Preview Cards

You can use these tools to test how your preview cards will appear:

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Troubleshooting

If your preview images aren't showing correctly:

1. **Clear cache** - Social platforms cache metadata; use their debug tools to refresh
2. **Check image dimensions** - Make sure they match the recommended specifications
3. **Verify URL paths** - Ensure image paths are correct and images are accessible
4. **Check for typos** - Make sure the metadata in your code matches your file names

## Updating Existing Previews

If you update a preview image for a page that's been shared before:

1. Use the platform's debug tools to refresh the cache
2. It may take some platforms several hours to refresh their cache 