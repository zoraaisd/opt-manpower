type BlogVideoSource = {
  kind: "iframe" | "video";
  src: string;
};

const INVALID_TEXT_PATTERNS = ["NaN", "Invalid Date"];

function sanitizeMediaSource(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (INVALID_TEXT_PATTERNS.some((pattern) => trimmed.includes(pattern))) {
    return null;
  }

  if (trimmed.startsWith("/") || trimmed.startsWith("./") || trimmed.startsWith("../")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function isVideoFile(src: string) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
}

function youtubeEmbedUrl(url: URL) {
  const videoId = url.hostname.includes("youtu.be")
    ? url.pathname.split("/").filter(Boolean)[0]
    : url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).pop();

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function vimeoEmbedUrl(url: URL) {
  const segments = url.pathname.split("/").filter(Boolean);
  const videoId = segments.includes("video") ? segments[segments.indexOf("video") + 1] : segments.pop();
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
}

export function resolveBlogVideoSource(value: unknown): BlogVideoSource | null {
  const sanitized = sanitizeMediaSource(value);
  if (!sanitized) return null;

  if (!sanitized.startsWith("http")) {
    return isVideoFile(sanitized) ? { kind: "video", src: sanitized } : null;
  }

  try {
    const url = new URL(sanitized);
    if (url.hostname.includes("youtube.com") || url.hostname === "youtu.be" || url.hostname.endsWith(".youtu.be")) {
      const embed = youtubeEmbedUrl(url);
      return embed ? { kind: "iframe", src: embed } : null;
    }

    if (url.hostname.includes("vimeo.com")) {
      const embed = vimeoEmbedUrl(url);
      return embed ? { kind: "iframe", src: embed } : null;
    }

    return isVideoFile(sanitized) ? { kind: "video", src: sanitized } : null;
  } catch {
    return null;
  }
}
