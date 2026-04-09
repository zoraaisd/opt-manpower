import { categories as mockCategories } from '../mock/categories';
import { PUBLIC_WEBSITE_ID, PUBLIC_WEBSITE_SLUG } from '../config';
import type { Category } from '../types';
import { publicApi, type ApiEnvelope } from './publicApi';

const delay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 140));
};

const mapCategory = (item: any): Category => ({
  id: String(item.id),
  website_id: String(item.websiteId ?? item.website_id ?? ''),
  parent_id: item.parentId ?? item.parent_id ?? null,
  name: item.name,
  slug: item.slug,
  description: item.description ?? null,
  level: Number(item.level ?? 0),
  type: item.type ?? null,
  sort_order: Number(item.sortOrder ?? item.sort_order ?? 0),
  is_active: Boolean(item.isActive ?? item.is_active ?? false),
  created_at: item.createdAt ?? item.created_at ?? new Date().toISOString(),
  updated_at: item.updatedAt ?? item.updated_at ?? new Date().toISOString(),
});

const flattenTree = (nodes: any[]): Category[] => {
  const result: Category[] = [];
  const walk = (items: any[]) => {
    items.forEach((item) => {
      result.push(mapCategory(item));
      if (Array.isArray(item.children) && item.children.length) {
        walk(item.children);
      }
    });
  };
  walk(nodes);
  return result;
};

export const getCategoriesByWebsiteSlug = async (websiteSlug: string): Promise<Category[]> => {
  await delay();

  try {
    const response = await publicApi.get<ApiEnvelope<any[]>>(`/websites/${websiteSlug}/categories/tree`);
    return flattenTree(response.data.data ?? []).filter((category) => category.is_active);
  } catch {
    if (websiteSlug !== PUBLIC_WEBSITE_SLUG) {
      throw new Error('Website not found.');
    }

    return mockCategories
      .filter((category) => category.website_id === PUBLIC_WEBSITE_ID && category.is_active)
      .sort((left, right) => left.sort_order - right.sort_order);
  }
};
