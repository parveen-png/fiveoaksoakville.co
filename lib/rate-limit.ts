interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  prune(now);
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }
  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      ),
    };
  }
  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    retryAfterSeconds: 0,
  };
}

const recentKeys = new Map<string, { createdAt: number; submissionId: string }>();

export function rememberIdempotency(
  key: string,
  submissionId: string,
  ttlMs = 10 * 60 * 1000,
): string | undefined {
  const now = Date.now();
  for (const [storedKey, value] of recentKeys) {
    if (value.createdAt + ttlMs <= now) {
      recentKeys.delete(storedKey);
    }
  }
  const existing = recentKeys.get(key);
  if (existing) {
    return existing.submissionId;
  }
  recentKeys.set(key, { createdAt: now, submissionId });
  return undefined;
}
