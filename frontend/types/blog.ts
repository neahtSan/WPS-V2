export interface BlogPost {
    id?: string;
    title: string;
    writer: string;
    slug: string;
    tag: string;
    subtag?: string;
    content: string; // Can be markdown or serialized JSON
    date: string;    // ISO 8601 format
    coverImage?: string;
    readingTime?: number;
  };