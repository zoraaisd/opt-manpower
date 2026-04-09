import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type BlogBreadcrumbProps = {
  title: string;
};

export const BlogBreadcrumb = ({ title }: BlogBreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
    <Link to="/" className="transition hover:text-slate-900">
      Home
    </Link>
    <ChevronRight className="h-4 w-4" />
    <Link to="/blogs" className="transition hover:text-slate-900">
      Blogs
    </Link>
    <ChevronRight className="h-4 w-4" />
    <span className="text-slate-900">{title}</span>
  </nav>
);
