import { blogs as mockBlogs } from '../mock/blogs';
import { comments as seedComments } from '../mock/comments';
import type { Comment, CreateCommentPayload } from '../types';
import { publicApi, type ApiEnvelope } from './publicApi';

let commentsStore: Comment[] = [...seedComments];

const delay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 180));
};

const getBlogIdBySlug = (slug: string) => {
  const blog = mockBlogs.find((item) => item.slug === slug);

  if (!blog) {
    throw new Error('Blog not found.');
  }

  return blog.id;
};

export const getCommentsByBlogSlug = async (slug: string): Promise<Comment[]> => {
  await delay();

  try {
    const response = await publicApi.get<ApiEnvelope<Comment[]>>(`/blogs/${slug}/comments`);
    return (response.data.data ?? []).map((comment) => ({
      id: String(comment.id),
      blog_id: String((comment as any).blog_id ?? (comment as any).blogId ?? ''),
      name: comment.name,
      email: comment.email ?? '',
      content: comment.content,
      status: comment.status,
      created_at: (comment as any).created_at ?? (comment as any).createdAt ?? new Date().toISOString(),
      updated_at: (comment as any).updated_at ?? (comment as any).updatedAt ?? new Date().toISOString(),
      deleted_at: (comment as any).deleted_at ?? (comment as any).deletedAt ?? null,
    }));
  } catch {
    const blogId = getBlogIdBySlug(slug);

    return commentsStore
      .filter(
        (comment) =>
          comment.blog_id === blogId &&
          comment.deleted_at === null &&
          comment.status === 'APPROVED',
      )
      .sort((left, right) => {
        const leftValue = new Date(left.created_at).getTime();
        const rightValue = new Date(right.created_at).getTime();
        return rightValue - leftValue;
      });
  }
};

export const createComment = async (
  slug: string,
  payload: CreateCommentPayload,
): Promise<Comment> => {
  await delay();

  try {
    const response = await publicApi.post<ApiEnvelope<Comment>>(`/blogs/${slug}/comments`, payload);
    const comment = response.data.data;
    return {
      id: String(comment.id),
      blog_id: String((comment as any).blog_id ?? (comment as any).blogId ?? ''),
      name: comment.name,
      email: comment.email ?? '',
      content: comment.content,
      status: comment.status,
      created_at: (comment as any).created_at ?? (comment as any).createdAt ?? new Date().toISOString(),
      updated_at: (comment as any).updated_at ?? (comment as any).updatedAt ?? new Date().toISOString(),
      deleted_at: (comment as any).deleted_at ?? (comment as any).deletedAt ?? null,
    };
  } catch {
    const blogId = getBlogIdBySlug(slug);
    const now = new Date().toISOString();

    const newComment: Comment = {
      id: String(commentsStore.length + 1),
      blog_id: blogId,
      name: payload.name,
      email: payload.email,
      content: payload.content,
      status: 'APPROVED',
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };

    commentsStore = [newComment, ...commentsStore];
    return newComment;
  }
};
