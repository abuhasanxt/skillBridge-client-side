export type SessionUser = {
  id?: string;
  role?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
};

export type SessionResponse = {
  user?: SessionUser;
  session?: unknown;
  [key: string]: unknown;
} | null;

export async function getSessionFromCookies(
  cookieHeader: string,
  authUrl: string,
): Promise<SessionResponse> {
  if (!cookieHeader) return null;
  try {
    const res = await fetch(`${authUrl}/get-session`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SessionResponse;
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getRoleFromCookies(
  cookieHeader: string,
  authUrl: string,
): Promise<string | null> {
  const session = await getSessionFromCookies(cookieHeader, authUrl);
  return session?.user?.role ?? null;
}
