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
  },
  {
    title: "My Grandfather’s Harmonium",
    date: "05-21-2025",
    tags: ["#Journal"],
    author: "Isha Jayadev",
    readtime: "11 Min Read",
    slug: "harmonium"
  },
  {
    title: "Italy Trip",
    date: "05-25-2025",
    tags: ["#Travel"],
    author: "Tedd Jung",
    readtime: "9 Min Read",
    slug: "italy"
  },
  {
    title: "What Punishments of God Are Not Gifts?",
    date: "05-31-2025",
    tags: ["#Journal"],
    author: "Tedd Jung",
    readtime: "5 Min Read",
    slug: "punishments"
  },
  {
    title: "My Favorite Songs of 2025 (So Far)",
    date: "06-21-2025",
    tags: ["#Journal"],
    author: "Tedd Jung",
    readtime: "2 Min Read",
    slug: "favsongs2025"
  }
];

export default blogPosts; 