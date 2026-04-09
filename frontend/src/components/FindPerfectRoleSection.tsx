import { useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function FindPerfectRoleSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="py-2">
      <div className="mx-auto w-full max-w-[520px] rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-6 lg:p-10">
            <h3 className="mb-6 text-xl font-semibold text-black">Find Your Perfect Role</h3>

            <form onSubmit={handleSearch} className="space-y-5">
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-gray-dark">
                  What role are you looking for?
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-light" />
                  <input
                    type="text"
                    placeholder="Job title, skill, or keyword..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full border border-gray-light bg-gray-50 py-3 pl-11 pr-4 text-sm text-black placeholder-gray-medium transition-all duration-300 focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-gray-dark">
                  Where do you want to work?
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-light" />
                  <input
                    type="text"
                    placeholder="City or region..."
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full border border-gray-light bg-gray-50 py-3 pl-11 pr-4 text-sm text-black placeholder-gray-medium transition-all duration-300 focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/90">
                Explore Opportunities
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 border-t border-gray-light pt-5">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-medium">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {['IT Jobs', 'Gulf Roles', 'Leadership', 'Contract Work'].map((tag) => (
                  <Link
                    key={tag}
                    to={`/jobs?q=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-gray-light bg-gray-50 px-3 py-1.5 text-xs text-gray-medium transition-all duration-200 hover:border-black/30 hover:text-black"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
      </div>
    </section>
  );
}
