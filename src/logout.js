const DEFAULT_HOME = '/';

export function resolveLogoutRedirectPath(session) {
  if (session?.returnTo && session.returnTo.startsWith('/')) {
    return session.returnTo;
  }
  return DEFAULT_HOME;
}
