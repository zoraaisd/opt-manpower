type LoadingStateProps = {
  label?: string;
};

export const LoadingState = ({ label = 'Loading content...' }: LoadingStateProps) => (
  <div className="rounded-[32px] border border-black/10 bg-white/80 px-6 py-14 text-center shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
    <p className="mt-4 text-sm font-medium text-slate-600">{label}</p>
  </div>
);
