import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    });
    const contentHtml = md.render(content);
    return NextResponse.json({ data, contentHtml });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
} 