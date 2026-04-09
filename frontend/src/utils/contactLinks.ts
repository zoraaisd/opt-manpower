const MOBILE_OR_TABLET_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;

export const getEmailHref = (email: string) => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return `mailto:${email}`;
  }

  const isMobileOrTablet =
    MOBILE_OR_TABLET_REGEX.test(navigator.userAgent) ||
    window.matchMedia('(max-width: 1024px)').matches;

  return isMobileOrTablet
    ? `mailto:${email}`
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
};

export const isExternalEmailHref = (href: string) => href.startsWith('http');
