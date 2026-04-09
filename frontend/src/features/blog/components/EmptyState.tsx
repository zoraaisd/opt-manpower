type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-[0_20px_80px_rgba(15,23,42,0.04)]">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">No results</p>
    <h2 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
  </div>
);
