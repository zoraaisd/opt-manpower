import { authors } from '../mock/authors';
import { blog_tag_map } from '../mock/blogTagMap';
import { blogs as mockBlogs } from '../mock/blogs';
import { categories as mockCategories } from '../mock/categories';
import { tags as mockTags } from '../mock/tags';
import { PUBLIC_WEBSITE_ID, PUBLIC_WEBSITE_SLUG } from '../config';
import type {
  Blog,
  BlogCardData,
  BlogDetailsData,
  BlogFilters,
  Category,
  PaginatedBlogsResponse,
  Tag,
  Website,
} from '../types';
import { publicApi, type ApiEnvelope } from './publicApi';

const delay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 180));
};

const ENABLE_BLOG_MOCKS = import.meta.env.DEV && import.meta.env.VITE_ENABLE_BLOG_MOCKS === 'true';

const mapWebsite = (website: any): Website => ({
  id: String(website.id),
  name: website.name,
  slug: website.slug,
  url: website.url ?? null,
  description: website.description ?? null,
  banner_image: website.bannerImage ?? website.banner_image ?? null,
  intro_video: website.introVideo ?? website.intro_video ?? null,
  is_active: Boolean(website.isActive ?? website.is_active ?? false),
  sort_order: Number(website.sortOrder ?? website.sort_order ?? 0),
  seo_title: website.seoTitle ?? website.seo_title ?? null,
  seo_description: website.seoDescription ?? website.seo_description ?? null,
  seo_keywords: website.seoKeywords ?? website.seo_keywords ?? null,
  canonical_url: website.canonicalUrl ?? website.canonical_url ?? null,
  og_title: website.ogTitle ?? website.og_title ?? null,
  og_description: website.ogDescription ?? website.og_description ?? null,
  og_image: website.ogImage ?? website.og_image ?? null,
  created_at: website.createdAt ?? website.created_at ?? new Date().toISOString(),
  updated_at: website.updatedAt ?? website.updated_at ?? new Date().toISOString(),
});

const mapAuthor = (author: any): string => {
  if (!author) return '';
  if (typeof author === 'string') return author.trim();
  return String(author.name ?? author.author ?? author.displayName ?? '').trim();
};

const mapTag = (tag: any): Tag => ({
  id: String(tag.id),
  name: tag.name,
  slug: tag.slug,
  created_at: tag.createdAt ?? tag.created_at ?? new Date().toISOString(),
  updated_at: tag.updatedAt ?? tag.updated_at ?? new Date().toISOString(),
});

const pickImage = (...values: Array<string | null | undefined>) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0) ?? null;

const INVALID_TEXT_PATTERNS = ['NaN', 'Invalid Date'];

const sanitizeText = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (INVALID_TEXT_PATTERNS.some((pattern) => trimmed.includes(pattern))) {
    return null;
  }
  return trimmed;
};

const sanitizeUrl = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (INVALID_TEXT_PATTERNS.some((pattern) => trimmed.includes(pattern))) {
    return null;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? trimmed : null;
  } catch {
    return null;
  }
};

const sanitizeDate = (value: unknown): string | null => {
  if (!value) return null;
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const sanitizeImage = (value: unknown): string | null => sanitizeUrl(value);

const sanitizeMediaSource = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (INVALID_TEXT_PATTERNS.some((pattern) => trimmed.includes(pattern))) {
    return null;
  }
  if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
    return trimmed;
  }
  return sanitizeUrl(trimmed);
};

const mapCategoryFromTag = (tag: any, websiteId: string): Category => ({
  id: String(tag.id),
  website_id: websiteId,
  parent_id: null,
  name: tag.name,
  slug: tag.slug,
  description: null,
  level: 0,
  type: 'BLOG',
  sort_order: 0,
  is_active: true,
  created_at: tag.createdAt ?? tag.created_at ?? new Date().toISOString(),
  updated_at: tag.updatedAt ?? tag.updated_at ?? new Date().toISOString(),
});

const mapBlogToCard = (blog: any): BlogCardData => {
  const websiteId = String(blog.websiteId ?? blog.website_id ?? blog.website?.id ?? '');
  const tagItems = Array.isArray(blog.tags)
    ? blog.tags.map((entry: any) => entry?.tag ?? entry).filter(Boolean)
    : [];
  const primaryTag = tagItems[0] ?? null;
  const category = primaryTag ? mapCategoryFromTag(primaryTag, websiteId) : null;

  return {
    id: String(blog.id),
    website_id: websiteId,
    category_id: category?.id ?? '',
    author_id: String(blog.authorId ?? blog.author_id ?? ''),
    title: blog.title ?? '',
    slug: blog.slug ?? '',
    content: blog.content ?? '',
    excerpt: sanitizeText(blog.excerpt),
    intro_video: sanitizeMediaSource(blog.introVideo ?? blog.intro_video),
    featured_image: pickImage(
      sanitizeImage(blog.featuredImage),
      sanitizeImage(blog.featured_image),
      sanitizeImage(blog.bannerImage),
      sanitizeImage(blog.banner_image),
      sanitizeImage(blog.ogImage),
      sanitizeImage(blog.og_image),
    ),
    banner_image: pickImage(
      sanitizeImage(blog.bannerImage),
      sanitizeImage(blog.banner_image),
      sanitizeImage(blog.ogImage),
      sanitizeImage(blog.og_image),
      sanitizeImage(blog.featuredImage),
      sanitizeImage(blog.featured_image),
    ),
    status: blog.status ?? 'DRAFT',
    visibility: blog.visibility ?? 'PUBLIC',
    is_featured: Boolean(blog.isFeatured ?? blog.is_featured ?? false),
    allow_comments: Boolean(blog.allowComments ?? blog.allow_comments ?? true),
    published_at: sanitizeDate(blog.publishedAt ?? blog.published_at),
    scheduled_at: sanitizeDate(blog.scheduledAt ?? blog.scheduled_at),
    meta_title: sanitizeText(blog.metaTitle ?? blog.meta_title),
    meta_description: sanitizeText(blog.metaDescription ?? blog.meta_description),
    meta_keywords: sanitizeText(blog.metaKeywords ?? blog.meta_keywords),
    canonical_url: sanitizeUrl(blog.canonicalUrl ?? blog.canonical_url),
    og_title: sanitizeText(blog.ogTitle ?? blog.og_title),
    og_description: sanitizeText(blog.ogDescription ?? blog.og_description),
    og_image: pickImage(
      sanitizeImage(blog.ogImage),
      sanitizeImage(blog.og_image),
      sanitizeImage(blog.bannerImage),
      sanitizeImage(blog.banner_image),
      sanitizeImage(blog.featuredImage),
      sanitizeImage(blog.featured_image),
    ),
    created_at: sanitizeDate(blog.createdAt ?? blog.created_at) ?? new Date().toISOString(),
    updated_at: sanitizeDate(blog.updatedAt ?? blog.updated_at) ?? new Date().toISOString(),
    deleted_at: sanitizeDate(blog.deletedAt ?? blog.deleted_at),
    category,
    author: mapAuthor(blog.author),
    tags: tagItems.map(mapTag),
  };
};

const mapBlogDetails = (blog: any): BlogDetailsData => ({
  ...mapBlogToCard(blog),
  website: blog.website ? mapWebsite(blog.website) : null,
});

const safeText = (value: unknown) => String(value ?? '').trim().toLowerCase();

const enrichMockBlog = (blog: Blog): BlogCardData => {
  const category = mockCategories.find((item) => item.id === blog.category_id) ?? null;
  const author = authors.find((item) => item.id === blog.author_id) ?? null;
  const relatedTagIds = blog_tag_map
    .filter((item) => item.blog_id === blog.id)
    .map((item) => item.tag_id);
  const relatedTags = mockTags.filter((tag) => relatedTagIds.includes(tag.id));

  return {
    ...blog,
    category,
    author: author?.name ?? 'Contributor',
    tags: relatedTags,
  };
};

const sortBlogs = (items: BlogCardData[], sortBy: BlogFilters['sort_by'] = 'latest') =>
  [...items].sort((left, right) => {
    const leftValue = left.published_at ? new Date(left.published_at).getTime() : 0;
    const rightValue = right.published_at ? new Date(right.published_at).getTime() : 0;
    if (sortBy === 'oldest') {
      return leftValue - rightValue;
    }
    return rightValue - leftValue;
  });

const applyClientFilters = (items: BlogCardData[], filters: BlogFilters = {}) => {
  const search = filters.search?.trim().toLowerCase() ?? '';

  return items.filter((blog) => {
    const matchesSearch =
      !search ||
      safeText(blog.title).includes(search) ||
      safeText(blog.excerpt).includes(search) ||
      safeText(blog.content).includes(search);

    const categorySlug = blog.category?.slug ?? '';
    const tagSlugs = blog.tags?.map((tag) => tag.slug) ?? [];
    const matchesCategory =
      (!filters.category_slugs?.length && !filters.category_slug) ||
      (filters.category_slugs?.length
        ? filters.category_slugs.includes(categorySlug)
        : categorySlug === filters.category_slug);
    const matchesTag =
      (!filters.tag_slugs?.length && !filters.tag_slug) ||
      (filters.tag_slugs?.length
        ? tagSlugs.some((slug) => filters.tag_slugs!.includes(slug))
        : tagSlugs.includes(filters.tag_slug ?? ''));

    return matchesSearch && matchesCategory && matchesTag;
  });
};

const backendBlogsFromList = async (
  websiteSlug: string,
  filters: BlogFilters = {},
): Promise<PaginatedBlogsResponse | null> => {
  try {
    const response = await publicApi.get<ApiEnvelope<any[]>>(`/websites/${websiteSlug}/blogs`, {
      params: {
        q: filters.search || undefined,
        page: filters.page ?? 1,
        limit: filters.limit ?? 6,
      },
    });

    const mapped = (response.data.data ?? []).map(mapBlogToCard);
    const filtered = applyClientFilters(mapped, filters);
    const sorted = sortBlogs(filtered, filters.sort_by);
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 6;
    const startIndex = (page - 1) * limit;
    const paginated = sorted.slice(startIndex, startIndex + limit);
    return {
      data: paginated,
      total: sorted.length,
      page,
      limit,
      total_pages: Math.max(1, Math.ceil(sorted.length / limit)),
    };
  } catch {
    return null;
  }
};

const backendFeaturedBlogs = async (websiteSlug: string): Promise<BlogCardData[] | null> => {
  try {
    const response = await publicApi.get<ApiEnvelope<any[]>>(`/websites/${websiteSlug}/blogs/featured`, {
      params: { limit: 100 },
    });
    const mapped = (response.data.data ?? []).map(mapBlogToCard);
    return mapped;
  } catch {
    return null;
  }
};

const backendBlogBySlug = async (slug: string): Promise<BlogDetailsData | null> => {
  try {
    const response = await publicApi.get<ApiEnvelope<any>>(`/websites/${PUBLIC_WEBSITE_SLUG}/blogs/${slug}`);
    return mapBlogDetails(response.data.data);
  } catch {
    return null;
  }
};

const backendRelatedBlogs = async (slug: string, limit = 3): Promise<BlogCardData[] | null> => {
  try {
    const response = await publicApi.get<ApiEnvelope<any[]>>(`/websites/${PUBLIC_WEBSITE_SLUG}/blogs`, {
      params: { limit: 100 },
    });
    const mapped = (response.data.data ?? []).map(mapBlogToCard);
    const current = mapped.find((item) => item.slug === slug);
    if (!current) {
      return [];
    }
    const related = mapped.filter((item) => item.slug !== slug);
    const currentTags = new Set(current.tags.map((tag) => tag.slug));
    const sameTag = related.filter((item) => item.tags.some((tag) => currentTags.has(tag.slug)));
    const pick = sameTag.length ? sameTag : related;
    return sortBlogs(pick).slice(0, limit);
  } catch {
    return null;
  }
};

const backendWebsiteBySlug = async (websiteSlug: string): Promise<Website | null> => {
  try {
    const response = await publicApi.get<ApiEnvelope<any>>(`/websites/${websiteSlug}`);
    return mapWebsite(response.data.data);
  } catch {
    return null;
  }
};

export const getPublicWebsiteBySlug = async (websiteSlug: string): Promise<Website | null> => {
  await delay();
  return backendWebsiteBySlug(websiteSlug);
};

export const getBlogsByWebsiteSlug = async (
  websiteSlug: string,
  filters: BlogFilters = {},
): Promise<PaginatedBlogsResponse> => {
  await delay();

  const backend = await backendBlogsFromList(websiteSlug, filters);
  if (backend) {
    return backend;
  }

  if (!ENABLE_BLOG_MOCKS) {
    throw new Error('Unable to load blogs from the public API.');
  }

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 6;
  const filtered = applyClientFilters(
    mockBlogs
      .filter(
      (blog) =>
        blog.website_id === PUBLIC_WEBSITE_ID &&
          blog.status === 'PUBLISHED' &&
          blog.visibility === 'PUBLIC' &&
          blog.deleted_at === null,
      )
      .map(enrichMockBlog),
    filters,
  );
  const sorted = sortBlogs(filtered, filters.sort_by);
  const startIndex = (page - 1) * limit;

  return {
    data: sorted.slice(startIndex, startIndex + limit),
    total: sorted.length,
    page,
    limit,
    total_pages: Math.max(1, Math.ceil(sorted.length / limit)),
  };
};

export const getFeaturedBlogs = async (websiteSlug: string): Promise<BlogCardData[]> => {
  await delay();

  const backend = await backendFeaturedBlogs(websiteSlug);
  if (backend) {
    return backend.filter((blog) => blog.is_featured);
  }

  if (!ENABLE_BLOG_MOCKS) {
    throw new Error('Unable to load featured blogs from the public API.');
  }

  return sortBlogs(
    mockBlogs
      .filter(
      (blog) =>
        blog.website_id === PUBLIC_WEBSITE_ID &&
          blog.status === 'PUBLISHED' &&
          blog.visibility === 'PUBLIC' &&
          blog.deleted_at === null &&
          blog.is_featured,
      )
      .map(enrichMockBlog),
  );
};

export const getBlogBySlug = async (slug: string): Promise<BlogDetailsData> => {
  await delay();

  const backend = await backendBlogBySlug(slug);
  if (backend) {
    return backend;
  }

  if (!ENABLE_BLOG_MOCKS) {
    throw new Error('Unable to load blog details from the public API.');
  }

  const blog = mockBlogs.find(
    (item) =>
      item.slug === slug &&
      item.status === 'PUBLISHED' &&
      item.visibility === 'PUBLIC' &&
      item.deleted_at === null,
  );

  if (!blog) {
    throw new Error('Blog not found.');
  }

  return {
    ...enrichMockBlog(blog),
    website: null,
  };
};

export const getRelatedBlogs = async (slug: string, limit = 3): Promise<BlogCardData[]> => {
  await delay();

  const backend = await backendRelatedBlogs(slug, limit);
  if (backend) {
    return backend;
  }

  if (!ENABLE_BLOG_MOCKS) {
    return [];
  }

  const currentBlog = mockBlogs.find((item) => item.slug === slug);
  if (!currentBlog || currentBlog.website_id !== PUBLIC_WEBSITE_ID) {
    return [];
  }

  const visibleBlogs = sortBlogs(
    mockBlogs
      .filter(
        (item) =>
          item.website_id === PUBLIC_WEBSITE_ID &&
          item.status === 'PUBLISHED' &&
          item.visibility === 'PUBLIC' &&
          item.deleted_at === null,
      )
      .map(enrichMockBlog),
  );
  const related = visibleBlogs.filter(
    (item) => item.slug !== slug && item.category_id === currentBlog.category_id,
  );
  const fallback = visibleBlogs.filter((item) => item.slug !== slug);

  return (related.length ? related : fallback).slice(0, limit);
};
