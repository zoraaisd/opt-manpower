import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogCardData } from '../types';
import { formatBlogDate } from '../utils/date';

type BlogCardProps = {
  blog: BlogCardData;
  featured?: boolean;
};

export const BlogCard = ({ blog, featured = false }: BlogCardProps) => (
  <article className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
    <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
      <Link to={`/blogs/${blog.slug}`} className="block h-full">
        <img
          src={blog.featured_image ?? blog.banner_image ?? blog.og_image ?? 'https://placehold.co/800x500?text=Blog'}
          alt={blog.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

    </div>

    <div className="flex flex-col p-6">
      <Link to={`/blogs/${blog.slug}`} className="block">
        <h3
          className={`font-serif text-slate-950 transition group-hover:text-slate-700 ${
            featured ? 'text-[1.95rem] leading-tight' : 'text-[1.05rem] leading-[1.45]'
          }`}
        >
          {blog.title}
        </h3>
      </Link>

      <p
        className={`mt-4 overflow-hidden text-slate-600 ${
          featured ? 'min-h-[84px] text-base leading-8' : 'min-h-[96px] text-sm leading-8'
        }`}
      >
        {blog.excerpt ?? 'Read the full article for the complete insight.'}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
        <div className="inline-flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays className="h-4 w-4" />
          <span>
            {formatBlogDate(blog.published_at, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        <Link
          to={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {blog.author ? (
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          By {blog.author}
        </p>
      ) : null}
    </div>
  </article>
);
