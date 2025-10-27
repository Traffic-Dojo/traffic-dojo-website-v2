import { defineQuery } from "groq";

export const allArticlesQuery =
  defineQuery(`*[_type == 'title'] | order(date desc){
  _id,
  date,
  title,
  description,
  "category": category -> name,
  "preview": preview.asset -> url,
  "mobile": mobile.asset -> url,
  "slug": slug.current,
}`);

export function createArticleQuery(slug: string) {
  if (!slug) {
    throw new Error("Can't create a query without 'slug' property");
  }

  return defineQuery(`*[_type == 'title' && slug.current == '${slug}'] | order(date desc){
        _id,
        date,
        title,
        description,
        content,
        "category": category -> name,
        "preview": preview.asset -> url,
        "mobile": mobile.asset -> url,
        "full": full.asset -> url,
        "slug": slug.current,
    }`);
}

export interface PreviewArticle {
  category: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  preview: string;
  full: string;
  mobile: string;
}
