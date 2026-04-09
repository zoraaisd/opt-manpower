import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, MapPin, Phone, Mail, Youtube } from 'lucide-react';
import LogoImage from '../asserts/opt-man-logo 1.webp';
import { getEmailHref, isExternalEmailHref } from '../utils/contactLinks';

const XLogo = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2H21.5l-7.12 8.136L22.75 22h-6.558l-5.134-6.712L5.182 22H1.924l7.615-8.704L1.5 2h6.724l4.64 6.133L18.244 2Zm-1.142 18h1.804L7.248 3.895H5.313L17.102 20Z" />
  </svg>
);

const Footer = () => {
  const emailHref = getEmailHref('info@optimusglobalhr.com');
  const emailIsExternal = isExternalEmailHref(emailHref);

  return (
    <footer className="bg-black border-t border-gray-700 pt-12 md:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 mb-12">
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-md text-left lg:mx-0 lg:max-w-none lg:text-left">
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block mb-5">
                <img src={LogoImage} alt="Optimus Manpower" className="h-11 w-auto object-contain" />
              </Link>

              <p className="text-sm font-body text-gray-400 leading-7 max-w-sm mx-auto lg:mx-0 mb-6">
                Connecting talented professionals with leading organizations across India and internationally.
              </p>

              <div className="flex flex-col gap-3 items-start lg:items-start">
                <div className="flex items-center gap-2.5 text-gray-400 text-sm font-body">
                  <MapPin className="w-4 h-4 text-gray-300 shrink-0" />
                  <a href="https://www.google.com/maps/place/Zora+Global+Ai+Technologies+Private+Limited/@12.9702318,80.2442208,16z/data=!3m1!4b1!4m6!3m5!1s0x3a525de935894505:0x58f547fe15e57e7e!8m2!3d12.9697456!4d80.2485552!16s%2Fg%2F11yzxyxwnz?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">No:12,Gandhi Salai, Srinivasa Nagar, Kandhanchavadi, Perungudi, 
Chennai, Tamil Nadu-600096 </a>
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 text-sm font-body">
                  <Phone className="w-4 h-4 text-gray-300 shrink-0" />
                  <a href="tel:+919092906907" className="hover:text-white transition-colors">+91 90 92 906 907</a>
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 text-sm font-body">
                  <Phone className="w-4 h-4 text-gray-300 shrink-0" />
                  <a href="tel:+914446254744" className="hover:text-white transition-colors">Tel No: +91-044-4625 4744</a>
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 text-sm font-body">
                  <Mail className="w-4 h-4 text-gray-300 shrink-0" />
                  <a
                    href={emailHref}
                    target={emailIsExternal ? '_blank' : undefined}
                    rel={emailIsExternal ? 'noopener noreferrer' : undefined}
                    className="hover:text-white transition-colors break-all sm:break-normal"
                  >
                    info@optimusglobalhr.com
                  </a>
                </div>
              </div>

              <div className="mt-10 hidden w-full max-w-sm overflow-hidden rounded-2xl border border-gray-700 md:block lg:max-w-md">
                <iframe
                  title="Optimus Manpower Office Location"
                  src="https://www.google.com/maps?q=12.9697456,80.2485552&z=17&output=embed"
                  className="h-44 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-left sm:grid-cols-2 sm:text-left lg:col-span-8 lg:grid-cols-4 lg:gap-8">
            <div className="min-w-0">
              <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-[0.22em] mb-5">About</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', to: '/about' },
                  { label: 'Our Values', to: '/about' },
                  { label: 'Testimonials', to: '/about' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-sm font-body hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-[0.22em] mb-5">Jobs</h4>
              <ul className="space-y-3">
                {[
                  { label: 'IT & Technology', to: '/jobs?category=IT & Technology' },
                  { label: 'Healthcare', to: '/jobs?category=Healthcare' },
                  { label: 'Finance', to: '/jobs?category=Finance' },
                  { label: 'Engineering', to: '/jobs?category=Engineering' },
                  { label: 'International', to: '/jobs?type=international' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-sm font-body hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-[0.22em] mb-5">Employers</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Business Enquiry', to: '/business-enquiry' },
                  { label: 'Solutions', to: '/solutions' },
                  { label: 'Post a Job', to: '/business-enquiry' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-sm font-body hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-[0.22em] mb-5">Career Advice</h4>
              <ul className="space-y-3">
                {['Resume Tips', 'Interview Tips', 'Career Growth'].map((item) => (
                  <li key={item}>
                    <Link to="/career-advice" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 text-sm font-body hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:hidden">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-700">
              <iframe
                title="Optimus Manpower Office Location Mobile"
                src="https://www.google.com/maps?q=12.9697456,80.2485552&z=17&output=embed"
                className="h-44 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col-reverse gap-5 md:flex-row md:items-center">
          <p className="text-gray-500 text-xs sm:text-sm font-body text-center md:text-left">
            &copy; {new Date().getFullYear()} Optimus Manpower. All rights reserved.
          </p>

          <div className="flex w-full flex-wrap items-right justify-center gap-3 md:ml-auto md:w-auto md:justify-end">
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/company/optimus-global-manpower/', label: 'LinkedIn', className: 'bg-white/5 text-white border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]' },
              { icon: Facebook, href: 'https://www.facebook.com/people/Optimus-Global-Manpower/61578491547950/', label: 'Facebook', className: 'bg-white/5 text-white border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]' },
              { icon: Instagram, href: 'https://www.instagram.com/optimusglobalhr', label: 'Instagram', className: 'bg-white/5 text-white border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]' },
              { icon: XLogo, href: 'https://x.com/optimusglobalhr', label: 'X', className: 'bg-white/5 text-white border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]' },
              { icon: Youtube, href: 'https://www.youtube.com/@optimusglobalhr', label: 'Youtube', className: 'bg-white/5 text-white border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]' },
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
