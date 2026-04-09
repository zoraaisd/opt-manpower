import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { PUBLIC_WEBSITE_SLUG } from '../features/blog/config';
import { BlogCard } from '../features/blog/components/BlogCard';
import { EmptyState } from '../features/blog/components/EmptyState';
import { ErrorState } from '../features/blog/components/ErrorState';
import { LoadingState } from '../features/blog/components/LoadingState';
import { SeoHead } from '../features/blog/components/SeoHead';
import { getBlogsByWebsiteSlug, getPublicWebsiteBySlug } from '../features/blog/services/blog.service';

const PAGE_SIZE = 6;

const website = {
  name: 'Optimus Manpower Insights',
  description:
    'Expert insights on recruitment, manpower solutions, overseas jobs, staffing trends, and workforce planning for businesses and job seekers.',
  banner_image:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  og_image: null,
};

const BlogListPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const resetPage = (nextUpdater: () => void) => {
    nextUpdater();
    setPage(1);
  };

  const blogsQuery = useQuery({
    queryKey: ['blogs', PUBLIC_WEBSITE_SLUG, search, page],
    queryFn: () =>
      getBlogsByWebsiteSlug(PUBLIC_WEBSITE_SLUG, {
        search,
        page,
        limit: PAGE_SIZE,
      }),
  });

  const websiteQuery = useQuery({
    queryKey: ['public-website', PUBLIC_WEBSITE_SLUG],
    queryFn: () => getPublicWebsiteBySlug(PUBLIC_WEBSITE_SLUG),
  });

  if (blogsQuery.isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ErrorState
          description="We could not load the blog module for this website. Please try again."
          onRetry={() => blogsQuery.refetch()}
        />
      </div>
    );
  }

  const paginatedBlogs = blogsQuery.data;
  const websiteData = websiteQuery.data ?? website;

  return (
    <>
      <SeoHead
        title={`${websiteData.name} Blog`}
        description={websiteData.description ?? 'Read the latest insights from our blog.'}
        og_title={websiteData.name}
        og_description={websiteData.description ?? 'Read the latest insights from our blog.'}
        og_image={websiteData.banner_image ?? websiteData.og_image}
      />

      <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_32%,#f8fafc_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
          <section className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-slate-950 text-white shadow-[0_30px_120px_rgba(15,23,42,0.24)]">
            <div className="absolute inset-0">
              {websiteData.banner_image ?? websiteData.og_image ? (
                <img
                  src={websiteData.banner_image ?? websiteData.og_image ?? undefined}
                  alt={websiteData.name}
                  className="h-full w-full object-cover opacity-25"
                />
              ) : null}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,242,100,0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.92))]" />
            </div>

            <div className="relative px-6 py-8 sm:px-10 sm:py-9 lg:px-14 lg:py-10">
              <div>
                <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-[2.7rem]">
                  {websiteData.name}
                </h1>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-200">
                  {websiteData.description ?? 'Insights crafted for teams building modern, reliable hiring systems.'}
                </p>
              </div>
            </div>
          </section>

          {/* Search bar */}
          <div className="flex flex-wrap items-center gap-2 rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
            <label className="flex flex-1 min-w-[180px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => resetPage(() => setSearch(event.target.value))}
                placeholder="Search articles, topics, or keywords"
                className="w-full border-0 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>

          <section className="space-y-6">

            {blogsQuery.isLoading ? <LoadingState label="Loading articles..." /> : null}

            {paginatedBlogs && paginatedBlogs.data.length > 0 ? (
              <>
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {paginatedBlogs.data.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
                {paginatedBlogs.total_pages > 1 ? (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage(paginatedBlogs.page - 1)}
                      disabled={paginatedBlogs.page === 1}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {Array.from({ length: paginatedBlogs.total_pages }, (_, index) => index + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => setPage(pageNumber)}
                        className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                          pageNumber === paginatedBlogs.page
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setPage(paginatedBlogs.page + 1)}
                      disabled={paginatedBlogs.page === paginatedBlogs.total_pages}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}

            {paginatedBlogs && paginatedBlogs.data.length === 0 ? (
              <EmptyState
                title="No articles matched your filters"
                description="Try a broader keyword or switch back to all categories to explore the full blog library."
              />
            ) : null}
          </section>

        </div>
      </div>
    </>
  );
};

export default BlogListPage;
