import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, CheckCircle, Send, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BlogBreadcrumb } from '../features/blog/components/BlogBreadcrumb';
import { BlogContent } from '../features/blog/components/BlogContent';
import { ErrorState } from '../features/blog/components/ErrorState';
import { LoadingState } from '../features/blog/components/LoadingState';
import { SeoHead } from '../features/blog/components/SeoHead';
import { getBlogBySlug, getRelatedBlogs } from '../features/blog/services/blog.service';
import { formatBlogDate } from '../features/blog/utils/date';
import { stripHtml } from '../features/blog/utils/text';
import { resolveBlogVideoSource } from '../features/blog/utils/video';
import { submitEnquiry } from '../features/enquiries/service';
import {
  PHONE_LENGTH,
  sanitizeDigits,
  sanitizeEmail,
  sanitizeName,
  sanitizeText,
  isValidEmail,
  isValidName,
  isValidPhone,
} from '../utils/formValidation';

const BlogDetailsPage = () => {
  const { slug = '' } = useParams();
  const [form, setForm] = useState({
    company_name: 'N/A',
    contact_person: '',
    email: '',
    phone: '',
    hiring_requirement: 'General Enquiry',
    number_of_positions: 1,
    job_location: 'N/A',
    message: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const blogQuery = useQuery({
    queryKey: ['blog-details', slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: Boolean(slug),
  });

  const relatedBlogsQuery = useQuery({
    queryKey: ['related-blogs', slug],
    queryFn: () => getRelatedBlogs(slug),
    enabled: Boolean(slug),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    let nextValue = value;
    if (name === 'contact_person') {
      nextValue = sanitizeName(value);
    } else if (name === 'email') {
      nextValue = sanitizeEmail(value);
    } else if (name === 'phone') {
      nextValue = sanitizeDigits(value);
    } else {
      nextValue = sanitizeText(value);
    }
    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormLoading(true);
    setFormError('');

    const payload = {
      ...form,
      contact_person: form.contact_person.trim(),
      email: sanitizeEmail(form.email),
      phone: sanitizeDigits(form.phone),
      message: form.message.trim(),
    };

    if (!isValidName(payload.contact_person)) { setFormError('Your Name should contain only letters, single spaces, and be at most 30 characters.'); setFormLoading(false); return; }
    if (!isValidEmail(payload.email)) { setFormError('Enter a valid email address without spaces.'); setFormLoading(false); return; }
    if (!isValidPhone(payload.phone)) { setFormError(`Phone Number must contain exactly ${PHONE_LENGTH} digits.`); setFormLoading(false); return; }
    if (!payload.message) { setFormError('Message is required.'); setFormLoading(false); return; }

    try {
      await submitEnquiry(
        {
          ...form,
          contact_person: form.contact_person || form.email,
          metadata: {
            form_source: 'blog-details',
            blog_slug: slug,
            blog_title: blogQuery.data?.title ?? 'Article'
          }
        },
        {
          websiteSlug: 'optimus-manpower',
          formType: 'blog-details',
          subject: `Blog enquiry: ${blogQuery.data?.title ?? 'Article'}`,
          enquiryType: form.hiring_requirement,
          serviceInterestedIn: 'Blog article enquiry'
        }
      );
      setSubmitted(true);
    } catch {
      setFormError('Failed to send message. Please try again or email us directly.');
    } finally {
      setFormLoading(false);
    }
  };

  if (blogQuery.isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <LoadingState label="Loading article..." />
      </div>
    );
  }

  if (blogQuery.isError || !blogQuery.data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ErrorState
          title="Article unavailable"
          description="We could not load this article. It may have been moved or is no longer public."
          onRetry={() => {
            blogQuery.refetch();
            relatedBlogsQuery.refetch();
          }}
        />
      </div>
    );
  }

  const blog = blogQuery.data;
  const seoTitle = blog.meta_title ?? blog.title;
  const seoDescription = blog.meta_description ?? blog.excerpt ?? stripHtml(blog.content).slice(0, 160);
  const seoOgTitle = blog.og_title ?? blog.title;
  const seoOgDescription = blog.og_description ?? blog.excerpt ?? stripHtml(blog.content).slice(0, 160);
  const seoOgImage = blog.og_image ?? blog.featured_image ?? blog.banner_image;
  const introVideo = resolveBlogVideoSource(blog.intro_video);

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        keywords={blog.meta_keywords}
        canonical_url={blog.canonical_url}
        og_title={seoOgTitle}
        og_description={seoOgDescription}
        og_image={seoOgImage}
        type="article"
      />

      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_28%,#ffffff_100%)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <BlogBreadcrumb title={blog.title} />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
            <article className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.1)]">
              <div className="space-y-8 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                <div className="space-y-4">
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                    {blog.title}
                  </h1>
                  {blog.excerpt ? (
                    <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                      {blog.excerpt}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {formatBlogDate(blog.published_at)}
                    </span>
                    {blog.author ? (
                    <span className="inline-flex items-center gap-2">
                        <UserRound className="h-4 w-4" />
                        {blog.author}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100">
                  <img
                    src={blog.banner_image ?? blog.featured_image ?? blog.og_image ?? 'https://placehold.co/1600x900?text=Blog'}
                    alt={blog.title}
                    className="h-[320px] w-full object-cover sm:h-[360px] lg:h-[400px]"
                  />
                </div>

                {introVideo ? (
                  <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
                    {introVideo.kind === 'iframe' ? (
                      <iframe
                        src={introVideo.src}
                        title={`${blog.title} video`}
                        className="aspect-video w-full border-0"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={introVideo.src}
                        controls
                        playsInline
                        className="aspect-video w-full bg-black object-cover"
                      />
                    )}
                  </section>
                ) : null}

                <BlogContent content={blog.content} />

              </div>
            </article>

            <aside className="space-y-5 xl:sticky xl:top-20 xl:self-start">
              {relatedBlogsQuery.data && relatedBlogsQuery.data.length ? (
                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                  <p className="text-base font-semibold text-slate-900 mb-4">Related Articles</p>
                  <div className="space-y-4">
                    {relatedBlogsQuery.data.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        to={`/blogs/${relatedBlog.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <img
                          src={relatedBlog.featured_image ?? relatedBlog.banner_image ?? relatedBlog.og_image ?? 'https://placehold.co/80x60?text=Blog'}
                          alt={relatedBlog.title}
                          className="h-16 w-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-slate-800 leading-snug group-hover:text-slate-500 transition-colors line-clamp-2">
                            {relatedBlog.title}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                            <CalendarDays className="h-3 w-3" />
                            {formatBlogDate(relatedBlog.published_at, { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {submitted ? (
                <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                  <CheckCircle className="mx-auto h-14 w-14 text-black" />
                  <h3 className="mt-5 text-2xl font-bold text-black">Message Sent!</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Thank you for reaching out. Our team will contact you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 rounded-[28px] border border-slate-300 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)]"
                >
                  <div>
                    <p className="section-tag mb-2">Send a Message</p>
                    <h3 className="font-heading text-lg font-semibold text-black">How can we help you?</h3>
                  </div>

                  {formError ? (
                    <div className="border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                      {formError}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-body text-gray-medium">Your Name *</label>
                      <input
                        name="contact_person"
                        value={form.contact_person}
                        onChange={handleChange}
                        required
                        placeholder="Full name"
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-body text-gray-medium">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-body text-gray-medium">Phone Number</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-body text-gray-medium">I am a...</label>
                      <select
                        name="hiring_requirement"
                        value={form.hiring_requirement}
                        onChange={handleChange}
                        className="input-field w-full"
                      >
                        <option>General Enquiry</option>
                        <option>Job Seeker</option>
                        <option>Employer / Recruiter</option>
                        <option>Partnership Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-body text-gray-medium">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Tell us how we can help you..."
                      className="input-field w-full resize-none"
                    />
                  </div>

                  <button type="submit" disabled={formLoading} className="btn-primary w-full justify-center">
                    {formLoading ? 'Sending...' : <><Send className="h-4 w-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </aside>
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
