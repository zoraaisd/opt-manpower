import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, CheckCircle, Send } from 'lucide-react';
import companyLogo from '../asserts/opt-man-logo 1.webp';
import { getEmailHref, isExternalEmailHref } from '../utils/contactLinks';
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
import { submitEnquiry } from '../features/enquiries/service';
import { useHref } from 'react-router-dom';

const ContactUs = () => {
  const emailHref = getEmailHref('info@optimusglobalhr.com');
  const emailIsExternal = isExternalEmailHref(emailHref);
  const [form, setForm] = useState({ company_name: 'N/A', contact_person: '', email: '', phone: '', hiring_requirement: 'General Enquiry', number_of_positions: 1, job_location: 'N/A', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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

    setForm(f => ({ ...f, [name]: nextValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      contact_person: form.contact_person.trim(),
      email: sanitizeEmail(form.email),
      phone: sanitizeDigits(form.phone),
      message: form.message.trim(),
    };

    if (!isValidName(payload.contact_person)) { setError('Your Name should contain only letters, single spaces, and be at most 30 characters.'); return; }
    if (!isValidEmail(payload.email)) { setError('Enter a valid email address without spaces.'); return; }
    if (payload.phone && !isValidPhone(payload.phone)) { setError(`Phone Number must contain exactly ${PHONE_LENGTH} digits.`); return; }
    if (!payload.message) { setError('Message is required.'); return; }

    setLoading(true); setError('');
    try {
      await submitEnquiry(
        {
          ...payload,
          contact_person: payload.contact_person || payload.email,
          metadata: {
            form_source: 'contact-us',
            hiring_requirement: payload.hiring_requirement,
            company_name: payload.company_name
          }
        },
        {
          formType: 'contact-us',
          subject: 'Contacted',
          enquiryType: payload.hiring_requirement,
          serviceInterestedIn: 'General Enquiry'
        }
      );
      setSubmitted(true);
    } catch { setError('Failed to send message. Please try again or email us directly.'); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen pt-16 md:pt-24">
      <div className="bg-gray-100 border-b border-gray-light py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-[1fr_auto]">
            <div className="text-left">
              <p className="section-tag mb-3">Get in Touch</p>
              <h1 className="font-display font-black text-3xl text-black sm:text-4xl md:text-5xl">Contact <span className="text-black">Us</span></h1>
              <p className="text-gray-medium font-body text-sm mt-3 max-w-xl">
                Whether you&apos;re looking for a job or need to hire talent, we&apos;re here to help. Reach out and we&apos;ll respond within 24 hours.
                Our specialists can guide you on hiring strategy, role requirements and timelines.
                Expect clear answers, transparent next steps and a dedicated point of contact.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-2xl bg-black p-4 sm:p-6 md:p-8">
                <img
                  src={companyLogo}
                  alt="Optimus Manpower logo"
                  className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 px-4 py-10 md:gap-12 md:py-16 lg:grid-cols-3 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div>
            <p className="section-tag mb-4">Our Office</p>
            <h2 className="font-heading font-semibold text-black text-lg mb-6">Optimus Manpower Pvt. Ltd.</h2>
          </div>

          {[
            { icon: MapPin, label: 'Address', value: 'Ground Floor, 12, Rajiv Gandhi Salai, Srinivasa Nagar, Kandhanchavadi, Perungudi, Chennai, Tamil Nadu 600096', href: "https://www.google.com/maps/place/Zora+Global+Ai+Technologies+Private+Limited/@12.9702318,80.2442208,16z/data=!3m1!4b1!4m6!3m5!1s0x3a525de935894505:0x58f547fe15e57e7e!8m2!3d12.9697456!4d80.2485552!16s%2Fg%2F11yzxyxwnz?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D", external: true },
            { icon: Phone, label: 'Phone', value: '+91 90 92 906 907', href: 'tel:+919092906907' },
            { icon: Phone, label: 'Tel No', value: '+91-044-4625 4744', href: 'tel:+914446254744' },
            { icon: Mail, label: 'Email', value: 'info@optimusglobalhr.com', href: emailHref, external: emailIsExternal },
            { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM IST' },
          ].map(({ icon: Icon, label, value, href, external }) => (
            <motion.div key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-black/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-gray-light text-xs font-body mb-1">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="text-gray-dark text-sm font-body leading-relaxed hover:text-black transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-gray-dark text-sm font-body leading-relaxed">{value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card card-static p-12 text-center">
              <CheckCircle className="w-16 h-16 text-black mx-auto mb-6" />
              <h3 className="font-display font-bold text-2xl text-black mb-3">Message Sent!</h3>
              <p className="text-gray-medium font-body">Thank you for reaching out. Our team will contact you within 24 business hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="card card-static space-y-5 p-5 sm:p-6 md:p-8">
              <div>
                <p className="section-tag mb-2">Send a Message</p>
                <h3 className="font-heading font-semibold text-black text-lg">How can we help you?</h3>
              </div>
              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body">{error}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">Your Name *</label>
                  <input name="contact_person" value={form.contact_person} onChange={handleChange} required maxLength={30} placeholder="Full name" className="input-field w-full caret-black cursor-text" />
                </div>
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="input-field w-full caret-black cursor-text" />
                </div>
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} maxLength={PHONE_LENGTH} inputMode="numeric" placeholder="9876543210" className="input-field w-full caret-black cursor-text" />
                </div>
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">I am a...</label>
                  <select name="hiring_requirement" value={form.hiring_requirement} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, hiring_requirement: e.target.value }))} className="input-field w-full">
                    <option>General Enquiry</option>
                    <option>Job Seeker</option>
                    <option>Employer / Recruiter</option>
                    <option>Partnership Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-medium text-xs font-body block mb-1">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help you..." className="input-field resize-none w-full caret-black cursor-text" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Sent!' : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
