import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    return NextResponse.json({ data, contentHtml });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
} 