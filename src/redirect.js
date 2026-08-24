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
  return path.replace(/\/+$/, '');
}
