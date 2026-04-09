export type Website = {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  description: string | null;
  banner_image: string | null;
  intro_video: string | null;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
};

export type Blog = {
  id: string;
  website_id: string;
  category_id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  banner_image: string | null;
  intro_video?: string | null;
  status: string;
  visibility: string;
  is_featured: boolean;
  allow_comments: boolean;
  published_at: string | null;
  scheduled_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Category = {
  id: string;
  website_id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  level: number;
  type: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  blog_id: string;
  name: string;
  email: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type BlogTagMap = {
  blog_id: string;
  tag_id: string;
};

export type BlogCardData = Blog & {
  category: Category | null;
  author: string;
  tags: Tag[];
};

export type BlogDetailsData = BlogCardData & {
  website: Website | null;
};

export type BlogFilters = {
  search?: string;
  category_slug?: string;
  category_slugs?: string[];
  tag_slug?: string;
  tag_slugs?: string[];
  sort_by?: 'latest' | 'oldest' | 'last_week' | 'last_month';
  page?: number;
  limit?: number;
};

export type PaginatedBlogsResponse = {
  data: BlogCardData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type CreateCommentPayload = {
  name: string;
  email: string;
  content: string;
};
