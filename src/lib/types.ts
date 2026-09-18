export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type ArticleStatus = "draft" | "published";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  author_id: string | null;
  author_name: string | null;
  status: ArticleStatus;
  is_featured: boolean;
  is_popular: boolean;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  subcategory?: Subcategory | null;
};
