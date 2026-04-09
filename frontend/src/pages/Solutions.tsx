import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Award, Layers, Cpu, Globe, TrendingUp, 
  CheckCircle, ArrowRight, Shield, Zap, Target, Search 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '../components/CountUp';

const SOLUTIONS = [
  {
    icon: Users,
    title: 'General Staffing',
    desc: 'Scalable hiring solutions for blue-collar, entry-level and bulk recruitment needs across manufacturing, logistics and retail sectors.',
    features: ['High-volume sourcing', 'Rapid deployment', 'Full compliance management'],
    color: 'bg-blue-50 text-blue-700'
  },
  {
    icon: Award,
    title: 'Professional Staffing',
    desc: 'Precision placement for mid to senior-level professional roles requiring verified domain expertise and specific technical skill sets.',
    features: ['Targeted talent search', 'Skills gap analysis', 'Domain-expert screening'],
    color: 'bg-purple-50 text-purple-700'
  },
  {
    icon: Layers,
    title: 'Permanent Recruitment',
    desc: 'Strategic end-to-end recruitment for long-term growth. We find professionals who align with your culture and future goals.',
    features: ['Cultural fit assessment', '90-day replacement guarantee', 'Executive-led vetting'],
    color: 'bg-green-50 text-green-700'
  },
  {
    icon: Cpu,
    title: 'Executive Search',
    desc: 'Confidential and proactive talent acquisition for C-suite, board-level and senior leadership positions that define your future.',
    features: ['Confidential headhunting', 'Global market mapping', 'Leadership benchmarking'],
    color: 'bg-yellow-50 text-yellow-700'
  },
  {
    icon: Globe,
    title: 'International Recruitment',
    desc: 'Licensed cross-border recruitment solutions specializing in Gulf, European and SE Asian markets with complete visa support.',
    features: ['Visa processing support', 'Cultural orientation', 'Pre-departure assistance'],
    color: 'bg-cyan-50 text-cyan-700'
  },
  {
    icon: TrendingUp,
    title: 'Contract Staffing',
    desc: 'Agile workforce solutions to manage project-specific needs, seasonal peaks, or temporary specialized technical requirements.',
    features: ['Flexible engagement models', 'Payroll & HR support', 'Fast turnaround time'],
    color: 'bg-orange-50 text-orange-700'
  },
];

const PROCESS = [
  { step: '01', title: 'Consultation', desc: 'We dive deep into your company culture, technical requirements and long-term business objectives.' },
  { step: '02', title: 'Sourcing & Vetting', desc: 'Our experts leverage global networks and proprietary tools to identify and rigorously screen top-tier talent.' },
  { step: '03', title: 'Curated Shortlist', desc: 'You receive a hand-picked shortlist of candidates who are not just qualified, but ready to deliver impact from day one.' },
  { step: '04', title: 'Selection & Support', desc: 'From coordinating interviews to final negotiations and onboarding support, we manage the entire lifecycle.' },
];

const PROCESS_RATES = [
  { label: 'Consult', value: 35 },
  { label: 'Vetting', value: 50 },
  { label: 'Shortlist', value: 75 },
  { label: 'Support', value: 98 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } 
  }),
};

const Solutions = () => {
  return (
    <main className="min-h-screen pt-0">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-black py-8 text-white md:flex md:min-h-screen md:items-center md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-40 -mb-40 blur-3xl" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p variants={fadeUp} className="hero-kicker text-gray-400 mb-4">What We Deliver</motion.p>
            <motion.h1 variants={fadeUp} className="hero-title hero-title-animate hero-title-glow mb-5 text-4xl sm:text-5xl md:mb-6 md:text-7xl">
              Empowering Businesses with <br />
              <span className="text-gray-300">Elite Workforce Solutions</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-8 max-w-2xl text-sm font-body leading-relaxed text-gray-400 sm:text-base md:mb-10 md:text-lg">
              Optimus Manpower provides a comprehensive suite of recruitment services designed to meet the evolving needs of modern organizations across the globe.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/business-enquiry" className="btn-primary bg-white text-black hover:bg-gray-200 border-none">
                Start Hiring Now
              </Link>
              <a href="#all-solutions" className="btn-outline border-white/30 text-white hover:bg-white/10">
                Explore Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Differentiators ── */}
      <section className="py-16 border-b border-gray-light bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: Shield, title: '90-Day Guarantee', desc: 'Secure your investment with our risk-free replacement policy for permanent placements.' },
            { icon: Zap, title: 'Rapid Turnaround', desc: 'Average time-to-first-interview is just 72 hours for standard roles.' },
            { icon: Search, title: 'Global Insights', desc: 'Deep industry knowledge spanning 20+ sectors across India and international markets.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-heading font-semibold text-black text-base mb-2">{title}</h3>
              <p className="text-gray-medium text-xs font-body leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── All Solutions ── */}
      <section id="all-solutions" className="bg-gray-50/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center md:mb-16">
            <p className="section-tag mb-3">Our Expertise</p>
            <h2 className="section-title">Specialized <span className="text-black">Hiring Verticals</span></h2>
            <div className="accent-line mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((s, i) => (
              <motion.div 
                key={s.title} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                custom={i} 
                variants={fadeUp}
                className="card-3d group bg-white border border-gray-light p-6 hover:border-black/20 transition-all hover:shadow-xl hover:shadow-black/5 md:p-8"
              >
                <div className={`w-12 h-12 ${s.color} flex items-center justify-center rounded-lg mb-6`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-black text-lg mb-4">{s.title}</h3>
                <p className="text-gray-medium text-sm font-body leading-relaxed mb-6">
                  {s.desc}
                </p>
                <ul className="space-y-2 mb-8 border-t border-gray-light pt-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs font-body text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-black/40" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
            <div className="lg:w-1/2">
              <p className="section-tag mb-4">Precision Workflow</p>
              <h2 className="section-title mb-8">How We Deliver <br /> Excellence</h2>
              <div className="space-y-10 relative">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-gray-light" />
                {PROCESS.map((p, i) => (
                  <motion.div 
                    key={p.step} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    custom={i} 
                    variants={fadeUp}
                    className="flex gap-8 relative z-10"
                  >
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-display font-black shrink-0">
                      {p.step}
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-black text-lg mb-2">{p.title}</h4>
                      <p className="text-gray-medium text-sm font-body leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-black/5 rounded-3xl p-5 sm:p-7 md:p-10">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-body">Process Rates</p>
                    <h3 className="font-heading font-semibold text-black text-2xl mt-2">Performance by Stage</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-display font-black text-black">
                      <CountUp value={98} suffix="%" />
                    </p>
                    <p className="text-xs text-gray-medium font-body">Top success rate</p>
                  </div>
                </div>
                <div className="h-64">
                  <svg viewBox="0 0 420 240" className="w-full h-full">
                    <defs>
                      <linearGradient id="rateBar" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#111111" />
                        <stop offset="100%" stopColor="#555555" />
                      </linearGradient>
                    </defs>
                    {[40, 90, 140, 190].map((y) => (
                      <line key={y} x1="24" x2="396" y1={y} y2={y} stroke="rgba(0,0,0,0.08)" strokeDasharray="4 6" />
                    ))}
                    {(() => {
                      const chartHeight = 160;
                      const baseY = 200;
                      const gap = 88;
                      const startX = 60;
                      const points = PROCESS_RATES.map((rate, i) => {
                        const x = startX + i * gap;
                        const y = baseY - (rate.value / 100) * chartHeight;
                        return { ...rate, x, y };
                      });
                      const pathD = points
                        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                        .join(' ');
                      return (
                        <g>
                          <motion.path
                            d={pathD}
                            fill="none"
                            stroke="#111111"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                          />
                          {points.map((p, i) => (
                            <g key={p.label}>
                              <motion.circle
                                cx={p.x}
                                cy={p.y}
                                r="6"
                                fill="url(#rateBar)"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                              />
                              <text x={p.x} y={218} textAnchor="middle" className="fill-gray-500 text-[10px] font-body">
                                {p.label}
                              </text>
                              <text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-black text-[11px] font-body">
                                {p.value}%
                              </text>
                            </g>
                          ))}
                        </g>
                      );
                    })()}
                    <line x1="24" x2="396" y1="200" y2="200" stroke="rgba(0,0,0,0.15)" />
                    <line x1="24" x2="24" y1="40" y2="200" stroke="rgba(0,0,0,0.15)" />
                  </svg>
                </div>
                <p className="text-gray-medium text-xs font-body mt-4">
                  Rates represent average performance benchmarks across recent client engagements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-black text-white text-center rounded-3xl mx-4 mb-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* <Target className="w-12 h-12 text-white/20 mx-auto mb-8" /> */}
          <h2 className="cta-title-serif font-black text-3xl md:text-4xl mb-5">Build Your Future Workforce Today</h2>
          <p className="text-gray-400 font-body text-base mb-10">
            Join 500+ global brands who trust Optimus Manpower to find and secure top-tier talent.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/business-enquiry" className="btn-primary bg-white text-black hover:bg-gray-200 border-none px-10">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline border-white/30 text-white hover:bg-white/10 px-10">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Solutions;
