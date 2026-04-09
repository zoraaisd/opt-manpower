import { sanitizeRichText } from '../utils/content';

type BlogContentProps = {
  content: string;
};

export const BlogContent = ({ content }: BlogContentProps) => (
  <div
    className="blog-content"
    dangerouslySetInnerHTML={{ __html: sanitizeRichText(content) }}
  />
);
