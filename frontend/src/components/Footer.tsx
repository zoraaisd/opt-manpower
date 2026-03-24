import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Youtube, X, XIcon } from 'lucide-react';
import LogoImage from '../asserts/opt-man-logo 1.webp';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 pt-10 md:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Top Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block mb-4">
              <img src={LogoImage} alt="Optimus Manpower" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs font-body text-gray-400 leading-relaxed max-w-xs mb-5">
              Connecting talented professionals with leading organizations across India and internationally.
            </p>
            {/* Contact - horizontal scroll-friendly on mobile */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-body">
                <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0" /> Chennai, Tamil Nadu, India
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-body">
                <Phone className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <a href="tel:+919092906907" className="hover:text-white transition-colors">+91 90 92 906 907</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-body">
                <Mail className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <a href="mailto:info@optimusglobalhr.com" className="hover:text-white transition-colors truncate">info@optimusglobalhr.com</a>
              </div>
            </div>
            <div className="mt-4 hidden w-full max-w-sm overflow-hidden rounded-xl border border-gray-700 md:block">
              <iframe
                title="Optimus Manpower Office Location"
                src="https://www.google.com/maps?q=12.9697456,80.2485552&z=17&output=embed"
                className="h-40 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Link columns - 2×2 grid on mobile, 3 separate cols on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:contents gap-8 col-span-1 md:col-span-1 lg:col-span-3">

            {/* About */}
            <div>
              <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-widest mb-4">About</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'About Us', to: '/about' },
                  { label: 'Our Values', to: '/about' },
                  { label: 'Testimonials', to: '/about' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-xs font-body hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Categories */}
            <div>
              <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-widest mb-4">Jobs</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'IT & Technology', to: '/jobs?category=IT & Technology' },
                  { label: 'Healthcare', to: '/jobs?category=Healthcare' },
                  { label: 'Finance', to: '/jobs?category=Finance' },
                  { label: 'Engineering', to: '/jobs?category=Engineering' },
                  { label: 'International', to: '/jobs?type=international' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-xs font-body hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employers + Career Advice */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-start justify-between gap-4 md:block">
                <div className="min-w-0 flex-1">
                  <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-widest mb-4">Employers</h4>
                  <ul className="space-y-2.5 mb-5">
                    {[
                      { label: 'Business Enquiry', to: '/business-enquiry' },
                      { label: 'Solutions', to: '/solutions' },
                      { label: 'Post a Job', to: '/business-enquiry' },
                    ].map(({ label, to }) => (
                      <li key={label}>
                        <Link to={to} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-xs font-body hover:text-white transition-colors">{label}</Link>
                      </li>
                    ))}
                  </ul>
                  <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-widest mb-4">Career Advice</h4>
                  <ul className="space-y-2.5">
                    {['Resume Tips', 'Interview Tips', 'Career Growth'].map((item) => (
                      <li key={item}>
                        <Link to="/career-advice" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-xs font-body hover:text-white transition-colors">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 md:hidden">
                  <div className="w-44 overflow-hidden rounded-xl border border-gray-700">
                    <iframe
                      title="Optimus Manpower Office Location Mobile"
                      src="https://www.google.com/maps?q=12.9697456,80.2485552&z=17&output=embed"
                      className="h-36 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-gray-700 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-body text-center sm:text-left">
            © {new Date().getFullYear()} Optimus Manpower. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/company/optimus-global-manpower/', label: 'LinkedIn', className: 'bg-[#0A66C2] text-white border-[#0A66C2] hover:scale-105 hover:shadow-[0_0_18px_rgba(10,102,194,0.45)]' },
              { icon: Facebook, href: 'https://www.facebook.com/people/Optimus-Global-Manpower/61578491547950/', label: 'Facebook', className: 'bg-[#1877F2] text-white border-[#1877F2] hover:scale-105 hover:shadow-[0_0_18px_rgba(24,119,242,0.45)]' },
              { icon: Instagram, href: 'https://www.instagram.com/optimusglobalhr', label: 'Instagram', className: 'bg-gradient-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white border-[#EE2A7B]/40 hover:scale-105 hover:shadow-[0_0_18px_rgba(238,42,123,0.45)]' },
              { icon: XIcon, href: 'https://x.com/optimusglobalhr', label: 'X', className: 'bg-black text-white border-white/20 hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]' },
              { icon: Youtube, href: 'https://www.youtube.com/@optimusglobalhr', label: 'Youtube', className: 'bg-[#FF0000] text-white border-[#FF0000] hover:scale-105 hover:shadow-[0_0_18px_rgba(255,0,0,0.45)]' },
            ].map(({ icon: Icon, href, label, className }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${className}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
