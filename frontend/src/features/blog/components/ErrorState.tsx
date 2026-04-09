type ErrorStateProps = {
  title?: string;
  description: string;
  actionLabel?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = 'Something went wrong',
  description,
  actionLabel = 'Try again',
  onRetry,
}: ErrorStateProps) => (
  <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-6 py-14 text-center shadow-[0_20px_80px_rgba(244,63,94,0.08)]">
    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-rose-500">Error</p>
    <h2 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        {actionLabel}
      </button>
    ) : null}
  </div>
);
