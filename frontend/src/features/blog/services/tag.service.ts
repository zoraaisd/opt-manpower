import { tags as mockTags } from '../mock/tags';
import { PUBLIC_WEBSITE_SLUG } from '../config';
import type { Tag } from '../types';
import { publicApi, type ApiEnvelope } from './publicApi';

const delay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 120));
};

const mapTag = (tag: any): Tag => ({
  id: String(tag.id),
  name: tag.name,
  slug: tag.slug,
  created_at: tag.createdAt ?? tag.created_at ?? new Date().toISOString(),
  updated_at: tag.updatedAt ?? tag.updated_at ?? new Date().toISOString(),
});

export const getPublicBlogTags = async (): Promise<Tag[]> => {
  await delay();

  try {
    const response = await publicApi.get<ApiEnvelope<any[]>>(`/websites/${PUBLIC_WEBSITE_SLUG}/blogs`, {
      params: { limit: 100 },
    });

    const seen = new Map<string, Tag>();
    for (const blog of response.data.data ?? []) {
      for (const entry of blog.tags ?? []) {
        const tag = mapTag(entry?.tag ?? entry);
        if (!seen.has(tag.slug)) {
          seen.set(tag.slug, tag);
        }
      }
    }

    return Array.from(seen.values());
  } catch {
    return mockTags;
  }
};

