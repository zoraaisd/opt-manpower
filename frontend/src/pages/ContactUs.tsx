import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, CheckCircle, Send } from 'lucide-react';
import { contentAPI } from '../services/api';
import companyLogo from '../asserts/opt-man-logo 1.webp';

const ContactUs = () => {
  const [form, setForm] = useState({ company_name: 'N/A', contact_person: '', email: '', phone: '', hiring_requirement: 'General Enquiry', number_of_positions: 1, job_location: 'N/A', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      await contentAPI.employerEnquiry({ ...form, contact_person: form.contact_person || form.email, subject: 'Contacted' });
      setSubmitted(true);
    } catch { setError('Failed to send message. Please try again or email us directly.'); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-light py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="text-left">
              <p className="section-tag mb-3">Get in Touch</p>
              <h1 className="font-display font-black text-4xl md:text-5xl text-black">Contact <span className="text-black">Us</span></h1>
              <p className="text-gray-medium font-body text-sm mt-3 max-w-xl">
                Whether you're looking for a job or need to hire talent, we're here to help. Reach out and we'll respond within 24 hours.
                Our specialists can guide you on hiring strategy, role requirements, and timelines.
                Expect clear answers, transparent next steps, and a dedicated point of contact.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className=" rounded-2xl p-6 md:p-8 bg-black">
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

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Details */}
        <div className="space-y-8">
          <div>
            <p className="section-tag mb-4">Our Office</p>
            <h2 className="font-heading font-semibold text-black text-lg mb-6">Optimus Manpower Pvt. Ltd.</h2>
          </div>

          {[
            { icon: MapPin, label: 'Address', value: 'Ground Floor, 12, Rajiv Gandhi Salai,Srinivasa Nagar,Kandhanchavadi, Perungudi,Chennai, Tamil Nadu 600096' },
            { icon: Phone, label: 'Phone', value: '+91 90 92 906 907' },
            { icon: Mail, label: 'Email', value: 'info@optimusglobalhr.com' },
            { icon: Clock, label: 'Working Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM IST' },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-black/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-gray-light text-xs font-body mb-1">{label}</p>
                <p className="text-gray-dark text-sm font-body leading-relaxed">{value}</p>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 text-center">
              <CheckCircle className="w-16 h-16 text-black mx-auto mb-6" />
              <h3 className="font-display font-bold text-2xl text-black mb-3">Message Sent!</h3>
              <p className="text-gray-medium font-body">Thank you for reaching out. Our team will contact you within 24 business hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">
              <div>
                <p className="section-tag mb-2">Send a Message</p>
                <h3 className="font-heading font-semibold text-black text-lg">How can we help you?</h3>
              </div>
              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body">{error}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">Your Name *</label>
                  <input name="contact_person" value={form.contact_person} onChange={handleChange} required placeholder="Full name" className="input-field w-full" />
                </div>
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="input-field w-full" />
                </div>
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className="input-field w-full" />
                </div>
                <div>
                  <label className="text-gray-medium text-xs font-body block mb-1">I am a...</label>
                  <select name="hiring_requirement" value={form.hiring_requirement} onChange={(e: any) => setForm(f => ({ ...f, hiring_requirement: e.target.value }))} className="input-field w-full">
                    <option>General Enquiry</option>
                    <option>Job Seeker</option>
                    <option>Employer / Recruiter</option>
                    <option>Partnership Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-medium text-xs font-body block mb-1">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help you..." className="input-field resize-none w-full" />
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


