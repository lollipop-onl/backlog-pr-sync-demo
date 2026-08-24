const DEFAULT_PATH = '/login';

export function resolveRedirectPath(query) {
  const next = query?.next;
  if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//')) {
    return DEFAULT_PATH;
  }
  return normalizeTrailingSlash(next);
}

function normalizeTrailingSlash(path) {
  if (path === '/') {
    return path;
  }
  const [pathname, search] = path.split('?', 2);
  const normalized = pathname.replace(/\/+$/, '');
  return search ? `${normalized}?${search}` : normalized;
}
