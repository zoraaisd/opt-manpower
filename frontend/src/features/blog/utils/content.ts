const blockedTags = ['script', 'style', 'object', 'embed'];

const allowedIframeHosts = ['youtube.com', 'www.youtube.com', 'youtu.be', 'www.youtube-nocookie.com', 'player.vimeo.com'];

const isAllowedIframe = (element: HTMLIFrameElement) => {
  try {
    const src = element.getAttribute('src');
    if (!src) return false;
    const url = new URL(src, window.location.origin);
    return allowedIframeHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
};

export const sanitizeRichText = (html: string) => {
  if (typeof window === 'undefined') {
    return html;
  }

  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(html, 'text/html');

  blockedTags.forEach((tag) => {
    documentFragment.querySelectorAll(tag).forEach((element) => element.remove());
  });

  documentFragment.querySelectorAll('iframe').forEach((element) => {
    if (!isAllowedIframe(element as HTMLIFrameElement)) {
      element.remove();
      return;
    }

    const iframe = element as HTMLIFrameElement;
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', 'true');
  });

  documentFragment.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();

      if (name.startsWith('on')) {
        element.removeAttribute(attribute.name);
      }

      if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return documentFragment.body.innerHTML;
};
