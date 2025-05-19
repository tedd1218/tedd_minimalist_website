import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch {
    filenames = [];
  }

  const posts = filenames.filter(f => f.endsWith('.md')).map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    return {
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      author: data.author || '',
      readtime: data.readtime || '',
      slug,
    };
  });

  return NextResponse.json(posts);
} 