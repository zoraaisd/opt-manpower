export const formatBlogDate = (value: string | null, options?: Intl.DateTimeFormatOptions) => {
  if (!value) {
    return 'Unscheduled';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(new Date(value));
};
