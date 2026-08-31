import { NextResponse } from "next/server";
import { hasPrimaryLeadDestination, serverEnv } from "@/lib/env";
import { captureLead } from "@/lib/leads";
import { logger } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";
import { flattenLeadErrors, leadInputSchema } from "@/lib/validation";
import { clientKey, originIsAllowed } from "@/lib/security";
import { userMessages } from "@/lib/project-data";

export async function POST(request: Request) {
  if (!originIsAllowed(request, new URL(request.url).origin)) {
    return NextResponse.json(
      { ok: false, message: userMessages.failure },
      { status: 403 },
    );
  }

  const limit = rateLimit(
    clientKey(request),
    serverEnv.rateLimitMax,
    serverEnv.rateLimitWindowMs,
  );
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: userMessages.failure },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: userMessages.validationSummary },
      { status: 400 },
    );
  }

  const parsed = leadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: userMessages.validationSummary,
        errors: flattenLeadErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite.trim().length > 0) {
    return NextResponse.json({ ok: true, captured: false });
  }

  if (!hasPrimaryLeadDestination()) {
    logger.error("Lead destination is not configured");
    return NextResponse.json(
      { ok: false, message: userMessages.failure },
      { status: 503 },
    );
  }

  try {
    const result = await captureLead(parsed.data);
    return NextResponse.json({
      ok: true,
      captured: result.captured,
      alreadyRecorded: result.alreadyRecorded,
      submissionId: result.submissionId,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: userMessages.failure },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed" }, { status: 405 });
}
