export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  author: string;
  readtime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "The Exploration of Death Through Three Religious Texts",
    date: "05-20-2025",
    tags: ["#Essay"],
    author: "Tedd Jung",
    readtime: "11 Min Read",
    slug: "death"
  }
];

export default blogPosts; 