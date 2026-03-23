import React, { useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { contentAPI } from '../services/api';
import { MOCK_ARTICLES } from '../data/careerAdvice';

type Article = {
  id: string | number;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  icon: any;
  color: string;
  content?: string;
};

const TAKEAWAYS: Record<string, string[]> = {
  'Resume Tips': [
    'Use role-specific keywords that match the job description.',
    'Prioritize impact statements over responsibilities.',
    'Keep formatting clean and ATS-friendly.',
    'Quantify outcomes with measurable results.',
  ],
  'Interview Tips': [
    'Research the company, team, and role in advance.',
    'Structure answers using STAR to stay concise.',
    'Prepare 3–5 stories that show impact and leadership.',
    'End interviews with thoughtful questions.',
  ],
  'Career Growth': [
    'Identify the next role before you plan a switch.',
    'Build both depth and breadth in your skill set.',
    'Track achievements to show growth over time.',
    'Create visibility with internal stakeholders.',
  ],
  'Industry Trends': [
    'Follow industry benchmarks and role demand shifts.',
    'Invest in skills that stay valuable across sectors.',
    'Use data to prioritize your next upskilling step.',
    'Align your profile with market signals.',
  ],
  'Gulf Jobs': [
    'Verify documentation and attestation timelines early.',
    'Understand contract terms before accepting offers.',
    'Benchmark compensation by role and location.',
    'Negotiate allowances and relocation terms.',
  ],
  Solutions: [
    'Choose hiring models based on cost, speed, and risk.',
    'Clarify role expectations before sourcing.',
    'Define success metrics for the first 90 days.',
    'Partner with recruiters who understand your domain.',
  ],
  Default: [
    'Clarify your goal before you apply or hire.',
    'Use data and structure to improve outcomes.',
    'Focus on measurable impact over generic claims.',
    'Plan next steps with a timeline.',
  ],
};

const CHECKLIST: Record<string, string[]> = {
  'Resume Tips': ['Update headline', 'Rewrite top 5 bullets', 'Add metrics', 'Run ATS scan'],
  'Interview Tips': ['Prepare STAR stories', 'Research company', 'Practice aloud', 'List questions'],
  'Career Growth': ['Set 90‑day goals', 'Find a mentor', 'Track wins', 'Upskill monthly'],
  'Industry Trends': ['Scan job boards', 'Compare salaries', 'Pick 1 skill', 'Build portfolio'],
  'Gulf Jobs': ['Verify documents', 'Check visa process', 'Review contract', 'Plan relocation'],
  Solutions: ['Define hiring scope', 'Confirm budget', 'Select model', 'Set delivery timeline'],
  Default: ['Clarify objective', 'Prepare resources', 'Execute plan', 'Review outcomes'],
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' } }),
};

const CareerAdviceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateArticle = (location.state as any)?.article as Article | undefined;
  const isNumericId = id ? /^\d+$/.test(id) : false;

  const { data } = useQuery({
    queryKey: ['career-advice-detail', id],
    queryFn: () => contentAPI.careerAdviceDetail(Number(id)),
    enabled: !!id && isNumericId,
  });

  const apiDetail = data?.data;

  const article: Article | undefined = useMemo(() => {
    if (stateArticle) return stateArticle;
    if (apiDetail) {
      return {
        id: apiDetail.id,
        category: apiDetail.category || 'Career Growth',
        title: apiDetail.title || 'Career Advice',
        summary: apiDetail.excerpt || apiDetail.summary || '',
        readTime: apiDetail.read_time || '5 min read',
        date: apiDetail.created_at
          ? new Date(apiDetail.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
          : '-',
        icon: BookOpen,
        color: 'bg-gray-50 text-gray-700',
        content: apiDetail.content || apiDetail.body || '',
      };
    }
    return MOCK_ARTICLES.find((a) => String(a.id) === String(id));
  }, [stateArticle, apiDetail, id]);

  const takeaways = TAKEAWAYS[article?.category || 'Default'] || TAKEAWAYS.Default;
  const checklist = CHECKLIST[article?.category || 'Default'] || CHECKLIST.Default;

  const related = MOCK_ARTICLES.filter((a) => a.category === article?.category && String(a.id) !== String(article?.id)).slice(0, 3);

  if (!article) {
    return (
      <main className="min-h-screen pt-28 max-w-4xl mx-auto px-4">
        <div className="card p-8 text-center">
          <p className="text-gray-medium text-sm font-body mb-4">We couldn’t find this article.</p>
          <Link to="/career-advice" className="btn-primary">Back to Career Advice</Link>
        </div>
      </main>
    );
  }

  const Icon = article.icon || BookOpen;
  const contentBlocks = (article.content || '').split(/\n{2,}/).filter(Boolean);

  return (
    <main className="min-h-screen pt-24 bg-white">
      <section className="max-w-5xl mx-auto px-4">
        <Link to="/career-advice" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Career Advice
        </Link>

        <div className="card p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${article.color}`}>
              <Icon className="w-3 h-3" />
              {article.category}
            </span>
            <span className="text-xs text-gray-medium font-body flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl md:text-4xl text-black leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-gray-medium text-sm font-body leading-relaxed mb-6">
            {article.summary}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-body">
            <span>{article.date}</span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card p-7">
              <h2 className="font-heading font-semibold text-black text-base mb-3">Overview</h2>
              {contentBlocks.length > 0 ? (
                contentBlocks.map((p, i) => (
                  <motion.p key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                    className="text-gray-medium text-sm font-body leading-relaxed mb-4 last:mb-0">
                    {p}
                  </motion.p>
                ))
              ) : (
                <p className="text-gray-medium text-sm font-body leading-relaxed">
                  {article.summary} Use the checklist and takeaways to apply these ideas immediately.
                </p>
              )}
            </div>

            <div className="card p-7">
              <h2 className="font-heading font-semibold text-black text-base mb-4">Action Checklist</h2>
              <ul className="space-y-2">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700 font-body">
                    <CheckCircle className="w-4 h-4 text-black/40" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-7">
              <h2 className="font-heading font-semibold text-black text-base mb-4">Key Takeaways</h2>
              <ul className="space-y-2">
                {takeaways.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700 font-body">
                    <span className="w-2 h-2 rounded-full bg-black/40 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {related.length > 0 && (
              <div className="card p-7">
                <h2 className="font-heading font-semibold text-black text-base mb-4">Related Articles</h2>
                <div className="space-y-3">
                  {related.map((a) => (
                    <Link key={a.id} to={`/career-advice/${a.id}`} state={{ article: a }}
                      className="block text-sm font-body text-gray-700 hover:text-black transition-colors">
                      {a.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerAdviceDetail;

