const HOME_PATH = '/';

export function resolveLogoutRedirectPath(session) {
  if (session?.returnTo && session.returnTo.startsWith('/')) {
    return session.returnTo;
  }
  return HOME_PATH;
}
