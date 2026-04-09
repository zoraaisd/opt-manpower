import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, Users, FileText, LogOut, Menu, X,
  TrendingUp, PlusCircle, Pencil, Trash2, Download, BarChart2, Search,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AdminJobForm from './AdminJobForm';

const ACCENT = '#111111';
const ACCENT_DARK = '#000000';
const CHART_COLORS = ['#111111', '#06b6d4', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#3b82f6'];

// ── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Briefcase, label: 'Jobs', path: '/admin/jobs' },
  { icon: FileText, label: 'Applications', path: '/admin/applications' },
  { icon: FileText, label: 'Enquiries', path: '/admin/enquiries' },
];

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) => {
  const { user, logout } = useAuth();
  const loc = useLocation();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/70 z-30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black to-gray-900 border-r border-white/10 z-40 transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-center px-6 py-5 border-b border-white/10">
          <img
            src="/src/asserts/opt-man-logo 1.webp"
            alt="Optimus Manpower"
            className="h-12 w-auto object-contain"
          />
        </div>
        <nav className="p-4 space-y-2 mt-2">
          {NAV.map(({ icon: Icon, label, path }) => {
            const active = loc.pathname === path;
            return (
              <Link key={path} to={path} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${active
                    ? 'bg-gradient-to-r from-white/10 to-white/5 text-gray-200 border-l-2 border-white/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}>
                <Icon className="w-4 h-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-white rounded-full flex items-center justify-center font-black text-black text-xs">
              {user?.first_name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-gray-400 text-xs">Admin</p>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ['admin-dashboard'], queryFn: adminAPI.getStats });
  const stats = data?.data;

  const notifyAdmin = (message: string) => {
    // Send email notification to admin
    console.log('Admin notification:', message);
  };

  const STATUS_COLOR: Record<string, string> = {
    Applied: 'bg-white/10 text-gray-200',
    'Under Review': 'bg-white/12 text-gray-200',
    Shortlisted: 'bg-white/15 text-gray-100',
    'Interview Scheduled': 'bg-white/18 text-gray-100',
    Rejected: 'bg-white/10 text-gray-300',
    Hired: 'bg-white/20 text-white',
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 p-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 font-semibold text-sm uppercase tracking-widest mb-2">Administration Dashboard</p>
              <h1 className="gramond-title font-black text-4xl text-black mb-2">Welcome Back</h1>
              <p className="text-gray-700 text-base">Manage jobs, applications and business enquiries</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Total Jobs', value: stats?.total_jobs, icon: Briefcase, gradient: 'from-black to-gray-700', path: '/admin/jobs' },
          { label: 'Published Jobs', value: stats?.published_jobs, icon: TrendingUp, gradient: 'from-gray-900 to-gray-600', path: '/admin/jobs' },
          { label: 'Applications', value: stats?.total_applications, icon: FileText, gradient: 'from-gray-800 to-gray-500', path: '/admin/applications' },
          { label: 'Enquiries', value: stats?.total_enquiries, icon: Briefcase, gradient: 'from-gray-700 to-gray-500', path: '/admin/enquiries' },
        ].map(({ label, value, icon: Icon, gradient, path }) => (
          <motion.button
            key={label}
            onClick={() => navigate(path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black/40 hover:shadow-xl transition-all duration-300 cursor-pointer text-left w-full"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">{label}</p>
                <p className={`font-black text-4xl bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>
                  {isLoading ? '...' : (value ?? '-')}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${gradient} p-3 rounded-xl`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white border-2 border-gray-200 rounded-2xl p-8"
      >
        <h2 className="font-black text-xl text-black mb-6">Recent Applications</h2>
        {stats?.recent_applications?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-gray-200">
                  {['Applicant', 'Job', 'Status', 'Date'].map((h) => (
                    <th key={h} className="pb-4 px-4 text-xs font-black text-gray-800 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recent_applications.map((app: any) => {
                  const statusColors: Record<string, string> = {
                    Applied: 'bg-gray-100 text-gray-800',
                    'Under Review': 'bg-gray-200 text-gray-800',
                    Shortlisted: 'bg-gray-300 text-gray-900',
                    'Interview Scheduled': 'bg-gray-200 text-gray-900',
                    Rejected: 'bg-gray-100 text-gray-700',
                    Hired: 'bg-gray-300 text-black',
                  };
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-black">{app.full_name || app.name || 'Unknown'}</td>
                      <td className="py-4 px-4 text-gray-700">{app.job_title}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No recent applications</p>
        )}
      </motion.div>
    </div>
  );
};

// ── Analytics ─────────────────────────────────────────────────────────────────
const Analytics = () => {
  const { data, isLoading } = useQuery({ queryKey: ['admin-analytics'], queryFn: adminAPI.getAnalytics });
  const analytics = data?.data;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-light px-3 py-2 text-xs font-body">
          <p className="text-gray-medium mb-1">{label}</p>
          {payload.map((p: any) => (
            <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-black text-2xl text-black">Analytics</h1>
        <p className="text-gray-medium text-sm font-body mt-1">Platform insights (last 12 months)</p>
      </div>

      {/* Monthly Applications + Jobs Chart */}
      <div className="card p-6">
        <h2 className="font-heading font-semibold text-black text-sm mb-6">Monthly Activity</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={analytics?.monthly_applications || []} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(0,0,0,0.5)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'rgba(0,0,0,0.5)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(0,0,0,0.6)' }} />
            <Line type="monotone" dataKey="count" name="Applications" stroke={ACCENT} strokeWidth={2} dot={{ fill: ACCENT, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="card p-6">
          <h2 className="font-heading font-semibold text-black text-sm mb-6">Jobs by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics?.top_categories || []} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(0,0,0,0.45)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="category" type="category" tick={{ fill: 'rgba(0,0,0,0.6)', fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Jobs" radius={[0, 3, 3, 0]}>
                {(analytics?.top_categories || []).map((_: any, i: number) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application Status Breakdown */}
        <div className="card p-6">
          <h2 className="font-heading font-semibold text-black text-sm mb-6">Application Status Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={analytics?.status_breakdown || []}
                dataKey="count"
                nameKey="status"
                cx="50%" cy="50%"
                outerRadius={90}
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: 'rgba(0,0,0,0.2)' }}
              >
                {(analytics?.status_breakdown || []).map((_: any, i: number) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Locations */}
        <div className="card p-6">
          <h2 className="font-heading font-semibold text-black text-sm mb-6">Jobs by Country</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics?.top_locations || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="country" tick={{ fill: 'rgba(0,0,0,0.45)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(0,0,0,0.45)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Jobs" radius={[3, 3, 0, 0]}>
                {(analytics?.top_locations || []).map((_: any, i: number) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Industries */}
        <div className="card p-6">
          <h2 className="font-heading font-semibold text-black text-sm mb-6">Jobs by Industry</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics?.top_industries || []} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(0,0,0,0.45)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="industry" type="category" tick={{ fill: 'rgba(0,0,0,0.6)', fontSize: 11 }} tickLine={false} axisLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Jobs" radius={[0, 3, 3, 0]}>
                {(analytics?.top_industries || []).map((_: any, i: number) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ── Jobs Manager ──────────────────────────────────────────────────────────────
const JobsManager = () => {
  const { data, refetch } = useQuery({ queryKey: ['admin-jobs'], queryFn: adminAPI.getJobs });
  const [formOpen, setFormOpen] = useState(false);
  const [editJob, setEditJob] = useState<any>(null);
  const jobs = data?.data?.results || data?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredJobs = jobs.filter((job: any) =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.job_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const deleteJob = async (id: string) => {
    if (!confirm('Delete this job posting?')) return;
    await adminAPI.deleteJob(id);
    refetch();
  };

  return (
    <div className="space-y-6 pr-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="w-full md:w-auto text-left flex-shrink-0">
          <h1 className="font-black text-3xl text-black mb-2">Job Postings</h1>
          <p className="text-gray-700 text-base">{filteredJobs.length} active positions</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-start md:justify-end">
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black/40 text-sm font-semibold transition-colors shadow-sm"
            />
          </div>
          <button
            onClick={() => { setEditJob(null); setFormOpen(true); }}
            className="flex items-center justify-center whitespace-nowrap gap-2 w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-black to-gray-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-black/20 transition-all duration-300 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" /> Create Job
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm "
      >
        {filteredJobs.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left align-middle min-w-[700px] sm:min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="px-6 py-4">Job Title</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedJobs.map((job: any) => (
                    <tr key={job.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-black text-black text-base">{job.title}</td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">{job.location}</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 bg-gray-100 text-gray-800 text-[11px] font-black uppercase tracking-widest rounded-md border border-gray-200">{job.job_type}</span></td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-md border ${job.status === 'Published'
                            ? 'bg-gray-200 text-gray-900 border-gray-300'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                          {job.status === 'Published' ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setEditJob(job); setFormOpen(true); }}
                            className="p-2 text-gray-800 hover:bg-gray-50 border-2 border-transparent hover:border-black/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="p-2 text-gray-700 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t-2 border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={e => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  className="px-2 py-1 bg-white border-2 border-gray-200 rounded-md text-sm font-bold focus:outline-none focus:border-black/40 cursor-pointer"
                >
                  {[5, 10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">
                Showing {filteredJobs.length === 0 ? 0 : (page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredJobs.length)} of {filteredJobs.length} entries
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 text-sm font-bold border-2 border-gray-200 rounded-lg hover:bg-white hover:border-black/40 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="px-4 py-2 font-black text-gray-900">
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 text-sm font-bold border-2 border-gray-200 rounded-lg hover:bg-white hover:border-black/40 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-700 font-black text-xl mb-1">No jobs found</p>
            <p className="text-gray-600 text-sm">Create a new job posting or adjust your search.</p>
          </div>
        )}
      </motion.div>

      {formOpen && <AdminJobForm job={editJob} onClose={() => { setFormOpen(false); refetch(); }} />}
    </div>
  );
};

const ApplicationsManager = () => {
  const { data, refetch } = useQuery({ queryKey: ['admin-applications'], queryFn: adminAPI.getApplications });
  const allApps = data?.data?.results || data?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredApps = allApps.filter((app: any) => {
    const matchesSearch = (app.full_name || app.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.job_title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;
  const apps = filteredApps.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const STATUS_OPTIONS = ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'];
  const STATUS_COLORS: Record<string, string> = {
    Applied: 'bg-gray-100 text-gray-800 border-gray-200',
    'Under Review': 'bg-gray-200 text-gray-800 border-gray-300',
    Shortlisted: 'bg-gray-300 text-gray-900 border-gray-300',
    'Interview Scheduled': 'bg-gray-200 text-gray-900 border-gray-300',
    Rejected: 'bg-gray-100 text-gray-700 border-gray-200',
    Hired: 'bg-gray-300 text-black border-gray-300',
  };

  const updateStatus = async (id: string, status: string) => {
    await adminAPI.updateApplicationStatus(id, status);
    refetch();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="w-full md:w-auto text-left flex-shrink-0">
          <h1 className="font-black text-3xl text-black mb-2">Applications</h1>
          <p className="text-gray-700 text-base">{filteredApps.length} total applications matched</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-start md:justify-end">
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="w-full sm:w-auto px-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black/40 text-sm font-semibold transition-colors shadow-sm cursor-pointer flex-shrink-0"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black/40 text-sm font-semibold transition-colors shadow-sm"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm mt-6"
      >
        {filteredApps.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left align-middle min-w-[800px] xl:min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Job Title</th>
                    <th className="px-6 py-4">Experience</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {apps.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                        {new Date(app.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-black text-black text-base">{app.full_name || app.name || 'N/A'}</p>
                        <p className="text-gray-800 font-bold text-xs">{app.email}</p>
                        <p className="text-gray-600 text-xs">{app.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{app.job_title || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                        {app.experience || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs border ${STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-800 border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {app.cv_file || app.resume || app.file ? (
                          <a
                            href={app.cv_file || app.resume || app.file}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-black to-gray-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" /> CV
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs font-semibold">No File</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t-2 border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={e => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  className="px-2 py-1 bg-white border-2 border-gray-200 rounded-md text-sm font-bold focus:outline-none focus:border-black/40"
                >
                  {[5, 10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">
                Showing {filteredApps.length === 0 ? 0 : (page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredApps.length)} of {filteredApps.length} entries
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 text-sm font-bold border-2 border-gray-200 rounded-lg hover:bg-white hover:border-black/40 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="px-4 py-2 font-black text-gray-900">
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 text-sm font-bold border-2 border-gray-200 rounded-lg hover:bg-white hover:border-black/40 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-800 font-black text-xl mb-1">No applications yet</p>
            <p className="text-gray-600 text-sm">Applications will appear here when candidates apply</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ── Enquiries Manager ─────────────────────────────────────────────────────────
const EnquiriesManager = () => {
  const { data } = useQuery({ queryKey: ['admin-enquiries'], queryFn: adminAPI.getEnquiries });
  const allEnquiries = data?.data?.results || data?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSort, setFilterSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredEnquiries = allEnquiries.filter((enq: any) =>
    (enq.company_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enq.contact_person || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enq.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enq.hiring_requirement || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enq.job_location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enq.message || '').toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a: any, b: any) => {
    const timeA = new Date(a.created_at || 0).getTime();
    const timeB = new Date(b.created_at || 0).getTime();
    return filterSort === 'newest' ? timeB - timeA : timeA - timeB;
  });

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage) || 1;
  const enquiries = filteredEnquiries.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const isNew = (dateStr: string) => {
    const diff = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  return (
    <div className="space-y-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 "
      >
        <div className="w-full lg:w-auto text-left flex-shrink-0">
          <h1 className="font-black text-2xl text-black mb-1">Business Enquiries</h1>
          <p className="text-gray-700 text-sm">{filteredEnquiries.length} enquir{filteredEnquiries.length === 1 ? 'y' : 'ies'} found</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto mt-3 lg:mt-0 justify-start lg:justify-end">
          <select
            value={filterSort}
            onChange={(e) => { setFilterSort(e.target.value); setPage(1); }}
            className="w-full sm:w-auto px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black/40 text-xs font-semibold transition-colors shadow-sm cursor-pointer flex-shrink-0"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="relative w-full sm:w-48 lg:w-56 flex-shrink-0">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w- h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-5 py-1.5 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black/40 text-xs font-semibold transition-colors shadow-sm"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm"
      >
        {filteredEnquiries.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left align-middle min-w-[800px] xl:min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Contact Person</th>
                    <th className="px-6 py-4">Requirement</th>
                    <th className="px-6 py-4 text-center">Positions</th>
                    <th className="px-6 py-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enquiries.map((enq: any) => (
                    <tr key={enq.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col items-start gap-1">
                          {enq.created_at && isNew(enq.created_at) && (
                            <span className="bg-gray-100 text-gray-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-gray-200">
                              New
                            </span>
                          )}
                          <span className="text-gray-600 font-semibold text-xs">
                            {enq.created_at ? new Date(enq.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-black text-black text-base">{enq.company_name || '-'}</p>
                        <p className="text-gray-600 text-xs font-semibold mt-0.5 flex items-center gap-1">📍 {enq.job_location || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{enq.contact_person || '-'}</p>
                        <a href={`mailto:${enq.email}`} className="block text-gray-800 font-bold text-xs hover:underline mt-0.5">{enq.email}</a>
                        <a href={`tel:${enq.phone}`} className="block text-gray-600 text-xs hover:text-gray-900 mt-0.5">{enq.phone || '-'}</a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-gray-50 text-gray-800 border border-gray-200 px-2.5 py-1 rounded font-bold text-xs">
                          {enq.hiring_requirement || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-black text-black text-lg">
                          {enq.number_of_positions ?? '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-xs leading-relaxed max-w-xs truncate" title={enq.message || '-'}>
                        {enq.message || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t-2 border-gray-200 bg-gray-50 pr-16">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={e => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  className="px-2 py-1 bg-white border-2 border-gray-200 rounded-md text-sm font-bold focus:outline-none focus:border-black/40 cursor-pointer"
                >
                  {[5, 10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">
                Showing {filteredEnquiries.length === 0 ? 0 : (page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} entries
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 text-sm font-bold border-2 border-gray-200 rounded-lg hover:bg-white hover:border-black/40 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="px-4 py-2 font-black text-gray-900">
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 text-sm font-bold border-2 border-gray-200 rounded-lg hover:bg-white hover:border-black/40 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-800 font-black text-xl mb-1">No enquiries yet</p>
            <p className="text-gray-600 text-sm">Business enquiries from the contact form will appear here</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ── Admin Login Gate ────────────────────────────────────────────────────────
const AdminLoginGate = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 -right-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-white/12 to-white/5 blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-white/10 to-white/4 blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8">
          {/* <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 mx-auto flex items-center justify-center mb-4 rounded-xl shadow-lg shadow-black/20">
            <Briefcase className="w-8 h-8 text-white" />
          </div> */}
          <h1 className="font-black text-3xl text-white tracking-tight">OPTIMUS ADMIN</h1>
          <p className="text-gray-200 font-medium text-sm mt-2">Access to Administration Panel</p>
        </div>
        <div className="bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/30 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
            <div>
              <label className="block text-xs font-black text-white mb-2 tracking-widest uppercase">Email Address</label>
              <input
                type="email"
                autoFocus
                autoComplete="new-password"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm font-medium focus:outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-white mb-2 tracking-widest uppercase">Password</label>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm font-medium focus:outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
                required
              />
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-200 text-sm font-semibold">
                {error}
              </motion.p>
            )}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-black to-gray-700 text-white font-black py-3 rounded-lg hover:shadow-xl hover:shadow-black/20 active:scale-95 transition-all duration-300 disabled:opacity-60 uppercase tracking-widest text-sm">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center text-white/60 text-xs font-medium mt-6">Optimus Manpower - Administration Only</p>
      </motion.div>
    </div>
  );
};

// ── Admin Layout & Router ─────────────────────────────────────────────────────
const AdminPanel = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-700 font-medium">Loading...</div>;
  if (!user) return <AdminLoginGate />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-64 min-h-screen">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4 flex items-center gap-4 lg:hidden shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700 hover:text-black">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-black text-sm text-black">OPTIMUS ADMIN</span>
        </div>
        <div className="p-6 md:p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="jobs" element={<JobsManager />} />
            <Route path="applications" element={<ApplicationsManager />} />
            <Route path="enquiries" element={<EnquiriesManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;



