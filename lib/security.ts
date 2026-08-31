export function securityHeaders(): Array<{ key: string; value: string }> {
  return [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://ewzutahmskuhbsalpygn.supabase.co",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self'",
        "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
      ].join("; "),
    },
  ];
}

export function originIsAllowed(request: Request, siteUrl: string): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    const secFetchSite = request.headers.get("sec-fetch-site");
    return secFetchSite === "same-origin" || secFetchSite === null;
  }
  try {
    const incoming = new URL(origin).origin;
    const allowed = new Set<string>([new URL(siteUrl).origin]);
    const host = request.headers.get("host");
    if (host) {
      const proto = request.headers.get("x-forwarded-proto") || "https";
      allowed.add(`${proto}://${host}`);
    }
    allowed.add("https://fiveoaksoakville.co");
    allowed.add("https://www.fiveoaksoakville.co");
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
    return allowed.has(incoming);
  } catch {
    return false;
  }
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}
