import { sanityClient, sanityImageUrl } from "./sanity";

export type SanityPost = {
  _id: string;
  title: string;
  excerpt: string;
  body?: Array<{
    _type?: string;
    children?: Array<{ text?: string }>;
  }>;
  source?: string;
  slug?: { current?: string };
  publishedAt?: string;
  image?: unknown;
};

const POSTS_QUERY = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  excerpt,
  source,
  slug,
  publishedAt,
  image
}`;

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  body,
  source,
  slug,
  publishedAt,
  image
}`;

export async function fetchPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch<SanityPost[]>(POSTS_QUERY);
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch<SanityPost | null>(POST_BY_SLUG_QUERY, { slug });
}

export function formatBlogDate(rawDate?: string): string {
  if (!rawDate) return "APRIL 10, 2026";
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

export function getSanityPostUrl(post: SanityPost): string {
  return post.slug?.current ? `/news/${post.slug.current}` : "#";
}

export function extractBodyText(post: SanityPost): string[] {
  if (!post.body?.length) return [];
  return post.body
    .filter((block) => block?._type === "block")
    .map((block) => (block.children || []).map((child) => child.text || "").join("").trim())
    .filter(Boolean);
}

export function getSanityImageUrl(image: unknown, width = 1200, height = 800): string | null {
  if (!image) return null;
  return sanityImageUrl(image as Parameters<typeof sanityImageUrl>[0])
    .width(width)
    .height(height)
    .fit("crop")
    .url();
}
